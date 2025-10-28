import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">UTS Logika Matematika</h1>
      <h2 className="text-xl md:text-2xl font-semibold text-blue-600">Kalkulator Zakat Berdalil (Level 10)</h2>
      <div className="border-t-2 border-gray-200 mt-4 pt-4 text-left text-gray-700 w-full md:w-1/2 mx-auto space-y-1">
        <p><strong>NIM:</strong> <em>[Isi NIM Anda di sini]</em></p>
        <p><strong>Nama:</strong> <em>[Isi Nama Anda di sini]</em></p>
        <p><strong>Kelas:</strong> <em>[Isi Kelas Anda di sini]</em></p>
        <p><strong>Dosen:</strong> <em>[Isi Nama Dosen Anda di sini]</em></p>
        <p><strong>Kampus:</strong> <em>[Isi Nama Kampus Anda di sini]</em></p>
        <p><strong>Link Deploy:</strong> <a href="https://uts-logma-anda.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"><em>https://uts-logma-anda.vercel.app</em></a></p>
      </div>
    </header>
  );
};

export default Header;
