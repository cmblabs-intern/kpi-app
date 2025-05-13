import { useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';

type Metric = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
};

type Props = {
  employees: Employee[];
  matrices: Metric[];
};

export default function Create({ employees, matrices }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    month: '',
    details: matrices.map(matrix => ({
      metric_id: matrix.id,
      score: 0,
    })),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('assessments.store'));
  };

  return (
     <AppLayout>       
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Penilaian KPI</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pilih Karyawan */}
        <div>
          <label className="block font-medium ">Karyawan</label>
          <select
            value={data.user_id}
            onChange={(e) => setData('user_id', e.target.value)}
            className="bg-white w-full dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-600 rounded-md w-full border rounded p-2"
          >
            <option value="" className="bg-white w-full dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-600 rounded-md">-- Pilih Karyawan --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
        </div>

        {/* Bulan */}
        <div>
          <label className="block font-medium">Bulan</label>
          <input
            type="month"
            value={data.month}
            onChange={(e) => setData('month', e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.month && <p className="text-red-500 text-sm">{errors.month}</p>}
        </div>

        {/* Matriks Penilaian */}
        <div>
          <label className="block font-medium mb-2">Penilaian KPI</label>
          {matrices.map((matrix, index) => (
            <div key={matrix.id} className="flex items-center gap-4 mb-2">
              <div className="w-1/2">{matrix.name}
              
              </div>
              <input
                type="number"
                className="w-1/2 bg-gray-800 border rounded p-1"
                value={data.details[index].score}
                onChange={(e) =>
                  setData('details', data.details.map((d, i) =>
                    i === index ? { ...d, score: parseFloat(e.target.value) } : d
                  ))
                }
                min={0}
                max={100}
              />
            </div>
          ))}
          {errors.details && <p className="text-red-500 text-sm">{errors.details}</p>}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            disabled={processing}
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
       </AppLayout>
  );
}
