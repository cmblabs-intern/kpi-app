import { Head, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { KpiAssessmentDetailColumn } from '@/components/kpi-assessment-detail/kpi-assessment-detail-columns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { KpiAssessmentDetailResponse, PageProps } from '@/types';
import { monthYearFunc } from './details';

const EmployeeDetail = () => {
    const [processing, setProcessing] = useState(false);

    const { props } = usePage<PageProps>();
    console.log('PROPS : ', props);
    const detailResponse = props.allKpiAssessmentsDetail as KpiAssessmentDetailResponse;
    const detailData =
        detailResponse?.data?.map((item, index) => ({
            ...item,
            index: index + 1,
        })) ?? [];

    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('employee');
    const selectedMonth = urlParams.get('month');

    const filteredDetails = detailData.filter((item) => String(item.assessment.employee_id) === employeeId);

    const selectedAssessment = filteredDetails.find((item) => {
        const itemMonth = monthYearFunc(item.assessment.month);
        return itemMonth === selectedMonth;
    })?.assessment;

    const latestDetails = filteredDetails.filter((item) => item.assessment.id === selectedAssessment?.id);

    const groupedAssessmentScores = Object.values(
        filteredDetails.reduce(
            (acc, item) => {
                const date = new Date(item.assessment.month);
                const key = `${date.getFullYear()}-${date.getMonth()}`;

                if (!acc[key]) {
                    acc[key] = {
                        id: item.assessment.id,
                        score: Number(item.assessment.total_score),
                        monthYear: date.toLocaleString('id-ID', {
                            month: 'long',
                            year: 'numeric',
                        }),
                    };
                }

                return acc;
            },
            {} as Record<string, { id: number; score: number; monthYear: string }>,
        ),
    );

    const employeeName = selectedAssessment?.employee.user.name ?? '';
    const employeeDivision = selectedAssessment?.employee.division.name ?? '';
    const employeePosition = selectedAssessment?.employee.position ?? '';
    const monthYear = selectedAssessment?.month
        ? new Date(selectedAssessment.month).toLocaleString('id-ID', {
              month: 'long',
              year: 'numeric',
          })
        : '';

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    const csrfToken = getCookie('XSRF-TOKEN');
    const latestAssessment = latestDetails?.[0]?.assessment;

    const handleNotify = async () => {
        setProcessing(true);
        try {
            const response = await fetch('/kpi-assessments/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken ?? ''),
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    employee_id: latestAssessment?.employee_id,
                    month: latestAssessment?.month
                }),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim notifikasi');
            }

            const result = await response.json();
            toast.success(result.message);
        } catch (error) {
            console.error(error);
            toast.error('Gagal mengirim notifikasi');
        } finally {
            setProcessing(false);
        }
    };

    const typeOfWeight = detailData.map((item) => typeof (item.metric.weight));
    console.log('TYPE OF WEIGHT : ', typeOfWeight);

    return (
        <AppLayout>
            <Head title="Detail Penilaian KPI" />
            <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                <Heading
                    title={`Detail Penilaian KPI - ${employeeName}`}
                    description={`Lihat laporan lengkap tentang penilaian dan riwayat KPI untuk ${employeeName}`}
                />
            </div>
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold md:text-xl">Penilaian KPI untuk {employeeName}</CardTitle>
                        <CardDescription>
                            <p className="text-xs md:text-base">Divisi : {employeeDivision}</p>
                            <p className="text-xs md:text-base">Jabatan : {employeePosition}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-x-2 md:flex-row md:items-center">
                            <p>Penilaian Terakhir:</p>
                            <p>
                                <strong>{monthYear}</strong> - {selectedAssessment?.total_score ?? '-'}
                            </p>
                        </div>

                        <div>
                            <h2 className="mb-2 text-lg font-semibold">Detail Penilaian Terbaru:</h2>
                            <DataTable columns={KpiAssessmentDetailColumn} data={latestDetails} service="Detail Penilaian KPI Karyawan" />
                        </div>

                        <p className="mb-2">
                            Total Penilaian: <strong>{selectedAssessment?.total_score ?? '-'}</strong>
                        </p>

                        <h2 className="mt-6 mb-2 text-lg font-semibold">Riwayat Penilaian Sebelumnya:</h2>
                        <ul className="ml-6 list-disc">
                            {groupedAssessmentScores.map((item, index) => (
                                <li key={index}>
                                    {item.monthYear}: {item.score}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="mt-2 cursor-pointer bg-sky-600 text-white hover:bg-sky-500/50"
                            onClick={handleNotify}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Kirim Notifikasi
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
};

export default EmployeeDetail;
