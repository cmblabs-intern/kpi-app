import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { type BreadcrumbItem} from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assesment',
        href: '/assesment/dashboard',
    },
];
type MetricDetail = {
  id: number;
  name: string;
  weight: number;
};

type AssessmentDetail = {
  id: number;
  score: number;
  metric: MetricDetail;
};

type Employee = {
  id: number;
  user: {
    name: string;
  };
};

type Assessment = {
  id: number;
  employee: Employee;
  details: AssessmentDetail[];
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
  month: string;
  assessments: Paginated<Assessment>;
};
function formatMonth(monthStr: string): string {
  const date = new Date(`${monthStr}-01`);
  return date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
}
export default function ShowByMonth({ month, assessments }: Props) {
  const [openDetailId, setOpenDetailId] = useState<number | null>(null);

  const toggleDetail = (id: number) => {
    setOpenDetailId(openDetailId === id ? null : id);
  };

  const calculateTotal = (details: AssessmentDetail[]) => {
    const totalWeight = details.reduce((acc, item) => acc + item.metric.weight, 0);
    const totalScore = details.reduce((acc, item) => acc + item.score * item.metric.weight, 0);
    return totalWeight === 0 ? 0 : (totalScore / totalWeight).toFixed(2);
  };

  return (
    <AppLayout>
         <Head title="Dashboard Assesment" />
            <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-xl px-4">
                <div className="flex flex-col md:flex-row gap-y-4 items-center justify-between border-b-[1px] py-2">
                    <Heading title="Penilaian Karyawan" description="Kelola data Penilaian Karyawan" />
                </div>
                <div className="p-6">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Detail Penilaian Bulan {formatMonth(month)}</h1>

        <Link href={route('assesments.index')} className="text-blue-500 hover:underline mb-4 inline-block">
          ← Kembali ke Rekap
        </Link>

        <table className="w-full table-auto border text-sm mb-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 text-left">No</th>
              <th className="p-2 text-left">Nama Karyawan</th>
              <th className="p-2 text-left">Total Score</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {assessments.data.map((assessment,index) => (
              <React.Fragment key={assessment.id}>
                <tr className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{assessment.employee.user.name}</td>
                  <td className="p-2">{calculateTotal(assessment.details)}</td>
                  <td className="p-2">
                    <div className=" flex gap-2 items-center">
                        <button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                        onClick={() => toggleDetail(assessment.id)}
                        >
                        {openDetailId === assessment.id ? 'Tutup' : 'Detail'}
                        </button>
                       
                        <button
                            onClick={() => {
                                if (confirm("Yakin ingin menghapus penilaian ini?")) {
                                router.delete(route('assessments.destroy', assessment.id));
                                }
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                            >Hapus
                        </button>
                    </div>
    
                  </td>
                </tr>

                {openDetailId === assessment.id && (
                  <tr>
                    <td colSpan={3} className="bg-white w-full dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                      <h3 className="font-semibold mb-2">Rincian Penilaian:</h3>
                      <table className="w-full table-auto border text-sm border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                        <thead className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                            <tr>
                                <th className="p-2 text-left border border-gray-300 dark:border-gray-600">No</th>
                                <th className="p-2 text-left border border-gray-300 dark:border-gray-600">Metrik</th>
                                <th className="p-2 text-left border border-gray-300 dark:border-gray-600">Bobot</th>
                                <th className="p-2 text-left border border-gray-300 dark:border-gray-600">Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessment.details.map((detail, index) => (
                                <tr key={detail.id} className="border-b border-gray-300 dark:border-gray-600">
                                <td className="p-2 border border-gray-300 dark:border-gray-600">{index + 1}</td>
                                <td className="p-2 border border-gray-300 dark:border-gray-600">{detail.metric.name}</td>
                                <td className="p-2 border border-gray-300 dark:border-gray-600">{detail.metric.weight}</td>
                                <td className="p-2 border border-gray-300 dark:border-gray-600">{detail.score}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="p-2 border border-gray-300 dark:border-gray-600" colSpan={3}>Total Penilaian</td>
                                <td className="p-2 border border-gray-300 dark:border-gray-600">{calculateTotal(assessment.details)}</td>
                            </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}           
          </tbody>
        </table>
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
            </div>
            </div>

    </AppLayout>
  );
}
