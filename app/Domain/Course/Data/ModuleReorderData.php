<?php

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class ModuleReorderData extends Data
{
    public function __construct(
        #[Required]
        #[ArrayType]
        #[DataCollectionOf(ModuleOrderData::class)]
        public DataCollection $modules
    ) {}
}
