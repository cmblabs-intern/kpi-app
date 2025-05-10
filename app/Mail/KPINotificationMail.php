<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class KPINotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $employee;
    public $total;
    public $latest;
    public $history;

    /**
     * Create a new message instance.
     */
    public function __construct($employee, $total, $latest, $history)
    {
        $this->employee = $employee;
        $this->total = $total;
        $this->latest = $latest;
        $this->history = $history;
    }

    public function build()
    {
        return $this->subject('Laporan Penilaian KPI Anda')
            ->view('emails.kpi-notification');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'K P I Notification Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.kpi-notification',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
