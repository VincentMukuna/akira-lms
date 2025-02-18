<?php

namespace App\Domain\Invites\Actions;

use App\Domain\Invites\Data\AcceptInvitationData;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AcceptInvitationAction
{
    public function execute(Invitation $invitation, AcceptInvitationData $data): User
    {
        return DB::transaction(function () use ($invitation, $data) {
            // Create the user
            $user = User::create([
                'name' => $data->name,
                'email' => $invitation->email,
                'password' => Hash::make($data->password),
                'email_verified_at' => now(), // Auto verify since we trust the invitation
            ]);

            // Assign the role from the invitation
            $role = Role::firstOrCreate(['name' => $invitation->role]);
            $user->assignRole($role);

            // Mark invitation as used
            $invitation->markAsUsed();

            return $user;
        });
    }
}
