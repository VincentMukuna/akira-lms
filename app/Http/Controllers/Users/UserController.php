<?php

namespace App\Http\Controllers\Users;

use App\Data\UserData;
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('roles')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => UserData::collect($users),
            'stats' => [
                'total_users' => User::count(),
                'active_users' => User::where('email_verified_at', '!=', null)->count(),
                'new_users_this_month' => User::whereMonth('created_at', now()->month)->count(),
                'pending_invitations' => User::where('email_verified_at', null)->count(),
            ],
        ]);
    }
}
