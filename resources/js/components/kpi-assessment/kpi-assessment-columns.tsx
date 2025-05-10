import { KpiAssessment } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DetailDropdown from '../detail-dropdown';
import KpiAssessmentAction from './kpi-assessment-action';

export const kpiAssessmentColumns: ColumnDef<KpiAssessment>[] = [
    {
        accessorKey: 'index',
        header: 'No.',
        enableColumnFilter: false,
    },
    {
        accessorKey: 'employee_name',
        accessorFn: (row) => row.employee?.user.name ?? '',
        header: 'Nama Karyawan',
        cell: ({ row }) => {
            return row.original.employee?.user.name ?? '';
        },
        enableColumnFilter: true,
    },
    {
      accessorKey: 'moth',
      header: 'Bulan',
      enableColumnFilter: true,
    },
    {
        accessorKey: 'total_score',
        header: 'Nilai Total',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'detail',
        header: 'detail',
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
        cell: ({ row }) => <KpiAssessmentAction kpiAssessment={row.original} />,
        enableColumnFilter: false,
    },
];
