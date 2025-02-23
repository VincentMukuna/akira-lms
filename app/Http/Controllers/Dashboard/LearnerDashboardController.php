<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LearnerDashboardController extends Controller
{
    public function index(): Response
    {
        // TODO: Add stats for the learner dashboard
        $stats = [
            'courses_in_progress' => 0,
            'completed_courses' => 0,
            'achievements' => 0,
        ];

        return Inertia::render('learner/dashboard', [
            'stats' => $stats,
        ]);
    }
}
