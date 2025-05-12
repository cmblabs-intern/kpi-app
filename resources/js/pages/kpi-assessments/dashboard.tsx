import Heading from '@/components/heading';
import KpiAssessmentModal from '@/components/kpi-assessment/kpi-assessment-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { KpiAssesmentResponse, PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function KpiAssessmentDashboard() {
    const pageProps = usePage<PageProps>().props;
    const [sortBy, setSortBy] = useState<'latest' | 'calendar'>('latest');

    const assessmentResponse = pageProps.allKpiAssessments as KpiAssesmentResponse;

    const assessment = assessmentResponse?.data;

    const groupedByMonth = assessment.reduce((acc, item) => {
        const monthYear = new Date(item.month).toLocaleString('id-ID', { month: 'long', year: 'numeric' });

        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(item);
        return acc;
    }, {});

    const monthData = Object.keys(groupedByMonth).map((monthYear) => {
        return {
            month: monthYear,
            totalPenilaian: groupedByMonth[monthYear].length,
        };
    });

    const monthOrder = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const sortedMonthData = monthData.sort((a, b) => {
        if (sortBy === 'latest') {
            const dateA = Date.parse(`${a.month.split(' ')[1]}-${a.month.split(' ')[0]}-01`);
            const dateB = Date.parse(`${b.month.split(' ')[1]}-${b.month.split(' ')[0]}-01`);
            return dateB - dateA;
        } else if (sortBy === 'calendar') {
            const monthA = a.month.split(' ')[0];
            const monthB = b.month.split(' ')[0];
            return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
        }
        return 0;
    });

    return (
        <AppLayout>
            <Head title="Dashboard Penilaian KPI" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                    <Heading title="Penilaian KPI" description="Kelola data Penilaian KPI" />
                    <KpiAssessmentModal />
                </div>

                <div className="flex items-center gap-2">
                    <Label>Urutkan:</Label>
                    <Select value={sortBy} onValueChange={(val) => setSortBy(val as 'latest' | 'calendar')}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Urutkan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Data Terbaru</SelectItem>
                            <SelectItem value="calendar">Urutan Bulan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-rows-3 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {sortedMonthData.map((data) => (
                        <Card key={data.month} className="border-none bg-sky-600">
                            <CardHeader>
                                <CardTitle className="text-center text-xl font-semibold">{data.month}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center font-bold">Total Penilaian : {data.totalPenilaian}</p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`details?month=${data.month}`} className="w-full">
                                    <Button className="w-full bg-white hover:bg-accent text-black">Lihat detail</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
