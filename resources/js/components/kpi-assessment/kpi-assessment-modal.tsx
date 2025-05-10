import { useState } from 'react';
import Modal from '../modal';

const KpiAssessmentModal = () => {
  const [open, setOpen] = useState(false);
    return (
        <Modal title="Tambah Evaluasi KPI" description="Menambahkan data Evaluasi KPI baru" open={open} onOpenChange={setOpen}>
            <div>Create modal</div>
        </Modal>
    );
};

export default KpiAssessmentModal;
