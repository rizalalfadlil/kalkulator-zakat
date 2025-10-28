import React from "react";

interface HartaPeternakanProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  kambing: number;
  sapi: number;
  haul: number;
  onKambingChange: (value: number) => void;
  onSapiChange: (value: number) => void;
  onHaulChange: (value: number) => void;
}

const HartaPeternakan: React.FC<HartaPeternakanProps> = ({
  isChecked,
  onCheckChange,
  kambing,
  sapi,
  haul,
  onKambingChange,
  onSapiChange,
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
        <span className="text-lg font-bold">Peternakan</span>
      </label>
      {isChecked && (
        <div className="mt-4 space-y-3 pl-8">
          <div>
            <label className="block text-sm font-medium">
              Jumlah Kambing/Domba:{" "}
              <span className="text-xs text-gray-500">(Nisab: 40 ekor)</span>
            </label>
            <input
              type="number"
              placeholder="40"
              value={kambing || 0}
              onChange={(e) => onKambingChange(Number(e.target.value))}
              className="w-full p-2  rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Jumlah Sapi/Kerbau:{" "}
              <span className="text-xs text-gray-500">(Nisab: 30 ekor)</span>
            </label>
            <input
              type="number"
              placeholder="30"
              value={sapi || 0}
              onChange={(e) => onSapiChange(Number(e.target.value))}
              className="w-full p-2  rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Lama Kepemilikan (tahun):
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

export default HartaPeternakan;
