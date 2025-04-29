import { useState } from 'react';
import Modal from '../modal';
import CreateDivisionForm from './division-create-form';

const DivisionModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            title="Tambah Divisi"
            description="Menambahkan data divisi perusahaan"
            open={open}
            onOpenChange={setOpen}
        >
            <CreateDivisionForm onSuccess={() => setOpen(false)}/>
        </Modal>
    );
};

export default DivisionModal;
