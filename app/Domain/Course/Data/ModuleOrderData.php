<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Min;

class ModuleOrderData extends Data
{
    public function __construct(
        #[Required]
        #[Exists('course_modules', 'id')]
        public string $id,

        #[Required]
        public int $order,

        #[Required]
        #[Exists('course_sections', 'id')]
        public string $section_id,
    ) {}
}
