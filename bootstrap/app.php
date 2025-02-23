<?php

use App\Services\RoleRedirectionService;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // web: __DIR__ . '/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        using: function () {
            $centralDomains = config('tenancy.central_domains');

            foreach ($centralDomains as $domain) {
                Route::middleware('web')
                    ->domain($domain)
                    ->group(base_path('routes/web.php'));
            }

            Route::middleware('web')->group(base_path('routes/tenant.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->redirectUsersTo(function (Request $request) {
            return app(RoleRedirectionService::class)->getRedirectRoute($request->user());
        });

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'validate.setup.token' => \App\Http\Middleware\ValidateSetupToken::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $statusCode = $response->getStatusCode();

            // Handle CSRF token expiration
            if ($statusCode === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            // Show custom error page for common errors in production only
            if (! app()->environment(['local', 'testing']) && in_array($statusCode, [500, 503, 404, 403])) {
                return Inertia::render('error', ['status' => $statusCode])
                    ->toResponse($request)
                    ->setStatusCode($statusCode);
            }

            return $response;
        });

        // Disable debug mode in production
        if (! app()->environment(['local', 'testing'])) {
            $exceptions->dontReport([\Illuminate\Database\QueryException::class]);
            config(['app.debug' => false]);
        }
    })->create();
