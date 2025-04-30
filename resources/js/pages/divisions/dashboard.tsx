import { DataTable } from '@/components/data-table';
import { divisionColumns } from '@/components/division/division-colums';
import DivisionModal from '@/components/division/division-modal';
import DivisionTableSkeleton from '@/components/division/division-table-skeleton';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Division, type DivisionResponse, type PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Divisi',
        href: '/divisions/dashboard',
    },
];

export default function Dashboard() {
    const { divisions } = usePage<PageProps<{ divisions: Division }>>().props;
    const divisionsResponse = divisions as DivisionResponse;

    const division = divisionsResponse.data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));

    if (!divisions || !('data' in (divisions as object))) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard Divisi" />
                <div className="flex h-full items-center justify-center">
                    <DivisionTableSkeleton />
                </div>
            </AppLayout>
        );
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Divisi" />
            <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between border-b-[1px] py-2">
                    <Heading title="Divisi Perusahaan" description="Kelola data divisi perusahaan" />
                    <DivisionModal />
                </div>
                <DataTable
                    columns={divisionColumns}
                    data={division}
                    searchKey="name"
                    filterBy="nama divisi"
                    paging={divisionsResponse.paging}
                />
            </div>
        </AppLayout>
    );
}
