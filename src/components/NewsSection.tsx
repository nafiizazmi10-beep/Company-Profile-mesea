import Image from "next/image";
import Link from "next/link";
import { siteConfig, NewsItem } from "@/config/site";
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react";

interface NewsSectionProps {
  initialNews?: NewsItem[];
}

export default function NewsSection({ initialNews }: NewsSectionProps) {
  const newsList = initialNews || siteConfig.news;

  return (
    <section
      id="news"
      className="py-16 sm:py-24 bg-[#0B1528] border-b border-[#1F3F6D]/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#60C1E5] bg-[#11223D] px-3.5 py-1.5 rounded-full border border-[#1F3F6D]">
              Berita & Pengumuman
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Kabar Terbaru dari MeSea Studio
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Dapatkan info rilis game, catatan pengembang (devlog), dan pencapaian studio kami.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="#news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#60C1E5] bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] hover:bg-[#162C4E] transition-all"
            >
              <span>Lihat Semua Berita</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {newsList.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#11223D] border border-[#1F3F6D] hover:border-[#60C1E5] transition-all group flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-1 duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-[#08101E]">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold bg-[#005A9C]/90 text-[#A0E0EF] rounded-md backdrop-blur-sm border border-[#60C1E5]/40 shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#60C1E5]" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {item.author}
                    </span>
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-[#60C1E5] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm mt-2.5 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#1F3F6D]/50">
                  <Link
                    href={`#article-${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60C1E5] group-hover:text-[#A0E0EF] transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

