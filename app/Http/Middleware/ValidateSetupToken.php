<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateSetupToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenant = tenant();

        // If setup is already complete, redirect to login
        if ($tenant->is_setup_complete) {
            return redirect()->route('login')
                ->with('error', 'This workspace is already set up.');
        }

        $setupToken = $request->get('token');

        // Validate setup token
        if (
            ! $setupToken ||
            $setupToken !== $tenant->setup_token ||
            now()->isAfter($tenant->setup_token_expires_at)
        ) {
            abort(403, 'Invalid or expired setup token.');
        }

        return $next($request);
    }
}
