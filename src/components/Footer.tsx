const Footer: React.FC = () => {
    const location = window.location.href;
  return (
    <footer className="p-4 bg-slate-800 text-slate-200 ">
      <div className="max-w-5xl mx-auto">
        <p className="text-2xl font-bold">UTS Logika Matematika</p>
        <p className="text-lg">Kalkulator Zakat</p>
        <hr className="mt-8 mb-4 border-slate-600" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="font-medium py-8 space-y-0.5 flex flex-col items-start ">
            <p>
              Hafidz Rizal Al-Fadlil{" "}
              <span className="bg-slate-300 text-slate-700 px-1.5 rounded-sm">
                256512014
              </span>
            </p>

            <p>Informatika Semester 1 (2025/2026)</p>
          </div>
          <div className="font-medium py-8 space-y-0.5 flex flex-col items-start">
            <p>Logika Matematika / Iin Solihin</p>
            <p>Ma'soem University</p>
          </div>
        </div>
        <hr className="my-8 border-slate-600" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm">link deployment</p>
            <p
              className="hover:underline font-semibold cursor-pointer"
              onClick={() => (window.location.href = location)}
            >
              {location}
            </p>
          </div>
          <div>
            <p className="text-sm">Source Code</p>
            <p
              className="hover:underline font-semibold cursor-pointer"
              onClick={() => (window.location.href = "https://github.com/rizalalfadlil/kalkulator-zakat")}
            >
              https://github.com/rizalalfadlil/kalkulator-zakat
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
