import { Division } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DivisionAction from './division-action';

export const divisionColumns: ColumnDef<Division>[] = [
    {
        accessorKey: 'index',
        header: 'No.',
        enableColumnFilter: false,
    },
    {
        accessorKey: 'name',
        header: 'Nama Divisi',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'created_at',
        header: 'Tanggal dibuat',
        enableColumnFilter: false,
    },
    {
        accessorKey: 'updated_at',
        header: 'Tanggal diperbarui',
        enableColumnFilter: false,
    },
    {
        accessorKey: 'id',
        header: 'Aksi',
        cell: ({ row }) => <DivisionAction division={row.original} />,
        enableColumnFilter: false,
    },
];
