import { NextResponse } from "next/server";
import { findBy, create, User } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Semua bidang (nama, email, password) wajib diisi." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Validasi format email dasar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password minimal terdiri dari 6 karakter." },
        { status: 400 }
      );
    }

    // Periksa apakah email sudah terdaftar
    const existingUsers = await findBy<User>("Users", { email: cleanEmail });
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email ini sudah terdaftar. Silakan login atau gunakan email lain." },
        { status: 409 }
      );
    }

    // Hash password sebelum dikirim/disimpan ke database
    const passwordHash = await hashPassword(password);

    // Register selalu membuat akun dengan role 'user' (role_user)
    const newUser = await create<User>("Users", {
      name: String(name).trim(),
      email: cleanEmail,
      password_hash: passwordHash,
      role_id: "role_user",
      status: "active",
    });

    // Otomatis login setelah registrasi berhasil
    await createSession(newUser);

    return NextResponse.json({
      success: true,
      message: "Akun berhasil didaftarkan.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        roleId: newUser.role_id,
        roleName: "user",
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mendaftarkan akun. Silakan coba sesaat lagi." },
      { status: 500 }
    );
  }
}

