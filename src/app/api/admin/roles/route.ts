import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { findAll, findById, create, update, deleteRecord, Role, User } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const roles = await findAll<Role>("Roles");
    return NextResponse.json({ success: true, data: roles });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { name, description, permissions } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "Nama role wajib diisi." }, { status: 400 });
    }

    const cleanName = String(name).trim().toLowerCase();
    const existing = await findAll<Role>("Roles");
    if (existing.some((r) => r.name.toLowerCase() === cleanName)) {
      return NextResponse.json(
        { success: false, error: `Role dengan nama '${cleanName}' sudah ada.` },
        { status: 409 }
      );
    }

    const newRole = await create<Role>("Roles", {
      name: cleanName,
      description: String(description || "").trim(),
      permissions: String(permissions || "read").trim(),
      is_system: false,
    });

    return NextResponse.json({ success: true, data: newRole });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { id, description, permissions } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID role wajib diisi." }, { status: 400 });
    }

    const role = await findById<Role>("Roles", id);
    if (!role) {
      return NextResponse.json({ success: false, error: "Role tidak ditemukan." }, { status: 404 });
    }

    const updated = await update<Role>("Roles", id, {
      description: description !== undefined ? description : role.description,
      permissions: permissions !== undefined ? permissions : role.permissions,
    });

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
      return NextResponse.json({ success: false, error: "ID role wajib diisi." }, { status: 400 });
    }

    const role = await findById<Role>("Roles", id);
    if (!role) {
      return NextResponse.json({ success: false, error: "Role tidak ditemukan." }, { status: 404 });
    }

    if (role.is_system) {
      return NextResponse.json(
        { success: false, error: "Role sistem bawaan tidak dapat dihapus." },
        { status: 400 }
      );
    }

    // Periksa apakah masih ada user yang memakai role ini
    const users = await findAll<User>("Users");
    const isAssigned = users.some((u) => u.role_id === id);
    if (isAssigned) {
      return NextResponse.json(
        { success: false, error: "Role tidak dapat dihapus karena masih digunakan oleh beberapa pengguna." },
        { status: 400 }
      );
    }

    await deleteRecord("Roles", id);
    return NextResponse.json({ success: true, message: "Role berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

