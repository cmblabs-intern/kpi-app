<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class NotificationService
{
    /**
     * Mengirim notifikasi email ke user yang sedang login.
     *
     * @param array $data
     * @return void
     */
    public function sendEmailNotification(array $data): void
    {
        $user = Auth::user();

        if ($user && $user->email) {
            $subject = $data['title'] ?? 'Notifikasi';
            $message = $data['message'] ?? '';

            Mail::raw($message, function ($mail) use ($user, $subject) {
                $mail->to($user->email)
                     ->subject($subject);
            });
        }
    }
}
