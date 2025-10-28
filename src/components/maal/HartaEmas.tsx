import React from 'react';

interface HartaEmasProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  gram: number;
  haul: number;
  onGramChange: (value: number) => void;
  onHaulChange: (value: number) => void;
}

const HartaEmas: React.FC<HartaEmasProps> = ({
  isChecked,
  onCheckChange,
  gram,
  haul,
  onGramChange,
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
        <span className="text-lg font-bold">Emas</span>
      </label>
      {isChecked && (
        <div className="mt-4 space-y-3 pl-8">
          <div>
            <label className="block text-sm font-medium">Jumlah Emas (gram):</label>
            <input
              type="number"
              placeholder="85"
              value={gram || ''}
              onChange={(e) => onGramChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lama Kepemilikan (tahun):</label>
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

export default HartaEmas;
