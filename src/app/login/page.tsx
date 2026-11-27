"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { LogIn, Lock, Mail, AlertCircle, ArrowLeft, Loader2, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login gagal, periksa email dan password Anda.");
      }

      // Jika admin, arahkan ke dashboard. Jika user biasa, arahkan ke beranda
      if (data.user?.roleName === "admin" || data.user?.roleId === "role_admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
  };

  return (
    <div className="min-h-screen bg-[#08101E] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-[#60C1E5] selection:text-[#0B1528]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#005A9C]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#60C1E5] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Logo & Heading */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={160}
              height={40}
              className="h-10 w-auto mx-auto object-contain"
            />
          </Link>
          <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Masuk ke Portal MeSea
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Akses dashboard manajemen dan data terpadu studio.
          </p>
        </div>

        {/* Card Form */}
        <div className="mt-8 bg-[#11223D] border border-[#1F3F6D] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl relative">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-lg shadow-[#005A9C]/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sekarang</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="mt-6 pt-5 border-t border-[#1F3F6D]/60">
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="w-full py-2 px-3 rounded-lg bg-[#0B1528] hover:bg-[#162C4E] border border-[#1F3F6D] text-[11px] text-[#A0E0EF] flex items-center justify-center gap-2 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#60C1E5]" />
              <span>Gunakan Akun Default (admin@gmail.com / 123456)</span>
            </button>
          </div>

          <div className="mt-5 text-center text-xs text-slate-400">
            Belum memiliki akun?{" "}
            <Link
              href="/register"
              className="font-bold text-[#60C1E5] hover:text-[#A0E0EF] transition-colors"
            >
              Daftar akun baru di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

