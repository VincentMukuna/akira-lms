<?php

declare(strict_types=1);

namespace App\Http\Controllers\Course;

use App\Domain\Course\Actions\CreateCourseAction;
use App\Domain\Course\Actions\DeleteCourseAction;
use App\Domain\Course\Actions\UpdateCourseAction;
use App\Domain\Course\Data\CourseData;
use App\Domain\Course\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly CreateCourseAction $createCourseAction,
        private readonly UpdateCourseAction $updateCourseAction,
        private readonly DeleteCourseAction $deleteCourseAction,
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
            ->map(fn (Course $course) => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'status' => $course->is_published ? 'published' : 'draft',
                'modules_count' => $course->modules_count,
                'created_at' => $course->created_at->format('Y-m-d'),
                'cover_image' => $course->cover,
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
            'cover_image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
        ]);

        $course = $this->createCourseAction->execute(
            CourseData::from($validated)
        );

        return redirect()->route('courses.builder', [
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
                'cover_image' => $course->cover,
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
            'cover_image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
        ]);

        $course = Course::findOrFail($id);
        $this->updateCourseAction->execute($course, CourseData::from($validated));

        return back()->with('success', 'Course updated successfully.');
    }

    public function builder(string $id): Response
    {
        $course = Course::findOrFail($id);

        $sections = $course->sections()
            ->orderBy('order')
            ->with(['modules' => function ($query) {
                $query->orderBy('order');
            }])
            ->get();

        $modules = $sections->flatMap(function ($section) {
            return $section->modules;
        });

        $content = [
            'sections' => $sections,
            'modules' => $modules,
        ];

        return Inertia::render('Courses/Builder', [
            'course_id' => $id,
            'defaultCourseContent' => $content,
        ]);
    }

    public function content(string $id): JsonResponse
    {
        $course = Course::findOrFail($id);

        $sections = $course->sections()
            ->orderBy('order')
            ->with(['modules' => function ($query) {
                $query->orderBy('order');
            }])
            ->get();

        $modules = $sections->flatMap(function ($section) {
            return $section->modules;
        });

        $content = [
            'sections' => $sections,
            'modules' => $modules,
        ];

        return response()->json($content);
    }

    public function destroy(string $id): RedirectResponse
    {
        $course = Course::findOrFail($id);
        $this->deleteCourseAction->execute($course);

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
