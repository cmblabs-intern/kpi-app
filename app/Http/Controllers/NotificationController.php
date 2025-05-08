<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    private $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Menampilkan semua notifikasi untuk user yang sedang login.
     */
    public function index()
    {
        // Gunakan NotificationService untuk mendapatkan notifikasi berdasarkan user yang sedang login
        $notifications = $this->notificationService->getAllNotificationsByUser(Auth::id());

        return Inertia::render('notifications', [
            'notifications' => NotificationResource::collection($notifications),
        ]);
    }

    /**
     * Menampilkan detail notifikasi tertentu.
     */
    public function show($id)
    {
        // Dapatkan notifikasi berdasarkan ID dan user yang sedang login
        $notification = $this->notificationService->getNotificationById($id, Auth::id());

        return Inertia::render('notifications', [
            'notification' => new NotificationResource($notification),
        ]);
    }

    /**
     * Menandai notifikasi sebagai sudah dibaca.
     */
    public function markAsRead($id)
    {
        // Panggil service untuk menandai notifikasi sebagai dibaca
        $this->notificationService->updateNotificationStatus($id, Auth::id(), ['is_read' => true]);

        return redirect()->back()->with('success', 'Notifikasi telah ditandai sebagai dibaca.');
    }

    /**
     * Menghapus notifikasi.
     */
    public function destroy($id)
    {
        // Panggil service untuk menghapus notifikasi
        $this->notificationService->deleteNotification($id, Auth::id());

        return redirect()->back()->with('success', 'Notifikasi telah dihapus.');
    }

    /**
     * Membuat notifikasi baru.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:in-app,email',
        ]);

        // Masukkan user yang sedang login ke dalam data notifikasi
        $validated['user_id'] = Auth::id();

        // Gunakan service untuk membuat notifikasi baru
        $notification = $this->notificationService->createNotification($validated);

        // return redirect()->route('notifications.index')->with('success', 'Notifikasi berhasil dibuat.');
        return Inertia::render('notifications', [
            'notification' => new NotificationResource($notification),
            'notifications' => NotificationResource::collection($this->notificationService->list(['*'])),
        ], 200);
    }
}

