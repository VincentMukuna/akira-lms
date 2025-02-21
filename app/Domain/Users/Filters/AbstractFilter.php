<?php

namespace App\Domain\Users\Filters;

use Illuminate\Http\Request;
use Closure;
use Illuminate\Database\Eloquent\Builder;

abstract class AbstractFilter
{
    protected Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    abstract public function handle(Builder $query, Closure $next): Builder;

    public function qualifies(): bool
    {
        return true;
    }

    protected function parameterExists(string $param): bool
    {
        return $this->request->has($param) &&
            !empty($this->request->get($param));
    }
}
