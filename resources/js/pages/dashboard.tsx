import { DataTable } from '@/components/data-table';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { DivisionResponse, EmployeeResponse, PageProps, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { ColumnDef } from '@tanstack/react-table';

// === Start ===
// Kolom untuk tabel penilaian KPI (Buat didalam file components/kpi/kpi-columns.tsx)
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

// Dummy data KPI user
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

export default function DashboardAdmin() {
    const { allEmployees, allDivisions, auth } = usePage<PageProps<{ auth: User[] }>>().props;
    const employees = (allEmployees as EmployeeResponse)?.data ?? [];
    const divisions = (allDivisions as DivisionResponse)?.data ?? [];
    const latestKPI = monthlyKPI[monthlyKPI.length - 1];
    const user = auth.user;

    console.log(auth.user.role);
    return (
        <AppLayout>
            <Head title="Dashboard Admin" />
            {auth && auth.user.role === 'user' ? (
                // User dashboard
                <div className="space-y-6 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Selamat datang, {user.name}</h1>
                            <p className="text-muted-foreground text-sm">Posisi: Software Engineer - Divisi: Information Technology</p>
                        </div>
                    </div>

                    {/* Menampilkan jumlah nilai KPI user */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <Card className='flex flex-col items-center justify-between'>
                            <CardHeader>
                                <CardTitle>Jumlah Penilaian KPI</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">{monthlyKPI.length}</p>
                            </CardContent>
                            <div></div>
                        </Card>

                        {/* menampilkan Nilai KPI Terbaru dan link ke detail penilaian bulan tersebut */}
                        <Card>
                            <CardHeader className="flex flex-col items-center justify-between gap-3">
                                <CardTitle>Nilai KPI Terbaru</CardTitle>
                                {/* Link ke detail penilaian KPI */}
                                <TextLink href="/kpi/my-scores">
                                    <Button size="sm" variant="secondary">
                                        Lihat Semua
                                    </Button>
                                </TextLink>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-semibold">{latestKPI.score} / 100</div>
                                <p className="text-muted-foreground text-sm">Evaluator: {latestKPI.evaluator}</p>
                                <p className="mt-1 text-sm">Feedback: {latestKPI.feedback}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/*  Menampilkan Riwayat KPI Bulanan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Penilaian KPI Bulanan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {monthlyKPI.map((item, idx) => (
                                <div key={idx} className="border-b pb-2">
                                    <p className="font-medium">{item.month}</p>
                                    <p className="text-muted-foreground text-sm">
                                        Skor: {item.score} - Evaluator: {item.evaluator}
                                    </p>
                                    <p className="text-sm italic">"{item.feedback}"</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                // Admin dashboard
                <div className="space-y-10 p-4">
                    {/* 
                        Stat Cards
                        Ringkasan metrik utama untuk admin
                        Menampilkan jumlah karyawan, divisi, dan total penilaian KPI
                        */}
                    <div className="grid gap-10 md:grid-cols-3">
                        <StatCard title="Karyawan" value={employees.length.toString()} />
                        <StatCard title="Divisi" value={divisions.length.toString()} />
                        <StatCard title="Penilaian KPI (Dummy)" value="123" />
                    </div>

                    {/* Grafik KPI (Dummy) */}
                    <div className="bg-background relative flex flex-col rounded-xl border p-6 shadow-sm">
                        <h2 className="absolute -top-3 left-6 z-10 rounded-[4px] px-2 text-sm font-semibold bg-accent border">
                            Grafik KPI Bulanan (Dummy)
                        </h2>
                        <div className="h-60">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>

                    {/* Tabel Penilaian Terbaru (Dummy) */}
                    <div className="bg-background relative flex flex-col rounded-xl border p-6 shadow-sm">
                        <h2 className="absolute -top-3 left-6 rounded-[4px] px-2 text-sm font-semibold bg-accent border">
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
                            service="karyawan"
                            paging={{ current_page: 1, total_page: 2, size: 10 }}
                        />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-background relative flex aspect-video flex-col items-center justify-center rounded-xl border pt-6 shadow-sm">
            <h2 className="absolute -top-3 left-6 rounded-[4px] px-2 text-sm font-semibold bg-accent border">
                {title}
            </h2>
            <div className="text-center">
                <p className="text-muted-foreground text-sm">Total:</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}
