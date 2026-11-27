import Link from "next/link";
import { findAll, User, Role, News, isAppsScriptConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  Users,
  Shield,
  Newspaper,
  PlusCircle,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  Database,
  ExternalLink,
} from "lucide-react";

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  const users = await findAll<User>("Users");
  const roles = await findAll<Role>("Roles");
  const news = await findAll<News>("News");

  const publishedCount = news.filter((n) => n.status === "published").length;
  const draftCount = news.filter((n) => n.status === "draft").length;
  const activeUsersCount = users.filter((u) => u.status === "active").length;
  const isConnected = isAppsScriptConfigured();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F3F6D]/50">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Dashboard Kontrol MeSea
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Selamat datang kembali, <strong className="text-white">{user?.name}</strong>. Kelola pengguna, role, dan publikasi berita studio Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/news"
            className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-lg shadow-[#005A9C]/30 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
          </Link>
        </div>
      </div>

      {/* Security Warning Box for Default Admin Password */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">
              Peringatan Keamanan Kredensial Admin Awal
            </h4>
            <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
              Akun admin saat ini menggunakan password awal (<code className="text-white bg-black/40 px-1.5 py-0.5 rounded font-mono">123456</code>). Sangat disarankan untuk segera mengganti password demi keamanan website Anda sebelum dipublikasikan ke production.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/profile"
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-colors flex items-center justify-center gap-1.5"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Ganti Password Sekarang</span>
        </Link>
      </div>

      {/* Stats 4-Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Users */}
        <div className="p-5 rounded-2xl bg-[#11223D] border border-[#1F3F6D] relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Pengguna
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#005A9C]/40 text-[#60C1E5] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-heading text-white">
            {users.length}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">{activeUsersCount} Aktif</span> • {users.length - activeUsersCount} Nonaktif
          </div>
        </div>

        {/* Card 2: Published News */}
        <div className="p-5 rounded-2xl bg-[#11223D] border border-[#1F3F6D] relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Berita Rilis
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#005A9C]/40 text-[#60C1E5] flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-heading text-[#60C1E5]">
            {publishedCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Tampil langsung di Landing Page
          </div>
        </div>

        {/* Card 3: Draft News */}
        <div className="p-5 rounded-2xl bg-[#11223D] border border-[#1F3F6D] relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Draf Artikel
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#1B365D] text-slate-300 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-heading text-white">
            {draftCount}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Belum dipublikasikan
          </div>
        </div>

        {/* Card 4: Roles */}
        <div className="p-5 rounded-2xl bg-[#11223D] border border-[#1F3F6D] relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Role Akses
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#005A9C]/40 text-[#60C1E5] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-heading text-white">
            {roles.length}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Admin & User (Bawaan) + Custom
          </div>
        </div>
      </div>

      {/* Integration Guide Box if local mode */}
      {!isConnected && (
        <div className="p-6 rounded-2xl bg-[#11223D] border border-[#60C1E5]/30 space-y-3">
          <div className="flex items-center gap-2.5 text-[#60C1E5]">
            <Database className="w-5 h-5" />
            <h3 className="font-heading text-base font-bold text-white">
              Koneksi Google Spreadsheet
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Aplikasi saat ini berjalan menggunakan <strong>Local Store</strong> yang aman dan siap pakai. Untuk menyambungkan ke Google Spreadsheet Anda secara penuh:
          </p>
          <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 pl-1">
            <li>Buat Google Spreadsheet baru di Google Drive Anda.</li>
            <li>Buka menu <em>Extensions &gt; Apps Script</em>.</li>
            <li>Salin file <code className="text-[#A0E0EF]">code.gs</code> dan <code className="text-[#A0E0EF]">setup.gs</code> yang sudah disediakan di folder proyek.</li>
            <li>Jalankan fungsi <code className="text-[#60C1E5]">initTables()</code> sekali untuk membuat seluruh header sheet.</li>
            <li>Deploy sebagai Web App dan isi URL serta Secret ke file <code className="text-[#60C1E5]">.env.local</code>.</li>
          </ol>
          <div className="pt-2">
            <Link
              href="/dashboard/news"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60C1E5] hover:underline"
            >
              <span>Pelajari panduan lengkap di documentation/SETUP.md</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Recent News Preview Section */}
      <div className="p-6 rounded-2xl bg-[#11223D] border border-[#1F3F6D] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base sm:text-lg font-bold text-white">
            Daftar Berita & Devlog Terbaru
          </h3>
          <Link
            href="/dashboard/news"
            className="text-xs font-bold text-[#60C1E5] hover:text-[#A0E0EF] flex items-center gap-1 transition-colors"
          >
            <span>Kelola Semua Berita</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1F3F6D] text-slate-400 font-semibold">
                <th className="pb-3">Judul Berita</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Tanggal Dibuat</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F3F6D]/50">
              {news.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-[#162C4E]/40 transition-colors">
                  <td className="py-3.5 pr-4 font-medium text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "published"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-300 border border-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400 text-xs">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/dashboard/news"
                      className="text-xs font-bold text-[#60C1E5] hover:underline"
                    >
                      Buka
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

