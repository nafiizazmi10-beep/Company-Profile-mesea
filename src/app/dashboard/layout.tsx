import { getCurrentUser } from "@/lib/auth";
import { isAppsScriptConfigured } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardNav from "./DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  // Cek otorisasi server-side
  if (user.role?.name !== "admin" && user.role_id !== "role_admin") {
    redirect("/?error=forbidden");
  }

  const isConnectedToSheet = isAppsScriptConfigured();

  return (
    <div className="min-h-screen bg-[#08101E] flex flex-col md:flex-row text-slate-200">
      <DashboardNav user={user} isConnectedToSheet={isConnectedToSheet} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

