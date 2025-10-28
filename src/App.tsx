import React, { useState } from "react";
import Header from "./components/Header";
import ZakatTypeSelector from "./components/ZakatTypeSelector";
import ZakatFitrahCalculator from "./components/ZakatFitrahCalculator";
import ZakatMalCalculator from "./components/ZakatMalCalculator";
import TotalZakatDisplay from "./components/TotalZakatDisplay";
import DistributionModule from "./components/DistributionModule";
import { ZakatType } from "./types/zakat";
import Footer from "./components/Footer";

function App() {
  const [zakatType, setZakatType] = useState<ZakatType>(null);
  const [totalZakat, setTotalZakat] = useState<number>(0);

  const handleTypeChange = (type: ZakatType) => {
    setZakatType(type);
    setTotalZakat(0);
  };

  const handleCalculate = (total: number) => {
    setTotalZakat(total);
    setTimeout(() => {
      document
        .getElementById("total-display")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans leading-normal text-gray-800">
      <Header />
      <div className="max-w-5xl mx-auto p-4 md:p-8 grow">
        <ZakatTypeSelector
          selectedType={zakatType}
          onTypeChange={handleTypeChange}
        />

        {zakatType === "fitrah" && (
          <ZakatFitrahCalculator onCalculate={handleCalculate} />
        )}

        {zakatType === "mal" && (
          <ZakatMalCalculator onCalculate={handleCalculate} />
        )}

        <div id="total-display">
          <TotalZakatDisplay total={totalZakat} />
        </div>

        <DistributionModule totalZakat={totalZakat} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
