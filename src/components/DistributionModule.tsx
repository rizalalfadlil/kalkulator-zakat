import React, { useState, useEffect } from "react";
import MustahikCard from "./MustahikCard";
import { MustahikSelection, MustahikType } from "../types/zakat";
import { dalilMustahik } from "../constants/zakatConstants";
import { IoIosWarning } from "react-icons/io";

interface DistributionModuleProps {
  totalZakat: number;
}

const DistributionModule: React.FC<DistributionModuleProps> = ({
  totalZakat,
}) => {
  const [mustahikSelection, setMustahikSelection] = useState<MustahikSelection>(
    {
      fakir: false,
      miskin: false,
      amil: false,
      muallaf: false,
      riqab: false,
      gharim: false,
      fi_sabilillah: false,
      ibnu_sabil: false,
    }
  );

  const [validationMessage, setValidationMessage] = useState<string>("");
  const [distribution, setDistribution] = useState<Record<string, number>>({});

  useEffect(() => {
    calculateDistribution();
  }, [mustahikSelection, totalZakat]);

  const calculateDistribution = () => {
    if (totalZakat <= 0) return;

    const checkedMustahiks = Object.keys(mustahikSelection).filter(
      (key) => mustahikSelection[key]
    ) as MustahikType[];

    setValidationMessage("");

    const isFakirMiskinChecked =
      checkedMustahiks.includes("fakir") || checkedMustahiks.includes("miskin");
    const isAmilOnly =
      checkedMustahiks.length === 1 && checkedMustahiks[0] === "amil";
    const isSkippingPriors =
      !isFakirMiskinChecked &&
      checkedMustahiks.length > 0 &&
      (checkedMustahiks.includes("fi_sabilillah") ||
        checkedMustahiks.includes("ibnu_sabil") ||
        checkedMustahiks.includes("muallaf"));

    let hasError = false;
    if (isAmilOnly) {
      setValidationMessage(
        "Distribusi tidak sesuai syariah, Zakat tidak boleh dibagikan ke Amil saja. Prioritas utama adalah Fakir & Miskin."
      );
      hasError = true;
    }
    if (isSkippingPriors) {
      setValidationMessage(
        "Distribusi tidak sesuai syariah, Golongan Fakir dan Miskin adalah prioritas utama dan tidak boleh dilewati jika masih ada."
      );
      hasError = true;
    }

    let zakatSisa = totalZakat;
    let porsiAmil = 0;
    let nonAmilCount = 0;

    checkedMustahiks.forEach((id) => {
      if (id !== "amil") {
        nonAmilCount++;
      }
    });

    if (mustahikSelection.amil) {
      porsiAmil = totalZakat * 0.125;
      zakatSisa = totalZakat - porsiAmil;
    }

    const porsiPerMustahik = nonAmilCount > 0 ? zakatSisa / nonAmilCount : 0;

    const newDistribution: Record<string, number> = {};
    checkedMustahiks.forEach((id) => {
      if (hasError) {
        newDistribution[id] = 0;
      } else {
        newDistribution[id] = id === "amil" ? porsiAmil : porsiPerMustahik;
      }
    });

    setDistribution(newDistribution);
  };

  const handleCheckChange = (id: MustahikType, checked: boolean) => {
    setMustahikSelection({
      ...mustahikSelection,
      [id]: checked,
    });
  };

  if (totalZakat <= 0) return null;

  return (
    <div className="bg-white shado rounded p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Distribusi Zakat ke Mustahik
      </h2>

      <div className="bg-slate-50  p-4 rounded mb-6">
        <h3 className="font-bold text-lg text-gray-800">
          Dalil Distribusi Zakat (QS. At-Taubah [9]: 60)
        </h3>
        <blockquote className="italic text-gray-700 mt-2">
          "Sesungguhnya zakat itu hanyalah untuk (1) orang-orang fakir, (2)
          orang-orang miskin, (3) amil zakat, (4) orang-orang yang dilunakkan
          hatinya (muallaf), (5) untuk (memerdekakan) hamba sahaya, (6) untuk
          (membebaskan) orang-orang yang berutang, (7) untuk jalan Allah (fi
          sabilillah), dan (8) untuk orang-orang yang sedang dalam
          perjalanan..."
        </blockquote>
      </div>

      <p className="mb-4 text-gray-600">
        Silakan centang golongan mustahik yang akan Anda beri zakat. Sistem akan
        menghitung alokasi dana dan memberikan validasi syariah.
      </p>

      {validationMessage && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded mb-6 font-semibold">
          <IoIosWarning className="inline me-2 text-xl"/> {validationMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <MustahikCard
          id="fakir"
          label="Fakir"
          isChecked={mustahikSelection.fakir}
          dalil={dalilMustahik.fakir}
          porsi={distribution.fakir || 0}
          onCheckChange={(checked) => handleCheckChange("fakir", checked)}
        />
        <MustahikCard
          id="miskin"
          label="Miskin"
          isChecked={mustahikSelection.miskin}
          dalil={dalilMustahik.miskin}
          porsi={distribution.miskin || 0}
          onCheckChange={(checked) => handleCheckChange("miskin", checked)}
        />
        <MustahikCard
          id="amil"
          label="Amil"
          isChecked={mustahikSelection.amil}
          dalil={dalilMustahik.amil}
          porsi={distribution.amil || 0}
          onCheckChange={(checked) => handleCheckChange("amil", checked)}
        />
        <MustahikCard
          id="muallaf"
          label="Muallaf"
          isChecked={mustahikSelection.muallaf}
          dalil={dalilMustahik.muallaf}
          porsi={distribution.muallaf || 0}
          onCheckChange={(checked) => handleCheckChange("muallaf", checked)}
        />
        <MustahikCard
          id="riqab"
          label="Riqab (Hamba Sahaya)"
          isChecked={mustahikSelection.riqab}
          dalil={dalilMustahik.riqab}
          porsi={distribution.riqab || 0}
          onCheckChange={(checked) => handleCheckChange("riqab", checked)}
        />
        <MustahikCard
          id="gharim"
          label="Gharim (Orang Berutang)"
          isChecked={mustahikSelection.gharim}
          dalil={dalilMustahik.gharim}
          porsi={distribution.gharim || 0}
          onCheckChange={(checked) => handleCheckChange("gharim", checked)}
        />
        <MustahikCard
          id="fi_sabilillah"
          label="Fi Sabilillah"
          isChecked={mustahikSelection.fi_sabilillah}
          dalil={dalilMustahik.fi_sabilillah}
          porsi={distribution.fi_sabilillah || 0}
          onCheckChange={(checked) =>
            handleCheckChange("fi_sabilillah", checked)
          }
        />
        <MustahikCard
          id="ibnu_sabil"
          label="Ibnu Sabil (Musafir)"
          isChecked={mustahikSelection.ibnu_sabil}
          dalil={dalilMustahik.ibnu_sabil}
          porsi={distribution.ibnu_sabil || 0}
          onCheckChange={(checked) => handleCheckChange("ibnu_sabil", checked)}
        />
      </div>
    </div>
  );
};

export default DistributionModule;
