<?php

namespace App\Domain\Users\Filters;

use App\Domain\Shared\Filters\AbstractFilter;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class DateRangeFilter extends AbstractFilter
{
    public function handle(Builder $query, Closure $next): Builder
    {
        if ($this->qualifies()) {
            $startDate = $this->request->get('startDate');
            $endDate = $this->request->get('endDate');

            $query->when($startDate, function (Builder $query) use ($startDate) {
                $query->whereDate('created_at', '>=', $startDate);
            })->when($endDate, function (Builder $query) use ($endDate) {
                $query->whereDate('created_at', '<=', $endDate);
            });
        }

        return $next($query);
    }

    public function qualifies(): bool
    {
        return $this->parameterExists('startDate') || $this->parameterExists('endDate');
    }
}
