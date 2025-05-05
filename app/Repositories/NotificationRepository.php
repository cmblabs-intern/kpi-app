<?php

namespace App\Repositories;

use App\Models\Notification;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NotificationRepository
{
    /**
     * Menyimpan notifikasi baru ke database.
     *
     * @param array $data
     * @return Notification
     */
    public function create(array $data): Notification
    {
        return Notification::create($data);
    }

    /**
     * Mendapatkan semua notifikasi untuk user tertentu.
     *
     * @param int $userId
     * @return Collection
     */
    public function getAllByUser(int $userId): Collection
    {
        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Mendapatkan notifikasi berdasarkan ID untuk user tertentu.
     *
     * @param int $id
     * @param int $userId
     * @return Notification
     * @throws ModelNotFoundException
     */
    public function getById(int $id, int $userId): Notification
    {
        $notification = Notification::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$notification) {
            throw new ModelNotFoundException("Notifikasi tidak ditemukan.");
        }

        return $notification;
    }

    /**
     * Memperbarui status notifikasi (misalnya menandai sebagai dibaca).
     *
     * @param int $id
     * @param int $userId
     * @param array $data
     * @return bool
     */
    public function updateStatus(int $id, int $userId, array $data): bool
    {
        $notification = $this->getById($id, $userId);

        return $notification->update($data);
    }

    /**
     * Menghapus notifikasi berdasarkan ID untuk user tertentu.
     *
     * @param int $id
     * @param int $userId
     * @return bool
     */
    public function delete(int $id, int $userId): bool
    {
        $notification = $this->getById($id, $userId);

        return $notification->delete();
    }
}
