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
            'total_users' => 354,
            'active_courses' => 13,
            'total_instructors' => 7,
            'total_learners' => 290,
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}
