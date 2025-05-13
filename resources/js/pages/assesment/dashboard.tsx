// import { DataTable } from '@/components/data-table';
// import { divisionColumns } from '@/components/division/division-colums';
// import DivisionModal from '@/components/division/division-modal';
// import DivisionTableSkeleton from '@/components/division/division-table-skeleton';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem} from '@/types';
import { Head, Link} from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assesment',
        href: '/assesment/dashboard',
    },
];
type Assessment = {
  month: string;
  count: number;
};
type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  links: PaginationLink[];
};

type Props = {
  assessments: Paginated<Assessment>;
};

function formatMonthName(month: string): string {
  const [year, monthNumber] = month.split('-');
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const monthIndex = parseInt(monthNumber, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}



export default function Dashboard({assessments}: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Assesment" />
            <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-xl px-4">
                <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between border-b-[1px] py-2">
                    <Heading title="Penilaian Karyawan" description="Kelola data Penilaian Karyawan" />
                </div>
                    <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Penilaian KPI per Bulan</h1>
                    <Link href="/assesment/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Tambah Penilaian
                    </Link>
                </div>

      <table className="w-full border text-sm border-gray-800 rounded-md overflow-hidden">
        <thead className="bg-gray-800 text-black dark:text-white" >
          <tr className="bg-blue-600 text-white">
            <th className="p-2 border">Bulan</th>
            <th className="p-2 border">Jumlah Karyawan Dinilai</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {assessments.data.map((item) => (
            <tr key={item.month}>
              <td className="p-2 border">{formatMonthName(item.month)}</td>
              <td className="p-2 border">{item.count} orang</td>
              <td className="p-2 border">
                <Link
                  href={`/assessments/${item.month}`}
                  className="text-blue-600 hover:underline"
                >
                  Lihat Detail
                </Link>
              </td>
            </tr>
          ))}
          {assessments.data.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                Belum ada data penilaian.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    
    </div>
      <div className="mt-4 flex justify-center gap-2">
        {assessments.links.map((link, i) => (
         <Link
            key={i}
            href={link.url ?? "#"}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={`px-3 py-1 border rounded ${
                link.active ? "bg-blue-600 text-white" : "text-blue-600"
            }`}
        />
  ))}
      </div>
 </div>
        </AppLayout>
    );
}
