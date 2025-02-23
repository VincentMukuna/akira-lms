<?php

declare(strict_types=1);

namespace App\Domain\Course\Data;

use App\Domain\Course\Enums\ModuleType;
use Spatie\LaravelData\Attributes\Validation\Json;
use Spatie\LaravelData\Data;

class CourseModuleData extends Data
{
    public function __construct(
        public string $title,
        public ModuleType $type,
        #[Json]
        public array $data,
        public int $order,
        public ?string $section_id = null,
    ) {}
}
