import { DataTable } from '@/components/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DivisionResponse, EmployeeResponse } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

import { ColumnDef } from '@tanstack/react-table';

// === Start ===
// Buat di dalam folder kpi -> kpi-colums
type KpiRow = {
    name: string;
    division: string;
    score: number;
    month: string;
};

const kpiColumns: ColumnDef<KpiRow>[] = [
    {
        accessorKey: 'name',
        header: 'Karyawan',
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'division',
        header: 'Divisi',
        cell: ({ row }) => <div>{row.getValue('division')}</div>,
    },
    {
        accessorKey: 'score',
        header: 'Nilai KPI',
        cell: ({ row }) => <div>{row.getValue('score')}</div>,
    },
    {
        accessorKey: 'month',
        header: 'Bulan',
        cell: ({ row }) => <div>{row.getValue('month')}</div>,
    },
];

// === End ===

export default function DashboardAdmin() {
    const { allEmployees, allDivisions } = usePage().props;
    const employees = (allEmployees as EmployeeResponse)?.data ?? [];
    const divisions = (allDivisions as DivisionResponse)?.data ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />

            <div className="space-y-6 p-4">
                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard title="Karyawan" value={employees.length.toString()} />
                    <StatCard title="Divisi" value={divisions.length.toString()} />
                    <StatCard title="Penilaian KPI (Dummy)" value="123" />
                </div>

                {/* Grafik KPI (Dummy) */}
                <div className="bg-background relative flex flex-col rounded-xl border p-6 shadow-sm">
                    <h2 className="bg-background text-muted-foreground absolute -top-3 left-4 px-2 text-sm font-semibold">
                        Grafik KPI Bulanan (Dummy)
                    </h2>
                    <div className="h-60">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                {/* Tabel Penilaian Terbaru (Dummy) */}
                <div className="bg-background relative flex flex-col rounded-xl border p-6 shadow-sm">
                    <h2 className="bg-background text-muted-foreground absolute -top-3 left-4 px-2 text-sm font-semibold">
                        Penilaian Terbaru (Dummy)
                    </h2>
                    <DataTable<KpiRow, string>
                        columns={kpiColumns}
                        data={[
                            { name: 'Yerikho William', division: 'Information Technology', score: 90, month: 'Maret 2025' },
                            { name: 'Puji Astuti', division: 'Marketing', score: 78, month: 'Maret 2025' },
                            { name: 'Rido Septiawan', division: 'Product', score: 85, month: 'Maret 2025' },
                            { name: 'Mochamad Faathir Azukhruf Siswandi', division: 'Product', score: 85, month: 'Maret 2025' },
                            { name: 'Marhadi Akbar', division: 'Human Resource', score: 85, month: 'Maret 2025' },
                        ]}
                        searchKey="name"
                        filterBy="karyawan"
                        paging={{ current_page: 1, total_page: 2, size: 10 }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-background relative flex aspect-video flex-col items-center justify-center rounded-xl border pt-6 shadow-sm">
            <h2 className="bg-background text-muted-foreground absolute -top-3 left-4 px-2 text-sm font-semibold">{title}</h2>
            <div className="text-center">
                <p className="text-muted-foreground text-sm">Total:</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}
