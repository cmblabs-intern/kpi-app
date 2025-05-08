import { DataTable } from '@/components/data-table';
import { kpiMetricColumns } from '@/components/kpi-metric/kpi-metric-columns';
import KpiMetricModal from '@/components/kpi-metric/kpi-metric-modal';
import KpiMetricTableSkeleton from '@/components/kpi-metric/kpi-metric-table-skeleton';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { KpiMetric } from '@/types/kpi-metric';

const breadcrumbs = [
    {
        title: 'KPI Metric',
        href: '/kpi-metrics/dashboard',
    },
];

export default function Dashboard() {
    const { kpiMetrics } = usePage().props;

    const metrics = kpiMetrics?.data?.map((item: KpiMetric, index: number) => ({
        ...item,
        index: index + 1,
    })) || [];

    console.log(metrics)

    if (!kpiMetrics || !('data' in kpiMetrics)) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard KPI Metric" />
                <div className="flex h-full items-center justify-center">
                    <KpiMetricTableSkeleton />
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard KPI Metric" />
            <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between border-b-[1px] py-2">
                    <Heading title="KPI Metric" description="Kelola data KPI Metric perusahaan" />
                    <KpiMetricModal />
                </div>
                <DataTable
                    columns={kpiMetricColumns}
                    data={metrics}
                    paging={kpiMetrics.paging}
                    service="kpi-metrics"
                />
            </div>
        </AppLayout>
    );
}
