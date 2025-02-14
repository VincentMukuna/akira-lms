<?php

namespace App\Jobs;

use App\Models\User;
use App\Notifications\BulkInviteCompleted;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NotifyBulkInviteComplete implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly int $adminId,
        private readonly int $totalInvites,
    ) {}

    public function handle(): void
    {
        $admin = User::find($this->adminId);

        if ($admin) {
            $admin->notify(new BulkInviteCompleted($this->totalInvites));
        }
    }
}
