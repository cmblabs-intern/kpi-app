import { ColumnDef } from '@tanstack/react-table';
import type { Notification } from '@/types/notification';
import NotificationAction from './notification-action';

export const notificationColumns: ColumnDef<Notification>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'title',
        header: 'Judul',
    },
    {
        accessorKey: 'type',
        header: 'Tipe',
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => <NotificationAction notification={row.original} />,
    },
];
