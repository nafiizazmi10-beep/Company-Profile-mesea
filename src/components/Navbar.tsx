"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LogIn, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B1528]/90 backdrop-blur-md border-b border-[#1F3F6D]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="h-10 flex items-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={160}
              height={40}
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          aria-label="Navigasi Utama"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-300 hover:text-[#60C1E5] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#60C1E5] hover:after:w-full after:transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA / Portal Login */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0B1528] bg-gradient-to-r from-[#60C1E5] to-[#A0E0EF] hover:from-[#A0E0EF] hover:to-[#60C1E5] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#60C1E5]/20 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#60C1E5] focus:ring-offset-2 focus:ring-offset-[#08101E]"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Portal</span>
          </Link>
        </div>

        {/* Mobile Action & Hamburger */}
        <div className="flex sm:hidden items-center gap-2.5">
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B1528] bg-gradient-to-r from-[#60C1E5] to-[#A0E0EF] flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#11223D] border border-[#1F3F6D] text-[#60C1E5] hover:bg-[#162C4E] focus:outline-none focus:ring-2 focus:ring-[#60C1E5]"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Quick Horizontal Chips Bar */}
      <div className="sm:hidden border-t border-[#1F3F6D]/50 px-4 py-2 bg-[#0B1528]/70 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {siteConfig.navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#11223D] border border-[#1F3F6D] text-slate-300 hover:text-white hover:border-[#60C1E5] whitespace-nowrap transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[116px] bg-[#08101E]/95 backdrop-blur-xl border-b border-[#1F3F6D] px-6 py-6 space-y-4 shadow-2xl z-40 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3" aria-label="Menu Mobile">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 hover:text-[#60C1E5] border-b border-[#1F3F6D]/40 transition-colors"
              >
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 text-[#60C1E5]" />
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl font-bold text-sm text-[#0B1528] bg-gradient-to-r from-[#60C1E5] to-[#A0E0EF] text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Portal Member / Admin</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

