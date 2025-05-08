import { Division } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DivisionAction from './division-action';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

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
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='font-bold'>
                    Tanggal dibuat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableColumnFilter: false,
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='font-bold'>
                    Tanggal diperbarui
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableColumnFilter: false,
    },
    {
        accessorKey: 'id',
        header: 'Aksi',
        cell: ({ row }) => <DivisionAction division={row.original} />,
        enableColumnFilter: false,
    },
];
