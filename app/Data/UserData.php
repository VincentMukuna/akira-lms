<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;
use Illuminate\Support\Carbon;
use App\Models\User;

class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        /** @var string[] */
        public array $roles,
        #[WithTransformer(DateTimeInterfaceTransformer::class)]
        public ?Carbon $created_at,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            roles: $user->roles->pluck('name')->toArray(),
            created_at: $user->created_at,
        );
    }
}
