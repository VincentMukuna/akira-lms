<?php

namespace App\Domain\Course\Actions\Modules;

use App\Domain\Course\Data\UpdateModuleOrderData;
use App\Domain\Course\Models\CourseModule;
use Illuminate\Support\Facades\DB;

class UpdateModuleOrderAction
{
    public function execute(UpdateModuleOrderData $data): void
    {
        $moduleOrders = $data->module_orders;
        DB::transaction(function () use ($moduleOrders) {
            foreach ($moduleOrders as $moduleOrder) {
                $module = CourseModule::find($moduleOrder['id']);
                $module->order = $moduleOrder['order'];
                $module->section_id = $moduleOrder['section_id'];
                $module->save();
            }
        });
    }
}
