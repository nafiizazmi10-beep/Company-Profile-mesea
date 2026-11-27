import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { findAll, findById, create, update, deleteRecord, News } from "@/lib/db";
import { deleteFile } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const news = await findAll<News>("News");
    // Urutkan berita dari yang paling baru
    const sorted = [...news].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json({ success: true, data: sorted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { title, excerpt, content, thumbnail_path, status } = body;

    if (!title || !excerpt) {
      return NextResponse.json(
        { success: false, error: "Judul dan ringkasan berita wajib diisi." },
        { status: 400 }
      );
    }

    // Buat slug dari judul
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim() || `berita-${Date.now()}`;

    const newArticle = await create<News>("News", {
      title: String(title).trim(),
      slug,
      excerpt: String(excerpt).trim(),
      content: String(content || "").trim(),
      thumbnail_path: thumbnail_path || "/images/hero-abyssal-odyssey.png",
      status: status === "draft" ? "draft" : "published",
      author_id: admin.id,
    });

    return NextResponse.json({ success: true, data: newArticle });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { id, title, excerpt, content, thumbnail_path, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID berita wajib diisi." }, { status: 400 });
    }

    const current = await findById<News>("News", id);
    if (!current) {
      return NextResponse.json({ success: false, error: "Berita tidak ditemukan." }, { status: 404 });
    }

    const updatePayload: Partial<News> = {};
    if (title) {
      updatePayload.title = String(title).trim();
      updatePayload.slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();
    }
    if (excerpt !== undefined) updatePayload.excerpt = String(excerpt).trim();
    if (content !== undefined) updatePayload.content = String(content).trim();
    if (thumbnail_path !== undefined) updatePayload.thumbnail_path = thumbnail_path;
    if (status !== undefined) updatePayload.status = status === "draft" ? "draft" : "published";

    const updated = await update<News>("News", id, updatePayload);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID berita wajib diisi." }, { status: 400 });
    }

    const current = await findById<News>("News", id);
    if (current && current.thumbnail_path && current.thumbnail_path.startsWith("/uploads/")) {
      // Hapus file thumbnail lokal jika ada
      await deleteFile(current.thumbnail_path);
    }

    await deleteRecord("News", id);
    return NextResponse.json({ success: true, message: "Berita berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

