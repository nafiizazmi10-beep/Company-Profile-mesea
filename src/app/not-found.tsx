import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08101E] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#005A9C]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#60C1E5]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        <div className="inline-flex p-4 rounded-2xl bg-[#11223D] border border-[#1F3F6D] text-[#60C1E5] shadow-xl shadow-[#60C1E5]/10 animate-bounce">
          <Compass className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#60C1E5] bg-[#11223D] px-3.5 py-1 rounded-full border border-[#1F3F6D]">
            Sinyal Radar Terputus • Error 404
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
            Koordinat Hilang di Laut Dalam
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            Halaman atau sektor yang Anda cari berada di luar jangkauan sonar kami, telah dipindahkan, atau belum dieksplorasi.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-[#0B1528] bg-gradient-to-r from-[#60C1E5] to-[#A0E0EF] hover:from-[#A0E0EF] hover:to-[#60C1E5] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#60C1E5]/20"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Markas (Home)</span>
          </Link>
          <Link
            href="/#news"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Kabar Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

