import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

interface KaryawanDetailProps {
    data: {
        employee: {
            id: string;
            name: string;
        };
        total_penilaian: number;
        penilaian_terakhir: {
            bulan: string;
            score: number;
        };
        riwayat_penilaian: {
            bulan: string;
            score: number;
        }[];
    },
    csrfToken: string;
}

const KaryawanDetail: React.FC<KaryawanDetailProps> = ({ data, csrfToken }) => {
    return (
        <AppLayout>
            <Head title="Detail Penilaian KPI Karyawan" />
            <div className="flex flex-col items-center justify-between gap-y-4 border-b-[1px] py-2 md:flex-row">
                <Heading
                    title={`Detail Penilaian KPI Karyawan - ${data.employee.name}`}
                    description={`Lihat laporan lengkap tentang penilaian dan riwayat KPI untuk ${data.employee.name}`}
                />
            </div>
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Penilaian KPI untuk {data.employee.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2">
                            Total Penilaian: <strong>{data.total_penilaian}</strong>
                        </p>
                        <p className="mb-4">
                            Penilaian Terakhir: <strong>{data.penilaian_terakhir.bulan}</strong> - {data.penilaian_terakhir.score}
                        </p>

                        <h2 className="mb-2 text-lg font-semibold">Riwayat Penilaian Sebelumnya:</h2>
                        <ul className="ml-6 list-disc">
                            {data.riwayat_penilaian.map((item, index) => (
                                <li key={index}>
                                    {item.bulan}: {item.score}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={async () => {
                                const response = await fetch('/kpi-assessments/notify', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRF-TOKEN': csrfToken,
                                    },
                                    body: JSON.stringify(data),
                                });

                                const result = await response.json();
                                alert(result.message);

                                console.log(result)
                            }}
                        >
                            Kirim Notifikasi
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
};

export default KaryawanDetail;
