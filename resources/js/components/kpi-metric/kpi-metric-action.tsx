import { router } from '@inertiajs/react';
import { KpiMetric } from '@/types';
import AlertDelete from '@/components/alert-delete';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KpiMetricModal from './kpi-metric-modal';

interface Props {
  kpiMetric: KpiMetric;
}

export default function KpiMetricAction({ kpiMetric }: Props) {
  const handleDelete = () => {
    router.delete(`/kpi-metrics/${kpiMetric.id}`);
  };

  return (
    <div className="flex gap-2">
      <KpiMetricModal kpiMetric={kpiMetric}>
        <Button size="icon" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
      </KpiMetricModal>
      <AlertDelete
        service="KPI Metric"
        onClick={handleDelete}
      >
        <Button size="icon" variant="destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDelete>
    </div>
  );
}
