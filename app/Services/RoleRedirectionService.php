<?php

namespace App\Services;

class RoleRedirectionService
{
    protected array $defaultRedirections = [
        'admin' => 'admin.dashboard',
        'instructor' => 'instructor.dashboard',
        'learner' => 'learner.dashboard',
    ];

    protected array $temporaryRedirections = [];

    public function withRedirections(array $redirections): self
    {
        $clone = clone $this;
        $clone->temporaryRedirections = $redirections;
        return $clone;
    }

    public function getRedirectRoute($user): string
    {
        $roles = $user->getRoleNames();
        $redirections = array_merge($this->defaultRedirections, $this->temporaryRedirections);

        foreach ($redirections as $role => $route) {
            if ($roles->contains($role)) {
                return route($route);
            }
        }

        return route($redirections['learner']);
    }
}
