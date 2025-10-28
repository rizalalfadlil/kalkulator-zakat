import React from "react";
import { formatRupiah } from "../utils/formatters";

interface TotalZakatDisplayProps {
  total: number;
}

const TotalZakatDisplay: React.FC<TotalZakatDisplayProps> = ({ total }) => {
  if (total <= 0) return null;

  return (
    <div className="bg-white shado rounded p-6 md:p-8 mb-6 sticky top-4 z-10">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-2">
        Total Zakat yang Wajib Anda Bayar:
      </h2>
      <p className="text-3xl md:text-5xl font-bold text-center text-green-600">
        {formatRupiah(total)}
      </p>
    </div>
  );
};

export default TotalZakatDisplay;
