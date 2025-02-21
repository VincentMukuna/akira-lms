<?php

declare(strict_types=1);

namespace App\Domain\Course\Actions;

use App\Domain\Course\Models\Course;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UpdateSectionOrderAction
{
    public function execute(Course $course, Collection $sections): void
    {
        DB::transaction(function () use ($course, $sections) {
            $sections->each(function (array $section) use ($course) {
                $course->sections()
                    ->where('id', $section['id'])
                    ->update(['order' => $section['order']]);
            });
        });
    }
}
