import { useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Division, DivisionResponse, KpiMetric, PageProps } from '@/types';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UpdateKpiMetricForm {
    id: number;
    division_id: number;
    name: string;
    description: string;
    weight: string;
}

type UpdateKPIMetricFormProps = {
    onSuccess?: () => void;
    id: number;
    division_id: number;
    name: string;
    description: string;
    weight: string;
    kpi_matric_division: Division;
};

export default function KpiMetricUpdateForm({ id, division_id, name, description, weight, kpi_matric_division, onSuccess }: UpdateKPIMetricFormProps) {
    const { divisions } = usePage<PageProps<{ division: Division[] }>>().props;
    const divisionResponse = divisions as DivisionResponse;

    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateKpiMetricForm>>({
        id,
        division_id,
        name,
        description,
        weight,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('kpi-metrics.update', { id }), {
            onFinish: () => reset('name'),
            onSuccess: () => {
                toast.success('Berhasil memperbarui data KPI Metrix!');
                onSuccess?.();
            }
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="division">Divisi</Label>
                <Select onValueChange={(value) => setData('division_id', Number(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder={kpi_matric_division.name} />
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
            <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Nama KPI" />
            <Input value={data.weight} onChange={e => setData('weight', e.target.value)} placeholder="Bobot (%)" />
            <Textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Deskripsi" />
            <Button type="submit" disabled={processing}>Update</Button>
        </form>
    );
}
