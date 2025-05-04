import { DivisionResponse, PageProps, type Division, type User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
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
    position: string;
};

type UpdateEmployeeFormProps = {
    onSuccess?: () => void;
    id: number;
    user_id: number;
    division_id: number;
    employee_code: string;
    employee_division: Division;
    position: string;
    user: User;
};

const UpdateEmployeeForm = ({ id, user_id, division_id, employee_code, employee_division, position, user, onSuccess }: UpdateEmployeeFormProps) => {
    const { divisions } = usePage<PageProps<{ division: Division[] }>>().props;
    const divisionResponse = divisions as DivisionResponse;

    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateEmployeeForm>>({
        id,
        user_id,
        division_id,
        employee_code,
        position,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('employees.update', { id }), {
            onFinish: () => reset('employee_code'),
            onSuccess: () => {
                toast.success('Berhasil memperbarui data divisi!');
                onSuccess?.();
            },
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-2">
                <Label>Alamat Email</Label>
                <Input value={user.email} readOnly disabled className="border-gray-600" />
            </div>

            <div className="grid gap-2">
                <Label>Nama</Label>
                <Input value={user.name} readOnly disabled className="border-gray-600" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="division">Divisi</Label>
                <Select onValueChange={(value) => setData('division_id', Number(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder={employee_division.name} />
                    </SelectTrigger>
                    <SelectContent>
                        {divisionResponse && divisionResponse.data.length > 0 ? (
                            divisionResponse.data.map((division) => (
                                <SelectItem key={division.id} value={division.id.toString()}>
                                    {division.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="">No data division</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="position">Jabatan</Label>
                <Input
                    id="position"
                    type="name"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="position"
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    disabled={processing}
                    placeholder={position}
                    className="border-white"
                />
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
