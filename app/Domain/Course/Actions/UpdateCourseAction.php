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

        if ($data->cover_image) {
            // Delete old cover image if it exists
            $course->clearMediaCollection('cover');
            
            // Add new cover image
            $course->addMedia($data->cover_image)
                ->toMediaCollection('cover');
        }

        return $course->fresh();
    }
} 