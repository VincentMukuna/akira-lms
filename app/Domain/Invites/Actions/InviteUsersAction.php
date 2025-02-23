<?php

namespace App\Domain\Invites\Actions;

use App\Domain\Invites\Data\InviteUsersData;
use App\Jobs\NotifyBulkInviteComplete;
use App\Jobs\ProcessUserInvite;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Bus;
use Throwable;

class InviteUsersAction
{
    public function execute(InviteUsersData $data): void
    {
        $adminId = Auth::id();

        $jobs = collect($data->invites)->map(
            fn ($invite) => new ProcessUserInvite($invite['email'], $invite['role'], $adminId)
        )->toArray();

        $batch = Bus::batch($jobs)
            ->then(function (Batch $batch) use ($data, $adminId) {
                // All jobs completed successfully
                NotifyBulkInviteComplete::dispatch(
                    $adminId,
                    count($data->invites)
                );
            })
            ->catch(function (Batch $batch, Throwable $e) {
                // First batch job failure
                report($e);
            })
            ->dispatch();
    }
}
