# Maintenance Log - MeSea Game Studio

Dokumen ini digunakan untuk melacak fitur baru (backlog), laporan bug, serta riwayat perubahan setelah website dideploy ke production.

---

## 1. Backlog Fitur & Rencana Peningkatan
- [ ] **Migrasi Cloud Storage**: Menghubungkan penyimpanan media upload (thumbnail artikel) ke Vercel Blob atau Cloudinary agar file persisten di serverless production.
- [ ] **Notifikasi Otomatis (Opsional)**: Pengiriman notifikasi email/WhatsApp (misalnya via Resend atau WhatsApp API) saat ada pesan masuk dari formulir kontak.
- [ ] **Payment Gateway (Opsional)**: Integrasi gerbang pembayaran otomatis (Midtrans/Xendit/QRIS) jika di masa depan studio membuka merchandise atau pemesanan game digital.
- [ ] **Custom Domain**: Menghubungkan domain resmi studio (misalnya `meseastudio.com` atau `meseagames.id`) di Vercel.

---

## 2. Bug Diketahui (Known Issues)
*Belum ada bug aktif yang dilaporkan.*

---

## 3. Riwayat Perubahan (Changelog)
- **10 November 2026**:
  - Inisiasi proyek MeSea Game Studio (Game Studio bertema samudra dan luar angkasa).
  - Penyelesaian Step 1: Landing Page epik responsif dengan tema *Oceanic Abyssal Tech* (Hero, About, Services, Berita, Contact dengan Google Maps Britania Raya).
- **11 November 2026**:
  - Penyelesaian Step 2: Sistem Autentikasi (JWT + bcrypt), Middleware RBAC, Database Abstraction Layer dengan Google Apps Script Web App & Local Fallback.
  - Pembuatan Dashboard Admin lengkap: Manajemen Pengguna, Manajemen Role, CRUD Berita, Profil & Ganti Password.
  - Integrasi berita dinamis ke halaman depan (Landing Page).
  - Pengujian otomatis end-to-end (12/12 skenario lulus).
  - Pemasangan konfigurasi live Google Apps Script oleh pengguna di `.env.local`.
  - Masuk ke Step 4: Persiapan Deploy ke Vercel & QA Checklist.

