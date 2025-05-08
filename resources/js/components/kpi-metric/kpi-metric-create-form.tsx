import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import InputError from '../input-error';
import { CreateKpiMetricData } from '@/types/kpi-metric';

const KpiMetricCreateForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { data, setData, post, processing, errors, reset } = useForm<CreateKpiMetricData>({
        code: '', // Disesuaikan sama yang ada di app/Http/Requests/KpiRequest.php
        name: '', // Disesuaikan sama yang ada di app/Http/Requests/KpiRequest.php
        year: new Date().getFullYear(), // Disesuaikan sama yang ada di app/Http/Requests/KpiRequest.php
        unit: '', // Disesuaikan sama yang ada di app/Http/Requests/KpiRequest.php
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('kpi-metrics.store'), {
            onSuccess: () => {
                console.log( 'Data created: ', data)
                toast.success('Berhasil menambahkan KPI Metric!');
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            {/* Isi form nya samakan dengan yang ada di userForm */}
            <div>
                <Label htmlFor="code">Kode KPI</Label>
                <Input
                    id="code"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    disabled={processing}
                    required
                    placeholder="Masukkan kode KPI"
                />
                <InputError message={errors.code} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="name">Nama Metric</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    required
                    placeholder="Masukkan nama metric"
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
                    disabled={processing}
                    required
                    min={2000}
                    max={2100}
                    placeholder="Masukkan tahun"
                />
                <InputError message={errors.year} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="unit">Satuan</Label>
                <Input
                    id="unit"
                    value={data.unit}
                    onChange={(e) => setData('unit', e.target.value)}
                    disabled={processing}
                    required
                    placeholder="Masukkan satuan"
                />
                <InputError message={errors.unit} className="mt-2" />
            </div>
            <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Tambah Metric
            </Button>
        </form>
    );
};

export default KpiMetricCreateForm;
