import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Zap, Palette, Globe, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Palette,
  Globe,
};

export default function About() {
  const { about } = siteConfig;

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-[#0B1528] border-b border-[#1F3F6D]/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Supporting Photo / Team */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#1F3F6D] group shadow-xl">
              <div className="relative aspect-[4/3] w-full bg-[#08101E]">
                <Image
                  src={about.teamImage}
                  alt="Tim Pengembang MeSea Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/40 to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-left">
                  <span className="text-[10px] sm:text-xs text-[#60C1E5] font-semibold uppercase tracking-wider">
                    Markas Produksi Kreatif
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    Studio MeSea, Jakarta Selatan
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {about.teamCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story & 3 Key Strengths */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#60C1E5] bg-[#11223D] px-3.5 py-1.5 rounded-full border border-[#1F3F6D]">
                {about.badge}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3 leading-snug">
                {about.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                {about.story}
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {about.pillars.map((pillar, idx) => {
                const IconComponent = iconMap[pillar.icon] || Zap;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] transition-all group hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#005A9C]/40 border border-[#60C1E5]/40 flex items-center justify-center text-[#60C1E5] mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-[#60C1E5] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

