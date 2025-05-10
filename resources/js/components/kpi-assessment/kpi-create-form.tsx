import { FormEventHandler, useState } from "react";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export type KPISubmitPayload = {
  bulan: string;
  karyawan: string;
  penilaian: number;
};

interface AddKPIFormProps {
  bulan: string;
  onSubmit: (data: KPISubmitPayload) => void;
}

const AddKPIForm = ({ bulan, onSubmit }: AddKPIFormProps) => {
  const [karyawan, setKaryawan] = useState("");
  const [penilaian, setPenilaian] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit({
      bulan,
      karyawan,
      penilaian: parseFloat(penilaian),
    });
    setKaryawan("");
    setPenilaian("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tambah Data Penilaian KPI untuk Bulan {bulan}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>Nama Karyawan</Label>
          <Input
            value={karyawan}
            onChange={(e) => setKaryawan(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label>Penilaian</Label>
          <Input
            type="number"
            value={penilaian}
            onChange={(e) => setPenilaian(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Tambah Penilaian</Button>
      </form>
    </div>
  );
};

export default AddKPIForm;
