<?php

namespace App\Domain\Invites\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class InviteUsersData extends Data
{
    public function __construct(
        /** @var array<array{email: string, role: string}> */
        #[Required]
        public array $invites,
    ) {}

    public static function rules(ValidationContext $context): array
    {
        return [
            'invites' => ['required', 'array'],
            'invites.*.email' => ['required', 'email', 'max:255'],
            'invites.*.role' => ['required', 'string', 'in:admin,instructor,learner'],
        ];
    }
}
