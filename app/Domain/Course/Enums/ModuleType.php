<?php

declare(strict_types=1);

namespace App\Domain\Course\Enums;

enum ModuleType: string
{
    case TEXT = 'text';
    case VIDEO = 'video';
    case QUIZ = 'quiz';

    public function label(): string
    {
        return match ($this) {
            self::TEXT => 'Text',
            self::VIDEO => 'Video',
            self::QUIZ => 'Quiz',
        };
    }
}
