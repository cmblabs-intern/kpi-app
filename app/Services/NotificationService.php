<?php

namespace App\Services;

use App\Repositories\NotificationRepository;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NotificationService
{
    protected $notificationRepository;

    /**
     * Konstruktor untuk NotificationService.
     *
     * @param NotificationRepository $notificationRepository
     */
    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    /**
     * Membuat notifikasi baru.
     *
     * @param array $data
     * @return Notification
     */
    public function createNotification(array $data): Notification
    {
        return $this->notificationRepository->create($data);
    }

    /**
     * Mendapatkan semua notifikasi untuk user tertentu.
     *
     * @param int $userId
     * @return Collection
     */
    public function getAllNotificationsByUser(int $userId): Collection
    {
        return $this->notificationRepository->getAllByUser($userId);
    }

    /**
     * Mendapatkan semua data notifikasi.
     *
     * @param int $userId
     * @return Collection
     */
    public function list(array $fields, ?int $perPage = null) {
        return $this->notificationRepository->list($fields, $perPage);
      }

    /**
     * Mendapatkan notifikasi berdasarkan ID untuk user tertentu.
     *
     * @param int $id
     * @param int $userId
     * @return Notification
     * @throws ModelNotFoundException
     */
    public function getNotificationById(int $id, int $userId): Notification
    {
        return $this->notificationRepository->getById($id, $userId);
    }

    /**
     * Memperbarui status notifikasi (misalnya menandai sebagai dibaca).
     *
     * @param int $id
     * @param int $userId
     * @param array $data
     * @return bool
     */
    public function updateNotificationStatus(int $id, int $userId, array $data): bool
    {
        return $this->notificationRepository->updateStatus($id, $userId, $data);
    }

    /**
     * Menghapus notifikasi berdasarkan ID untuk user tertentu.
     *
     * @param int $id
     * @param int $userId
     * @return bool
     */
    public function deleteNotification(int $id, int $userId): bool
    {
        return $this->notificationRepository->delete($id, $userId);
    }
}
