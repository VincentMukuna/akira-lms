<?php

namespace App\Http\Controllers\Workspace;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class SetupController extends Controller
{
    public function create(): Response
    {
        // CHeck if the curre
        return Inertia::render('workspace/setup');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'token' => ['required', 'string'],
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            // Create admin role if it doesn't exist
            $adminRole = Role::firstOrCreate(['name' => 'admin']);
            $user->assignRole($adminRole);

            // Mark setup as complete
            tenant()->update([
                'is_setup_complete' => true,
                'setup_token' => null,
                'setup_token_expires_at' => null,
            ]);

            DB::commit();

            Auth::login($user);

            return redirect()->route('admin.dashboard')
                ->with('success', 'Welcome to your new workspace!');
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
