"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  PlusCircle,
  Trash2,
  Edit2,
  Lock,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  Check,
} from "lucide-react";

interface RoleItem {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: boolean;
  created_at: string;
}

export default function RolesManagementPage() {
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [newRolePerms, setNewRolePerms] = useState("read,publish");

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/roles");
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengambil daftar role.");
      }
      setRoles(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newRoleName,
          description: newRoleDesc,
          permissions: newRolePerms,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal membuat role baru.");
      }

      setModalOpen(false);
      setNewRoleName("");
      setNewRoleDesc("");
      setNewRolePerms("read,publish");
      await fetchRoles();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRole = async (roleId: string, roleName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus role "${roleName}"?`)) {
      return;
    }
    setError(null);
    try {
      const res = await fetch(`/api/admin/roles?id=${encodeURIComponent(roleId)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menghapus role.");
      }
      await fetchRoles();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F3F6D]/50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11223D] border border-[#1F3F6D] text-[#60C1E5] text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Manajemen Izin & Hak Akses</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Kelola Role
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Atur role pengguna bawaan sistem serta buat role khusus sesuai struktur tim studio Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-lg shadow-[#005A9C]/30 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Role Baru</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#60C1E5] mb-2" />
            <span>Memuat data role...</span>
          </div>
        ) : (
          roles.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5]/60 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#005A9C]/40 text-[#60C1E5] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
                      {item.name}
                    </h3>
                  </div>

                  {item.is_system ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1B365D] text-[#A0E0EF] border border-[#60C1E5]/30">
                      <Lock className="w-3 h-3 text-[#60C1E5]" />
                      <span>Sistem</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-600">
                      Kustom
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description || "Tidak ada deskripsi."}
                </p>

                <div className="p-3 rounded-xl bg-[#0B1528] border border-[#1F3F6D] mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Izin / Permissions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.permissions.split(",").map((perm, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#11223D] border border-[#1F3F6D] text-[10px] font-mono text-[#60C1E5]"
                      >
                        {perm.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F3F6D]/50 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {item.is_system
                    ? "Role inti tidak dapat dihapus"
                    : "Role non-sistem dapat dihapus"}
                </span>

                {!item.is_system && (
                  <button
                    onClick={() => handleDeleteRole(item.id, item.name)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/40 transition-colors"
                    title="Hapus Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Tambah Role Baru */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#11223D] border border-[#60C1E5]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F3F6D]">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-[#60C1E5]" />
                <h3 className="font-heading text-lg font-bold">Tambah Role Baru</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-[#0B1528] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nama Role (contoh: editor, author) *
                </label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="editor"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Deskripsi Tanggung Jawab
                </label>
                <input
                  type="text"
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Bertugas menulis dan menyunting draft berita"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Permissions (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={newRolePerms}
                  onChange={(e) => setNewRolePerms(e.target.value)}
                  placeholder="read,publish,news_create"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-sm font-mono"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#162C4E] border border-[#1F3F6D] text-slate-300 text-xs font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Simpan Role</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

