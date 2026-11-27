import { NextResponse } from "next/server";
import { findAll, News } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allNews = await findAll<News>("News");
    // Hanya ambil berita dengan status 'published'
    const published = allNews.filter((n) => n.status === "published");
    const sorted = published.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return NextResponse.json({ success: true, data: sorted });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Gagal mengambil data berita." },
      { status: 500 }
    );
  }
}

