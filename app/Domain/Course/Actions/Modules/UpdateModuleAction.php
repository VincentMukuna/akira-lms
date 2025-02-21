<?php

namespace App\Domain\Course\Actions\Modules;

use App\Domain\Course\Models\CourseModule;
use Illuminate\Support\Facades\DB;

class UpdateModuleAction
{
    public function execute(CourseModule $module, array $content): CourseModule
    {
        return DB::transaction(function () use ($module, $content) {
            $module->update([
                'content' => $content,
            ]);

            return $module->fresh();
        });
    }
}
