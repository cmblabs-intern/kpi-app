import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Nilai Saya',
        href: '/kpi/my-scores',
    },
];

const monthlyKPI = [
    { month: 'Januari', score: 75, evaluator: 'Admin HR', feedback: 'Kinerja cukup baik, namun perlu peningkatan komunikasi.' },
    { month: 'Februari', score: 78, evaluator: 'Admin HR', feedback: 'Ada perkembangan dari sisi tanggung jawab.' },
    { month: 'Maret', score: 85, evaluator: 'Admin HR', feedback: 'Target bulanan tercapai dengan baik.' },
    { month: 'April', score: 82, evaluator: 'Admin HR', feedback: 'Masih konsisten, namun beberapa deadline agak terlambat.' },
    { month: 'Mei', score: 88, evaluator: 'Admin HR', feedback: 'Sangat aktif dalam tim dan proaktif mencari solusi.' },
    { month: 'Juni', score: 90, evaluator: 'Admin HR', feedback: 'Performa maksimal dan mendapat apresiasi dari divisi lain.' },
    { month: 'Juli', score: 87, evaluator: 'Admin HR', feedback: 'Masih sangat baik meskipun workload meningkat.' },
    { month: 'Agustus', score: 84, evaluator: 'Admin HR', feedback: 'Pekerjaan selesai tepat waktu dan rapi.' },
    { month: 'September', score: 80, evaluator: 'Admin HR', feedback: 'Perlu meningkatkan presisi dalam laporan mingguan.' },
    { month: 'Oktober', score: 85, evaluator: 'Admin HR', feedback: 'Terlihat aktif dalam rapat dan diskusi proyek.' },
    { month: 'November', score: 88, evaluator: 'Admin HR', feedback: 'Mampu menyelesaikan masalah tanpa supervisi.' },
    { month: 'Desember', score: 91, evaluator: 'Admin HR', feedback: 'Performa terbaik sepanjang tahun. Konsisten dan efisien.' },
];

export default function KpiMyScorePage() {
    const [scores, setScores] = useState(monthlyKPI);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nilai KPI Saya" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                    <Heading title="Nilai KPI" description="Daftar nilai KPI saya" />
                    <p className='text-3xl font-bold'>Tahun : 2025</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {scores.map((score, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{score.month}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-semibold">{score.score} / 100</div>
                                <p className="text-muted-foreground text-sm">Evaluator: {score.evaluator}</p>
                                <p className="mt-1 text-sm">Feedback: {score.feedback}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
