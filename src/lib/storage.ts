import fs from "fs";
import path from "path";

/**
 * Storage Module - Penyimpanan Media MeSea Studio
 * 
 * Sesuai panduan arsitektur:
 * 1. Di lingkungan development (lokal), file disimpan ke folder `public/uploads/`.
 * 2. Hanya relative path (seperti `/uploads/foto.webp`) yang dicatat ke database.
 * 3. Modul ini dibungkus secara terpusat agar mudah diganti ke Cloud Storage
 *    (Vercel Blob, Cloudinary, atau Google Drive) saat deploy production di Step 4.
 */

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Pastikan folder uploads tersedia
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export interface SaveFileResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function saveFile(file: File): Promise<SaveFileResult> {
  try {
    // Validasi Tipe File
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Format file tidak didukung. Harap upload gambar berformat JPG, PNG, atau WebP.",
      };
    }

    // Validasi Ukuran
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: "Ukuran file terlalu besar. Maksimal ukuran gambar adalah 5 MB.",
      };
    }

    // Sanitasi dan buat nama file unik
    const ext = path.extname(file.name).toLowerCase() || ".png";
    const cleanExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
      ? ext
      : ".png";
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const fileName = `media-${uniqueSuffix}${cleanExt}`;
    const destinationPath = path.join(UPLOADS_DIR, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.promises.writeFile(destinationPath, buffer);

    return {
      success: true,
      filePath: `/uploads/${fileName}`,
    };
  } catch (error) {
    console.error("Gagal menyimpan file upload:", error);
    return {
      success: false,
      error: "Gagal menyimpan file ke penyimpanan lokal.",
    };
  }
}

export async function deleteFile(relativeFilePath: string): Promise<boolean> {
  try {
    if (!relativeFilePath || !relativeFilePath.startsWith("/uploads/")) {
      return false;
    }
    const fileName = path.basename(relativeFilePath);
    const fullPath = path.join(UPLOADS_DIR, fileName);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Gagal menghapus file:", relativeFilePath, err);
    return false;
  }
}

