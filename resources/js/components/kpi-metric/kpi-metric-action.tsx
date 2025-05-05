import { toast } from 'sonner';
import { router } from '@inertiajs/react';
import { Button } from '../ui/button';
import { useState } from 'react';
import KpiMetricUpdateForm from './kpi-metric-update-form';
import Modal from '../modal';

import { KpiMetric } from '@/types/kpi-metric';

type Props = {
    metric: KpiMetric;
};

const KpiMetricAction = ({ metric }: Props) => {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        router.delete(route('kpi-metrics.destroy', { id: metric.id }), {
            onSuccess: () => toast.success('Berhasil menghapus KPI Metric'),
        });
    };

    return (
        <div className="flex gap-2">
           <Modal open={open} onOpenChange={setOpen} title="Edit KPI Metric" description="">
                 <KpiMetricUpdateForm {...metric} onSuccess={() => setOpen(false)} />
           </Modal>
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
    );
};

export default KpiMetricAction;
