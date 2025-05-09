import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { KpiMetric } from '@/types';

interface UpdateKpiMetricForm {
    division_id: string;
    name: string;
    description: string;
    weight: string;
    [key: string]: string;
}

interface Props {
    metric: KpiMetric;
    onSuccess?: () => void;
}

export default function KpiMetricUpdateForm({ metric, onSuccess }: Props) {
    const { data, setData, put, processing } = useForm<UpdateKpiMetricForm>({
        division_id: String(metric.division_id),
        name: metric.name,
        description: metric.description ?? '',
        weight: String(metric.weight),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/kpi-metrics/${metric.id}`, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            }
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Input value={data.division_id} onChange={e => setData('division_id', e.target.value)} placeholder="ID Divisi" />
            <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Nama KPI" />
            <Input value={data.weight} onChange={e => setData('weight', e.target.value)} placeholder="Bobot (%)" />
            <Textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Deskripsi" />
            <Button type="submit" disabled={processing}>Update</Button>
        </form>
    );
}
