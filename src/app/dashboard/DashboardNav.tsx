"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { CurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  Shield,
  Newspaper,
  KeyRound,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface DashboardNavProps {
  user: CurrentUser;
  isConnectedToSheet: boolean;
}

export default function DashboardNav({ user, isConnectedToSheet }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      name: "Ringkasan",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Manajemen Pengguna",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Manajemen Role",
      href: "/dashboard/roles",
      icon: Shield,
    },
    {
      name: "CRUD Berita",
      href: "/dashboard/news",
      icon: Newspaper,
    },
    {
      name: "Ganti Password",
      href: "/dashboard/profile",
      icon: KeyRound,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0B1528] border-b border-[#1F3F6D] z-30">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={120}
            height={30}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-[#11223D] border border-[#1F3F6D] text-[#60C1E5]"
          aria-label="Toggle Dashboard Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#0B1528] border-r border-[#1F3F6D] flex flex-col transition-transform duration-300 ease-in-out`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-[#1F3F6D]/60 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={140}
              height={35}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#005A9C] text-[#A0E0EF] border border-[#60C1E5]/40 font-mono">
            ADMIN
          </span>
        </div>

        {/* Database Status Badge */}
        <div className="px-5 py-3 mx-4 my-4 rounded-xl bg-[#11223D] border border-[#1F3F6D] text-xs">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-3.5 h-3.5 text-[#60C1E5]" />
            <span className="font-bold text-white text-[11px] uppercase tracking-wider">
              Status Database
            </span>
          </div>
          {isConnectedToSheet ? (
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>Google Spreadsheet Terhubung</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-medium">
              <AlertTriangle className="w-3 h-3 shrink-0" />
              <span>Local Dev Store (Siap Sync Apps Script)</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#005A9C] text-white shadow-lg shadow-[#005A9C]/40 border border-[#60C1E5]/50"
                    : "text-slate-300 hover:text-white hover:bg-[#11223D] border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-[#60C1E5]" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-[#1F3F6D]/60 space-y-3 bg-[#08101E]/60">
          <div className="p-3 rounded-xl bg-[#11223D] border border-[#1F3F6D] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#005A9C] border border-[#60C1E5]/40 flex items-center justify-center text-xs font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 px-3 rounded-lg bg-[#11223D] hover:bg-[#162C4E] border border-[#1F3F6D] text-[11px] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#60C1E5]" />
              <span>Lihat Web</span>
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-700/40 text-red-300 hover:text-white text-[11px] flex items-center justify-center gap-1.5 transition-colors"
              title="Logout dari Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}

