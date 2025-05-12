import AlertDelete from '@/components/alert-delete';
import { Button } from '@/components/ui/button';
import { Division } from '@/types';
import { router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import DialogForm from '../dialog-form';
import KpiMetricUpdateForm from './kpi-metric-update-form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import DataTableAction from '../data-table-action';

type KpiMetricProps = {
    kpiMetric: {
        id: number;
        division_id: number;
        name: string;
        description?: string;
        weight: number;
        created_at: string;
        updated_at: string;
        division: Division;
    };
};

export default function KpiMetricAction({ kpiMetric }: KpiMetricProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDelete = () => {
        router.delete(`/kpi-metrics/dashboard/${kpiMetric.id}`, {
            onSuccess: () => {
                toast.success('Data KPI Matrix berhasil dihapus!');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Gagal menghapus data karyawan');
            },
        });
    };

    return (
        <>
            <DialogForm
                key={kpiMetric.id}
                buttonAction={null}
                className="hidden"
                headerTitle="Perbarui data karyawan"
                headerDescription="Perbarui data karyawan perusahaan"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            >
                <KpiMetricUpdateForm
                    id={kpiMetric.id}
                    division_id={kpiMetric.division_id}
                    name={kpiMetric.name}
                    description={kpiMetric.description ?? ''}
                    weight={kpiMetric.weight.toString()}
                    kpi_matric_division={kpiMetric.division}
                />
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
                        <AlertDelete service={`Karyawan ${kpiMetric.name}`} onClick={() => handleDelete()}>
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
}
