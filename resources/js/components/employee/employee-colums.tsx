import { Employee } from '@/types'
import { ColumnDef } from "@tanstack/react-table"
import EmployeeAction from './employee-action'

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
    accessorKey: "position",
    header: "Jabatan",
    cell: ({ row }) => row.original.division?.name ?? '-',
  },
  {
    accessorKey: "division_id",
    header: "ID Divisi",
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => row.original.user?.name ?? '-',
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.user?.email ?? '-',
  },
  {
    accessorKey: "phone",
    header: "Nomor HP",
    cell: ({ row }) => row.original.user?.phone ?? '-',
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => row.original.user?.address ?? '-',
  },
  {
    accessorKey: "created_at",
    header: "Tanggal dibuat",
  },
  {
    accessorKey: "updated_at",
    header: "Tanggal diperbarui",
  },
  {
    accessorKey: 'id',
    header: "Aksi",
    cell: ({ row }) => (
      <EmployeeAction employee={row.original}/>
    )
  }
]
