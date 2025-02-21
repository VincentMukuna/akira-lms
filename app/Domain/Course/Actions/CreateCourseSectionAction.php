<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Data\CourseSectionData;
use App\Domain\Course\Models\Course;
use App\Domain\Course\Models\CourseSection;

class CreateCourseSectionAction
{
    public function execute(Course $course, CourseSectionData $data): CourseSection
    {
        return $course->sections()->create([
            'title' => $data->title,
            'order' => $data->order,
        ]);
    }
}
