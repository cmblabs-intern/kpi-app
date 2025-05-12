import { KpiAssessmentDetail } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DetailDropdown from '../detail-dropdown';

export const KpiAssessmentDetailColumn: ColumnDef<KpiAssessmentDetail>[] = [
    {
        accessorKey: 'index',
        header: 'No.',
        enableColumnFilter: false,
    },
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
        accessorKey: 'weight',
        header: 'Bobot Metrix',
        cell: ({ row }) => row.original.metric.weight ?? '',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'score',
        header: 'Nilai',
        cell: ({ row }) => row.original.score ?? '',
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
