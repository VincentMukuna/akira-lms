<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/users/index', [
            'users' => UserResource::collection(
                User::query()
                    ->with('roles')
                    ->latest()
                    ->paginate(10)
            ),
        ]);
    }
}
