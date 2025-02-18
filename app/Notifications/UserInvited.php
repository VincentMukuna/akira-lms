<?php

namespace App\Notifications;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Uri;

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
        $company = tenant()->name;
        $domain = tenant()->domains->first()->domain;

        Log::info("Domain: {$domain}");
        Log::info("Company: {$company}");

        $appUri = Uri::of(Config::get('app.url'));

        $acceptUri = Uri::route('invitation.accept', ['token' => $this->invitation->token])->withHost($domain)->withScheme($appUri->scheme());

        Log::info("Accept URI: {$acceptUri}");


        return (new MailMessage)
            ->subject("Invitation to join {$company}")
            ->greeting("You've been invited to join {$company}!")
            ->line("You've been invited to join {$company} as a {$this->invitation->role}.")
            ->line('Click the button below to set up your account.')
            ->action('Accept Invitation', $acceptUri)
            ->line('This invitation link will expire in 14 days.')
            ->line('If you did not expect this invitation, you can safely ignore this email.');
    }
}
