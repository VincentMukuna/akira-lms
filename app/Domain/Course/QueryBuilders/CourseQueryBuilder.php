<?php

declare(strict_types=1);

namespace App\Domain\Course\QueryBuilders;

use Illuminate\Database\Eloquent\Builder;

class CourseQueryBuilder extends Builder
{
    public function content(): array
    {
        $sections = $this->first()->sections()
            ->orderBy('order')
            ->with(['modules' => function ($query) {
                $query->orderBy('order');
            }])
            ->get();

        $modules = $sections->flatMap(function ($section) {
            return $section->modules;
        });

        return [
            'sections' => $sections,
            'modules' => $modules,
        ];
    }
}
