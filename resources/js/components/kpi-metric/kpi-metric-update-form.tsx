import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import InputError from '../input-error';

import { KpiMetric, UpdateKpiMetricData } from '@/types/kpi-metric';

type Props = KpiMetric & {
    onSuccess?: () => void;
};

const KpiMetricUpdateForm = ({ id, code, name, year, unit, onSuccess }: Props) => {
    const { data, setData, put, processing, errors } = useForm<UpdateKpiMetricData>({
        id,
        code,
        name,
        year,
        unit,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('kpi-metrics.update', { id }), {
            onSuccess: () => {
                toast.success('Berhasil memperbarui KPI Metric!');
                onSuccess?.();
            },
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div>
                <Label htmlFor="code">Kode KPI</Label>
                <Input
                    id="code"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    required
                    disabled={processing}
                />
                <InputError message={errors.code} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="name">Nama Metric</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    disabled={processing}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="year">Tahun</Label>
                <Input
                    id="year"
                    type="number"
                    value={data.year}
                    onChange={(e) => setData('year', parseInt(e.target.value))}
                    required
                    disabled={processing}
                    min={2000}
                    max={2100}
                />
                <InputError message={errors.year} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="unit">Satuan</Label>
                <Input
                    id="unit"
                    value={data.unit}
                    onChange={(e) => setData('unit', e.target.value)}
                    required
                    disabled={processing}
                />
                <InputError message={errors.unit} className="mt-2" />
            </div>
            <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Perbarui Metric
            </Button>
        </form>
    );
};

export default KpiMetricUpdateForm;
