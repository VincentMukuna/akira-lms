<?php

declare(strict_types=1);

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;

class CourseSectionData extends Data
{
    public function __construct(
        public string $title,
        public int $order,
        public ?string $course_id = null,
    ) {}
}
