<?php

declare(strict_types=1);

namespace App\Domain\Course\Models;

use App\Domain\Course\Enums\ModuleType;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseModule extends Model
{
    use HasUuid;

    protected $fillable = [
        'section_id',
        'title',
        'type',
        'data',
        'order',
    ];

    protected $casts = [
        'data' => 'json',
        'type' => ModuleType::class,
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'section_id');
    }
}
