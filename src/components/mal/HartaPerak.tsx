import React from "react";

interface HartaPerakProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  gram: number;
  haul: number;
  onGramChange: (value: number) => void;
  onHaulChange: (value: number) => void;
}

const HartaPerak: React.FC<HartaPerakProps> = ({
  isChecked,
  onCheckChange,
  gram,
  haul,
  onGramChange,
  onHaulChange,
}) => {
  return (
    <div className="bg-slate-50 rounded p-4">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckChange(e.target.checked)}
          className="h-5 w-5 text-slate-600"
        />
        <span className="text-lg font-bold">Perak</span>
      </label>
      {isChecked && (
        <div className="mt-4 space-y-3 pl-8">
          <div>
            <label className="block text-sm font-medium">
              Jumlah Perak (gram):{" "}
              <span className="text-xs text-gray-500">(Nisab: 595 gram)</span>
            </label>
            <input
              type="number"
              placeholder="595"
              value={gram || 0}
              onChange={(e) => onGramChange(Number(e.target.value))}
              className="w-full p-2  rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Lama Kepemilikan (tahun):
              <span className="text-xs text-gray-500">(Haul: 1 tahun)</span>
            </label>
            <input
              type="number"
              placeholder="1"
              value={haul || 0}
              onChange={(e) => onHaulChange(Number(e.target.value))}
              className="w-full p-2  rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HartaPerak;
