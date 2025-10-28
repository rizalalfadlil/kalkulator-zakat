import React, { useState } from 'react';
import { ZAKAT_FITRAH_PER_JIWA } from '../constants/zakatConstants';

interface ZakatFitrahCalculatorProps {
  onCalculate: (total: number) => void;
}

const ZakatFitrahCalculator: React.FC<ZakatFitrahCalculatorProps> = ({ onCalculate }) => {
  const [jumlahJiwa, setJumlahJiwa] = useState<number>(0);

  const handleCalculate = () => {
    const total = jumlahJiwa * ZAKAT_FITRAH_PER_JIWA;
    onCalculate(total);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Kalkulator Zakat Fitrah</h2>
      <p className="mb-4 text-gray-600">Zakat fitrah wajib dibayarkan per jiwa. Asumsi harga 2.5kg beras layak adalah <span className="font-bold">Rp 50.000</span>.</p>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <label htmlFor="jumlah_jiwa" className="font-semibold text-lg">Jumlah Jiwa (termasuk tanggungan):</label>
        <input
          type="number"
          id="jumlah_jiwa"
          min="0"
          placeholder="0"
          value={jumlahJiwa || ''}
          onChange={(e) => setJumlahJiwa(Number(e.target.value))}
          className="w-full md:w-32 p-2 border border-gray-300 rounded-lg text-lg text-center"
        />
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
        >
          Hitung Zakat Fitrah
        </button>
      </div>
    </div>
  );
};

export default ZakatFitrahCalculator;
