import React, { useState } from 'react';
import HartaEmas from './maal/HartaEmas';
import HartaPerak from './maal/HartaPerak';
import HartaUang from './maal/HartaUang';
import HartaPertanian from './maal/HartaPertanian';
import HartaPeternakan from './maal/HartaPeternakan';
import HartaRikaz from './maal/HartaRikaz';
import { MaalData } from '../types/zakat';
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
  NISAB_SAPI
} from '../constants/zakatConstants';
import { formatRupiah } from '../utils/formatters';

interface ZakatMaalCalculatorProps {
  onCalculate: (total: number) => void;
}

const ZakatMaalCalculator: React.FC<ZakatMaalCalculatorProps> = ({ onCalculate }) => {
  const [checkedHarta, setCheckedHarta] = useState({
    emas: false,
    perak: false,
    uang: false,
    pertanian: false,
    peternakan: false,
    rikaz: false
  });

  const [maalData, setMaalData] = useState<MaalData>({});
  const [argumenMessages, setArgumenMessages] = useState<string[]>([]);
  const [hasilLevel1, setHasilLevel1] = useState<string>('');

  const calculateZakat = () => {
    let totalZakat = 0;
    const messages: string[] = [];
    let level1Result = '';

    if (checkedHarta.emas && maalData.emas) {
      const { gram, haul } = maalData.emas;
      if (gram >= NISAB_EMAS_GRAM && haul >= 1) {
        const zakat = 0.025 * gram * HARGA_EMAS_PER_GRAM;
        totalZakat += zakat;
        messages.push(`Anda wajib zakat Emas (${gram} gr) sebesar ${formatRupiah(zakat)} karena telah mencapai nisab (85 gr) dan haul (1 tahun).`);
        level1Result = 'Wajib Zakat';
      } else {
        messages.push(`Anda TIDAK wajib zakat Emas (${gram} gr) karena belum mencapai nisab (85 gr) atau haul (1 tahun).`);
        level1Result = 'Tidak Wajib Zakat';
      }
    }

    if (checkedHarta.perak && maalData.perak) {
      const { gram, haul } = maalData.perak;
      if (gram >= NISAB_PERAK_GRAM && haul >= 1) {
        const zakat = 0.025 * gram * HARGA_PERAK_PER_GRAM;
        totalZakat += zakat;
        messages.push(`Anda wajib zakat Perak (${gram} gr) sebesar ${formatRupiah(zakat)}.`);
      }
    }

    if (checkedHarta.uang && maalData.uang) {
      const { total, haul } = maalData.uang;
      if (total >= NISAB_MAAL_RUPIAH && haul >= 1) {
        const zakat = 0.025 * total;
        totalZakat += zakat;
        messages.push(`Anda wajib zakat Harta (Uang/Penghasilan/Dagang/Investasi) sebesar ${formatRupiah(zakat)}.`);
      }
    }

    if (checkedHarta.pertanian && maalData.pertanian) {
      const { kg, irigasi } = maalData.pertanian;
      if (kg >= NISAB_PERTANIAN_KG) {
        const kadar = irigasi === 'berbayar' ? 0.05 : 0.10;
        const zakat = kadar * kg * HARGA_BERAS_PER_KG;
        totalZakat += zakat;
        messages.push(`Anda wajib zakat Pertanian (${kg} kg) sebesar ${formatRupiah(zakat)} (kadar ${kadar * 100}%).`);
      }
    }

    if (checkedHarta.peternakan && maalData.peternakan) {
      const { kambing, sapi, haul } = maalData.peternakan;
      if (haul >= 1) {
        if (kambing >= NISAB_KAMBING) {
          let zakatKambing = 0;
          if (kambing <= 120) zakatKambing = 1 * HARGA_KAMBING;
          else if (kambing <= 200) zakatKambing = 2 * HARGA_KAMBING;
          else if (kambing <= 399) zakatKambing = 3 * HARGA_KAMBING;
          totalZakat += zakatKambing;
          messages.push(`Anda wajib zakat Kambing (${kambing} ekor) senilai ${formatRupiah(zakatKambing)}.`);
        }
        if (sapi >= NISAB_SAPI) {
          let zakatSapi = 0;
          if (sapi <= 39) zakatSapi = 1 * HARGA_SAPI_1TH;
          else if (sapi <= 59) zakatSapi = 1 * HARGA_SAPI_2TH;
          totalZakat += zakatSapi;
          messages.push(`Anda wajib zakat Sapi (${sapi} ekor) senilai ${formatRupiah(zakatSapi)}.`);
        }
      }
    }

    if (checkedHarta.rikaz && maalData.rikaz) {
      const { nilai, jenis } = maalData.rikaz;
      if (jenis === 'rikaz' && nilai > 0) {
        const zakat = 0.20 * nilai;
        totalZakat += zakat;
        messages.push(`Anda wajib zakat Rikaz (Harta Temuan) sebesar ${formatRupiah(zakat)} (kadar 20%).`);
      } else if (jenis === 'tambang' && nilai >= NISAB_MAAL_RUPIAH) {
        const zakat = 0.025 * nilai;
        totalZakat += zakat;
        messages.push(`Anda wajib zakat Hasil Tambang sebesar ${formatRupiah(zakat)} (kadar 2.5%).`);
      }
    }

    setArgumenMessages(messages);
    setHasilLevel1(level1Result);
    onCalculate(totalZakat);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Kalkulator Zakat Maal (Harta)</h2>
      <p className="mb-2 text-gray-600">Centang harta yang Anda miliki dan isi nilainya. Semua nilai akan dikonversi ke Rupiah.</p>
      <p className="mb-4 text-sm text-gray-500 italic">Asumsi (sesuai soal): 1 gram emas = Rp 2.321.000. Nisab Harta = 85 gram emas = Rp 197.285.000.</p>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6">
        <h3 className="font-bold">Hukum Logika dalam Keputusan Zakat (Level 3)</h3>
        <p>Hukum logika pada perhitungan zakat di atas yaitu menggunakan hukum <strong>Implikasi</strong> dan <strong>Konjungsi (AND)</strong>. Contoh: <br />
        <strong>PREMIS 1:</strong> Seseorang memiliki emas. <br />
        <strong>PREMIS 2 (Kondisi):</strong> <strong>JIKA</strong> (Jumlah Emas ≥ 85 gram) <strong>DAN</strong> (Lama Kepemilikan ≥ 1 tahun) <br />
        <strong>KONKLUSI (Implikasi):</strong> <strong>MAKA</strong> (Dia Wajib Membayar Zakat Emas).</p>
      </div>

      <div className="space-y-6">
        <HartaEmas
          isChecked={checkedHarta.emas}
          onCheckChange={(checked) => setCheckedHarta({...checkedHarta, emas: checked})}
          gram={maalData.emas?.gram || 0}
          haul={maalData.emas?.haul || 0}
          onGramChange={(value) => setMaalData({...maalData, emas: {...maalData.emas, gram: value, haul: maalData.emas?.haul || 0}})}
          onHaulChange={(value) => setMaalData({...maalData, emas: {...maalData.emas, gram: maalData.emas?.gram || 0, haul: value}})}
        />

        <HartaPerak
          isChecked={checkedHarta.perak}
          onCheckChange={(checked) => setCheckedHarta({...checkedHarta, perak: checked})}
          gram={maalData.perak?.gram || 0}
          haul={maalData.perak?.haul || 0}
          onGramChange={(value) => setMaalData({...maalData, perak: {...maalData.perak, gram: value, haul: maalData.perak?.haul || 0}})}
          onHaulChange={(value) => setMaalData({...maalData, perak: {...maalData.perak, gram: maalData.perak?.gram || 0, haul: value}})}
        />

        <HartaUang
          isChecked={checkedHarta.uang}
          onCheckChange={(checked) => setCheckedHarta({...checkedHarta, uang: checked})}
          total={maalData.uang?.total || 0}
          haul={maalData.uang?.haul || 0}
          onTotalChange={(value) => setMaalData({...maalData, uang: {...maalData.uang, total: value, haul: maalData.uang?.haul || 0}})}
          onHaulChange={(value) => setMaalData({...maalData, uang: {...maalData.uang, total: maalData.uang?.total || 0, haul: value}})}
        />

        <HartaPertanian
          isChecked={checkedHarta.pertanian}
          onCheckChange={(checked) => setCheckedHarta({...checkedHarta, pertanian: checked})}
          kg={maalData.pertanian?.kg || 0}
          irigasi={maalData.pertanian?.irigasi || 'berbayar'}
          onKgChange={(value) => setMaalData({...maalData, pertanian: {...maalData.pertanian, kg: value, irigasi: maalData.pertanian?.irigasi || 'berbayar'}})}
          onIrigasiChange={(value) => setMaalData({...maalData, pertanian: {...maalData.pertanian, kg: maalData.pertanian?.kg || 0, irigasi: value}})}
        />

        <HartaPeternakan
          isChecked={checkedHarta.peternakan}
          onCheckChange={(checked) => setCheckedHarta({...checkedHarta, peternakan: checked})}
          kambing={maalData.peternakan?.kambing || 0}
          sapi={maalData.peternakan?.sapi || 0}
          haul={maalData.peternakan?.haul || 0}
          onKambingChange={(value) => setMaalData({...maalData, peternakan: {...maalData.peternakan, kambing: value, sapi: maalData.peternakan?.sapi || 0, haul: maalData.peternakan?.haul || 0}})}
          onSapiChange={(value) => setMaalData({...maalData, peternakan: {...maalData.peternakan, kambing: maalData.peternakan?.kambing || 0, sapi: value, haul: maalData.peternakan?.haul || 0}})}
          onHaulChange={(value) => setMaalData({...maalData, peternakan: {...maalData.peternakan, kambing: maalData.peternakan?.kambing || 0, sapi: maalData.peternakan?.sapi || 0, haul: value}})}
        />

        <HartaRikaz
          isChecked={checkedHarta.rikaz}
          onCheckChange={(checked) => setCheckedHarta({...checkedHarta, rikaz: checked})}
          nilai={maalData.rikaz?.nilai || 0}
          jenis={maalData.rikaz?.jenis || 'rikaz'}
          onNilaiChange={(value) => setMaalData({...maalData, rikaz: {...maalData.rikaz, nilai: value, jenis: maalData.rikaz?.jenis || 'rikaz'}})}
          onJenisChange={(value) => setMaalData({...maalData, rikaz: {...maalData.rikaz, nilai: maalData.rikaz?.nilai || 0, jenis: value}})}
        />
      </div>

      <button
        onClick={calculateZakat}
        className="mt-8 w-full bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
      >
        Hitung Total Zakat Maal
      </button>

      {argumenMessages.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
          <h3 className="font-bold">Argumen Logis (Level 4)</h3>
          <div className="space-y-1">
            {argumenMessages.map((msg, idx) => (
              <p key={idx}>🔹 {msg}</p>
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

export default ZakatMaalCalculator;
