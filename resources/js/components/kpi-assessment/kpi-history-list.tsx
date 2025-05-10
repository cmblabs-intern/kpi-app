import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { DataTable } from '../data-table';
import { Button } from '../ui/button';

type KPIHistoryItem = {
    month: string;
    total_penilaian: number;
};

interface KPIHistoryListProps {
    data: KPIHistoryItem[];
    onRowClick: (month: string) => void;
    paging: { current_page: number; size: number; total_page: number };
}

const KPIHistoryList: React.FC<KPIHistoryListProps> = ({ data, onRowClick, paging }) => {
    const columns: ColumnDef<KPIHistoryItem>[] = [
        {
            accessorKey: 'month',
            header: 'Bulan',
        },
        {
            accessorKey: 'total_penilaian',
            header: 'Jumlah Penilaian',
        },
        {
            accessorKey: 'detail',
            header: 'Detail',
            cell: ({ row }) => (
                <Link href={`details?month=${row.original.month}`}>
                    <Button variant={'ghost'}>Detail</Button>
                </Link>
            ),
            enableColumnFilter: false,
        },
    ];

    const handleRowClick = (bulan: string) => {
        onRowClick(bulan);
    };

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Daftar Riwayat Penilaian KPI per Bulan</h2>
            <DataTable
                columns={columns}
                data={data.map((item) => ({
                    ...item,
                    onClick: () => handleRowClick(item.bulan), // Menambahkan onClick ke setiap item
                }))}
                paging={paging}
                service="Penilaian KPI"
            />
        </div>
    );
};

export default KPIHistoryList;
