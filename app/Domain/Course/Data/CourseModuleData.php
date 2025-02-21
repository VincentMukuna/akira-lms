<?php

declare(strict_types=1);

namespace App\Domain\Course\Data;

use App\Domain\Course\Enums\ModuleType;
use Spatie\LaravelData\Data;

class CourseModuleData extends Data
{
    public function __construct(
        public string $title,
        public ModuleType $type,
        public array $content,
        public int $order,
        public ?string $section_id = null,
    ) {}
}
