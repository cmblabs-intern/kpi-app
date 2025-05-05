import { ColumnDef } from '@tanstack/react-table';
import KpiMetricAction from './kpi-metric-action';

type KpiMetric = {
    id: number;
    code: string;
    name: string;
    year: number;
    unit: string; 
};

export const kpiMetricColumns: ColumnDef<KpiMetric>[] = [
    {
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'code',
        header: 'Kode KPI',
    },
    {
        accessorKey: 'name',
        header: 'Nama KPI',
    },
    {
        accessorKey: 'unit',
        header: 'Satuan',
    },
    {
        accessorKey: 'year',
        header: 'Tahun',
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => <KpiMetricAction metric={row.original} />,
    },
];
