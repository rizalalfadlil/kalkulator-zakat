import React from 'react';

interface HartaUangProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  total: number;
  haul: number;
  onTotalChange: (value: number) => void;
  onHaulChange: (value: number) => void;
}

const HartaUang: React.FC<HartaUangProps> = ({
  isChecked,
  onCheckChange,
  total,
  haul,
  onTotalChange,
  onHaulChange
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckChange(e.target.checked)}
          className="h-5 w-5 text-blue-600"
        />
        <span className="text-lg font-bold">Uang, Tabungan, Penghasilan, Investasi & Perniagaan</span>
      </label>
      {isChecked && (
        <div className="mt-4 space-y-3 pl-8">
          <p className="text-sm text-gray-600">Total nilai dari semua harta ini. Nisabnya setara 85 gram emas (Rp 197.285.000).</p>
          <div>
            <label className="block text-sm font-medium">Total Nilai (Rupiah): <span className="text-xs text-gray-500">(Gaji setahun, saldo tabungan, nilai investasi, aset perniagaan)</span></label>
            <input
              type="number"
              placeholder="197285000"
              value={total || ''}
              onChange={(e) => onTotalChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lama Kepemilikan (tahun): <span className="text-xs text-gray-500">(Untuk gaji, gunakan total 1 tahun)</span></label>
            <input
              type="number"
              placeholder="1"
              value={haul || ''}
              onChange={(e) => onHaulChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HartaUang;
