import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  MessageSquare,
  Flame,
  Youtube,
  Instagram,
  Shield,
  FileText,
  Lock,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050B14] border-t border-[#1F3F6D] pt-16 pb-12 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1F3F6D]/50">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#home" className="inline-block">
              <div className="h-10 flex items-center">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={150}
                  height={38}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Studio game independen terkemuka di Indonesia yang mendedikasikan diri untuk merancang karya hiburan digital bertema kedalaman air dan angkasa dengan standar visual dan gameplay global.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#11223D] border border-[#1F3F6D] text-[11px] text-[#A0E0EF]">
              <Shield className="w-3.5 h-3.5 text-[#60C1E5]" />
              <span>Anggota Asosiasi Game Indonesia (AGI)</span>
            </div>
          </div>

          {/* Short Links: Navigasi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigasi Utama
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#60C1E5] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Short Links: Proyek & Game */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Proyek & Portofolio
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#home" className="hover:text-[#60C1E5] transition-colors">
                  Abyssal Odyssey: Deep Trench
                </Link>
              </li>
              <li>
                <Link href="#home" className="hover:text-[#60C1E5] transition-colors">
                  Cyber Corsairs: Naval Front
                </Link>
              </li>
              <li>
                <Link href="#home" className="hover:text-[#60C1E5] transition-colors">
                  Coral Reef Guardian
                </Link>
              </li>
              <li>
                <Link href="#news" className="hover:text-[#60C1E5] transition-colors">
                  Press Kit & Media
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#60C1E5] transition-colors">
                  Karir & Rekrutmen
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Komunitas & Media
            </h4>
            <div className="flex items-center gap-2.5 mb-5">
              <a
                href={siteConfig.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] text-slate-300 hover:text-[#60C1E5] flex items-center justify-center transition-all group"
                title="Discord Server"
                aria-label="Discord MeSea"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={siteConfig.socials.steam}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] text-slate-300 hover:text-[#60C1E5] flex items-center justify-center transition-all group"
                title="Halaman Steam"
                aria-label="Steam MeSea"
              >
                <Flame className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] text-slate-300 hover:text-[#60C1E5] flex items-center justify-center transition-all group"
                title="YouTube Channel"
                aria-label="YouTube MeSea"
              >
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] text-slate-300 hover:text-[#60C1E5] flex items-center justify-center transition-all group"
                title="Instagram"
                aria-label="Instagram MeSea"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ikuti kabar rilis game dan event komunitas kami di saluran resmi di atas.
            </p>
          </div>
        </div>

        {/* Copyright & Bottom Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} {siteConfig.legalName}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Kebijakan Privasi</span>
            </Link>
            <Link href="#terms" className="hover:text-slate-300 transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="#security" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Keamanan Siber</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

