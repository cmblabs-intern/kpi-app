import { useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import NotificationCreateForm from './notification-create-form';

const NotificationModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-sky-600 text-white hover:bg-sky-700">
                    Tambah Notifikasi
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buat Notifikasi</DialogTitle>
                    <DialogDescription>Isi data untuk membuat notifikasi baru</DialogDescription>
                </DialogHeader>
                <NotificationCreateForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default NotificationModal;
