<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

class CreateSectionData extends Data
{
    public function __construct(
        #[Required]
        #[StringType]
        #[Max(255)]
        public string $title,

        #[Required]
        public string $course_id,

        #[Required]
        public int $order = 0,
    ) {}
}
