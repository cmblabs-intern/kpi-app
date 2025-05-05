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
    const [type, setType] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post('/notifications', { title, body, type }, {
            onSuccess: () => {
                toast.success('Notifikasi berhasil dibuat!');
                onSuccess();
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal membuat notifikasi');
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
            <div>
            <Label>Tipe</Label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 text-sm"
            >
                <option value="">-- Pilih Tipe --</option>
                <option value="in-app">Dalam Aplikasi</option>
                <option value="email">Email</option>
            </select>
            </div>
            <Button type="submit">Simpan</Button>
        </form>
    );
};

export default NotificationCreateForm;
