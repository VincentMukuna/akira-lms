<?php

namespace App\Domain\Course\Actions\Modules;

use App\Domain\Course\Data\ModuleReorderData;
use App\Domain\Course\Models\CourseModule;
use Illuminate\Support\Facades\DB;

class ReorderModulesAction
{
    public function execute(ModuleReorderData $data): void
    {
        DB::transaction(function () use ($data) {
            foreach ($data->modules as $moduleData) {
                $module = CourseModule::findOrFail($moduleData->id);

                // Update both section and order if changed
                $module->update([
                    'course_section_id' => $moduleData->section_id,
                    'order' => $moduleData->order,
                ]);
            }
        });
    }
}
