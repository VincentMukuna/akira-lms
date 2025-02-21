<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Data\CourseModuleData;
use App\Domain\Course\Models\CourseModule;
use App\Domain\Course\Models\CourseSection;

class CreateCourseModuleAction
{
    public function execute(CourseSection $section, CourseModuleData $data): CourseModule
    {
        return $section->modules()->create([
            'title' => $data->title,
            'type' => $data->type,
            'content' => $data->content,
            'order' => $data->order,
        ]);
    }
}
