import { DivisionResponse, type Division, type User } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type UpdateEmployeeForm = {
    id: number;
    user_id: number;
    division_id: number;
    employee_code: string;
};

type UpdateEmployeeFormProps = {
    onSuccess?: () => void;
    id: number;
    user_id: number;
    division_id: number;
    employee_code: string;
    employee_division: Division;
    user: User;
    divisions: unknown;
};

const UpdateEmployeeForm = ({ id, user_id, division_id, employee_code, employee_division, user, divisions, onSuccess }: UpdateEmployeeFormProps) => {
  const divisionsResponse = divisions as DivisionResponse;
  const filteredDivisions = divisionsResponse.data.filter(
    (division) => division.name !== employee_division.name
  );
  
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateEmployeeForm>>({
        id,
        user_id,
        division_id,
        employee_code,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('employees.update', { id }), {
            onFinish: () => reset('employee_code'),
            onSuccess: () => {
                console.log('FORM UPDATE | DATA UPDATED: ', data);
                toast.success('Berhasil memperbarui data divisi!');
                onSuccess?.();
            },
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-2">
                <Label>Alamat Email</Label>
                <Input value={user.email} readOnly className="border-gray-600" />
            </div>

            <div className="grid gap-2">
                <Label>Nama</Label>
                <Input value={user.name} readOnly className="border-gray-600" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="position">Jabatan</Label>
                <Select
                    onValueChange={(value) => {
                        setData('division_id', Number(value));
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={employee_division.name} />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredDivisions.length > 0 ? (
                            filteredDivisions.map((division) => (
                                <SelectItem key={division.id} value={division.id.toString()}>
                                    {division.name}
                                </SelectItem>
                            ))
                        ) : (
                            <div className="text-muted-foreground px-2 py-1 text-center text-sm">Data divisi tidak tersedia</div>
                        )}
                    </SelectContent>
                </Select>
                <InputError message={errors.division_id} className="mt-2" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="employee_code">Kode Karyawan</Label>
                <Input
                    id="employee_code"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="employee_code"
                    value={data.employee_code}
                    onChange={(e) => setData('employee_code', e.target.value)}
                    disabled={processing}
                    placeholder="IT-202503011025"
                    className="border-white"
                />
                <InputError message={errors.employee_code} className="mt-2" />
            </div>

            <Button type="submit" className="mt-2 w-full bg-sky-600 text-white hover:bg-sky-500/80" tabIndex={2} disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Perbarui Data Divisi
            </Button>
        </form>
    );
};

export default UpdateEmployeeForm;
