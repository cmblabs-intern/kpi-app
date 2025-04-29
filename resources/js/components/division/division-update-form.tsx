import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type UpdateDivisionForm = {
    id: number;
    name: string;
};

type UpdateDivisionFormProps = {
    onSuccess?: () => void;
    id: number;
    name: string;
};

const UpdateDivisionForm = ({ onSuccess, id, name }: UpdateDivisionFormProps) => {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateDivisionForm>>({
        id,
        name,
        
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('divisions.update', { id }), {
            onFinish: () => reset('name'),
            onSuccess: () => {
                toast.success('Berhasil memperbarui data divisi!');
                onSuccess?.();
            },
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
                    placeholder="Masukkan Nama Divisi"
                    className="border-white"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <Button type="submit" className="mt-2 w-full bg-sky-600 text-white hover:bg-sky-500/80" tabIndex={2} disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Perbarui Data Divisi
            </Button>
        </form>
    );
};

export default UpdateDivisionForm;
