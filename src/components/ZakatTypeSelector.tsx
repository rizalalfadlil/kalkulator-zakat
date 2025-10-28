import React from "react";
import { ZakatType } from "../types/zakat";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { AiFillGold } from "react-icons/ai";

interface ZakatTypeSelectorProps {
  selectedType: ZakatType;
  onTypeChange: (type: ZakatType) => void;
}

const ZakatTypeSelector: React.FC<ZakatTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="bg-white shado rounded p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Pilih Jenis Zakat
      </h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="radio"
          name="zakat_type"
          id="type_fitrah"
          value="fitrah"
          className="hidden"
          checked={selectedType === "fitrah"}
          onChange={() => onTypeChange("fitrah")}
        />
        <label
          htmlFor="type_fitrah"
          className={`flex-1 text-center flex flex-col items-center p-6 border-2 rounded cursor-pointer hover:border-slate-500 transition-all duration-200 ${
            selectedType === "fitrah"
              ? "border-slate-600 bg-slate-50 text-slate-800"
              : "border-gray-300"
          }`}
        >
          <FaHandHoldingHeart className="text-2xl block mb-2" />
          <span className="text-xl font-semibold">Zakat Fitrah</span>
          <p className="text-sm text-gray-600">
            Zakat penyucian jiwa per individu.
          </p>
        </label>

        <input
          type="radio"
          name="zakat_type"
          id="type_mal"
          value="mal"
          className="hidden"
          checked={selectedType === "mal"}
          onChange={() => onTypeChange("mal")}
        />
        <label
          htmlFor="type_mal"
          className={`flex-1 text-center flex flex-col items-center p-6 border-2 rounded cursor-pointer hover:border-slate-500 transition-all duration-200 ${
            selectedType === "mal"
              ? "border-slate-600 bg-slate-50 text-slate-800"
              : "border-gray-300"
          }`}
        >
          <AiFillGold className="text-2xl block mb-2" />
          <span className="text-xl font-semibold">Zakat Mal</span>
          <p className="text-sm text-gray-600">
            Zakat harta (Emas, Uang, Tani, dll).
          </p>
        </label>
      </div>
    </div>
  );
};

export default ZakatTypeSelector;
