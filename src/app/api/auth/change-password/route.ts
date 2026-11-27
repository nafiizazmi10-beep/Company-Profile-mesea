import { NextResponse } from "next/server";
import { getCurrentUser, verifyPassword, hashPassword } from "@/lib/auth";
import { update, User } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak valid. Harap login kembali." },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Password saat ini dan password baru wajib diisi." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password baru minimal 6 karakter." },
        { status: 400 }
      );
    }

    const isMatch = await verifyPassword(currentPassword, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Password saat ini salah." },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(newPassword);
    await update<User>("Users", user.id, {
      password_hash: newHash,
    });

    return NextResponse.json({
      success: true,
      message: "Password berhasil diperbarui dengan aman.",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengganti password." },
      { status: 500 }
    );
  }
}

