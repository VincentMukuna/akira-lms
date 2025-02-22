<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Json;

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
        #[StringType]
        public string $title,

        #[Required]
        #[Json]
        public array $data,

        #[Required]
        public int $order = 0,
    ) {}
}
