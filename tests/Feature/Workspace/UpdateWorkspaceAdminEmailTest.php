<?php

use App\Domain\Workspace\Notifications\WorkspaceCreated;
use App\Models\Tenant;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

afterEach(function () {
    tenancy()->end();
    DB::disconnect('tenant');
    DB::purge('tenant');

    $tenantDatabaseFiles = glob(database_path('tenant*.sqlite')) ?: [];

    foreach ($tenantDatabaseFiles as $tenantDatabaseFile) {
        if (is_file($tenantDatabaseFile)) {
            @unlink($tenantDatabaseFile);
        }
    }
});

test('admin email can be corrected after workspace registration', function () {
    Notification::fake();
    $tenant = createPendingWorkspaceTenant();
    $originalToken = $tenant->setup_token;

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
        'workspace_registration' => [
            'email' => 'wrong@example.com',
        ],
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertRedirect(route('register'));

    $tenant->refresh();

    expect($tenant->email)->toBe('correct@example.com')
        ->and($tenant->setup_token)->not->toBe($originalToken)
        ->and(Carbon::parse($tenant->setup_token_expires_at)->greaterThan(now()->addHours(23)))->toBeTrue();
    Notification::assertSentOnDemand(
        WorkspaceCreated::class,
        fn (object $notification, array $channels, object $notifiable) => $notifiable->routeNotificationFor('mail') === 'correct@example.com'
    );
});

test('admin email cannot be corrected when setup is already complete', function () {
    Notification::fake();
    $tenant = createPendingWorkspaceTenant([
        'is_setup_complete' => true,
    ]);

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
        'workspace_registration' => [
            'email' => 'wrong@example.com',
        ],
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertSessionHasErrors('admin_email');

    $tenant->refresh();

    expect($tenant->email)->toBe('wrong@example.com');
    Notification::assertNothingSent();
});

test('admin email cannot be corrected when setup token is missing', function () {
    Notification::fake();
    $tenant = createPendingWorkspaceTenant([
        'setup_token' => null,
    ]);

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertSessionHasErrors('admin_email');

    $tenant->refresh();

    expect($tenant->email)->toBe('wrong@example.com');
    Notification::assertNothingSent();
});

test('admin email cannot be corrected when setup token is expired', function () {
    Notification::fake();
    $tenant = createPendingWorkspaceTenant([
        'setup_token_expires_at' => now()->subMinute(),
    ]);

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertSessionHasErrors('admin_email');

    $tenant->refresh();

    expect($tenant->email)->toBe('wrong@example.com');
    Notification::assertNothingSent();
});

test('admin email cannot be corrected without a registration session', function () {
    $this->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertSessionHasErrors('admin_email');
});

test('admin email update validates email format', function () {
    $tenant = createPendingWorkspaceTenant();

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
    ])->patch('/register/admin-email', [
        'admin_email' => 'not-an-email',
    ])->assertSessionHasErrors('admin_email');
});

test('admin email cannot be corrected when tenant no longer exists', function () {
    $tenant = createPendingWorkspaceTenant();
    $tenantId = $tenant->id;

    $tenant->delete();

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenantId,
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertSessionHasErrors('admin_email')
        ->assertSessionMissing('workspace_email_correction_tenant_id');
});

test('registration session email is updated after correction', function () {
    Notification::fake();
    $tenant = createPendingWorkspaceTenant();

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
        'workspace_registration' => [
            'email' => 'wrong@example.com',
        ],
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertRedirect(route('register'))
        ->assertSessionHas('workspace_registration.email', 'correct@example.com');
});

function createPendingWorkspaceTenant(array $overrides = []): Tenant
{
    $tenantId = 'acme-corp-'.Str::lower(Str::random(8));

    $tenant = Tenant::create(array_merge([
        'id' => $tenantId,
        'name' => 'Acme Corp',
        'email' => 'wrong@example.com',
        'setup_token' => Str::random(64),
        'setup_token_expires_at' => now()->addDay(),
        'is_setup_complete' => false,
    ], $overrides));

    $tenant->domains()->create(['domain' => $tenantId.'.test']);

    return $tenant;
}
