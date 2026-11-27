import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { findAll, findById, update, deleteRecord, User, Role } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const users = await findAll<User>("Users");
    const roles = await findAll<Role>("Roles");

    const roleMap = new Map<string, Role>();
    roles.forEach((r) => roleMap.set(r.id, r));

    const safeUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role_id: u.role_id,
      role_name: roleMap.get(u.role_id)?.name || u.role_id,
      status: u.status,
      created_at: u.created_at,
      updated_at: u.updated_at,
    }));

    return NextResponse.json({ success: true, data: safeUsers, roles });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Akses ditolak" },
      { status: err.message?.includes("UNAUTHORIZED") ? 401 : 403 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const { id, role_id, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID user wajib diisi." }, { status: 400 });
    }

    const targetUser = await findById<User>("Users", id);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: "User tidak ditemukan." }, { status: 404 });
    }

    // Proteksi: Admin tidak bisa menonaktifkan akunnya sendiri
    if (admin.id === id && status === "inactive") {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat menonaktifkan akun Anda sendiri." },
        { status: 400 }
      );
    }

    // Proteksi: Admin tidak bisa menurunkan role akunnya sendiri jika dia admin terakhir
    if (admin.id === id && role_id && role_id !== "role_admin") {
      const allUsers = await findAll<User>("Users");
      const adminCount = allUsers.filter((u) => u.role_id === "role_admin" && u.status === "active").length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { success: false, error: "Tidak dapat mengubah role Anda karena Anda adalah Admin aktif terakhir." },
          { status: 400 }
        );
      }
    }

    const updatePayload: Partial<User> = {};
    if (role_id) updatePayload.role_id = role_id;
    if (status) updatePayload.status = status;

    const updated = await update<User>("Users", id, updatePayload);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID user wajib diisi." }, { status: 400 });
    }

    // Proteksi: Admin tidak bisa menghapus akunnya sendiri
    if (admin.id === id) {
      return NextResponse.json(
        { success: false, error: "Anda tidak dapat menghapus akun Anda sendiri." },
        { status: 400 }
      );
    }

    // Proteksi admin terakhir
    const allUsers = await findAll<User>("Users");
    const targetUser = allUsers.find((u) => u.id === id);
    if (targetUser && targetUser.role_id === "role_admin") {
      const adminCount = allUsers.filter((u) => u.role_id === "role_admin").length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { success: false, error: "Tidak dapat menghapus Administrator terakhir dalam sistem." },
          { status: 400 }
        );
      }
    }

    await deleteRecord("Users", id);
    return NextResponse.json({ success: true, message: "User berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

