import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import HeadingForm from '../heading-form';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog';
import CreateEmployeeForm from './employee-create-form';

const EmployeeModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex cursor-pointer gap-x-4 rounded-md border p-2 font-bold">
                <PlusCircle />
                Tambah Data
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <HeadingForm title="Tambah Karyawan" description="Menambahkan data karyawan baru" />
                </DialogHeader>
                <CreateEmployeeForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeModal;
