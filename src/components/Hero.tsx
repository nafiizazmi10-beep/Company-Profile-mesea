import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Hero() {
  const { hero, stats } = siteConfig;

  return (
    <section
      id="home"
      className="relative pt-10 pb-20 sm:pt-14 sm:pb-28 lg:pt-20 lg:pb-32 overflow-hidden border-b border-[#1F3F6D]/40"
    >
      {/* Ambient background glows */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#005A9C]/25 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-[#60C1E5]/15 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11223D] border border-[#60C1E5]/40 text-[#A0E0EF] text-xs font-semibold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#60C1E5] animate-ping" />
              <span>{hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.18] sm:leading-[1.15] tracking-tight">
              {hero.titleLine1}{" "}
              <span className="bg-gradient-to-r from-[#60C1E5] via-[#A0E0EF] to-white bg-clip-text text-transparent text-glow">
                {hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl font-normal leading-relaxed">
              {hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                href={hero.primaryCta.href}
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#005A9C] via-[#1B365D] to-[#005A9C] text-white hover:text-[#A0E0EF] border border-[#60C1E5]/60 hover:border-[#60C1E5] shadow-lg shadow-[#005A9C]/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group text-center"
              >
                <span>{hero.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4 text-[#60C1E5] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={hero.secondaryCta.href}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#11223D]/80 hover:bg-[#162C4E] text-[#E0F2FE] border border-[#1F3F6D] hover:border-[#60C1E5]/50 transition-all flex items-center justify-center gap-2 text-center"
              >
                <Play className="w-4 h-4 text-[#60C1E5] fill-[#60C1E5]/20" />
                <span>{hero.secondaryCta.text}</span>
              </Link>
            </div>

            {/* Studio Quick Stats */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#1F3F6D]/50 max-w-lg">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-[#11223D]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-[#1F3F6D]/50">
                  <div
                    className={`text-xl sm:text-3xl font-extrabold font-heading ${
                      stat.highlight ? "text-[#60C1E5] text-glow" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Showcase Artwork */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden p-1.5 bg-gradient-to-br from-[#60C1E5]/50 via-[#1B365D] to-[#005A9C] shadow-2xl box-glow">
              <div className="relative rounded-xl overflow-hidden bg-[#0B1528] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
                <Image
                  src={hero.featuredGame.image}
                  alt={hero.featuredGame.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Floating HUD Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-xl bg-[#0B1528]/85 backdrop-blur-md border border-[#60C1E5]/30 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[#60C1E5] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#60C1E5]" />
                      <span>{hero.featuredGame.tag}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white font-heading mt-0.5">
                      {hero.featuredGame.title}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold bg-[#005A9C] text-[#A0E0EF] rounded-md border border-[#60C1E5]/40 whitespace-nowrap">
                    {hero.featuredGame.platform}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

