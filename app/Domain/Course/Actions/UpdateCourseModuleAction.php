<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Data\CourseModuleData;
use App\Domain\Course\Models\CourseModule;

class UpdateCourseModuleAction
{
    public function execute(CourseModule $module, CourseModuleData $data): CourseModule
    {
        $module->update([
            'title' => $data->title,
            'type' => $data->type,
            'content' => $data->content,
            'order' => $data->order,
        ]);

        return $module->fresh();
    }
}
