<?php

namespace App\Notifications;

use App\Models\Tenant;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WorkspaceCreated extends Notification
{
    use Queueable;

    public function __construct(
        public Tenant $tenant,
        public string $domain,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $setupUrl = "https://{$this->domain}/setup";

        return (new MailMessage)
            ->subject("Welcome to {$this->tenant->name}'s Learning Platform")
            ->greeting("Hello!")
            ->line("Your learning platform at {$this->tenant->name} has been created successfully.")
            ->line("To get started, you'll need to set up your administrator account.")
            ->action('Complete Setup', $setupUrl)
            ->line("This setup link is only valid for the next 24 hours.")
            ->line("If you didn't request this, please ignore this email.");
    }
}
