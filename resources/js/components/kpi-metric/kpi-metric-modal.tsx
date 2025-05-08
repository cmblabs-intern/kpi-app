import { useState } from 'react';
import Modal from '../modal';
import KpiMetricCreateForm from './kpi-metric-create-form';

const KpiMetricModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Modal open={open} onOpenChange={setOpen} title="Tambah KPI Metric" description="">
            <KpiMetricCreateForm onSuccess={() => setOpen(false)} />
        </Modal>
    );
};

export default KpiMetricModal;
