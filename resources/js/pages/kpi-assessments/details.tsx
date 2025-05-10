import Heading from '@/components/heading';
import KPIEmployeeList from '@/components/kpi-assessment/kpi-employee-list';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

interface KPIEmployee {
    id: string;
    name: string;
    penilaian: number;
}

interface Props extends PageProps {
    month: string;
    employee: KPIEmployee[];
}

const Details: React.FC<Props> = ({ month, employee }) => {
    const paging = {
        current_page: 1,
        size: employee?.length ?? 0,
        total_page: 1,
    };

    return (
        <AppLayout>
            <Head title="Detail Penilaian KPI" />
            <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                <Heading title="Detail Penilaian KPI" description="Menampilkan daftar Detail Penilaian KPI" />
            </div>
            <KPIEmployeeList data={employee} bulan={month} paging={paging} />
        </AppLayout>
    );
};

export default Details;
