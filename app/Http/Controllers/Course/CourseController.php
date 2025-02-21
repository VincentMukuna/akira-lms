<?php

declare(strict_types=1);

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\CreateCourseAction;
use App\Domain\Course\Data\CourseData;
use App\Domain\Course\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly CreateCourseAction $createCourseAction,
    ) {}

    public function index(): Response
    {
        $courses = Course::query()
            ->select([
                'id',
                'title',
                'description',
                'is_published',
                'created_at',
            ])
            ->withCount('sections as modules_count')
            ->latest()
            ->get()
            ->map(fn(Course $course) => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'status' => $course->is_published ? 'published' : 'draft',
                'modules_count' => $course->modules_count,
                'created_at' => $course->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Courses/Create');
    }

    public function store(): RedirectResponse
    {
        $validated = request()->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'learning_objectives' => ['required', 'string'],
            'level' => ['required', 'string', 'in:beginner,intermediate,advanced'],
            'is_published' => ['boolean'],
        ]);

        $course = $this->createCourseAction->execute(
            CourseData::from($validated)
        );

        return redirect()->route('admin.courses.builder', [
            'id' => $course->id,
        ])->with('success', 'Course created successfully.');
    }

    public function edit(string $id): Response
    {
        $course = Course::findOrFail($id);

        return Inertia::render('Courses/Edit', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'learning_objectives' => $course->learning_objectives,
                'level' => $course->level,
                'is_published' => $course->is_published,
            ],
        ]);
    }

    public function update(string $id): RedirectResponse
    {
        $validated = request()->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'learning_objectives' => ['required', 'string'],
            'level' => ['required', 'string', 'in:beginner,intermediate,advanced'],
            'is_published' => ['boolean'],
        ]);

        $course = Course::findOrFail($id);
        $course->update($validated);

        return redirect()->route('admin.courses.builder', [
            'id' => $course->id,
        ])->with('success', 'Course updated successfully.');
    }

    public function builder(string $id): Response
    {
        return Inertia::render('Courses/Builder', [
            'courseId' => $id,
        ]);
    }
}
