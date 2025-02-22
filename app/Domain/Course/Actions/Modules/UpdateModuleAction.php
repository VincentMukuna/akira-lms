<?php

namespace App\Domain\Course\Actions\Modules;

use App\Domain\Course\Data\ModuleUpdateData;
use App\Domain\Course\Models\CourseModule;
use Illuminate\Support\Facades\DB;

class UpdateModuleAction
{
    public function execute(CourseModule $module, ModuleUpdateData $updateData): CourseModule
    {
        return DB::transaction(function () use ($module, $updateData) {
            $module->update([
                'title' => $updateData->title,
                'data' => $updateData->data,
            ]);

            return $module->fresh();
        });
    }
}
