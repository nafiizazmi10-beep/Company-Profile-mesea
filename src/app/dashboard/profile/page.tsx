"use client";

import { useState, useEffect } from "react";
import { KeyRound, Shield, User, Mail, CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  role_id: string;
  role_name?: string;
  status: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Gagal memuat info profil:", err);
      } finally {
        setLoadingUser(false);
      }
    }
    loadMe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage("Password baru minimal 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi password baru tidak cocok.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengubah password.");
      }

      setSuccessMessage("Password berhasil diperbarui! Gunakan password baru untuk login berikutnya.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#60C1E5]/10 border border-[#60C1E5]/30 text-[#60C1E5]">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">Profil & Keamanan Akun</h1>
            <p className="text-sm text-slate-400">
              Kelola informasi profil dan perbarui kata sandi akun MeSea Studio Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 rounded-2xl bg-[#0B1528] border border-[#1F3F6D] p-6 space-y-5 h-fit">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#60C1E5]" />
            <span>Informasi Akun</span>
          </h2>

          {loadingUser ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-[#60C1E5]" />
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Nama Lengkap</span>
                <p className="font-semibold text-white text-sm bg-[#11223D] px-3 py-2 rounded-lg border border-[#1F3F6D]">
                  {user?.name || "Memuat..."}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Alamat Email</span>
                <p className="font-mono text-slate-200 bg-[#11223D] px-3 py-2 rounded-lg border border-[#1F3F6D] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#60C1E5]" />
                  <span>{user?.email || "Memuat..."}</span>
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Peran (Role)</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#005A9C]/40 text-[#A0E0EF] border border-[#60C1E5]/40">
                  <Shield className="w-3.5 h-3.5" />
                  {user?.role_name || user?.role_id || "admin"}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Status Akun</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {user?.status === "active" ? "Aktif" : "Nonaktif"}
                </span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#1F3F6D]/50 text-xs text-slate-400 leading-relaxed">
            Perubahan email atau nama akun utama dapat dilakukan melalui spreadsheet atau oleh lead administrator.
          </div>
        </div>

        {/* Change Password Form */}
        <div className="md:col-span-2 rounded-2xl bg-[#0B1528] border border-[#1F3F6D] p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#60C1E5]" />
              <span>Ganti Kata Sandi (Password)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sangat disarankan segera mengganti password bawaan (<code className="text-[#60C1E5]">123456</code>) sebelum aplikasi dirilis ke publik.
            </p>
          </div>

          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password Saat Ini <span className="text-rose-400">*</span>
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan password saat ini (cth: 123456)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#11223D] border border-[#1F3F6D] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password Baru <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#11223D] border border-[#1F3F6D] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Ulangi Password Baru <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang password baru"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#11223D] border border-[#1F3F6D] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] transition-colors"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#11223D]/60 border border-[#1F3F6D]/50 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Tips Keamanan:</p>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                <li>Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol.</li>
                <li>Hindari menggunakan nama studio atau tanggal lahir.</li>
                <li>Simpan password Anda di password manager yang aman.</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm text-[#0B1528] bg-gradient-to-r from-[#60C1E5] to-[#A0E0EF] hover:from-[#A0E0EF] hover:to-[#60C1E5] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#60C1E5]/20 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan Perubahan...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Perbarui Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

