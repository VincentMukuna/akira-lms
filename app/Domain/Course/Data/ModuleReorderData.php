<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Required;

class ModuleReorderData extends Data
{
    public function __construct(
        #[Required]
        #[ArrayType]
        #[DataCollectionOf(ModuleOrderData::class)]
        public DataCollection $modules
    ) {}
}
