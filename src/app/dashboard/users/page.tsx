"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Shield,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role_id: string;
  role_name: string;
  status: "active" | "inactive";
  created_at: string;
}

interface RoleItem {
  id: string;
  name: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengambil daftar pengguna.");
      }
      setUsers(data.data || []);
      setRoles(data.roles || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRoleId: string) => {
    setActionLoadingId(userId);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role_id: newRoleId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengubah role pengguna.");
      }
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: "active" | "inactive") => {
    setActionLoadingId(userId);
    setError(null);
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengubah status pengguna.");
      }
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus akun "${userName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }
    setActionLoadingId(userId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users?id=${encodeURIComponent(userId)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menghapus pengguna.");
      }
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role_name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F3F6D]/50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11223D] border border-[#1F3F6D] text-[#60C1E5] text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Manajemen Akses Pengguna</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Kelola Pengguna
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantau akun terdaftar, ubah hak akses (role), serta aktifkan atau nonaktifkan status user.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#11223D] hover:bg-[#162C4E] border border-[#1F3F6D] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#11223D] border border-[#1F3F6D]">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama, email, atau role..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#11223D] border border-[#1F3F6D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0B1528] border-b border-[#1F3F6D] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Pengguna</th>
                <th className="py-3.5 px-4">Role Akses</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Tanggal Daftar</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F3F6D]/40">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#60C1E5] mb-2" />
                    <span>Memuat data pengguna...</span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    Tidak ada pengguna yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((item) => {
                  const isActionLoading = actionLoadingId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-[#162C4E]/40 transition-colors">
                      {/* Name & Email */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-white text-sm">{item.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.email}</div>
                      </td>

                      {/* Role Selector */}
                      <td className="py-4 px-4">
                        <select
                          value={item.role_id}
                          disabled={isActionLoading}
                          onChange={(e) => handleRoleChange(item.id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-xs font-semibold text-white focus:outline-none focus:border-[#60C1E5]"
                        >
                          {roles.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Status Badge & Toggle */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleStatusToggle(item.id, item.status)}
                          disabled={isActionLoading}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
                            item.status === "active"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/50"
                              : "bg-red-950/80 text-red-300 border border-red-500/30 hover:bg-red-900/50"
                          }`}
                          title="Klik untuk mengubah status aktif/nonaktif"
                        >
                          {item.status === "active" ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-400" />
                              <span>Nonaktif</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-slate-400">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          disabled={isActionLoading}
                          className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/40 transition-colors disabled:opacity-40"
                          title="Hapus Pengguna"
                        >
                          {isActionLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

