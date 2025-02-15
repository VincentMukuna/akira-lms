<?php

namespace App\Domains\Users\Filters;

use Illuminate\Http\Request;
use Closure;

abstract class AbstractFilter
{
    protected Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    abstract public function handle($query, Closure $next);

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
