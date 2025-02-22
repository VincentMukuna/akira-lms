<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;

class UpdateSectionData extends Data
{
    public function __construct(
        public string $id,
        public string $title,
    ) {}
}
