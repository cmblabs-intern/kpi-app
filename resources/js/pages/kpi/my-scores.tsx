import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, KpiAssessmentDetail, KpiAssessmentDetailResponse, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Nilai Saya',
        href: '/kpi/my-scores',
    },
];

export default function KpiMyScorePage() {
    const pageProps = usePage<PageProps>().props;
    const assessmentDetailsResponse = pageProps.allKpiAssessmentsDetail as KpiAssessmentDetailResponse;
    const assessmentDetails = assessmentDetailsResponse.data;

    const scores = useMemo(() => {
        const grouped = assessmentDetails.reduce((acc: Record<string, KpiAssessmentDetail[]>, detail) => {
            const monthDate = new Date(detail.assessment.month);
            const monthNumber = monthDate.getMonth(); // 0 - 11
            if (!acc[monthNumber]) acc[monthNumber] = [];
            acc[monthNumber].push(detail);
            return acc;
        }, {});

        return Object.entries(grouped).map(([monthNumberStr, details]) => {
            const monthNumber = parseInt(monthNumberStr, 10);
            const sampleDate = new Date(details[0].assessment.month);
            const month = format(sampleDate, 'MMMM', { locale: id });

            const total = details.reduce((sum, item) => sum + Number(item.score), 0);
            const count = details.length;
            const avgScore = (total / count).toFixed(2);

            const evaluator = details[0].assessment.employee.user.name;
            let feedback = '';
            const avg = Number(avgScore);
            if (avg < 60) {
                feedback = 'Nilai KPI perlu perbaikan. Cobalah untuk fokus pada area yang lebih membutuhkan peningkatan.';
            } else if (avg < 75) {
                feedback = 'Nilai KPI cukup baik, namun masih ada ruang untuk perbaikan agar dapat mencapai standar yang lebih tinggi.';
            } else if (avg < 90) {
                feedback = 'Nilai KPI sangat baik, namun beberapa aspek masih bisa lebih ditingkatkan untuk mencapai performa yang optimal.';
            } else {
                feedback = 'Nilai KPI sangat baik, Anda telah menunjukkan performa luar biasa.';
            }

            return {
                monthNumber,
                month,
                score: avgScore,
                evaluator,
                feedback,
            };
        });
    }, [assessmentDetails]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nilai KPI Saya" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <Heading title="Nilai KPI" description="Daftar nilai KPI saya" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {scores.map((score, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="capitalize">{score.month}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-semibold">{score.score} / 100</div>
                                <p className="mt-1 text-sm">Feedback: {score.feedback}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
