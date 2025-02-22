<?php

declare(strict_types=1);

namespace App\Domain\Course\Data;

use Spatie\LaravelData\Attributes\Validation\Json;
use Spatie\LaravelData\Data;

class ModuleUpdateData extends Data
{
    public function __construct(
        public ?string $title,
        #[Json]
        public ?array $data,
    ) {}
}
