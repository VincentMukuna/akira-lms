<?php

namespace App\Domain\Workspace\Actions;

use App\Domain\Workspace\Data\WorkspaceCreateData;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Uri;
use Illuminate\Support\Str;

class CreateWorkspaceAction
{
    public function execute(WorkspaceCreateData $data): array
    {
        DB::beginTransaction();
        try {
            // Generate setup token that expires in 24 hours
            $setupToken = Str::random(64);
            $setupTokenExpiresAt = now()->addDay();

            $tenant = Tenant::create([
                'id' => $data->subdomain,
                'name' => $data->company_name,
                'email' => $data->admin_email,
                'setup_token' => $setupToken,
                'setup_token_expires_at' => $setupTokenExpiresAt,
                'is_setup_complete' => false,
            ]);

            $appUri = Uri::of(config('app.url'));
            $appHost = $appUri->host();

            $domain = $tenant->domains()->create([
                'domain' => $data->subdomain . '.' . $appHost,
            ]);

            DB::commit();

            return [
                'tenant' => $tenant,
                'domain' => $domain->domain,
                'setup_token' => $setupToken,
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
