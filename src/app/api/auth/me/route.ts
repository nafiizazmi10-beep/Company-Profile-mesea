import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      roleId: user.role_id,
      role_name: user.role?.name || "user",
      roleName: user.role?.name || "user",
      rolePermissions: user.role?.permissions || "",
      status: user.status,
    },
  });
}

