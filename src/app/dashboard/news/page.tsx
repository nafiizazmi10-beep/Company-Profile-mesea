"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Newspaper,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Upload,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  Check,
  Calendar,
  FileText,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
}

export default function NewsManagementPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [previewItem, setPreviewItem] = useState<NewsItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("/images/hero-abyssal-odyssey.png");
  const [status, setStatus] = useState<"published" | "draft">("published");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengambil data berita.");
      }
      setNews(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setThumbnailPath("/images/hero-abyssal-odyssey.png");
    setStatus("published");
    setFormModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setExcerpt(item.excerpt);
    setContent(item.content || "");
    setThumbnailPath(item.thumbnail_path || "/images/hero-abyssal-odyssey.png");
    setStatus(item.status);
    setFormModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah file.");
      }

      setThumbnailPath(data.filePath);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      excerpt,
      content,
      thumbnail_path: thumbnailPath,
      status,
    };

    try {
      let res: Response;
      if (editingItem) {
        res = await fetch("/api/admin/news", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
      } else {
        res = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menyimpan artikel.");
      }

      setFormModalOpen(false);
      await fetchNews();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Hapus artikel berita "${itemTitle}"?`)) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/news?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menghapus artikel.");
      }
      await fetchNews();
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
            <Newspaper className="w-3.5 h-3.5" />
            <span>Manajemen Publikasi Konten</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            CRUD Berita & Devlog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Buat, sunting, unggah gambar thumbnail, dan kelola rilis berita yang tampil di landing page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchNews}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-xl bg-[#11223D] hover:bg-[#162C4E] border border-[#1F3F6D] text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-lg shadow-[#005A9C]/30 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
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

      {/* News Table Card */}
      <div className="bg-[#11223D] border border-[#1F3F6D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0B1528] border-b border-[#1F3F6D] text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Artikel</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Tanggal Rilis</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F3F6D]/40">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#60C1E5] mb-2" />
                    <span>Memuat data berita...</span>
                  </td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Belum ada artikel berita. Klik &quot;Tulis Berita Baru&quot; untuk memulai.
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-[#162C4E]/40 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-[#0B1528] border border-[#1F3F6D] relative shrink-0">
                          <Image
                            src={item.thumbnail_path || "/images/hero-abyssal-odyssey.png"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm truncate max-w-md">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-400 truncate max-w-sm mt-0.5">
                            {item.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "published"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-300 border border-slate-600"
                        }`}
                      >
                        {item.status === "published" ? "DIPUBLIKASIKAN" : "DRAF"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Preview */}
                        <button
                          onClick={() => {
                            setPreviewItem(item);
                            setPreviewModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#0B1528] hover:bg-[#162C4E] text-slate-300 hover:text-[#60C1E5] border border-[#1F3F6D] transition-colors"
                          title="Pratinjau Artikel"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg bg-[#0B1528] hover:bg-[#162C4E] text-slate-300 hover:text-white border border-[#1F3F6D] transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/40 transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form: Tulis / Edit Berita */}
      {formModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#11223D] border border-[#60C1E5]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F3F6D]">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5 text-[#60C1E5]" />
                <h3 className="font-heading text-lg font-bold">
                  {editingItem ? "Sunting Artikel Berita" : "Tulis Berita Baru"}
                </h3>
              </div>
              <button
                onClick={() => setFormModalOpen(false)}
                className="p-1.5 rounded-lg bg-[#0B1528] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: MeSea Studio Mengumumkan Pembaruan Musim Keempat"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-sm"
                />
              </div>

              {/* Ringkasan */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Ringkasan Singkat (Excerpt) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat yang tampil pada kartu di halaman depan..."
                  className="w-full px-4 py-2 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-sm resize-none"
                />
              </div>

              {/* Konten Lengkap */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Isi Konten Berita / Devlog Lengkap
                </label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan cerita, patch notes, atau detail pengumuman secara mendalam di sini..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] text-sm resize-none"
                />
              </div>

              {/* Thumbnail Upload & Path */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Gambar Thumbnail (Upload Lokal)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-20 h-14 rounded-lg overflow-hidden bg-[#0B1528] border border-[#1F3F6D] relative shrink-0">
                    <Image
                      src={thumbnailPath}
                      alt="Pratinjau Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="w-full py-2 px-3 rounded-lg bg-[#0B1528] hover:bg-[#162C4E] border border-dashed border-[#1F3F6D] hover:border-[#60C1E5] cursor-pointer flex items-center justify-center gap-2 text-xs text-slate-300 transition-colors">
                      <Upload className="w-4 h-4 text-[#60C1E5]" />
                      <span>{uploading ? "Mengunggah..." : "Pilih File Gambar Baru (PNG, JPG, WebP)"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={thumbnailPath}
                      onChange={(e) => setThumbnailPath(e.target.value)}
                      placeholder="/images/hero-abyssal-odyssey.png"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-[11px] text-slate-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Status Publikasi
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === "published"}
                      onChange={() => setStatus("published")}
                      className="text-[#60C1E5] focus:ring-0"
                    />
                    <span>Publikasikan Langsung (Published)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === "draft"}
                      onChange={() => setStatus("draft")}
                      className="text-[#60C1E5] focus:ring-0"
                    />
                    <span>Simpan Sebagai Draf (Draft)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#1F3F6D]">
                <button
                  type="button"
                  onClick={() => setFormModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#162C4E] border border-[#1F3F6D] text-slate-300 text-xs font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan Artikel...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{editingItem ? "Perbarui Artikel" : "Terbitkan Artikel"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview */}
      {previewModalOpen && previewItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#11223D] border border-[#60C1E5]/40 rounded-2xl overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="relative aspect-video w-full bg-[#08101E]">
              <Image
                src={previewItem.thumbnail_path}
                alt={previewItem.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-[#005A9C] text-[#A0E0EF] rounded border border-[#60C1E5]/40 uppercase">
                {previewItem.status}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-[#60C1E5]" />
                <span>
                  {new Date(previewItem.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                {previewItem.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {previewItem.content || previewItem.excerpt}
              </p>
              <div className="pt-4 border-t border-[#1F3F6D] text-right">
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#005A9C] text-white text-xs font-bold"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

