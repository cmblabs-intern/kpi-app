import { useState } from 'react';
import Modal from '../modal';
import KpiAssessmentCreateForm from './kpi-assessment-create-form';

const KpiAssessmentModal = () => {
  const [open, setOpen] = useState(false);
    return (
        <Modal title="Tambah Penilaian KPI" description="Menambahkan data Penilaian KPI baru" open={open} onOpenChange={setOpen}>
            <KpiAssessmentCreateForm onSuccess={() => setOpen(false)}/>
        </Modal>
    );
};

export default KpiAssessmentModal;
