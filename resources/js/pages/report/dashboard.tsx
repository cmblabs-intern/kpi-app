import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, KpiAssesmentResponse, KpiAssessment, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Chart from 'react-apexcharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Karyawan',
        href: '/laporan/dashboard',
    },
];

export default function ReportDashboard() {
    const { report } = usePage<PageProps<{ report: KpiAssessment }>>().props;

    const reportResponse = report as KpiAssesmentResponse;

    // Buat format data untuk chart
    const monthLabelsMap = new Map<string, string>();

    reportResponse.data.forEach((d) => {
        const date = new Date(d.month);
        const label = date.toLocaleString('id-ID', { month: 'short', year: 'numeric' }); // contoh: "Jan 2025"
        monthLabelsMap.set(d.month, label);
    });

    const rawMonths = [...new Set(reportResponse.data.map((d) => d.month))];

    const months = rawMonths.map((m) => monthLabelsMap.get(m) ?? m); // hasil: ['Jan 2025', 'Feb 2025', ...]

    const employees = [...new Set(reportResponse.data.map((d) => d.employee_id))];

    const series = employees.map((emp) => ({
        name: emp.toString(),
        data: rawMonths.map((month) => {
            const item = reportResponse.data.find((d) => d.employee_id === emp && d.month === month);
            return item ? item.total_score : 0;
        }),
    }));

    console.log('Months', months);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Laporan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Heading title="Laporan Karyawan" description="Laporan KPI Karyawan Perusahaan" />
                </div>
                <div className="rounded-lg bg-neutral-800 p-4">
                    <Chart
                        type="bar"
                        height={350}
                        series={series}
                        options={{
                            chart: {
                                id: 'kpi-chart',
                            },
                            xaxis: {
                                categories: months,
                                labels: {
                                    style: {
                                        colors: '#fff', // Warna label sumbu X (column)
                                        fontSize: '14px',
                                        fontFamily: 'Arial',
                                    },
                                },
                            },
                            yaxis: {
                                labels: {
                                    style: {
                                        colors: '#fff', // Warna label sumbu X (column)
                                        fontSize: '14px',
                                        fontFamily: 'Arial',
                                    },
                                },
                            },
                            tooltip: {
                                theme: 'dark',
                            },
                            legend: {
                                labels: {
                                    colors: '#fff',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
