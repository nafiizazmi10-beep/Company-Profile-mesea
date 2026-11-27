# Panduan Menjalankan & Setup (Setup Guide)

Dokumen ini memuat panduan lengkap untuk menjalankan proyek **MeSea Game Studio** di komputer lokal, serta konfigurasi integrasi database **Google Spreadsheet** melalui **Google Apps Script**.

---

## 1. Menjalankan di Komputer Lokal

### Prasyarat:
- Node.js versi 18+ (disarankan versi LTS atau 20+)
- npm atau pnpm

### Langkah Menjalankan:
```bash
# 1. Pastikan dependensi terpasang
npm install

# 2. Jalankan server pengembangan lokal (mode dev)
npm run dev
```
Buka browser di:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Halaman Login**: [http://localhost:3000/login](http://localhost:3000/login)
- **Halaman Register**: [http://localhost:3000/register](http://localhost:3000/register)
- **Dashboard Admin**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Kredensial Login Admin Awal (Default):
- **Email**: `admin@gmail.com`
- **Password**: `123456`

> **PERINGATAN KEAMANAN**: Segera ubah password ini di halaman `/dashboard/profile` sebelum aplikasi di-deploy ke server publik!

---

## 2. Mode Database: Local Fallback vs Google Spreadsheet

Aplikasi dirancang cerdas dengan arsitektur dua mode:
1. **Mode Local Fallback (Default saat ini)**:
   - Jika belum ada `.env.local` atau `APPS_SCRIPT_URL`, aplikasi otomatis menggunakan database lokal aman di `.data/db-local.json`.
   - Seluruh fitur login, register, role, dashboard, dan CRUD berita langsung berfungsi 100% tanpa perlu koneksi internet atau akun Google.
2. **Mode Google Spreadsheet (Production)**:
   - Menghubungkan Next.js ke Google Spreadsheet milik Anda menggunakan Google Apps Script Web App.

---

## 3. Langkah Menyiapkan Database Google Spreadsheet

Jika Anda ingin beralih dari database lokal ke Google Spreadsheet asli:

### Langkah A: Buat Spreadsheet & Buka Editor Script
1. Buka [Google Drive](https://drive.google.com/) atau [Google Sheets](https://sheets.new) dan buat spreadsheet baru dengan nama misalnya: `MeSea Studio Database`.
2. Pada menu atas spreadsheet, klik **Ekstensi (Extensions) > Apps Script**.
3. Di editor Apps Script, Anda akan melihat file `Code.gs`.

### Langkah B: Salin Kode dari Proyek
1. Buka file `code.gs` di root proyek ini, salin seluruh kodenya, dan gantikan isi `Code.gs` di Apps Script.
2. Buat file baru di Apps Script dengan klik tanda **+ > Script**, beri nama `setup.gs`.
3. Buka file `setup.gs` di root proyek ini, salin seluruh isinya ke dalam file `setup.gs` di editor Apps Script.

### Langkah C: Atur Script Properties (Token Rahasia)
1. Di editor Apps Script, klik ikon roda gigi **Project Settings** (Setelan Proyek) di bilah kiri.
2. Gulir ke bawah ke bagian **Script Properties** (Properti Skrip).
3. Klik **Add script property** (Tambahkan properti skrip):
   - **Property**: `APPS_SCRIPT_SECRET`
   - **Value**: Masukkan teks acak panjang yang aman (misalnya: `mesea_super_secret_token_2026`)
4. Klik **Save script properties**.

### Langkah D: Jalankan Inisiasi Tabel
1. Di editor Apps Script, buka file `setup.gs`.
2. Di dropdown fungsi bagian atas, pilih fungsi `initTables`.
3. Klik tombol **Run** (Jalankan).
4. Google akan meminta izin (*Authorization Required*), berikan izin akses ke spreadsheet Anda.
5. Fungsi `initTables` akan otomatis membuat 3 Sheet (`Roles`, `Users`, `News`) dengan header lengkap dan akun admin awal. Fungsi ini bersifat **idempoten** (aman dijalankan berulang tanpa menduplikasi data).

### Langkah E: Deploy Sebagai Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Deploy > New deployment** (Terapkan > Penerapan baru).
2. Klik ikon gerigi di samping *Select type* dan pilih **Web app**.
3. Isi konfigurasi:
   - **Description**: `MeSea Database Web App v1`
   - **Execute as**: **Me** (akun Google Anda)
   - **Who has access**: **Anyone** (Siapa saja — *tenang, akses dilindungi secret token sehingga hanya server Anda yang bisa membaca/menulis data*)
4. Klik **Deploy** dan salin **Web app URL** yang dihasilkan (berawalan `https://script.google.com/macros/s/.../exec`).

### Langkah F: Hubungkan ke Next.js (.env.local)
Buat file bernama `.env.local` di root proyek ini:
```env
APPS_SCRIPT_URL="https://script.google.com/macros/s/XXXXX/exec"
APPS_SCRIPT_SECRET="mesea_super_secret_token_2026"
AUTH_SECRET="kunci_rahasia_jwt_minimal_32_karakter_acak"
```
Restart server Next.js Anda. Buka `/dashboard`, dan indikator database di sidebar akan menampilkan status **Google Sheet Connected** berwarna hijau!

---

## 4. Catatan Penting Mengenai Media (File Upload)

- Gambar thumbnail berita saat ini diunggah dan disimpan di folder lokal `public/uploads/`, dan path file-nya dicatat ke database.
- **Perilaku di Komputer Lokal:** Berjalan sangat mulus dan cepat.
- **Perilaku di Server Vercel (Production):** Vercel memiliki sistem *serverless* di mana disk bersifat sementara (ephemeral / read-only). File yang diunggah saat aplikasi berjalan di Vercel tidak akan bertahan lama saat fungsi serverless restart.
- **Solusi yang Sudah Disiapkan:**
  - Modul upload dibungkus rapi di `src/lib/storage.ts` (`saveFile` dan `deleteFile`).
  - Pada **Step 4**, kita dapat dengan mudah menghubungkannya ke layanan penyimpanan cloud gratis/terjangkau seperti Vercel Blob, Cloudinary, atau Supabase Storage tanpa perlu membongkar kode dashboard!
