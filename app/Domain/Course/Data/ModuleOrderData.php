<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;

class ModuleOrderData extends Data
{
    public function __construct(
        public string $id,
        public int $order,
    ) {}
}
