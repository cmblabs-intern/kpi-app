import { DataTable } from '@/components/data-table';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import {
    DivisionResponse,
    EmployeeResponse,
    KpiAssesmentResponse,
    KpiAssessmentDetail,
    KpiAssessmentDetailResponse,
    PageProps,
    User as UserType,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Building2, CircleGauge, User } from 'lucide-react';
import { monthYearFunc } from './kpi-assessments/details';

// === Start ===
// Kolom untuk tabel penilaian KPI (Buat didalam file components/kpi/kpi-columns.tsx)

const kpiColumns: ColumnDef<KpiAssessmentDetail>[] = [
    {
        accessorKey: 'Karyawan',
        accessorFn: (row) => row.assessment?.employee?.user?.name ?? '',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="font-bold">
                    Karyawan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableColumnFilter: true,
    },
    {
        accessorFn: (row) => row.assessment?.employee?.division?.name ?? '',
        header: 'Divisi',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'Nilai',
        accessorFn: (row) => row.assessment?.total_score ?? '',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="font-bold">
                    Nilai KPI
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableColumnFilter: true,
    },
    {
        accessorFn: (row) => monthYearFunc(row.assessment?.month) ?? '',
        header: 'Bulan',
        enableColumnFilter: true,
    },
];

// === End ===

export default function DashboardAdmin() {
    const { allEmployees, allDivisions, auth, allKpiAssessmentsDetail, allKpiAssessments } = usePage<PageProps<{ auth: UserType[] }>>().props;
    const employees = (allEmployees as EmployeeResponse)?.data ?? [];
    const divisions = (allDivisions as DivisionResponse)?.data ?? [];
    const kpiAssessments = (allKpiAssessments as KpiAssesmentResponse)?.data ?? [];
    const kpiAssessmentDetails = (allKpiAssessmentsDetail as KpiAssessmentDetailResponse)?.data ?? [];

    const user = auth.user;
    const employee = employees.find((item) => item.user_id === user.id);
    const position = employee?.position;
    const division = employee?.division.name;
    const userKpiDetails = kpiAssessmentDetails.filter((item) => item.assessment?.employee_id === employee?.id);
    const sortedUserKpi = userKpiDetails.sort(
        (a, b) => new Date(a.assessment?.created_at || '').getTime() - new Date(b.assessment?.created_at || '').getTime(),
    );
    const latestKPI = sortedUserKpi.at(-1);
    const totalAssessments = kpiAssessmentDetails.length;
    const userKpiAssessments = kpiAssessments.filter((item) => item.employee_id === employee?.id);
    const totalAssessmentCount = userKpiAssessments.length;
    const latestAssessment = userKpiAssessments.at(-1);
    const latestScore = latestAssessment?.total_score ?? 0;

    const groupedByEmployeeAndMonth = Object.values(
        kpiAssessmentDetails.reduce(
            (acc, detail) => {
                const assessment = detail.assessment;
                if (!assessment) return acc;

                const key = `${assessment.employee_id}-${assessment.month}`;
                if (!acc[key]) {
                    acc[key] = {
                        ...detail,
                        score: assessment.total_score, // ambil total_score langsung
                    };
                }
                return acc;
            },
            {} as Record<string, KpiAssessmentDetail>,
        ),
    );

    console.log(kpiAssessmentDetails);

    return (
        <AppLayout>
            <Head title="Dashboard" />
            {auth && auth.user.role === 'user' ? (
                // User dashboard
                <div className="space-y-6 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Selamat datang, {user.name}</h1>
                            <p className="text-muted-foreground text-sm">
                                Posisi: {position} - Divisi: {division}
                            </p>
                        </div>
                    </div>

                    {/* Menampilkan jumlah nilai KPI user */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <Card className="flex flex-col items-center justify-between">
                            <CardHeader>
                                <CardTitle>Jumlah Penilaian KPI</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold">{totalAssessmentCount}</p>
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
                                <div className="text-lg font-semibold">{latestScore} / 100</div>

                                {/* Feedback berdasarkan nilai */}
                                <p className="mt-1 text-sm">
                                    {latestKPI?.score !== undefined
                                        ? // Menambahkan feedback sesuai dengan nilai KPI
                                          (() => {
                                              const score = Number(latestKPI?.score ?? 0);
                                              let feedback = '';
                                              if (score < 60) {
                                                  feedback =
                                                      'KPI Anda perlu perbaikan. Cobalah untuk fokus pada area yang lebih membutuhkan peningkatan.';
                                              } else if (score < 75) {
                                                  feedback =
                                                      'KPI Anda cukup baik, namun masih ada ruang untuk perbaikan agar dapat mencapai standar yang lebih tinggi.';
                                              } else if (score < 90) {
                                                  feedback =
                                                      'KPI Anda sangat baik, namun beberapa aspek masih bisa lebih ditingkatkan untuk mencapai performa yang optimal.';
                                              } else {
                                                  feedback = 'KPI Anda sangat baik, Anda telah menunjukkan performa luar biasa.';
                                              }
                                              return feedback;
                                          })()
                                        : 'Belum ada penilaian terbaru.'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/*  Menampilkan Riwayat KPI Bulanan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Penilaian 4 Bulan Terakhir</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.values(
                                sortedUserKpi.reduce(
                                    (acc, item) => {
                                        const month = item.assessment?.month ?? '';
                                        if (!acc[month]) acc[month] = [];
                                        acc[month].push(item);
                                        return acc;
                                    },
                                    {} as Record<string, typeof sortedUserKpi>,
                                ),
                            )
                                .sort((a, b) => new Date(a[0].assessment?.month ?? '').getTime() - new Date(b[0].assessment?.month ?? '').getTime())
                                .slice(-4)
                                .reverse()
                                .map((group, idx) => {
                                    const month = group[0].assessment?.month ?? '';
                                    const formattedMonth = monthYearFunc(month);
                                    const avgScore = (group.reduce((sum, i) => sum + Number(i.score), 0) / group.length).toFixed(2);
                                    let feedback = '';
                                    const avg = Number(avgScore);
                                    if (avg < 60) {
                                        feedback = 'Nilai KPI perlu perbaikan. Cobalah untuk fokus pada area yang lebih membutuhkan peningkatan.';
                                    } else if (avg < 75) {
                                        feedback =
                                            'Nilai KPI cukup baik, namun masih ada ruang untuk perbaikan agar dapat mencapai standar yang lebih tinggi.';
                                    } else if (avg < 90) {
                                        feedback =
                                            'Nilai KPI sangat baik, namun beberapa aspek masih bisa lebih ditingkatkan untuk mencapai performa yang optimal.';
                                    } else {
                                        feedback = 'Nilai KPI sangat baik, Anda telah menunjukkan performa luar biasa.';
                                    }

                                    return (
                                        <div key={idx} className="border-b pb-2">
                                            <p className="font-medium">{formattedMonth}</p>
                                            <p className="text-muted-foreground text-sm">Total nilai KPI: {avgScore}</p>
                                            <p className="text-sm italic">"{feedback}"</p>
                                        </div>
                                    );
                                })}
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
                        <StatCard title="Total Karyawan" value={employees.length.toString()} icon={<User className="size-8" />} />
                        <StatCard title="Total Divisi" value={divisions.length.toString()} icon={<Building2 className="size-8" />} />
                        <StatCard title="Total Penilaian KPI" value={totalAssessments.toString()} icon={<CircleGauge className="size-8" />} />
                    </div>

                    {/* Grafik KPI (Dummy) */}
                    <div className="bg-background relative flex flex-col rounded-xl border p-6 shadow-sm">
                        <h2 className="bg-accent absolute -top-3 left-6 z-10 rounded-[4px] border px-2 text-sm font-semibold">
                            Grafik KPI Bulanan (Dummy)
                        </h2>
                        <div className="h-60">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>

                    {/* Tabel Penilaian Terbaru (Dummy) */}
                    <div className="bg-background relative flex flex-col rounded-xl border p-6 shadow-sm">
                        <h2 className="bg-accent absolute -top-3 left-6 rounded-[4px] border px-2 text-sm font-semibold">
                            Penilaian Terbaru (Dummy)
                        </h2>
                        <DataTable
                            columns={kpiColumns}
                            data={groupedByEmployeeAndMonth}
                            service="karyawan"
                            paging={{ current_page: 1, total_page: 2, size: 10 }}
                        />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="bg-background relative flex aspect-video flex-col items-center justify-center rounded-xl border pt-6 shadow-sm">
            <h2 className="bg-accent absolute -top-3 left-6 rounded-[4px] border px-2 text-sm font-semibold">{title}</h2>
            <div className="mb-6 flex flex-col items-center justify-center">
                <div className="rounded-full border p-2">{icon}</div>
                <p className="text-muted-foreground text-sm">Total:</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}
