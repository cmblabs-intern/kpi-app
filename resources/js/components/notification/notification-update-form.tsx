import { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { Notification } from '@/types/notification';

const NotificationUpdateForm = ({
    notification,
    onSuccess,
}: {
    notification: Notification;
    onSuccess: () => void;
}) => {
    const [title, setTitle] = useState(notification.title);
    const [message, setMessage] = useState(notification.message); // ⬅️ ganti dari body ke message

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.put(`/notifications/${notification.id}`, {
            title,
            message,
            type: 'email', // karena sesuai instruksi, hanya kirim via email
        }, {
            onSuccess: () => {
                toast.success('Notifikasi berhasil diperbarui!');
                onSuccess();
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal memperbarui notifikasi');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Judul</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <Label>Pesan</Label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <Button type="submit">Simpan Perubahan</Button>
        </form>
    );
};

export default NotificationUpdateForm;
