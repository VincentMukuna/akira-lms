<?php

namespace App\Jobs;

use App\Models\Invitation;
use App\Notifications\UserInvited;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class ProcessUserInvite implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly string $email,
        private readonly string $role,
        private readonly int $adminId,
    ) {}

    public function handle(): void
    {
        DB::transaction(function () {
            // Create invitation record
            $invitation = Invitation::create([
                'email' => $this->email,
                'role' => $this->role,
                'token' => Invitation::generateToken(),
                'created_by' => $this->adminId,
                'expires_at' => now()->addDays(14), // 14 days expiry
            ]);

            // Notify the user
            $invitation->notify(new UserInvited($invitation));
        });
    }
}
