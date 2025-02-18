<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class InstructorDashboardController extends Controller
{
    public function index(): Response
    {
        // TODO: Add stats for the instructor dashboard
        $stats = [
            'active_courses' => 0,
            'total_students' => 0,
            'pending_assessments' => 0,
        ];

        return Inertia::render('instructor/dashboard', [
            'stats' => $stats,
        ]);
    }
}
