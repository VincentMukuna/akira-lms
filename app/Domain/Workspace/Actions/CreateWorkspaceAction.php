<?php

namespace App\Domain\Workspace\Actions;

use App\Domain\Workspace\Data\WorkspaceCreateData;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Uri;

class CreateWorkspaceAction
{
    public function execute(WorkspaceCreateData $data): array
    {
        DB::beginTransaction();
        try {
            // TODO: Use a Saga to create the tenant and domain
            $tenant = Tenant::create([
                'id' => $data->subdomain,
                'name' => $data->company_name,
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
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
