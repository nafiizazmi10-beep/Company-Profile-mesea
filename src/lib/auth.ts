import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findById, findBy, User, Role } from "./db";

const COOKIE_NAME = "mesea_session";
const AUTH_SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "mesea_abyssal_cyber_secret_session_key_2026_super_secure"
);

export interface SessionPayload {
  userId: string;
  email: string;
  roleId: string;
  name: string;
}

export interface CurrentUser extends User {
  role?: Role | null;
}

// =================== PASSWORD HASHING ===================

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// =================== SESSION TOKEN (JWT) ===================

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(AUTH_SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, AUTH_SECRET_KEY);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      roleId: payload.roleId as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

// =================== COOKIE SESSION MANAGEMENT ===================

export async function createSession(user: User): Promise<void> {
  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    roleId: user.role_id,
    name: user.name,
  });

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 hari
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function destroySession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session) return null;

  const user = await findById<User>("Users", session.userId);
  if (!user || user.status !== "active") {
    return null;
  }

  const role = await findById<Role>("Roles", user.role_id);
  return {
    ...user,
    role,
  };
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED: Silakan masuk terlebih dahulu.");
  }
  if (user.role?.name !== "admin" && user.role_id !== "role_admin") {
    throw new Error("FORBIDDEN: Akses khusus Administrator.");
  }
  return user;
}

