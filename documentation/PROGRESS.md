# Progres Proyek - MeSea Game Studio

Terakhir diperbarui: 11 November 2026  
Posisi saat ini: **Step 4 - Deploy & Maintenance (Sedang Berjalan)**

## Checklist Proyek
- [x] Inisiasi (data usaha & desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Hero (Heading epik, badge glowing, Call-to-Action, artwork showcase)
  - [x] About (Kisah MeSea, foto studio/markas, 3 pilar keunggulan)
  - [x] Service (6 kartu layanan game development end-to-end)
  - [x] Berita/Post (3 kartu artikel devlog/kabar game dengan struktur database Step 2)
  - [x] Contact + Google Maps (Formulir kontak, 4 info kontak, Google Maps live iframe)
  - [x] Responsif & aksesibilitas dicek (Mobile 375px, Tablet 768px, Desktop 1280px+)
  - [x] Dikonfirmasi pengguna
- [x] STEP 2 - User management & dashboard
  - [x] Apps Script (`code.gs`, `setup.gs`) dengan sistem token & lock service untuk Google Spreadsheet
  - [x] Abstraksi Database (`src/lib/db.ts`) dengan local fallback `.data/db-local.json`
  - [x] Autentikasi aman JWT & bcrypt (`src/lib/auth.ts`)
  - [x] Halaman Login (`/login`) & Register (`/register`) dengan tombol demo akun
  - [x] Proteksi rute via Next.js Middleware (`src/middleware.ts`)
  - [x] Dashboard Utama (`/dashboard`) dengan indikator status koneksi spreadsheet
  - [x] Manajemen Pengguna (`/dashboard/users`) - ubah role, aktif/nonaktifkan akun, hapus pengguna
  - [x] Manajemen Role (`/dashboard/roles`) - buat role kustom, proteksi role sistem
  - [x] CRUD Berita (`/dashboard/news`) - tambah berita, edit, hapus, filter, unggah thumbnail
  - [x] Profil & Ganti Password (`/dashboard/profile`) - peringatan ganti password default
  - [x] Integrasi Landing Page - Berita di homepage terhubung langsung ke database dinamis
  - [x] Modul Upload File Lokal (`src/lib/storage.ts`) ke `public/uploads/`
  - [x] 12 Skenario Pengujian Otomatis End-to-End Lulus 100%
  - [x] Dikonfirmasi pengguna (Pengguna telah memasang URL Web App di `.env.local`)
- [x] STEP 3 - Pemesanan / Order `(Dilewati)`
  - *(Dilewati atas arahan pengguna: MeSea Game Studio berfokus pada game development & company profile, tidak memerlukan sistem e-commerce/booking di dalam website).*
- [ ] STEP 4 - Deploy & maintenance
  - [x] Verifikasi build produksi (`npm run build` sukses 100%)
  - [x] Checklist QA (Responsivitas, Aksesibilitas, Metadata SEO, Keamanan Secret)
  - [x] Pembuatan log pemeliharaan (`documentation/MAINTENANCE.md`)
  - [ ] Konfirmasi kebutuhan lanjutan (Payment Gateway, Notifikasi Email/WhatsApp, Cloud Storage)
  - [ ] Panduan Deploy ke Vercel langkah-demi-langkah
  - [ ] Dikonfirmasi pengguna

## Hasil Pengujian Otomatis Step 2 (12 Skenario Lulus 100%)
1. **Landing Page (`GET /`)**: Status 200 OK, terhubung ke berita database dinamis.
2. **Keamanan Login**: Kredensial salah ditolak (HTTP 401 Unauthorized).
3. **Login Admin Utama**: Akun `admin@gmail.com` berhasil masuk, cookie sesi HTTP-Only terbit secara aman.
4. **Verifikasi Sesi (`GET /api/auth/me`)**: Mengembalikan data admin beserta role permissions yang valid.
5. **Akses Dashboard Terproteksi**: Admin dapat mengakses `/dashboard` tanpa kendala.
6. **Daftar Berita Admin**: Mengambil data artikel secara real-time.
7. **Buat Berita Baru (CRUD Create)**: Artikel baru tersimpan dengan slug otomatis.
8. **Endpoint Publik Berita**: Berita berstatus `published` langsung tampil untuk pengunjung.
9. **Hapus Berita (CRUD Delete)**: Berita uji coba berhasil dibersihkan dari database.
10. **Registrasi Akun Baru**: Pengguna baru berhasil terdaftar dengan role bawaan `user`.
11. **Login User Baru**: Sesi login user biasa aktif dengan aman.
12. **Role-Based Access Control (RBAC)**: Pengguna biasa yang mencoba membuka `/dashboard` otomatis dicegat dan dialihkan (HTTP 307 Redirect).

## Informasi Kredensial Awal (Default)
- **Email**: `admin@gmail.com`
- **Password**: `123456`
> **PERINGATAN KEAMANAN**: Segera ubah password ini di menu `/dashboard/profile` sebelum website dipublikasikan ke server production!

## Menjalankan di Komputer Lokal
```bash
# Menjalankan server development
npm run dev

# Menjalankan build produksi
npm run build
npm run start
```
Buka browser di [http://localhost:3000](http://localhost:3000) untuk Landing Page, atau [http://localhost:3000/login](http://localhost:3000/login) untuk Portal Masuk.
