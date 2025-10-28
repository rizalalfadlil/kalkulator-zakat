import React from 'react';
import { ZakatType } from '../types/zakat';

interface ZakatTypeSelectorProps {
  selectedType: ZakatType;
  onTypeChange: (type: ZakatType) => void;
}

const ZakatTypeSelector: React.FC<ZakatTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">1. Pilih Jenis Zakat</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="radio"
          name="zakat_type"
          id="type_fitrah"
          value="fitrah"
          className="hidden"
          checked={selectedType === 'fitrah'}
          onChange={() => onTypeChange('fitrah')}
        />
        <label
          htmlFor="type_fitrah"
          className={`flex-1 text-center p-6 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200 ${
            selectedType === 'fitrah' ? 'border-blue-600 bg-blue-100 text-blue-800' : 'border-gray-300'
          }`}
        >
          <span className="text-2xl block mb-2">🌾</span>
          <span className="text-xl font-semibold">Zakat Fitrah</span>
          <p className="text-sm text-gray-600">Zakat penyucian jiwa per individu.</p>
        </label>

        <input
          type="radio"
          name="zakat_type"
          id="type_maal"
          value="maal"
          className="hidden"
          checked={selectedType === 'maal'}
          onChange={() => onTypeChange('maal')}
        />
        <label
          htmlFor="type_maal"
          className={`flex-1 text-center p-6 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200 ${
            selectedType === 'maal' ? 'border-blue-600 bg-blue-100 text-blue-800' : 'border-gray-300'
          }`}
        >
          <span className="text-2xl block mb-2">💰</span>
          <span className="text-xl font-semibold">Zakat Maal</span>
          <p className="text-sm text-gray-600">Zakat harta (Emas, Uang, Tani, dll).</p>
        </label>
      </div>
    </div>
  );
};

export default ZakatTypeSelector;
