import React from "react";
import { IrigasiType } from "../../types/zakat";

interface HartaPertanianProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  kg: number;
  irigasi: IrigasiType;
  onKgChange: (value: number) => void;
  onIrigasiChange: (value: IrigasiType) => void;
}

const HartaPertanian: React.FC<HartaPertanianProps> = ({
  isChecked,
  onCheckChange,
  kg,
  irigasi,
  onKgChange,
  onIrigasiChange,
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
        <span className="text-lg font-bold">Pertanian</span>
      </label>
      {isChecked && (
        <div className="mt-4 space-y-3 pl-8">
          <div>
            <label className="block text-sm font-medium">
              Hasil Panen (kg gabah/setara):{" "}
              <span className="text-xs text-gray-500">(Nisab: 653 kg)</span>
            </label>
            <input
              type="number"
              placeholder="653"
              value={kg || 0}
              onChange={(e) => onKgChange(Number(e.target.value))}
              className="w-full p-2  rounded-md"
            />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-medium">Jenis Irigasi:</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="irigasi"
                value="berbayar"
                checked={irigasi === "berbayar"}
                onChange={() => onIrigasiChange("berbayar")}
                className="mr-2"
              />
              Irigasi Berbayar (Zakat 5%)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="irigasi"
                value="alami"
                checked={irigasi === "alami"}
                onChange={() => onIrigasiChange("alami")}
                className="mr-2"
              />
              Irigasi Alami/Tadah Hujan (Zakat 10%)
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default HartaPertanian;
