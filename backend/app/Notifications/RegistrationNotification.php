<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegistrationNotification extends Notification
{
    use Queueable;
    protected $name, $email, $password;

    /**
     * Create a new notification instance.
     */
    public function __construct($name, $email, $password)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Welcome to QTech Ticketing System')
            ->greeting('Hello ' . $this->name . ',')
            ->line('Welcome to QTech Business Solution Inc. Ticketing System!')
            ->line('Your account has been successfully created.')
            ->line('Here are your login credentials:')
            ->line('Email: ' . $this->email)
            ->line('Password: ' . $this->password)
            ->line('You can access the system at: ' . config('app.frontend_url'))
            ->line('For security reasons, we recommend changing your password after your first login.')
            ->line('If you did not create this account, please contact our support team immediately.')
            ->salutation('Thank you,')
            ->salutation('QTech Business Solution Inc.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
} 