<?php

declare(strict_types=1);

namespace App\Domain\Course\Models;

use App\Domain\Course\QueryBuilders\CourseQueryBuilder;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Course extends Model
{
    use HasUuid;

    protected $fillable = [
        'title',
        'description',
        'learning_objectives',
        'level',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function sections(): HasMany
    {
        return $this->hasMany(CourseSection::class)->orderBy('order');
    }

    public function modules(): HasManyThrough
    {
        return $this->hasManyThrough(
            CourseModule::class,
            CourseSection::class,
            'course_id',
            'section_id',
            'id',
            'id'
        )->orderBy('order');
    }

    public function newEloquentBuilder($query): CourseQueryBuilder
    {
        return new CourseQueryBuilder($query);
    }
}
