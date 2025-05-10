import Heading from '@/components/heading';
import KpiAssessmentModal from '@/components/kpi-assessment/kpi-assessment-modal';
import KPIHistoryList from '@/components/kpi-assessment/kpi-history-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function KpiAssessmentDashboard() {
    // const [selectedBulan, setSelectedBulan] = useState<string | null>(null);

    const historyData = [
        { month: 'Januari', total_penilaian: 10 },
        { month: 'Februari', total_penilaian: 10 },
        { month: 'Maret', total_penilaian: 10 },
        { month: 'April', total_penilaian: 10 },
        { month: 'Mei', total_penilaian: 8 },
    ];

    // const paging = {
    //     current_page: 1,
    //     size: 10,
    //     total_page: 3,
    // };

    // const handleRowClick = (month: string) => {
    //     setSelectedBulan(month);
    // };

    return (
        <AppLayout>
            <Head title="Dashboard Penilaian KPI" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                    <Heading title="Penilaian KPI" description="Kelola data Penilaian KPI" />
                    <KpiAssessmentModal />
                </div>
                {/* <KPIHistoryList data={historyData} onRowClick={handleRowClick} paging={paging} /> */}

                <div className="grid grid-cols-4 grid-rows-3 gap-6">
                    {historyData.map((data) => (
                        <Card className='bg-sky-600 border-none'>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-center">{data.month}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className='font-bold text-center'>Total Penilaian : { data.total_penilaian }</p>
                        </CardContent>
                        <CardFooter>
                          <Link href={`details?month=${data.month}`} className='w-full'>
                            <Button className='w-full'>Lihat detail</Button>
                          </Link>
                        </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
