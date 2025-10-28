import React, { useState } from "react";
import HartaEmas from "./mal/HartaEmas";
import HartaPerak from "./mal/HartaPerak";
import HartaUang from "./mal/HartaUang";
import HartaPertanian from "./mal/HartaPertanian";
import HartaPeternakan from "./mal/HartaPeternakan";
import HartaRikaz from "./mal/HartaRikaz";
import { MalData } from "../types/zakat";
import {
  HARGA_EMAS_PER_GRAM,
  HARGA_PERAK_PER_GRAM,
  HARGA_BERAS_PER_KG,
  HARGA_KAMBING,
  HARGA_SAPI_1TH,
  HARGA_SAPI_2TH,
  NISAB_EMAS_GRAM,
  NISAB_PERAK_GRAM,
  NISAB_MAAL_RUPIAH,
  NISAB_PERTANIAN_KG,
  NISAB_KAMBING,
  NISAB_SAPI,
} from "../constants/zakatConstants";
import { formatRupiah } from "../utils/formatters";
import { TbPointFilled } from "react-icons/tb";

interface ZakatMalCalculatorProps {
  onCalculate: (total: number) => void;
}

const ZakatMalCalculator: React.FC<ZakatMalCalculatorProps> = ({
  onCalculate,
}) => {
  const [checkedHarta, setCheckedHarta] = useState({
    emas: false,
    perak: false,
    uang: false,
    pertanian: false,
    peternakan: false,
    rikaz: false,
  });

  const [malData, setMalData] = useState<MalData>({});
  const [argumenMessages, setArgumenMessages] = useState<string[]>([]);
  const [hasilLevel1, setHasilLevel1] = useState<string>("");

  const calculateZakat = () => {
    let totalZakat = 0;
    const messages: string[] = [];
    let level1Result = "";

    if (checkedHarta.emas && malData.emas) {
      const { gram, haul } = malData.emas;
      if (gram >= NISAB_EMAS_GRAM && haul >= 1) {
        const zakat = 0.025 * gram * HARGA_EMAS_PER_GRAM;
        totalZakat += zakat;
        messages.push(
          `Anda wajib zakat Emas sebesar ${formatRupiah(
            zakat
          )} karena telah mencapai nisab (85 gr) dan haul (1 tahun).`
        );
        level1Result = "Wajib Zakat";
      } else {
        messages.push(
          `Anda TIDAK wajib zakat Emas karena belum mencapai nisab (85 gr) atau haul (1 tahun).`
        );
        level1Result = "Tidak Wajib Zakat";
      }
    }

    if (checkedHarta.perak && malData.perak) {
      const { gram, haul } = malData.perak;
      if (gram >= NISAB_PERAK_GRAM && haul >= 1) {
        const zakat = 0.025 * gram * HARGA_PERAK_PER_GRAM;
        totalZakat += zakat;
        messages.push(
          `Anda wajib zakat Perak sebesar ${formatRupiah(zakat)}.`
        );
      } else {
        messages.push(
          `Anda TIDAK wajib zakat Perak karena belum mencapai nisab (595 gr) atau haul (1 tahun).`
        );
        level1Result = "Tidak Wajib Zakat";
      }
    }

    if (checkedHarta.uang && malData.uang) {
      const { total, haul } = malData.uang;
      if (total >= NISAB_MAAL_RUPIAH && haul >= 1) {
        const zakat = 0.025 * total;
        totalZakat += zakat;
        messages.push(
          `Anda wajib zakat Harta (Uang/Penghasilan/Dagang/Investasi) sebesar ${formatRupiah(
            zakat
          )}.`
        );
      } else {
        messages.push(
          `Anda TIDAK wajib zakat Harta karena belum mencapai nisab (Rp 197.285.000) atau haul (1 tahun).`
        );
        level1Result = "Tidak Wajib Zakat";
      }
    }

    if (checkedHarta.pertanian && malData.pertanian) {
      const { kg, irigasi } = malData.pertanian;
      if (kg >= NISAB_PERTANIAN_KG) {
        const kadar = irigasi === "berbayar" ? 0.05 : 0.1;
        const zakat = kadar * kg * HARGA_BERAS_PER_KG;
        totalZakat += zakat;
        messages.push(
          `Anda wajib zakat Pertanian sebesar ${formatRupiah(
            zakat
          )} (kadar ${kadar * 100}%).`
        );
      } else {
        messages.push(
          `Anda TIDAK wajib zakat Pertanian karena belum mencapai nisab (653 kg) atau haul (1 tahun).`
        );
        level1Result = "Tidak Wajib Zakat";
      }
    }

    if (checkedHarta.peternakan && malData.peternakan) {
      const { kambing, sapi, haul } = malData.peternakan;
      if (haul >= 1) {
        if (kambing >= NISAB_KAMBING) {
          let zakatKambing = 0;
          if (kambing <= 120) zakatKambing = 1 * HARGA_KAMBING;
          else if (kambing <= 200) zakatKambing = 2 * HARGA_KAMBING;
          else if (kambing <= 399) zakatKambing = 3 * HARGA_KAMBING;
          totalZakat += zakatKambing;
          messages.push(
            `Anda wajib zakat Kambing senilai ${formatRupiah(
              zakatKambing
            )}.`
          );
        } else {
          messages.push(
            `Anda TIDAK wajib zakat Kambing karena belum mencapai nisab (40 ekor) atau haul (1 tahun).`
          );
          level1Result = "Tidak Wajib Zakat";
        }
        if (sapi >= NISAB_SAPI) {
          let zakatSapi = 0;
          if (sapi <= 39) zakatSapi = 1 * HARGA_SAPI_1TH;
          else if (sapi <= 59) zakatSapi = 1 * HARGA_SAPI_2TH;
          totalZakat += zakatSapi;
          messages.push(
            `Anda wajib zakat Sapi senilai ${formatRupiah(
              zakatSapi
            )}.`
          );
        } else {
          messages.push(
            `Anda TIDAK wajib zakat Sapi karena belum mencapai nisab (30 ekor) atau haul (1 tahun).`
          );
          level1Result = "Tidak Wajib Zakat";
        }
      }
    }

    if (checkedHarta.rikaz && malData.rikaz) {
      const { nilai, jenis } = malData.rikaz;
      if (jenis === "rikaz" && nilai > 0) {
        const zakat = 0.2 * nilai;
        totalZakat += zakat;
        messages.push(
          `Anda wajib zakat Rikaz (Harta Temuan) sebesar ${formatRupiah(
            zakat
          )} (kadar 20%).`
        );
      } else if (jenis === "tambang" && nilai >= NISAB_MAAL_RUPIAH) {
        const zakat = 0.025 * nilai;
        totalZakat += zakat;
        messages.push(
          `Anda wajib zakat Hasil Tambang sebesar ${formatRupiah(
            zakat
          )} (kadar 2.5%).`
        );
      } else {
        messages.push(
          `Anda TIDAK wajib zakat ${jenis === "rikaz" ? "Rikaz" : "Hasil Tambang"} karena belum mencapai nisab (Rp 197.285.000) atau haul (1 tahun).`
        );
        level1Result = "Tidak Wajib Zakat";
      }
    }

    setArgumenMessages(messages);
    setHasilLevel1(level1Result);
    onCalculate(totalZakat);
  };

  return (
    <div className="bg-white shado rounded p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Kalkulator Zakat Mal (Harta)
      </h2>
      <p className="mb-2 text-gray-600">
        Centang harta yang Anda miliki dan isi nilainya. Semua nilai akan
        dikonversi ke Rupiah.
      </p>
      <p className="mb-4 text-sm text-gray-500 italic">
        Asumsi 1 gram emas = Rp 2.321.000. Nisab Harta = 85 gram emas = Rp
        197.285.000.
      </p>

      <div className="bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded mb-6">
        <h3 className="font-bold">Hukum Logika dalam Keputusan Zakat</h3>
        <p>
          Hukum logika pada perhitungan zakat di atas yaitu menggunakan hukum{" "}
          <strong>Implikasi</strong> dan <strong>Konjungsi (AND)</strong>.
          Contoh: <br />
          <strong>PREMIS 1:</strong> Seseorang memiliki emas. <br />
          <strong>PREMIS 2 (Kondisi):</strong> <strong>JIKA</strong> (Jumlah
          Emas ≥ 85 gram) <strong>DAN</strong> (Lama Kepemilikan ≥ 1 tahun){" "}
          <br />
          <strong>KONKLUSI (Implikasi):</strong> <strong>MAKA</strong> (Dia
          Wajib Membayar Zakat Emas).
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 *:h-fit">
        <HartaEmas
          isChecked={checkedHarta.emas}
          onCheckChange={(checked) =>
            setCheckedHarta({ ...checkedHarta, emas: checked })
          }
          gram={malData.emas?.gram || 0}
          haul={malData.emas?.haul || 0}
          onGramChange={(value) =>
            setMalData({
              ...malData,
              emas: {
                ...malData.emas,
                gram: value,
                haul: malData.emas?.haul || 0,
              },
            })
          }
          onHaulChange={(value) =>
            setMalData({
              ...malData,
              emas: {
                ...malData.emas,
                gram: malData.emas?.gram || 0,
                haul: value,
              },
            })
          }
        />

        <HartaPerak
          isChecked={checkedHarta.perak}
          onCheckChange={(checked) =>
            setCheckedHarta({ ...checkedHarta, perak: checked })
          }
          gram={malData.perak?.gram || 0}
          haul={malData.perak?.haul || 0}
          onGramChange={(value) =>
            setMalData({
              ...malData,
              perak: {
                ...malData.perak,
                gram: value,
                haul: malData.perak?.haul || 0,
              },
            })
          }
          onHaulChange={(value) =>
            setMalData({
              ...malData,
              perak: {
                ...malData.perak,
                gram: malData.perak?.gram || 0,
                haul: value,
              },
            })
          }
        />

        <HartaUang
          isChecked={checkedHarta.uang}
          onCheckChange={(checked) =>
            setCheckedHarta({ ...checkedHarta, uang: checked })
          }
          total={malData.uang?.total || 0}
          haul={malData.uang?.haul || 0}
          onTotalChange={(value) =>
            setMalData({
              ...malData,
              uang: {
                ...malData.uang,
                total: value,
                haul: malData.uang?.haul || 0,
              },
            })
          }
          onHaulChange={(value) =>
            setMalData({
              ...malData,
              uang: {
                ...malData.uang,
                total: malData.uang?.total || 0,
                haul: value,
              },
            })
          }
        />

        <HartaPertanian
          isChecked={checkedHarta.pertanian}
          onCheckChange={(checked) =>
            setCheckedHarta({ ...checkedHarta, pertanian: checked })
          }
          kg={malData.pertanian?.kg || 0}
          irigasi={malData.pertanian?.irigasi || "berbayar"}
          onKgChange={(value) =>
            setMalData({
              ...malData,
              pertanian: {
                ...malData.pertanian,
                kg: value,
                irigasi: malData.pertanian?.irigasi || "berbayar",
              },
            })
          }
          onIrigasiChange={(value) =>
            setMalData({
              ...malData,
              pertanian: {
                ...malData.pertanian,
                kg: malData.pertanian?.kg || 0,
                irigasi: value,
              },
            })
          }
        />

        <HartaPeternakan
          isChecked={checkedHarta.peternakan}
          onCheckChange={(checked) =>
            setCheckedHarta({ ...checkedHarta, peternakan: checked })
          }
          kambing={malData.peternakan?.kambing || 0}
          sapi={malData.peternakan?.sapi || 0}
          haul={malData.peternakan?.haul || 0}
          onKambingChange={(value) =>
            setMalData({
              ...malData,
              peternakan: {
                ...malData.peternakan,
                kambing: value,
                sapi: malData.peternakan?.sapi || 0,
                haul: malData.peternakan?.haul || 0,
              },
            })
          }
          onSapiChange={(value) =>
            setMalData({
              ...malData,
              peternakan: {
                ...malData.peternakan,
                kambing: malData.peternakan?.kambing || 0,
                sapi: value,
                haul: malData.peternakan?.haul || 0,
              },
            })
          }
          onHaulChange={(value) =>
            setMalData({
              ...malData,
              peternakan: {
                ...malData.peternakan,
                kambing: malData.peternakan?.kambing || 0,
                sapi: malData.peternakan?.sapi || 0,
                haul: value,
              },
            })
          }
        />

        <HartaRikaz
          isChecked={checkedHarta.rikaz}
          onCheckChange={(checked) =>
            setCheckedHarta({ ...checkedHarta, rikaz: checked })
          }
          nilai={malData.rikaz?.nilai || 0}
          jenis={malData.rikaz?.jenis || "rikaz"}
          onNilaiChange={(value) =>
            setMalData({
              ...malData,
              rikaz: {
                ...malData.rikaz,
                nilai: value,
                jenis: malData.rikaz?.jenis || "rikaz",
              },
            })
          }
          onJenisChange={(value) =>
            setMalData({
              ...malData,
              rikaz: {
                ...malData.rikaz,
                nilai: malData.rikaz?.nilai || 0,
                jenis: value,
              },
            })
          }
        />
      </div>

      <button
        onClick={calculateZakat}
        className="mt-8 w-full bg-slate-600 text-white font-bold text-lg py-3 px-6 rounded hover:bg-slate-700 transition-all"
      >
        Hitung Total Zakat Mal
      </button>

      {argumenMessages.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded">
          <h3 className="font-bold">Argumen Logis</h3>
          <div className="space-y-1">
            {argumenMessages.map((msg, idx) => (
              <p key={idx}><TbPointFilled className="inline me-2 text-xl"/> {msg}</p>
            ))}
          </div>
        </div>
      )}

      {hasilLevel1 && (
        <div className="mt-6 text-center text-lg font-semibold">
          {hasilLevel1}
        </div>
      )}
    </div>
  );
};

export default ZakatMalCalculator;
