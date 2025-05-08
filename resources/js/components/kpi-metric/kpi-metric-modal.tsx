import Modal from '../modal';
import { useState } from 'react';
import KpiMetricCreateForm from './kpi-metric-create-form';
import { Button } from '../ui/button';

const KpiMetricModal = () => {
    const [open, setOpen] = useState(false);

    return (
      <><Modal open={open} onOpenChange={setOpen} title="Tambah KPI Metric" description="">
        <KpiMetricCreateForm onSuccess={() => setOpen(false)} />
      </Modal><Button onClick={() => setOpen(true)}>Tambah KPI Metric</Button></>
  
    );
};

export default KpiMetricModal;

