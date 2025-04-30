import { Division, DivisionResponse, PageProps, User, UserResponse } from '@/types/index';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type CreateEmployeeForm = {
    user_id: string;
    division_id: string;
    employee_code: string;
    position: string;
};

type CreateEmployeeFormProps = {
    onSuccess?: () => void;
};

const CreateEmployeeForm = ({ onSuccess }: CreateEmployeeFormProps) => {
    const pageProps = usePage<PageProps<{ users?: User; divisions?: Division }>>().props;

    const users = pageProps.users as UserResponse | undefined;
    const divisions = pageProps.divisions as DivisionResponse | undefined;

    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserResponse['data'][0] | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateEmployeeForm>>({
        user_id: '',
        division_id: '',
        employee_code: '',
        position: '',
    });

    useEffect(() => {
        if (selectedEmail && users?.data?.length) {
            const user = users.data.find((u) => u.email === selectedEmail);
            if (user) {
                setSelectedUser(user);
                setData('user_id', user.id.toString());
            } else {
                setSelectedUser(null);
                setData('user_id', '');
            }
        }
    }, [selectedEmail, users, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('EMPLOYEE FORM | Data yang dikirim:', data);
        post(route('employees.store'), {
            onFinish: () => reset('employee_code'),
            onSuccess: () => {
                toast.success('Berhasil menambahkan karyawan');
                onSuccess?.();
            },
        });
    };

    if (!users || !divisions) {
        return <p className="text-red-500">Data pengguna atau divisi tidak tersedia.</p>;
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Alamat Email</Label>
                    <Select onValueChange={(value) => setSelectedEmail(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih email" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.data.map((user) => (
                                <SelectItem key={user.email} value={user.email}>
                                    {user.email}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.user_id} className="mt-2" />
                </div>

                {selectedUser && (
                    <div className="grid gap-2">
                        <Label>Nama</Label>
                        <Input value={selectedUser.name} readOnly className="border-gray-600" />
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="division">Divisi</Label>
                    <Select onValueChange={(value) => setData('division_id', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih divisi" />
                        </SelectTrigger>
                        <SelectContent>
                            {divisions.data.map((division) => (
                                <SelectItem key={division.id} value={division.id.toString()}>
                                    {division.name}
                                </SelectItem>
                            ))}
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
                        placeholder="Manager"
                        className="border-white"
                    />
                    <InputError message={errors.position} className="mt-2" />
                </div>

                <Button
                    type="submit"
                    className="mt-2 w-full cursor-pointer bg-sky-600 text-white hover:bg-sky-500/50"
                    tabIndex={5}
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Tambah data karyawan
                </Button>
            </div>
        </form>
    );
};

export default CreateEmployeeForm;
