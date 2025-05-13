import { ColumnDef } from '@tanstack/react-table';
import { KpiMetric } from '@/types';
import KpiMetricAction from './kpi-metric-action';

export const kpiMetricColumns: ColumnDef<KpiMetric>[] = [
  {
    accessorKey: 'index',
    header: 'No.',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'division_name',
    accessorFn: (row) => row.division?.name ?? '',
    header: 'Divisi',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'name',
    header: 'Nama KPI',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'weight',
    accessorFn: (row) => row.weight.toString() ?? '',
    header: 'Bobot (%)',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'id',
    header: 'Aksi',
    cell: ({ row }) => <KpiMetricAction kpiMetric={row.original} />,
    enableColumnFilter: false,
  },
];
