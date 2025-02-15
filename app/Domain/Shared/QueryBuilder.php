<?php

namespace App\Domain\Shared;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pipeline\Pipeline;

class QueryBuilder
{
    protected Builder $query;
    protected array $filters = [];

    public function __construct(Builder $query)
    {
        $this->query = $query;
    }

    public static function for(string $model): self
    {
        return new static($model::query());
    }

    public function withFilters(array $filters): self
    {
        $this->filters = array_merge($this->filters, $filters);
        return $this;
    }

    public function when($condition, string $filter): self
    {
        if ($condition) {
            $this->filters[] = $filter;
        }
        return $this;
    }

    public function get(): Builder
    {
        return app(Pipeline::class)
            ->send($this->query)
            ->through($this->resolveFilters())
            ->thenReturn();
    }

    protected function resolveFilters(): array
    {
        return collect($this->filters)
            ->map(fn($filter) => app($filter))
            ->filter(fn($filter) => $filter->qualifies())
            ->toArray();
    }
}
