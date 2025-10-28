import React from 'react';
import { MustahikType } from '../types/zakat';
import { formatRupiah } from '../utils/formatters';

interface MustahikCardProps {
  id: MustahikType;
  label: string;
  isChecked: boolean;
  dalil: string;
  porsi: number;
  onCheckChange: (checked: boolean) => void;
}

const MustahikCard: React.FC<MustahikCardProps> = ({
  id,
  label,
  isChecked,
  dalil,
  porsi,
  onCheckChange
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckChange(e.target.checked)}
          className="h-5 w-5 text-blue-600"
        />
        <span className="text-lg font-bold">{label}</span>
      </label>
      {isChecked && (
        <>
          <p className="mt-2 text-sm text-gray-600 italic">{dalil}</p>
          <p className="mt-1 text-lg font-semibold text-blue-700">Alokasi: {formatRupiah(porsi)}</p>
        </>
      )}
    </div>
  );
};

export default MustahikCard;
