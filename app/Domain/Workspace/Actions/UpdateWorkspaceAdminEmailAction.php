<?php

namespace App\Domain\Workspace\Actions;

use App\Models\Tenant;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UpdateWorkspaceAdminEmailAction
{
    /**
     * @return array{tenant: Tenant, domain: string, setup_token: string}
     */
    public function execute(Tenant $tenant, string $admin_email): array
    {
        if ($tenant->is_setup_complete) {
            throw ValidationException::withMessages([
                'admin_email' => ['This workspace has already been set up.'],
            ]);
        }

        if ($tenant->setup_token === null || now()->isAfter($tenant->setup_token_expires_at)) {
            throw ValidationException::withMessages([
                'admin_email' => ['The setup window has expired. Please contact support.'],
            ]);
        }

        $setup_token = Str::random(64);

        $tenant->update([
            'email' => $admin_email,
            'setup_token' => $setup_token,
            'setup_token_expires_at' => now()->addDay(),
        ]);

        $domain = $tenant->domains()->firstOrFail()->domain;

        return [
            'tenant' => $tenant->fresh(),
            'domain' => $domain,
            'setup_token' => $setup_token,
        ];
    }
}
