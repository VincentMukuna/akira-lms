<?php

use App\Http\Controllers\Workspace\CheckSubdomainController;
use App\Http\Controllers\Workspace\TenantAccessController;
use App\Http\Controllers\Workspace\WorkspaceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Tenant Access Routes
Route::get('/access', [TenantAccessController::class, 'create'])
    ->name('workspace.access');

Route::post('/access', [TenantAccessController::class, 'store'])
    ->name('workspace.access');

// Tenant Registration Routes
Route::middleware('guest')->group(function () {
    Route::get('register', [WorkspaceController::class, 'create'])
        ->name('register');

    Route::post('register', [WorkspaceController::class, 'store'])
        ->name('register.workspace');

    Route::get('check-subdomain/{subdomain}', CheckSubdomainController::class)
        ->middleware('throttle:6,1')
        ->name('register.check-subdomain');
});

// require __DIR__ . '/auth.php';
