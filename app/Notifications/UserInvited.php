<?php

namespace App\Notifications;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserInvited extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly Invitation $invitation
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Welcome to ' . config('app.name'))
            ->line('You have been invited to join ' . config('app.name'))
            ->line('Click the button below to set up your account.')
            ->action('Accept Invitation', route('invitation.accept', ['token' => $this->invitation->token]))
            ->line('This invitation link will expire in 14 days.')
            ->line('If you did not expect this invitation, you can safely ignore this email.');
    }
}
