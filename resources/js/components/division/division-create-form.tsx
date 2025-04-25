import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type CreateDivisionForm = {
    id: string;
    name: string;
    position: string;
};

type CreateDivisionFormProps = {
    onSuccess?: () => void;
};

const CreateDivisionForm = ({ onSuccess }: CreateDivisionFormProps) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateDivisionForm>>({
        id: '',
        name: '',
        position: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('divisions.store'), {
            onFinish: () => reset('name'),
            onSuccess: () => {
                toast.success(`Divisi ${data.name} berhasil ditambahkan!`);
                onSuccess?.();
            },
            onError: () => {
                const errorMessages = Object.values(errors).join(', ');
                toast.success(errorMessages);
            }
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Nama Divisi</Label>
                <Input
                    id="name"
                    type="name"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Masukan Nama Divisi"
                    className="border-white"
                />
                <InputError message={errors.id} className="mt-2" />
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

            <Button type="submit" className="mt-2 w-full cursor-pointer bg-sky-600 text-white hover:bg-sky-500/50" tabIndex={5} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Tambah data divisi
            </Button>
        </form>
    );
};

export default CreateDivisionForm;
