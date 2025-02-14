<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        // TODO: Add stats for the admin dashboard
        $stats = [
            'total_users' => 0,
            'active_courses' => 0,
            'total_instructors' => 0,
            'total_learners' => 0,
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}
