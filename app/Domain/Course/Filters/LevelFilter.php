<?php

namespace App\Domain\Course\Filters;

use App\Domain\Shared\Filters\AbstractFilter;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class LevelFilter extends AbstractFilter
{
    public function handle(Builder $query, Closure $next): Builder
    {
        if ($this->qualifies()) {
            $level = $this->request->get('level');
            $query->where('level', $level);
        }

        return $next($query);
    }

    public function qualifies(): bool
    {
        return $this->parameterExists('level');
    }
} 