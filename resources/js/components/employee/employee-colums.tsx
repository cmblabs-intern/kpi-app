import { Employee } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import DetailDropdown from '../detail-dropdown';
import { Button } from '../ui/button';
import UserDetailDropdown from '../user-detail-dropdown';
import EmployeeAction from './employee-action';

export const employeeColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: 'index',
        header: 'No.',
        enableColumnFilter: false,
    },
    {
        accessorKey: 'employee_code',
        header: 'Kode Karyawan',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'name',
        accessorFn: (row) => row.user?.name ?? '',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='font-bold'>
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.original.user.name ?? '',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'position',
        header: 'Jabatan',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'division_name',
        accessorFn: (row) => row.division?.name ?? '',
        header: 'Divisi',
        cell: ({ row }) => {
            return row.original.division?.name ?? '';
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'user_detail',
        header: 'Informasi Karyawan',
        cell: ({ row }) => (
            <UserDetailDropdown email={row.original.user?.email} phone={row.original.user?.phone} address={row.original.user?.address as string} />
        ),
        enableColumnFilter: false,
    },
    {
        accessorKey: 'detail_timestamps',
        header: 'Informasi Waktu',
        cell: ({ row }) => <DetailDropdown created_at={row.original.created_at} updated_at={row.original.updated_at} />,
        enableColumnFilter: false,
    },
    {
        accessorKey: 'id',
        header: 'Aksi',
        cell: ({ row }) => <EmployeeAction employee={row.original} />,
        enableColumnFilter: false,
    },
];
