import { Division } from '@/types'
import { ColumnDef } from "@tanstack/react-table"
import DivisionAction from './division-action'

export const divisionColumns: ColumnDef<Division>[] = [
  {
    accessorKey: "index",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: "Nama Divisi",
  },
  {
    accessorKey: "position;",
    header: "Jabatan",
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
      <DivisionAction division={row.original}/>
    )
  }
]
