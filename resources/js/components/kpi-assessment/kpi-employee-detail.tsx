import { Card } from '../ui/card';


const KPIEmployeeDetail = ({ karyawan, penilaian }: { karyawan: string;  penilaian: string}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Detail Penilaian untuk {karyawan}</h2>
      <Card className="p-4">
        <div>
          <h3 className="font-semibold">Penilaian:</h3>
          <p>{penilaian}</p>
        </div>
      </Card>
    </div>
  );
};

export default KPIEmployeeDetail;
