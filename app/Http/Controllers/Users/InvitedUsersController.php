<?php

namespace App\Http\Controllers\Users;

use App\Domain\Invites\Actions\InviteUsersAction;
use App\Domain\Invites\Data\InviteUsersData;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InvitedUsersController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('admin/users/invite');
    }

    public function store(InviteUsersData $data, InviteUsersAction $action): RedirectResponse
    {
        $action->execute($data);

        return to_route('admin.users.invite')->with('success', 'Bulk invite initiated. Processing can take a few minutes. You will receive a notification when all invites have been processed.');
    }
}
