import { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const NotificationCreateForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post('/notifications', { title, body, type: 'email' }, {
            onSuccess: () => {
                toast.success('Notifikasi berhasil dikirim ke email!');
                onSuccess();
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal mengirim notifikasi');
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
                <Label>Isi</Label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} required />
            </div>
            {/* Tipe tidak ditampilkan karena hanya "email" yang dibolehkan */}
            <Button type="submit">Kirim ke Email</Button>
        </form>
    );
};

export default NotificationCreateForm;
