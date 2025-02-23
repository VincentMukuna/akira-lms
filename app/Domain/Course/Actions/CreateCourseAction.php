<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Data\CourseData;
use App\Domain\Course\Models\Course;

class CreateCourseAction
{
    public function execute(CourseData $data): Course
    {
        $course = Course::create([
            'title' => $data->title,
            'description' => $data->description,
            'learning_objectives' => $data->learning_objectives,
            'level' => $data->level,
            'is_published' => $data->is_published,
        ]);

        if ($data->cover_image) {
            $course->addMedia($data->cover_image)
                ->toMediaCollection('cover');
        }

        return $course;
    }
}
