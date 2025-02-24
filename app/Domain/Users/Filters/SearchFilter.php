<?php

namespace App\Domain\Users\Filters;

use App\Domain\Shared\Filters\AbstractFilter;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class SearchFilter extends AbstractFilter
{
    public function handle(Builder $query, Closure $next): Builder
    {
        if ($this->qualifies()) {
            $searchTerm = $this->request->get('search');

            $query->where(function (Builder $query) use ($searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('email', 'like', "%{$searchTerm}%");
            });
        }

        return $next($query);
    }

    public function qualifies(): bool
    {
        return $this->parameterExists('search');
    }
}
