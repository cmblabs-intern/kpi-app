import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Division, DivisionResponse, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CreateKpiMetricForm {
    division_id: string;
    name: string;
    description: string;
    weight: string;
    [key: string]: string;
}

interface Props {
    onSuccess?: () => void;
}

export default function KpiMetricCreateForm({ onSuccess }: Props) {
    const pageProps = usePage<PageProps<{ divisions?: Division }>>().props;
    const divisions = pageProps.divisions as DivisionResponse | undefined;
    const { data, setData, post, processing, errors, reset } = useForm<CreateKpiMetricForm>({
        division_id: '',
        name: '',
        description: '',
        weight: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('kpi-metrics.store'), {
            onFinish: () => reset('name'),
            onSuccess: () => {
                console.log('Created data: ', data);
                toast.success('Berhasil menambahkan KPI Metrix');
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="division">Divisi</Label>
                <Select onValueChange={(value) => setData('division_id', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih divisi" />
                    </SelectTrigger>
                    <SelectContent>
                        {divisions?.data && divisions.data.length > 0 ? (
                            divisions.data.map((division) => (
                                <SelectItem key={division.id} value={division.id.toString()}>
                                    {division.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="no-division" disabled>
                                Belum ada data divisi
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
                <InputError message={errors.division_id} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Nama Metrix</Label>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama KPI" />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="wight">Berat Metrix</Label>
                <Input value={data.weight} onChange={(e) => setData('weight', e.target.value)} placeholder="Bobot (%)" />
                <InputError message={errors.wight} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi Metrix</Label>
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Deskripsi" />
                <InputError message={errors.description} />
            </div>
            <Button type="submit" disabled={processing} className="mt-2 w-full cursor-pointer bg-sky-600 text-white hover:bg-sky-500/50">
                Simpan
            </Button>
        </form>
    );
}
