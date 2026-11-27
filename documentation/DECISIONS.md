# Keputusan Teknis & Arsitektur (Architectural Decisions)

## 1. Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
  - *Alasan*: Standard industri untuk deployment di Vercel, mendukung Server Components & Server Actions yang aman untuk database Google Sheets di Step 2, serta optimasi SEO otomatis.
- **Styling**: Tailwind CSS
  - *Alasan*: Cepat, terstruktur, mudah dipelihara, dan langsung mendukung token desain dari sistem *Oceanic Abyssal Tech*.
- **Iconography**: Lucide React
  - *Alasan*: Set ikon modern beresolusi tajam, ringan, dan cocok dengan gaya Cyber-Gaming / HUD.

## 2. Design System: Oceanic Abyssal Tech
- **Filosofi Visual**: Menggabungkan kedalaman samudra (*abyss*) dan luasnya angkasa (*cosmic*) dengan aksen bioluminescent cyan (`#60C1E5`) dan biru samudra (`#005A9C`) di atas kanvas gelap pekat (`#08101E`, `#0B1528`).
- **Tipografi**:
  - Headings / Display: `Sora` (karakter futuristik, tajam, dan gaming-ready)
  - Body: `Plus Jakarta Sans` (keterbacaan tinggi, kontemporer)
  - HUD / Metadata: `JetBrains Mono`

## 3. Struktur Konten Terpusat (`src/config/site.ts`)
- Semua teks profil, keunggulan, statistik studio, kontak, dan tautan sosial media disimpan di satu file konfigurasi terpusat. Desainer atau pemilik usaha dapat mengubah copy tanpa menyentuh kode komponen.

## 4. Keamanan & Kredensial
- File rahasia (`.env*`, `code.gs`, `setup.gs`, `.data/`, `public/uploads/*`) sudah diatur di `.gitignore`.
- Template variabel lingkungan disediakan di `.env.example`.

## 5. Arsitektur Database & Autentikasi (Step 2)
- **Local Fallback Store**: Saat `APPS_SCRIPT_URL` belum disetel di `.env.local`, sistem otomatis menggunakan `.data/db-local.json` sebagai fallback lokal. Ini memungkinkan pengujian lokal tanpa harus setup Google Sheet terlebih dahulu.
- **Google Apps Script Bridge**: Komunikasi ke Google Spreadsheet dilakukan via server Next.js (tidak pernah langsung dari browser) dengan secret token bersama (`APPS_SCRIPT_SECRET`) dan lock service untuk mencegah race conditions.
- **Password Hashing**: Menggunakan `bcryptjs` (salt rounds 10) di sisi server sebelum disimpan ke database (baik lokal maupun Apps Script). Teks password asli tidak pernah disimpan.
- **Session Management**: Menggunakan signed JWT (`jose` HS256) yang disimpan dalam cookie `httpOnly` (`mesea_session`) dengan proteksi SameSite=Lax dan masa berlaku 7 hari.
- **Role-Based Access Control (RBAC)**: Proteksi rute `/dashboard/*` ditegakkan di layer Next.js Middleware (`src/middleware.ts`) dan server-side auth verification. Pengguna biasa (role `user`) tidak dapat membuka dashboard maupun memanggil endpoint admin.
- **Media Storage Abstraction**: File diunggah ke `public/uploads/` via modul `src/lib/storage.ts` dengan validasi MIME-type dan pembatasan ukuran 5MB, siap dimigrasikan ke cloud storage di Step 4.
