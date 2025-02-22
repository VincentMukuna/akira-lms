<?php

namespace App\Domain\Course\Actions\Modules;

use App\Domain\Course\Data\CreateModuleData;
use App\Domain\Course\Models\CourseModule;
use Illuminate\Support\Facades\DB;

class CreateModuleAction
{
    public function execute(CreateModuleData $data): CourseModule
    {
        return DB::transaction(function () use ($data) {
            return CourseModule::create([
                'type' => $data->type,
                'section_id' => $data->section_id,
                'data' => $data->data,
                'title' => $data->title,
                'order' => $data->order,
            ]);
        });
    }
}
