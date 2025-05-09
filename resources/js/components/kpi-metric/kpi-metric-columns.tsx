import { ColumnDef } from '@tanstack/react-table';
import { KpiMetric } from '@/types';
import KpiMetricAction from './kpi-metric-action';

export const kpiMetricColumns: ColumnDef<KpiMetric>[] = [
  {
    accessorKey: 'index',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'division.name',
    header: 'Divisi',
  },
  {
    accessorKey: 'name',
    header: 'Nama KPI',
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    accessorKey: 'weight',
    header: 'Bobot (%)',
  },
  {
    id: 'actions',
    cell: ({ row }) => <KpiMetricAction kpiMetric={row.original} />,
  },
];
