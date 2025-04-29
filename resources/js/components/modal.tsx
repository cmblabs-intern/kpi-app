import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
import HeadingForm from './heading-form';
import React from 'react';

interface ModalProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange?(open: boolean): void;
  children: React.ReactNode;
}
const Modal = ({open, onOpenChange, title, description, children}: ModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger className="flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-md border p-2 text-xs font-bold md:max-w-[10rem] md:gap-x-4 md:text-base">
                <PlusCircle className="h-4 w-4 md:h-6 md:w-6" />
                Tambah Data
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <HeadingForm title={title} description={description} />
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
