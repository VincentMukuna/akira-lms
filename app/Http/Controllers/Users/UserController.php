<?php

namespace App\Http\Controllers\Users;

use App\Domain\Shared\QueryBuilder;
use App\Domain\Users\Data\UserData;
use App\Domain\Users\Filters\DateRangeFilter;
use App\Domain\Users\Filters\RoleFilter;
use App\Domain\Users\Filters\SearchFilter;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = QueryBuilder::for(User::class)
            ->withFilters([
                SearchFilter::class,
                RoleFilter::class,
                DateRangeFilter::class,
            ])
            ->get()
            ->with('roles')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => UserData::collect($users),
            'filters' => $request->only(['search', 'role', 'startDate', 'endDate']),
            'availableRoles' => Role::pluck('name'),
            'stats' => [
                'total_users' => User::count(),
                'active_users' => User::where('email_verified_at', '!=', null)->count(),
                'new_users_this_month' => User::whereMonth('created_at', now()->month)->count(),
                'pending_invitations' => User::where('email_verified_at', null)->count(),
            ],
        ]);
    }
}
