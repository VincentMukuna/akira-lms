<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BulkInviteCompleted extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly int $totalInvites
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Bulk User Invites Completed')
            ->line("All {$this->totalInvites} user invites have been processed successfully.")
            ->line('The invited users will receive their invitation emails shortly.')
            ->action('View Users', route('admin.users.index'));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'message' => "Successfully invited {$this->totalInvites} users",
            'type' => 'success',
            'action_url' => route('admin.users.index'),
        ];
    }
}
