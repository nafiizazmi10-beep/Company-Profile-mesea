import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { findAll, News } from "@/lib/db";
import { NewsItem } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let initialNews: NewsItem[] | undefined;

  try {
    const allNews = await findAll<News>("News");
    const published = allNews
      .filter((item) => item.status === "published")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (published.length > 0) {
      initialNews = published.map((item) => {
        let dateFormatted = "Baru saja";
        try {
          if (item.created_at) {
            dateFormatted = new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
          }
        } catch (_) {}

        return {
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          date: dateFormatted,
          author: "MeSea Editorial",
          category: "Update Game",
          thumbnail: item.thumbnail_path || "/images/hero-abyssal-odyssey.png",
        };
      });
    }
  } catch (error) {
    console.error("Gagal memuat berita dinamis:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <NewsSection initialNews={initialNews} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
