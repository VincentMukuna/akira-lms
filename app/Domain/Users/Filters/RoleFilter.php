<?php

namespace App\Domain\Users\Filters;

use App\Domain\Shared\Filters\AbstractFilter;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class RoleFilter extends AbstractFilter
{
    public function handle(Builder $query, Closure $next): Builder
    {
        if ($this->qualifies()) {
            $role = $this->request->get('role');

            $query->whereHas('roles', function (Builder $query) use ($role) {
                $query->where('name', $role);
            });
        }

        return $next($query);
    }

    public function qualifies(): bool
    {
        return $this->parameterExists('role');
    }
}
