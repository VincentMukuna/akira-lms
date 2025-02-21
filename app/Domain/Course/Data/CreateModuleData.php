<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Exists;

class CreateModuleData extends Data
{
    public function __construct(
        #[Required]
        #[StringType]
        public string $type,

        #[Required]
        #[Exists('course_sections', 'id')]
        public string $section_id,

        #[Required]
        public array $content,

        #[Required]
        public int $order = 0,
    ) {}
}
