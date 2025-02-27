<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Data\CourseData;
use App\Domain\Course\Models\Course;

class UpdateCourseAction
{
    public function execute(Course $course, CourseData $data): Course
    {
        $course->update([
            'title' => $data->title,
            'description' => $data->description,
            'learning_objectives' => $data->learning_objectives,
            'level' => $data->level,
            'is_published' => $data->is_published,
        ]);

        // Handle cover image
        if ($data->cover_image === null) {
            // If cover_image is explicitly set to null, remove the existing cover image
            $course->clearMediaCollection('cover');
        } elseif ($data->cover_image) {
            // If a new cover image is provided, replace the existing one
            $course->clearMediaCollection('cover');
            $course->addMedia($data->cover_image)
                ->toMediaCollection('cover');
        }

        return $course->fresh();
    }
} 