<?php

namespace App\Http\Controllers\Workspace;

use App\Domain\Workspace\Actions\CreateWorkspaceAction;
use App\Domain\Workspace\Data\WorkspaceCreateData;
use App\Domain\Workspace\Notifications\WorkspaceCreated;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function store(WorkspaceCreateData $data, CreateWorkspaceAction $action): Response
    {
        $result = $action->execute($data);

        // Send welcome email with setup instructions
        Notification::route('mail', $data->admin_email)
            ->notify(new WorkspaceCreated(
                $result['tenant'],
                $result['domain'],
                $result['setup_token']
            ));

        return Inertia::render('auth/register', [
            'status' => 'success',
            'email' => $data->admin_email
        ]);
    }
}
