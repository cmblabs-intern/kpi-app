import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    const { data, setData, post, processing, errors, reset } = useForm<CreateKpiMetricForm>({
        division_id: '',
        name: '',
        description: '',
        weight: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/kpi-metrics', {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Input value={data.division_id} onChange={e => setData('division_id', e.target.value)} placeholder="ID Divisi" />
            <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Nama KPI" />
            <Input value={data.weight} onChange={e => setData('weight', e.target.value)} placeholder="Bobot (%)" />
            <Textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Deskripsi" />
            <Button type="submit" disabled={processing}>Simpan</Button>
        </form>
    );
}
