import { cn } from '@/lib/utils';
import { EmployeeResponse, KpiMetricResponse, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

type DetailInput = {
    metric_id: number;
    score: string;
    note: string;
};

type CreateKpiAssessmentForm = {
    employee_id: string;
    month: string;
    details: DetailInput[];
};

type CreateKpiAssessmentFormProps = {
    onSuccess?: () => void;
};

const KpiAssessmentCreateForm = ({ onSuccess }: CreateKpiAssessmentFormProps) => {
    const pageProps = usePage<PageProps>().props;
    const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
    const [openMetricDialog, setOpenMetricDialog] = useState(false);

    const err = pageProps.errors?.month;
    // console.log('ERRORS : ', err.toString())
    const employeesResponse = pageProps.employees as EmployeeResponse;
    const metricesResponse = pageProps.allKpiMetrics as KpiMetricResponse;
    const metrices = metricesResponse.data;
    const employees = employeesResponse.data;

    const { data, setData, post, processing, errors } = useForm<Required<CreateKpiAssessmentForm>>({
        employee_id: '',
        month: '',
        details:
            metrices?.map((m) => ({
                metric_id: m.id,
                score: '0',
                note: '',
            })) || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('kpi-assessments.store'), {
            onSuccess: () => {
                console.log('Created data: ', data);
                toast.success('Berhasil menambahkan Penilaian KPI');
                onSuccess?.();
            },
            onError: () => {
                toast.error(err ?? 'Penilaian untuk karyawan ini di bulan tersebut sudah ada.');
            },
        });
    };

    if (!metrices || metrices.length === 0 || !employees || employees.length === 0) {
        return <div>Loading...</div>;
    }

    const selectedMonth = data.month ? new Date(data.month) : undefined;

    // Get selected employee's divisi_id
    const selectedEmployee = employees.find((emp) => emp.id.toString() === data.employee_id);
    console.log('SELECTED EMPLOYEE : ', selectedEmployee);

    const selectedEmployeeDivisiId = selectedEmployee?.division?.id;
    console.log('SELECTED EMPLOYEE DIVISION ID : ', selectedEmployeeDivisiId);

    // Filter the metrics based on the selected employee's divisi_id
    const filteredMetrics = selectedEmployeeDivisiId ? metrices.filter((metric) => metric.division_id === selectedEmployeeDivisiId) : [];

    console.log('FILTERED METRICS : ', filteredMetrics);
    console.log('METRICS : ', metrices);
    console.log('PAGE PROPS : ', pageProps);

    return (
        <form onSubmit={submit} className="space-y-4">
            <h1 className="text-xl font-bold">Buat Penilaian KPI</h1>

            <div>
                <Label>Nama Karyawan</Label>
                <Select value={data.employee_id} onValueChange={(value) => setData('employee_id', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Nama Karyawan" />
                    </SelectTrigger>
                    <SelectContent>
                        {employees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                                {emp.user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.employee_id && <div className="text-red-500">{errors.employee_id}</div>}
            </div>

            <div className="flex flex-col gap-2">
                <Label>Bulan</Label>
                <Dialog open={openCalendarDialog} onOpenChange={setOpenCalendarDialog}>
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            className={cn(
                                'input w-full justify-start bg-sky-600 text-left font-normal hover:bg-sky-500/50',
                                !data.month && 'text-white',
                            )}
                        >
                            {data.month ? format(new Date(data.month), 'MMMM yyyy') : <span>Pilih Bulan</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto border p-10">
                        <Calendar
                            mode="single"
                            selected={selectedMonth}
                            onSelect={(date) => {
                                if (date) {
                                    setData('month', date.toDateString());
                                }
                                setOpenCalendarDialog(false);
                            }}
                            initialFocus
                            captionLayout="dropdown"
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div>
                <Dialog open={openMetricDialog} onOpenChange={setOpenMetricDialog}>
                    <DialogTrigger className="w-full">
                        <Button type="button" className="w-full bg-sky-600 text-white hover:bg-sky-500/50">
                            Metrix KPI
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="space-y-4">
                        <div className="max-h-[70vh] space-y-4 overflow-y-scroll pr-2">
                            {filteredMetrics.length > 0 ? (
                                filteredMetrics.map((metric, index) => (
                                    <Card key={metric.id}>
                                        <CardHeader>
                                            <CardTitle className="text-base">
                                                {metric.name} (Bobot: {metric.weight}%)
                                            </CardTitle>
                                            <p className="text-muted-foreground text-sm italic">
                                                Divisi: {metric.division?.name ?? 'Tidak diketahui'}
                                            </p>
                                            <p className="text-muted-foreground text-sm italic">
                                                Deskripsi: {metric.description ?? 'Tidak diketahui'}
                                            </p>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Skor</Label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    max={100}
                                                    value={data.details[index].score}
                                                    onChange={(e) =>
                                                        setData(
                                                            'details',
                                                            data.details.map((d, i) => (i === index ? { ...d, score: e.target.value } : d)),
                                                        )
                                                    }
                                                    placeholder="Skor (0 - 100)"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Catatan</Label>
                                                <Textarea
                                                    value={data.details[index].note}
                                                    onChange={(e) =>
                                                        setData(
                                                            'details',
                                                            data.details.map((d, i) => (i === index ? { ...d, note: e.target.value } : d)),
                                                        )
                                                    }
                                                    placeholder="Catatan"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className='text-center'>No metrics available for the selected employee's division.</div>
                            )}
                            {filteredMetrics.length !== 0 && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setOpenMetricDialog(false);
                                    }}
                                    className="w-full bg-sky-600 text-white hover:bg-sky-500/50"
                                >
                                    Selesai
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Metrix KPI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" className="w-full">
                            {filteredMetrics.length > 0 ? (
                                filteredMetrics.map((metric, index) => (
                                    <AccordionItem key={metric.id} value={`metric-${metric.id}`}>
                                        <AccordionTrigger>
                                            <div className="flex flex-col items-start">
                                                <span>
                                                    {metric.name} (Bobot: {metric.weight}%)
                                                </span>
                                                <span className="text-muted-foreground text-xs italic">
                                                    Divisi: {metric.division?.name ?? 'Tidak diketahui'}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-5">
                                            <div className="flex flex-col gap-2">
                                                <Label>Skor</Label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    max={100}
                                                    value={data.details[index].score}
                                                    onChange={(e) =>
                                                        setData(
                                                            'details',
                                                            data.details.map((d, i) =>
                                                                i === index ? { ...d, score: e.target.value } : d
                                                            )
                                                        )
                                                    }
                                                    placeholder="Skor (0 - 100)"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label>Catatan</Label>
                                                <Textarea
                                                    value={data.details[index].note}
                                                    onChange={(e) =>
                                                        setData(
                                                            'details',
                                                            data.details.map((d, i) =>
                                                                i === index ? { ...d, note: e.target.value } : d
                                                            )
                                                        )
                                                    }
                                                    placeholder="Catatan"
                                                />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            ) : (
                                <div>No metrics available for the selected employee's division.</div>
                            )}
                        </Accordion>
                    </CardContent>
                </Card> */}
            </div>

            <Button type="submit" tabIndex={5} disabled={processing} className="mt-2 w-full cursor-pointer bg-sky-600 text-white hover:bg-sky-500/50">
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Simpan Penilaian
            </Button>
        </form>
    );
};

export default KpiAssessmentCreateForm;
