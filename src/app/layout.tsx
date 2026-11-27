import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://meseastudio.com"),
  title: `${siteConfig.fullName} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "MeSea",
    "MeSea Game Studio",
    "Game Studio Indonesia",
    "Game Developer",
    "Underwater Game",
    "Unreal Engine 5",
    "AAA Game Studio",
  ],
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://meseastudio.com",
    title: `${siteConfig.fullName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.fullName,
    images: [
      {
        url: siteConfig.hero.featuredGame.image,
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} - Abyssal Odyssey`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.hero.featuredGame.image],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#08101E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sea-deep text-slate-200 antialiased selection:bg-sea-cyan selection:text-sea-abyss min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

