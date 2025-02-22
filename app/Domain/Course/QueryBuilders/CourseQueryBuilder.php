<?php

declare(strict_types=1);

namespace App\Domain\Course\QueryBuilders;

use App\Domain\Course\Models\CourseSection;
use App\Domain\Course\Models\CourseModule;
use Illuminate\Database\Eloquent\Builder;

class CourseQueryBuilder extends Builder
{
    // each course has many sections and each section has many modules
    public function sections()
    {
        return $this->hasMany(CourseSection::class)->orderBy('order');
    }
}
