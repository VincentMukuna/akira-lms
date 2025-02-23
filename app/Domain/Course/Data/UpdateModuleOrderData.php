<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;

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
