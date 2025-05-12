import { DataTable } from '@/components/data-table';
import { kpiMetricColumns } from '@/components/kpi-metric/kpi-metric-columns';
import KpiMetricModal from '@/components/kpi-metric/kpi-metric-modal';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type KpiMetric, type PageProps, type KpiMetricResponse } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function KpiMetricDashboard() {
  const { kpiMetrics } = usePage<PageProps>().props;
  const kpiMetricsResponse = kpiMetrics as KpiMetricResponse;
  const kpiData = kpiMetricsResponse.data.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  console.log('METRIX RESPONSE : ', kpiMetricsResponse)
  console.log(kpiData)

  return (
    <AppLayout>
      <Head title="Dashboard KPI Metrics" />
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between border-b-[1px] py-2">
          <Heading title="KPI Metrics" description="Kelola data KPI Metrics perusahaan" />
          <KpiMetricModal />
        </div>
        <DataTable
          columns={kpiMetricColumns}
          data={kpiData}
          service="kpi-metrics"
          paging={kpiMetricsResponse.paging}
        />
      </div>
    </AppLayout>
  );
}
