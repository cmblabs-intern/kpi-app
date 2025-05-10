import { KpiAssessment } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import DialogForm from '../dialog-form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import DataTableAction from '../data-table-action';
import AlertDelete from '../alert-delete';

type KpiAssessmentActionProps = {
    kpiAssessment: KpiAssessment
};

const KpiAssessmentAction = ({ kpiAssessment }: KpiAssessmentActionProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        toast.success('Data Evaluasi KPI berhasil dihapus!');
    };
    return (
        <>
            <DialogForm
                key={kpiAssessment.id}
                buttonAction={null}
                className="hidden"
                headerTitle="Perbarui data evaluasi kpi"
                headerDescription="Perbarui data evaluasi kpi karyawan"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            >
                <div>Update form</div>
            </DialogForm>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[9rem]">
                    <DropdownMenuLabel className="w-full text-center">Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DataTableAction>
                        {/* Button Edit */}
                        <Button
                            onClick={() => {
                                setIsDialogOpen(true);
                                document.body.click();
                            }}
                            className="flex w-full items-center justify-between gap-x-2 rounded-sm bg-sky-600 text-xs font-semibold text-white uppercase hover:bg-sky-600/85 md:text-sm"
                        >
                            Edit
                            <Pencil className="size-4 text-white" />
                        </Button>

                        {/* Button Delete */}
                        <AlertDelete service={`Karyawan ${kpiAssessment.employee.user.name}`} onClick={() => handleDelete()}>
                            <Button variant="destructive" className="flex w-full items-center justify-between gap-x-2 rounded-sm uppercase">
                                Delete
                                <Trash2 className="size-4 text-white" />
                            </Button>
                        </AlertDelete>
                    </DataTableAction>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default KpiAssessmentAction;
