<?php

use App\Models\Tenant;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

test('admin email can be corrected after workspace registration', function () {
    Notification::fake();

    $tenant = Tenant::create([
        'id' => 'acme-corp',
        'name' => 'Acme Corp',
        'email' => 'wrong@example.com',
        'setup_token' => Str::random(64),
        'setup_token_expires_at' => now()->addDay(),
        'is_setup_complete' => false,
    ]);

    $tenant->domains()->create(['domain' => 'acme-corp.test']);

    $this->withSession([
        'workspace_email_correction_tenant_id' => $tenant->id,
        'workspace_registration' => [
            'email' => 'wrong@example.com',
        ],
    ])->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertRedirect(route('register'));

    $tenant->refresh();

    expect($tenant->email)->toBe('correct@example.com');
    Notification::assertSentOnDemand(\App\Domain\Workspace\Notifications\WorkspaceCreated::class);
});

test('admin email cannot be corrected without a registration session', function () {
    $this->patch('/register/admin-email', [
        'admin_email' => 'correct@example.com',
    ])->assertSessionHasErrors('admin_email');
});
