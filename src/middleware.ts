import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "mesea_session";
const AUTH_SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "mesea_abyssal_cyber_secret_session_key_2026_super_secure"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lindungi seluruh rute dashboard
  if (pathname.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, AUTH_SECRET_KEY);
      const roleId = payload.roleId as string;

      // Hanya role admin yang diizinkan membuka dashboard
      if (roleId !== "role_admin" && roleId !== "admin") {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("error", "forbidden");
        return NextResponse.redirect(homeUrl);
      }
    } catch {
      // Token tidak valid atau kedaluwarsa
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "session_expired");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

