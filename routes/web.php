<?php

use App\Http\Controllers\Tenant\RegisteredTenantController;
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
});

Route::get('register', [RegisteredTenantController::class, 'create'])
    ->name('register');

Route::post('register', [RegisteredTenantController::class, 'store']);

// require __DIR__ . '/auth.php';
