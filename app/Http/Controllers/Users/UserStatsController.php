<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserStatsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('email_verified_at', '!=', null)->count(),
            'new_users_this_month' => User::whereMonth('created_at', now()->month)->count(),
            'pending_invitations' => User::where('email_verified_at', null)->count(),
        ];

        return response()->json($stats);
    }
}
