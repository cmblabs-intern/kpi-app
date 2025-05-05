import type { Notification } from '@/types/notification';
import { router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import NotificationUpdateForm from './notification-update-form';
import AlertDelete from '../alert-delete';

type Props = {
    notification: Notification;
};

const NotificationAction = ({ notification }: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        router.delete(`/notifications/${notification.id}`, {
            onSuccess: () => toast.success('Notifikasi berhasil dihapus!'),
            onError: (err) => toast.error(err.message || 'Gagal menghapus notifikasi'),
        });
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="w-full text-center">Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="px-4 py-2 space-y-3">
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => document.body.click()}
                                className="flex w-full items-center justify-between gap-2 rounded-sm bg-sky-600 text-xs font-semibold text-white uppercase hover:bg-sky-700 md:text-sm"
                            >
                                Edit
                                <Pencil className="size-4 text-white" />
                            </Button>
                        </DialogTrigger>
                        <AlertDelete service={`Notifikasi ${notification.title}`} onClick={handleDelete}>
                            <Button
                                variant="destructive"
                                className="flex w-full items-center justify-between gap-2 rounded-sm uppercase"
                            >
                                Delete
                                <Trash2 className="size-4 text-white" />
                            </Button>
                        </AlertDelete>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Perbarui Notifikasi</DialogTitle>
                    <DialogDescription>Perbarui informasi notifikasi ini</DialogDescription>
                </DialogHeader>
                <NotificationUpdateForm notification={notification} onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default NotificationAction;
