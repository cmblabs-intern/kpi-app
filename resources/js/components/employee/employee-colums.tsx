import { Employee } from '@/types'
import { ColumnDef } from "@tanstack/react-table"
import EmployeeAction from './employee-action'
import DetailDropdown from '../detail-dropdown'
import UserDetailDropdown from '../user-detail-dropdown'

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "index",
    header: "No.",
  },
  {
    accessorKey: "employee_code",
    header: "Kode Karyawan",
  },
  {
    accessorKey: "name",
    header: "Nama",
    accessorFn: (row) => row.user?.name ?? '',
    cell: ({ row }) => row.original.user.name ?? '-',
  },
  {
    accessorKey: "position",
    header: "Jabatan",
  },
  {
    accessorKey: "division_name",
    header: "Divisi",
    cell: ({row}) => row.original.division?.name ?? '-'
  },
  {
    accessorKey: "user_detail",
    header: "Informasi Karyawan",
    cell: ({ row }) => (
      <UserDetailDropdown email={row.original.user?.email} phone={row.original.user?.phone} address={row.original.user?.address as string}/>
    ),
  },
  {
    accessorKey: "detail_timestamps",
    header: "Informasi Waktu",
    cell: ({ row }) => (
      <DetailDropdown created_at={ row.original.created_at } updated_at={ row.original.updated_at } />
    )
  },
  {
    accessorKey: 'id',
    header: "Aksi",
    cell: ({ row }) => (
      <EmployeeAction employee={row.original}/>
    )
  }
]
