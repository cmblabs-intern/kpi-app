import { DataTable } from '@/components/data-table';
import { employeeColumns } from '@/components/employee/employee-colums';
import EmployeeModal from '@/components/employee/employee-modal';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type Employee, type EmployeeResponse, type PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function EmployeeDashboard() {
    const { employees } = usePage<PageProps<{ employee: Employee[] }>>().props;
    const employeesResponse = employees as EmployeeResponse;
    const employeeData = employeesResponse.data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));

    console.log(employeeData)

    return (
        <AppLayout>
            <Head title="Dashboard Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between border-b-[1px] py-2">
                    <Heading title="Karyawan Perusahaan" description="Kelola data karyawan perusahaan" />
                    <EmployeeModal />
                </div>
                <DataTable
                    columns={employeeColumns}
                    data={employeeData}
                    service="karyawan"
                    paging={employeesResponse.paging}
                />
            </div>
        </AppLayout>
    );
}
