<?php

namespace App\Http\Controllers\Workspace;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\JsonResponse;

class CheckSubdomainController extends Controller
{
    public function __invoke(string $subdomain): JsonResponse
    {
        $exists = Tenant::query()
            ->whereHas('domains', function ($query) use ($subdomain) {
                $query->where('domain', 'like', $subdomain . '.%');
            })
            ->exists();

        return response()->json([
            'available' => !$exists,
        ]);
    }
}
