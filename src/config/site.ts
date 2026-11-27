export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  author: string;
  thumbnail: string;
}

export interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

export const siteConfig = {
  name: "MeSea",
  fullName: "MeSea Game Studio",
  legalName: "PT MeSea Studio Nusantara",
  field: "Game Studio",
  tagline: "Melintasi Batas Imajinasi Interaktif",
  description:
    "Perusahaan game terkemuka yang menciptakan game epik bertema kedalaman air dan angkasa luas. Memadukan visual fidelity kelas dunia, narasi mitologi maritim nusantara, dan teknologi gameplay mutakhir untuk jutaan gamer global.",
  logo: "/images/logo.png",
  
  // Kontak & Lokasi
  contact: {
    address: "Cyber2 Tower Lt. 18, Jl. H. R. Rasuna Said, Kuningan, Jakarta Selatan 12950",
    transitNote: "Akses transportasi: 5 menit dari Stasiun LRT Rasuna Said • Parkir Tamu Tersedia",
    phone: "+62 (21) 5890-4421",
    whatsapp: "+62 812-9988-3320",
    whatsappClean: "6281299883320",
    email: "halo@meseastudio.com",
    businessEmail: "business@meseastudio.com",
    workingHours: "Senin – Jumat, 09:00 – 18:00 WIB",
    mapsUrl:
      "https://www.google.com/maps/place/Britania+Raya/@52.4975199,13.4026336,1276m/data=!3m1!1e3!4m6!3m5!1s0x25a3b1142c791a9:0xc4f8a0433288257a!8m2!3d55.378051!4d-3.435973!16zL20vMDdzc2M?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D",
    // Embed Google Maps interaktif yang valid dan responsif
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=55.378051,-3.435973&hl=id&z=6&output=embed",
  },

  // Social Links
  socials: {
    discord: "https://discord.gg/meseastudio",
    steam: "https://store.steampowered.com",
    youtube: "https://youtube.com/@meseastudio",
    instagram: "https://instagram.com/meseastudio",
  },

  // Statistik Utama
  stats: [
    { value: "4+", label: "Judul Game Rilis" },
    { value: "1.8M+", label: "Pemain Global", highlight: true },
    { value: "45+", label: "Talenta Berbakat" },
  ] as StatItem[],

  // Hero Section
  hero: {
    badge: "Game Studio Kreatif Terdepan",
    titleLine1: "Menciptakan Dunia Game Epik dari",
    titleHighlight: "Kedalaman Samudra & Antariksa",
    subtitle:
      "MeSea memadukan visual fidelity kelas dunia, narasi mitologi maritim masa depan, dan teknologi gameplay mutakhir untuk menghadirkan pengalaman tak terlupakan bagi jutaan gamer global.",
    primaryCta: {
      text: "Jelajahi Karya Kami",
      href: "#services",
    },
    secondaryCta: {
      text: "Pelajari Profil Kami",
      href: "#about",
    },
    featuredGame: {
      tag: "Karya Utama Mendatang",
      title: "Abyssal Odyssey: Deep Trench",
      platform: "PC & Konsol",
      image: "/images/hero-abyssal-odyssey.png",
    },
  },

  // About Section
  about: {
    badge: "Kisah MeSea Studio",
    title: "Membangun Mahakarya Interaktif dengan Semangat Kelautan & Keagungan Angkasa",
    story:
      "Berdiri sejak tahun 2019, MeSea Game Studio lahir dari impian bersama para pengembang game veteran untuk menghadirkan kreasi bertaraf internasional. Terinspirasi oleh misteri laut terdalam dan eksplorasi kosmik tanpa batas, kami menggabungkan keajaiban cerita sinematik dengan mekanika gameplay yang presisi dan adiktif.",
    teamImage: "/images/studio-team.png",
    teamCaption: "Studio MeSea: Kolaborasi hangat para 3D artist, game designer, gameplay programmer, dan sound engineer berstandar global.",
    pillars: [
      {
        icon: "Zap",
        title: "Teknologi Modern",
        description: "Memanfaatkan Unreal Engine 5 & Unity dengan optimalisasi grafis tinggi untuk multi-platform.",
      },
      {
        icon: "Palette",
        title: "Art Direction Unik",
        description: "Identitas visual bioluminescent memukau yang berakar kuat pada nilai orisinalitas kelautan & kosmik.",
      },
      {
        icon: "Globe",
        title: "Standar Global",
        description: "Penyampaian proyek terbukti dengan portofolio distribusi di Steam, PlayStation, dan Xbox.",
      },
    ],
  },

  // Services Section (6 Layanan Utama)
  services: [
    {
      id: "full-cycle",
      icon: "Gamepad2",
      title: "Pengembangan Game Lengkap (Full-Cycle)",
      description:
        "Produksi menyeluruh dari pra-produksi, prototyping gameplay, arsitektur kode, hingga peluncuran di platform PC, Konsol, dan Mobile.",
    },
    {
      id: "art-production",
      icon: "Layers",
      title: "Produksi Aset 2D & 3D Art",
      description:
        "Pembuatan concept art, 3D modeling berstandar AAA, texturing PBR, rigging, animasi karakter, serta environment design bertema futuristik.",
    },
    {
      id: "co-dev-porting",
      icon: "Cpu",
      title: "Co-Development & Porting",
      description:
        "Bekerja sama dengan publisher global untuk porting lintas platform (PlayStation 5, Xbox Series X/S, Nintendo Switch, dan PC).",
    },
    {
      id: "sound-design",
      icon: "Music",
      title: "Desain Suara & Scoring Musik",
      description:
        "Komposisi musik tema sinematik orkestra, foley sound design, serta implementasi audio adaptif menggunakan Wwise & FMOD.",
    },
    {
      id: "qa-testing",
      icon: "ShieldCheck",
      title: "QA & Pengujian Kompatibilitas",
      description:
        "Pengujian fungsionalitas intensif, balancing gameplay, stress-testing jaringan multiplayer, dan sertifikasi platform resmi.",
    },
    {
      id: "live-ops",
      icon: "TrendingUp",
      title: "Live-Ops & Monetisasi Etis",
      description:
        "Manajemen update berkala konten musiman (battle pass), event komunitas berulang, dan optimasi retensi pemain jangka panjang.",
    },
  ] as ServiceItem[],

  // News / Berita (Data Awal / Statis untuk Step 1, disiapkan untuk integrasi database di Step 2)
  news: [
    {
      id: "1",
      title: 'Menguak Misteri "Abyssal Odyssey": Eksplorasi Bawah Laut dengan Grafis Generasi Baru',
      slug: "menguak-misteri-abyssal-odyssey",
      excerpt:
        "Kami secara resmi merilis trailer perdana yang menampilkan teknologi pencahayaan volumetrik dan ekosistem terumbu karang purba yang dinamis.",
      category: "Peluncuran Teaser",
      date: "24 Mei 2025",
      author: "Tim Devlog",
      thumbnail: "/images/hero-abyssal-odyssey.png",
    },
    {
      id: "2",
      title: '"Cyber Corsairs: Naval Front" Raih 500.000 Pemain Aktif di Musim Ketiga',
      slug: "cyber-corsairs-raih-500k-pemain",
      excerpt:
        "Pembaruan armada kapal tempur baru dan sistem cuaca badai samudera ekstrem berhasil memecahkan rekor jumlah pemain serentak di platform Steam.",
      category: "Pembaruan Game",
      date: "12 Mei 2025",
      author: "Patch v2.4",
      thumbnail: "/images/cyber-corsairs.png",
    },
    {
      id: "3",
      title: "MeSea Studio Membuka Program Magang & Rekrutmen Senior Gameplay Programmer",
      slug: "rekrutmen-gameplay-programmer",
      excerpt:
        "Kami memperluas ruang studio di kawasan Jakarta Selatan dan mengundang talenta game developer berbakat untuk bergabung dalam proyek AAA kami.",
      category: "Kultur & Karir",
      date: "02 Mei 2025",
      author: "MeSea Life",
      thumbnail: "/images/studio-team.png",
    },
  ] as NewsItem[],

  // Navigasi Utama
  navigation: [
    { name: "Beranda", href: "#home" },
    { name: "Tentang Kami", href: "#about" },
    { name: "Layanan", href: "#services" },
    { name: "Kabar & Artikel", href: "#news" },
    { name: "Kontak", href: "#contact" },
  ],
};

