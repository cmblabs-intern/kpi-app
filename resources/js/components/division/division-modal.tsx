import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import HeadingForm from '../heading-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import CreateDivisionForm from './division-create-form';

const DivisionModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex cursor-pointer gap-x-4 rounded-md border p-2 font-bold">
                <PlusCircle />
                Tambah Data
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <HeadingForm title="Tambah Divisi" description="Menambahkan data divisi perusahaan" />
                    </DialogTitle>
                </DialogHeader>
                <CreateDivisionForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default DivisionModal;
