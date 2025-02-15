<?php

namespace App\Http\Controllers\Workspace;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TenantAccessController extends Controller
{
    /**
     * Show the tenant access form.
     */
    public function create(): Response
    {
        return Inertia::render('workspace/access');
    }

    /**
     * Handle the tenant access request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subdomain' => 'required|string|max:255',
        ]);

        // First try exact domain match (for custom domains)
        $tenant = Tenant::whereHas('domains', function ($query) use ($request) {
            $query->where('domain', $request->subdomain);
        })->first();

        // If no exact match, try subdomain match
        if (!$tenant) {
            $tenant = Tenant::whereHas('domains', function ($query) use ($request) {
                $query->where('domain', $request->subdomain . '.' . config('tenancy.central_domains')[0]);
            })->first();
        }

        if (!$tenant) {
            return back()->withErrors([
                'subdomain' => 'We couldn\'t find a workspace with that domain.',
            ]);
        }

        $domain = $tenant->domains->first();

        if (!$domain) {
            return back()->withErrors([
                'subdomain' => 'This workspace has no associated domain.',
            ]);
        }

        // Construct the URL with proper protocol and domain
        $protocol = request()->secure() ? 'https://' : 'http://';
        $loginUrl = $protocol . $domain->domain . '/login';

        // Return JSON response with redirect URL and company name
        return response()->json([
            'redirect_url' => $loginUrl,
            'company_name' => $tenant->name
        ]);
    }
}
