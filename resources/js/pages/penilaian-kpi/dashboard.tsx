'use client';

import Heading from '@/components/heading';
import KpiAssessmentModal from '@/components/kpi-assessment/kpi-assessment-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type KPI = {
    id: number;
    karyawan: string;
    bulan: string;
    skor: number;
};

const mockData: KPI[] = [
    { id: 1, karyawan: 'Yerikho William Tasilima', bulan: '2025-04', skor: 80 },
    { id: 2, karyawan: 'Puji Astuti', bulan: '2025-04', skor: 90 },
    { id: 3, karyawan: 'Rido Septiawan', bulan: '2025-04', skor: 75 },
    { id: 4, karyawan: 'Mochamad Faathir Azukhruf Siswandi', bulan: '2025-04', skor: 85 },
    { id: 5, karyawan: 'Marhadi Akbar', bulan: '2025-04', skor: 87 },
    { id: 6, karyawan: 'Yerikho William Tasilima', bulan: '2025-05', skor: 85 },
    { id: 7, karyawan: 'Puji Astuti', bulan: '2025-05', skor: 92 },
    { id: 8, karyawan: 'Rido Septiawan', bulan: '2025-05', skor: 75 },
    { id: 9, karyawan: 'Mochamad Faathir Azukhruf Siswandi', bulan: '2025-05', skor: 85 },
    { id: 10, karyawan: 'Marhadi Akbar', bulan: '2025-05', skor: 87 },
];

export default function DashboardPenilaianKPI() {
    const [selectedBulan, setSelectedBulan] = useState<string>('2025-05');
    const [selectedKaryawan, setSelectedKaryawan] = useState<string>('all');
    const [filteredData, setFilteredData] = useState<KPI[]>([]);

    const bulanOptions = Array.from(new Set(mockData.map((item) => item.bulan)));
    const karyawanOptions = Array.from(new Set(mockData.map((item) => item.karyawan)));

    useEffect(() => {
        const result = mockData.filter((item) => {
            return item.bulan === selectedBulan && (selectedKaryawan === 'all' || item.karyawan === selectedKaryawan);
        });
        setFilteredData(result);
    }, [selectedBulan, selectedKaryawan]);

    const chartData = {
        labels: filteredData.map((item) => item.karyawan),
        datasets: [
            {
                label: 'Skor KPI',
                data: filteredData.map((item) => item.skor),
                backgroundColor: '#00a6f4',
                borderRadius: 6,
            },
        ],
    };

    return (
        <AppLayout>
            <Head title="Dashboard Penilaian KPI" />
            <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                <Heading title="Dashboard Penilaian KPI" description="Kelola data Penilaian KPI" />
                <KpiAssessmentModal />
            </div>
            <div className="space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Penilaian KPI</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-y-2">
                            <Label className="text-sm font-medium">Bulan</Label>
                            <Select value={selectedBulan} onValueChange={setSelectedBulan}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Bulan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bulanOptions.map((bulan) => (
                                        <SelectItem key={bulan} value={bulan}>
                                            {bulan}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label className="text-sm font-medium">Karyawan</Label>
                            <Select value={selectedKaryawan} onValueChange={setSelectedKaryawan}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Karyawan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>
                                    {karyawanOptions.map((nama) => (
                                        <SelectItem key={nama} value={nama}>
                                            {nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Penilaian KPI</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Nomor</TableHead>
                                    <TableHead className="text-center">Nama Karyawan</TableHead>
                                    <TableHead className="text-center">Bulan</TableHead>
                                    <TableHead className="text-center">Skor</TableHead>
                                    <TableHead className="text-center">Detail</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((item, index) => (
                                    <TableRow key={item.id} className="text-center">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.karyawan}</TableCell>
                                        <TableCell>{item.bulan}</TableCell>
                                        <TableCell>{item.skor}</TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/kpi-assessments/details?id=${item.id}`}
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                <Button>Lihat Detail</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Visualisasi Laporan KPI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Bar data={chartData} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
