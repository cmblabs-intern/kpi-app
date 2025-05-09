<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\NotificationRequest;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    private $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Mengirim notifikasi via email ke user yang sedang login.
     */
    public function store(NotificationRequest $request)
    {
        $data = $request->validated();

        // Tambahkan user yang sedang login ke data
        $data['user_id'] = Auth::id();

        // Kirim notifikasi via email tanpa menyimpan ke database
        $this->notificationService->sendEmailNotification($data);

        return response()->json(['message' => 'Notifikasi email berhasil dikirim.'], 200);
    }
}
