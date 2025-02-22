<?php

declare(strict_types=1);

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;

class CourseData extends Data
{
    public function __construct(
        public string $title,
        public string $description,
        public string $learning_objectives,
        public string $level,
        public bool $is_published = false,
    ) {}
}
