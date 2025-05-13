import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { kpiAssessmentColumns } from '@/components/kpi-assessment/kpi-assessment-columns';
import AppLayout from '@/layouts/app-layout';
import { KpiAssessmentDetailResponse, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export const monthYearFunc = (month: string) => {
    return new Date(month).toLocaleString('id-ID', { month: 'long', year: 'numeric' });
};

const Details = () => {
    const pageProps = usePage<PageProps>().props;
    const detailResponse = pageProps.allKpiAssessmentsDetail as KpiAssessmentDetailResponse;
    const allData = detailResponse?.data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));

    const urlParams = new URLSearchParams(window.location.search);
    const month = urlParams.get('month');

    const dataByMonth = allData.filter((item) => monthYearFunc(item.assessment.month) === month);

    const uniqueByAssessmentId = Array.from(new Map(dataByMonth.map((item) => [item.assessment_id, item])).values());

    return (
        <AppLayout>
            <Head title="Detail Penilaian KPI" />
            <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                <Heading title={`Detail Penilaian KPI - ${month}`} description={`Menampilkan daftar Detail Penilaian KPI - ${month}`} />
            </div>
            <DataTable columns={kpiAssessmentColumns} data={uniqueByAssessmentId} service="Detail Penilaian KPI" />
        </AppLayout>
    );
};

export default Details;
