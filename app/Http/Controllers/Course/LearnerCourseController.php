<?php

declare(strict_types=1);

namespace App\Http\Controllers\Course;

use App\Domain\Course\Filters\LevelFilter;
use App\Domain\Course\Filters\SearchFilter;
use App\Domain\Course\Models\Course;
use App\Domain\Shared\QueryBuilder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearnerCourseController extends Controller
{
    public function index(Request $request)
    {
       return Inertia::render('learner/courses', [
        'courses' => Course::query()
            ->where('is_published', true)
            ->when($request->search, function ($query) use ($request) {
                return $query->where('title', 'like', "%{$request->search}%");
            })
            ->when($request->level, function ($query) use ($request) {
                return $query->where('level', $request->level);
            })
            ->withCount('sections as modules_count')
            ->latest()
            ->get()->map(fn (Course $course) => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'learning_objectives' => $course->learning_objectives,
                'level' => $course->level,
                'modules_count' => $course->modules_count,
                'created_at' => $course->created_at->format('Y-m-d'),
                'cover_image' => $course->cover,
            ]),
        'filters' => $request->only(['search', 'level']),
       ]);
    }
} 