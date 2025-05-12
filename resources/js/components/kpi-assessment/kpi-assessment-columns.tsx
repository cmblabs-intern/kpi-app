import { KpiAssessmentDetail } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DetailDropdown from '../detail-dropdown';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';
import { monthYearFunc } from '@/pages/kpi-assessments/details';

export const kpiAssessmentColumns: ColumnDef<KpiAssessmentDetail>[] = [
    {
        accessorKey: 'index',
        header: 'No.',
        enableColumnFilter: false,
    },
    {
        accessorFn: (row) => row.assessment?.employee?.user?.name ?? '',
        header: 'Nama Karyawan',

        enableColumnFilter: true,
    },
    {
        accessorFn: (row) => row.assessment?.employee?.division?.name ?? '',
        header: 'Divisi',
        cell: ({ row }) => {
            return row.original.assessment?.employee?.division?.name ?? '';
        },
        enableColumnFilter: true,
    },
    {
        accessorFn: (row) => row.assessment?.employee?.position ?? '',
        header: 'Jabatan',

        enableColumnFilter: true,
    },
    {
        accessorFn: (row) => row.assessment.total_score ?? '',
        header: 'Nilai Total',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'detail',
        header: 'Detail KPI Karyawan',
        cell: ({ row }) => (
            <Link href={`employee-detail?employee=${ row.original.assessment.employee_id }&month=${monthYearFunc(row.original.assessment.month)}`}>
                <Button className='bg-sky-600 text-white hover:bg-sky-500/50'>Lihat detail</Button>
            </Link>
        ),
        enableColumnFilter: false,
    },
    {
        accessorKey: 'detail_timestamps',
        header: 'Informasi Waktu',
        cell: ({ row }) => <DetailDropdown created_at={row.original.created_at ?? ''} updated_at={row.original.updated_at ?? ''} />,
        enableColumnFilter: false,
    },
];
