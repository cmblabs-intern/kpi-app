import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { DataTable } from '../data-table';
import { Button } from '../ui/button';

// Tipe untuk item data penilaian per karyawan
type KPIEmployeeItem = {
    id: string;
    name: string;
    penilaian: number;
};

interface KPIEmployeeListProps {
    data: KPIEmployeeItem[];
    bulan: string;
    paging: { current_page: number; size: number; total_page: number }; // Paging info
}

const KPIEmployeeList: React.FC<KPIEmployeeListProps> = ({ data, bulan, paging }) => {
    const columns: ColumnDef<KPIEmployeeItem>[] = [
        {
            accessorKey: 'name',
            header: 'Nama Karyawan',
        },
        {
            accessorKey: 'penilaian',
            header: 'Penilaian',
        },
        {
            accessorKey: 'id',
            header: 'Detail',
            cell: ({ row }) => (
                <Link href={`employee-detail?employee=${row.original.id}`}>
                    <Button variant={'ghost'}>Detail</Button>
                </Link>
            ),
            enableColumnFilter: false,
        },
    ];

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Detail Penilaian KPI per Bulan: {bulan}</h2>
            <DataTable columns={columns} data={data} paging={paging} service="Karyawan" />
        </div>
    );
};

export default KPIEmployeeList;
