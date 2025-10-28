import React from 'react';
import { TemuanType } from '../../types/zakat';

interface HartaRikazProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  nilai: number;
  jenis: TemuanType;
  onNilaiChange: (value: number) => void;
  onJenisChange: (value: TemuanType) => void;
}

const HartaRikaz: React.FC<HartaRikazProps> = ({
  isChecked,
  onCheckChange,
  nilai,
  jenis,
  onNilaiChange,
  onJenisChange
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
        <span className="text-lg font-bold">Rikaz (Harta Temuan) & Hasil Tambang</span>
      </label>
      {isChecked && (
        <div className="mt-4 space-y-3 pl-8">
          <div>
            <label className="block text-sm font-medium">Nilai Harta (Rupiah): <span className="text-xs text-gray-500">(Zakat Rikaz 20%, Tambang 2.5% jika &gt; nisab)</span></label>
            <input
              type="number"
              placeholder="1000000"
              value={nilai || ''}
              onChange={(e) => onNilaiChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-medium">Jenis Harta:</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="temuan"
                value="rikaz"
                checked={jenis === 'rikaz'}
                onChange={() => onJenisChange('rikaz')}
                className="mr-2"
              />
              Rikaz (Harta Temuan, Zakat 20%)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="temuan"
                value="tambang"
                checked={jenis === 'tambang'}
                onChange={() => onJenisChange('tambang')}
                className="mr-2"
              />
              Hasil Tambang (Zakat 2.5%, Nisab Rp 197.285.000)
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default HartaRikaz;
