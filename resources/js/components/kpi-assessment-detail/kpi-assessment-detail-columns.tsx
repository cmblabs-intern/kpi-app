import { KpiAssessmentDetail } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DetailDropdown from '../detail-dropdown';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const KpiAssessmentDetailColumn: ColumnDef<KpiAssessmentDetail>[] = [
    {
        accessorFn: (row) => row.metric.name ?? '',
        header: 'Nama Metrix',
        cell: ({ row }) => row.original.metric.name ?? '',
        enableColumnFilter: true,
    },
    {
        accessorFn: (row) => row.assessment.employee.division.name ?? '',
        header: 'Divisi',
        cell: ({ row }) => {
            return row.original.assessment.employee.division?.name ?? '';
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'bobot metrix',
        accessorFn: (row) => row.metric?.weight.toString() ?? '',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='font-bold'>
                    Bobot Metrix (%)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'nilai',
        accessorFn: (row) => row.score.toString() ?? '',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='font-bold'>
                    Nilai KPI
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'note',
        header: 'Catatan',
        cell: ({ row }) => row.original.note ?? '',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'detail_timestamps',
        header: 'Informasi Waktu',
        cell: ({ row }) => <DetailDropdown created_at={row.original.created_at ?? ''} updated_at={row.original.updated_at ?? ''}/>,
        enableColumnFilter: false,
    },
];
