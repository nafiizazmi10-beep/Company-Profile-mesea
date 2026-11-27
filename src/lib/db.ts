import fs from "fs";
import path from "path";

/**
 * db.ts - Database Client untuk MeSea Game Studio
 * 
 * Lapisan ini menghubungkan Next.js ke Google Apps Script Web App
 * yang bertindak sebagai database engine Google Spreadsheet.
 * 
 * Jika APPS_SCRIPT_URL belum disetel di .env.local, sistem otomatis menggunakan
 * local fallback store (data/db-local.json) agar dashboard dan autentikasi
 * dapat diuji langsung di komputer lokal sebelum pengguna melakukan deploy Apps Script.
 */

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: boolean;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role_id: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: "published" | "draft";
  author_id: string;
  created_at: string;
  updated_at: string;
}

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET;

// Path penyimpanan lokal fallback (ketika Apps Script belum disetel)
const LOCAL_DB_DIR = path.join(process.cwd(), ".data");
const LOCAL_DB_FILE = path.join(LOCAL_DB_DIR, "db-local.json");

interface LocalDatabase {
  Roles: Role[];
  Users: User[];
  News: News[];
}

function getInitialLocalData(): LocalDatabase {
  const now = new Date().toISOString();
  return {
    Roles: [
      {
        id: "role_admin",
        name: "admin",
        description: "Administrator sistem dengan hak akses penuh",
        permissions: "all",
        is_system: true,
        created_at: now,
      },
      {
        id: "role_user",
        name: "user",
        description: "Pengguna terdaftar publik",
        permissions: "read,profile",
        is_system: true,
        created_at: now,
      },
    ],
    Users: [
      {
        id: "user_admin_001",
        name: "MeSea Lead Administrator",
        email: "admin@gmail.com",
        // Hash bcrypt untuk password: 123456
        password_hash:
          "$2a$10$HscuMARVbL7VK5YPP7fFi.CfK5s8Q0lFrjluGHxIzYHlsvwmh/bpq",
        role_id: "role_admin",
        status: "active",
        created_at: now,
        updated_at: now,
      },
    ],
    News: [
      {
        id: "news_001",
        title:
          'Menguak Misteri "Abyssal Odyssey": Eksplorasi Bawah Laut dengan Grafis Generasi Baru',
        slug: "menguak-misteri-abyssal-odyssey",
        excerpt:
          "Kami secara resmi merilis trailer perdana yang menampilkan teknologi pencahayaan volumetrik dan ekosistem terumbu karang purba yang dinamis.",
        content:
          "Abyssal Odyssey merupakan proyek ambisius MeSea Game Studio selama 2 tahun terakhir. Dibangun dengan Unreal Engine 5, pemain diajak menelusuri palung samudra terdalam yang dihuni oleh biota bioluminescent serta peninggalan teknologi kuno bawah air.",
        thumbnail_path: "/images/hero-abyssal-odyssey.png",
        status: "published",
        author_id: "user_admin_001",
        created_at: now,
        updated_at: now,
      },
      {
        id: "news_002",
        title:
          '"Cyber Corsairs: Naval Front" Raih 500.000 Pemain Aktif di Musim Ketiga',
        slug: "cyber-corsairs-raih-500k-pemain",
        excerpt:
          "Pembaruan armada kapal tempur baru dan sistem cuaca badai samudera ekstrem berhasil memecahkan rekor jumlah pemain serentak di platform Steam.",
        content:
          "Musim ketiga Cyber Corsairs membawa peta pertempuran baru di Laut Natuna masa depan, memperkenalkan 4 kapal fregat berteknologi tinggi dan perbaikan sistem matchmaking kompetitif.",
        thumbnail_path: "/images/cyber-corsairs.png",
        status: "published",
        author_id: "user_admin_001",
        created_at: now,
        updated_at: now,
      },
      {
        id: "news_003",
        title:
          "MeSea Studio Membuka Program Magang & Rekrutmen Senior Gameplay Programmer",
        slug: "rekrutmen-gameplay-programmer",
        excerpt:
          "Kami memperluas ruang studio di kawasan Jakarta Selatan dan mengundang talenta game developer berbakat untuk bergabung dalam proyek AAA kami.",
        content:
          "Seiring dengan percepatan produksi proyek Abyssal Odyssey, kami membuka kesempatan bagi para programmer C++ dan Unreal Engine untuk berkolaborasi langsung di markas kami di Jakarta Selatan.",
        thumbnail_path: "/images/studio-team.png",
        status: "published",
        author_id: "user_admin_001",
        created_at: now,
        updated_at: now,
      },
    ],
  };
}

function readLocalDb(): LocalDatabase {
  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_FILE)) {
      const initial = getInitialLocalData();
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(LOCAL_DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Gagal membaca local database:", err);
    return getInitialLocalData();
  }
}

function writeLocalDb(data: LocalDatabase): void {
  try {
    if (!fs.existsSync(LOCAL_DB_DIR)) {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Gagal menulis ke local database:", err);
  }
}

export function isAppsScriptConfigured(): boolean {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;
  return (
    !!url &&
    url.startsWith("https://script.google.com") &&
    !!secret
  );
}

/**
 * Menjalankan request ke Google Apps Script Web App
 */
async function callAppsScript(action: string, table: string, params: Record<string, any> = {}) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!isAppsScriptConfigured()) {
    throw new Error("Apps Script URL atau Secret belum dikonfigurasi.");
  }

  const payload = {
    secret,
    action,
    table,
    ...params,
  };

  const response = await fetch(url!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Apps Script error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || "Gagal mengeksekusi aksi di Google Apps Script.");
  }
  return result.data;
}

// =================== CRUD API ===================

export async function findAll<T = any>(table: "Roles" | "Users" | "News"): Promise<T[]> {
  if (isAppsScriptConfigured()) {
    return (await callAppsScript("findAll", table)) as T[];
  }
  // Local fallback
  const db = readLocalDb();
  return (db[table] || []) as T[];
}

export async function findById<T = any>(table: "Roles" | "Users" | "News", id: string): Promise<T | null> {
  if (isAppsScriptConfigured()) {
    try {
      return (await callAppsScript("findById", table, { id })) as T;
    } catch {
      return null;
    }
  }
  const db = readLocalDb();
  const list = db[table] as any[];
  const found = list.find((item) => String(item.id) === String(id));
  return found ? (found as T) : null;
}

export async function findBy<T = any>(table: "Roles" | "Users" | "News", query: Record<string, any>): Promise<T[]> {
  if (isAppsScriptConfigured()) {
    return (await callAppsScript("findBy", table, { query })) as T[];
  }
  const db = readLocalDb();
  const list = db[table] as any[];
  return list.filter((item) => {
    for (const key in query) {
      if (String(item[key]) !== String(query[key])) {
        return false;
      }
    }
    return true;
  }) as T[];
}

export async function create<T = any>(table: "Roles" | "Users" | "News", record: Partial<T>): Promise<T> {
  const now = new Date().toISOString();
  const id = (record as any).id || `${table.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const fullRecord = {
    ...record,
    id,
    created_at: (record as any).created_at || now,
    updated_at: now,
  };

  if (isAppsScriptConfigured()) {
    return (await callAppsScript("create", table, { data: fullRecord })) as T;
  }

  const db = readLocalDb();
  (db[table] as any[]).push(fullRecord);
  writeLocalDb(db);
  return fullRecord as T;
}

export async function update<T = any>(table: "Roles" | "Users" | "News", id: string, data: Partial<T>): Promise<T> {
  if (isAppsScriptConfigured()) {
    return (await callAppsScript("update", table, { id, data })) as T;
  }

  const db = readLocalDb();
  const list = db[table] as any[];
  const index = list.findIndex((item) => String(item.id) === String(id));
  if (index === -1) {
    throw new Error(`Data dengan ID ${id} tidak ditemukan di tabel ${table}.`);
  }

  const updatedRecord = {
    ...list[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  list[index] = updatedRecord;
  writeLocalDb(db);
  return updatedRecord as T;
}

export async function deleteRecord(table: "Roles" | "Users" | "News", id: string): Promise<boolean> {
  if (isAppsScriptConfigured()) {
    await callAppsScript("delete", table, { id });
    return true;
  }

  const db = readLocalDb();
  const list = db[table] as any[];
  const initialLength = list.length;
  db[table] = list.filter((item) => String(item.id) !== String(id)) as any;
  writeLocalDb(db);
  return db[table].length < initialLength;
}

