<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisteredTenantController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/register');
    }
}
