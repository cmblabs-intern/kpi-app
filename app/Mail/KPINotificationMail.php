<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
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
    public $month;

    /**
     * Create a new message instance.
     */
    public function __construct($employee, $total, $latest, $history, $month = null)
    {
        $this->employee = $employee;
        $this->total = $total;
        $this->latest = $latest;
        $this->history = $history;
        $this->month = $month;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Laporan Penilaian KPI Anda',
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
     */
    public function attachments(): array
    {
        return [];
    }
}
