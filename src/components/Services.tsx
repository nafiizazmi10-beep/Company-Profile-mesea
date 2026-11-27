import { siteConfig, ServiceItem } from "@/config/site";
import {
  Gamepad2,
  Layers,
  Cpu,
  Music,
  ShieldCheck,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  Gamepad2,
  Layers,
  Cpu,
  Music,
  ShieldCheck,
  TrendingUp,
};

export default function Services() {
  const { services } = siteConfig;

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#08101E] border-b border-[#1F3F6D]/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60C1E5] bg-[#11223D] px-3.5 py-1.5 rounded-full border border-[#1F3F6D]">
            Layanan & Keahlian
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
            Solusi Pengembangan Game End-to-End
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Dari perancangan konsep awal hingga peluncuran live-ops komersial, kami menyediakan spektrum keahlian penuh untuk industri game.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((item: ServiceItem) => {
            const Icon = serviceIcons[item.icon] || Gamepad2;
            return (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] transition-all group hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#005A9C] to-[#1B365D] border border-[#60C1E5]/40 flex items-center justify-center text-[#60C1E5] mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-[#60C1E5] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

