import { useState } from 'react';
import CreateEmployeeForm from './employee-create-form';
import Modal from '../modal';

const EmployeeModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            title="Tambah Karyawan"
            description="Menambahkan data karyawan baru"
            open={open}
            onOpenChange={setOpen}
        >
            <CreateEmployeeForm onSuccess={() => setOpen(false)} />
        </Modal>
    );
};

export default EmployeeModal;
