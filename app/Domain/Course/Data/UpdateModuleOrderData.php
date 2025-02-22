<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\ArrayOf;

class UpdateModuleOrderData extends Data
{
    public function __construct(
        #[Required]
        public string $course_id,

        // array of ModuleOrderData
        #[Required]
        public array $module_orders,
    ) {}
}
