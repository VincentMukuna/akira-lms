<?php

declare(strict_types=1);

use App\Http\Controllers\Dashboard\AdminDashboardController;
use App\Http\Controllers\Dashboard\InstructorDashboardController;
use App\Http\Controllers\Dashboard\LearnerDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Courses\CourseController;
use App\Http\Controllers\Users\InvitedUsersController;
use App\Http\Controllers\Workspace\SetupController;
use App\Http\Controllers\Users\InvitationController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Users\UserStatsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\InitializeTenancyBySubdomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    // Admin Routes
    Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
        Route::get('users/invite', [InvitedUsersController::class, 'create'])->name('admin.users.invite');
        Route::post('users/invite', [InvitedUsersController::class, 'store'])->name('admin.users.invite.store');
        Route::get('/users/stats', UserStatsController::class)->name('admin.users.stats');

        // Course Management Routes
        Route::get('/courses', [CourseController::class, 'index'])->name('admin.courses.index');
        Route::get('/courses/create', [CourseController::class, 'create'])->name('admin.courses.create');
        Route::post('/courses', [CourseController::class, 'store'])->name('admin.courses.store');
        Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->name('admin.courses.edit');
        Route::put('/courses/{id}', [CourseController::class, 'update'])->name('admin.courses.update');
        Route::get('/courses/{id}/builder', [CourseController::class, 'builder'])->name('admin.courses.builder');
    });

    // Instructor Routes
    Route::middleware(['auth', 'verified', 'role:instructor'])->prefix('instructor')->group(function () {
        Route::get('/dashboard', [InstructorDashboardController::class, 'index'])->name('instructor.dashboard');

        // Course Management Routes
        Route::get('/courses', [CourseController::class, 'index'])->name('instructor.courses.index');
        Route::get('/courses/create', [CourseController::class, 'create'])->name('instructor.courses.create');
        Route::post('/courses', [CourseController::class, 'store'])->name('instructor.courses.store');
        Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->name('instructor.courses.edit');
        Route::put('/courses/{id}', [CourseController::class, 'update'])->name('instructor.courses.update');
        Route::get('/courses/{id}/builder', [CourseController::class, 'builder'])->name('instructor.courses.builder');
    });

    // Learner Routes
    Route::middleware(['auth', 'verified', 'role:learner'])->prefix('learner')->group(function () {
        Route::get('/dashboard', [LearnerDashboardController::class, 'index'])->name('learner.dashboard');
        // TODO: Add other learner routes when controllers are created
    });

    // Shared Routes
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::get('/setup', [SetupController::class, 'create'])
        ->middleware('validate.setup.token')
        ->name('workspace.setup');

    Route::post('/setup', [SetupController::class, 'store'])
        ->middleware('validate.setup.token')
        ->name('workspace.setup.store');

    // Auth Routes
    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AuthenticatedSessionController::class, 'store']);

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
            ->name('password.request');

        Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
            ->name('password.email');

        Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
            ->name('password.reset');

        Route::post('reset-password', [NewPasswordController::class, 'store'])
            ->name('password.store');

        Route::get('invitation/{token}', [InvitationController::class, 'create'])
            ->name('invitation.accept');

        Route::post('invitation/{token}', [InvitationController::class, 'store'])
            ->name('invitation.accept.store');
    });

    // Email Verification Routes
    Route::middleware(['auth'])->group(function () {
        Route::get('verify-email', EmailVerificationPromptController::class)
            ->name('verification.notice');

        Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('verification.send');

        Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
            ->name('password.confirm');

        Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
            ->name('logout');
    });
});

require __DIR__ . '/auth.php';
