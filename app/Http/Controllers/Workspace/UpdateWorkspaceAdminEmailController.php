<?php

namespace App\Http\Controllers\Workspace;

use App\Domain\Workspace\Actions\UpdateWorkspaceAdminEmailAction;
use App\Domain\Workspace\Data\WorkspaceAdminEmailUpdateData;
use App\Domain\Workspace\Notifications\WorkspaceCreated;
use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

class UpdateWorkspaceAdminEmailController extends Controller
{
    public function update(
        WorkspaceAdminEmailUpdateData $data,
        UpdateWorkspaceAdminEmailAction $action,
    ): RedirectResponse {
        $tenant_id = session('workspace_email_correction_tenant_id');

        if (! $tenant_id) {
            throw ValidationException::withMessages([
                'admin_email' => ['Unable to update the email. Please register your workspace again.'],
            ]);
        }

        $tenant = Tenant::query()->find($tenant_id);

        if (! $tenant) {
            session()->forget('workspace_email_correction_tenant_id');

            throw ValidationException::withMessages([
                'admin_email' => ['Unable to update the email. Please register your workspace again.'],
            ]);
        }

        $result = $action->execute($tenant, $data->admin_email);

        Notification::route('mail', $data->admin_email)
            ->notify(new WorkspaceCreated(
                $result['tenant'],
                $result['domain'],
                $result['setup_token'],
            ));

        session([
            'workspace_registration' => [
                'email' => $data->admin_email,
            ],
        ]);

        return redirect()->route('register');
    }
}
