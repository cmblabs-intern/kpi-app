import { Division, User } from '@/types';
import { router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AlertDelete from '../alert-delete';
import DataTableAction from '../data-table-action';
import DialogForm from '../dialog-form';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import UpdateEmployeeForm from './employee-update-form';

type EmployeeActionProps = {
    employee: {
        id: number;
        user_id: number;
        division_id: number;
        employee_code: number;
        position: string;
        created_at: string;
        updated_at: string;
        user: User;
        division: Division;
    };
};

const EmployeeAction = ({ employee }: EmployeeActionProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        router.delete(`/employees/dashboard/${employee.id}`, {
            onSuccess: () => {
                toast.success('Data karyawan berhasil dihapus!');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal menghapus data karyawan');
            },
        });
    };
    return (
        <>
            <DialogForm
                key={employee.id}
                buttonAction={null}
                className="hidden"
                headerTitle="Perbarui data karyawan"
                headerDescription="Perbarui data karyawan perusahaan"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            >
                <UpdateEmployeeForm
                    id={employee.id}
                    user_id={employee.user_id}
                    division_id={employee.division_id}
                    employee_code={employee.employee_code.toString()}
                    user={employee.user}
                    employee_division={employee.division}
                    position={employee.position}
                    onSuccess={() => setIsDialogOpen(false)}
                />
            </DialogForm>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="w-full text-center">Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DataTableAction>
                        <div className="-my-1 space-y-3 px-4">
                            {/* Button Edit */}
                            <Button
                                onClick={() => {
                                    setIsDialogOpen(true);
                                    document.body.click();
                                }}
                                className="flex w-full max-w-[6.5rem] items-center justify-between gap-x-2 rounded-sm bg-sky-600 text-xs font-semibold text-white uppercase hover:bg-sky-600/85 md:text-sm"
                            >
                                Edit
                                <Pencil className="size-4 text-white" />
                            </Button>

                            {/* Button Delete */}
                            <AlertDelete service={`Karyawan ${employee.user.name}`} onClick={() => handleDelete()}>
                                <Button
                                    variant="destructive"
                                    className="flex w-full max-w-[6.5rem] items-center justify-between gap-x-2 rounded-sm uppercase"
                                >
                                    Delete
                                    <Trash2 className="size-4 text-white" />
                                </Button>
                            </AlertDelete>
                        </div>
                    </DataTableAction>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default EmployeeAction;
