<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Models\CourseSection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UpdateModuleOrderAction
{
    public function execute(CourseSection $section, Collection $modules): void
    {
        DB::transaction(function () use ($section, $modules) {
            $modules->each(function (array $module) use ($section) {
                $section->modules()
                    ->where('id', $module['id'])
                    ->update([
                        'order' => $module['order'],
                        'section_id' => $module['section_id'] ?? $section->id,
                    ]);
            });
        });
    }
}
