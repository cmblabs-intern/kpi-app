import { DataTable } from '@/components/data-table';
import { employeeColumns } from '@/components/employee/employee-colums';
import EmployeeModal from '@/components/employee/employee-modal';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Employee, type EmployeeResponse, type PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Karyawan',
        href: '/employees/dashboard',
    },
];

export default function EmployeeDashboard() {
    const { employees } = usePage<PageProps<{ employees: Employee }>>().props;
    const employeesResponse = employees as EmployeeResponse;
    const employeeData = employeesResponse.data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Karyawan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Heading title="Karyawan Perusahaan" description="Kelola data karyawan perusahaan" />
                    <EmployeeModal />
                </div>
                <DataTable columns={employeeColumns} data={employeeData} />
            </div>
        </AppLayout>
    );
}
