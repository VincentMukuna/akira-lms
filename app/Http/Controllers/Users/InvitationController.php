<?php

namespace App\Http\Controllers\Users;

use App\Domain\Invites\Actions\AcceptInvitationAction;
use App\Domain\Invites\Data\AcceptInvitationData;
use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    public function create(string $token): Response
    {
        $invitation = Invitation::where('token', $token)
            ->valid()
            ->firstOrFail();

        return Inertia::render('auth/accept-invitation', [
            'email' => $invitation->email,
            'token' => $token,
        ]);
    }

    public function store(string $token, AcceptInvitationData $data, AcceptInvitationAction $action): RedirectResponse
    {
        $invitation = Invitation::where('token', $token)
            ->valid()
            ->firstOrFail();

        $user = $action->execute($invitation, $data);

        Auth::login($user);

        return redirect()->route('dashboard')
            ->with('success', 'Welcome! Your account has been set up successfully.');
    }
}
