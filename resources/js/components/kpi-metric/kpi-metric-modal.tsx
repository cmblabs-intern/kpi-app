import { ReactNode, useState } from 'react';
import { KpiMetric, Division } from '@/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import KpiMetricCreateForm from './kpi-metric-create-form';
import KpiMetricUpdateForm from './kpi-metric-update-form';

interface Props {
  kpiMetric?: KpiMetric;
  children?: ReactNode;
}

export default function KpiMetricModal({ kpiMetric, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        {kpiMetric ? (
          <KpiMetricUpdateForm metric={kpiMetric} onSuccess={() => setOpen(false)} />
        ) : (
          <KpiMetricCreateForm onSuccess={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
