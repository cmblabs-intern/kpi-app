import { KpiMetric } from '@/types';
import { ReactNode, useState } from 'react';
import Modal from '../modal';
import KpiMetricCreateForm from './kpi-metric-create-form';

interface Props {
    kpiMetric?: KpiMetric;
    children?: ReactNode;
}

export default function KpiMetricModal() {
    const [open, setOpen] = useState(false);

    return (
        // <Dialog open={open} onOpenChange={setOpen}>
        //   <DialogTrigger asChild>{children}</DialogTrigger>
        //   <DialogContent className="max-w-2xl">
        //     {kpiMetric ? (
        //       <KpiMetricUpdateForm metric={kpiMetric} onSuccess={() => setOpen(false)} />
        //     ) : (
        //       <KpiMetricCreateForm onSuccess={() => setOpen(false)} />
        //     )}
        //   </DialogContent>
        // </Dialog>

        <Modal title="Tambah KPI Metrix" description="Menambahkan data KPI Metrix" open={open} onOpenChange={setOpen}>
            <KpiMetricCreateForm onSuccess={() => setOpen(false)} />
        </Modal>
    );
}
