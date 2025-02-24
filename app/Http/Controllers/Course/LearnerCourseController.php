<?php

declare(strict_types=1);

namespace App\Http\Controllers\Course;

use App\Domain\Course\Filters\LevelFilter;
use App\Domain\Course\Filters\SearchFilter;
use App\Domain\Course\Models\Course;
// use App\Domain\Shared\QueryBuilder;
use App\Domain\Shared\QueryBuilder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearnerCourseController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('learner/courses', [
            'courses' => QueryBuilder::for(Course::class)
                ->withFilters([
                    SearchFilter::class,
                    LevelFilter::class,
                ])
                ->build()
                ->where('is_published', true)
                ->withCount('sections as modules_count')
                ->latest()
                ->get()
                ->map(fn(Course $course) => [
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

    public function show(string $id)
    {
        $course = Course::query()
            ->where('is_published', true)
            ->with(['sections' => function ($query) {
                $query->orderBy('order')
                    ->with(['modules' => function ($query) {
                        $query->orderBy('order')
                            ->select(['id', 'section_id', 'title', 'type', 'order']);
                    }]);
            }])
            ->findOrFail($id);

        return Inertia::render('learner/course-view', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'learning_objectives' => $course->learning_objectives,
                'level' => $course->level,
                'cover_image' => $course->cover,
                'sections' => $course->sections->map(fn($section) => [
                    'id' => $section->id,
                    'title' => $section->title,
                    'order' => $section->order,
                    'modules' => $section->modules->map(fn($module) => [
                        'id' => $module->id,
                        'title' => $module->title,
                        'type' => $module->type,
                        'order' => $module->order,
                    ])
                ])
            ]
        ]);
    }
}
