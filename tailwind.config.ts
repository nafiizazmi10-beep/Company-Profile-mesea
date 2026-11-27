import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sea: {
          deep: "#08101E",
          abyss: "#0B1528",
          surface: "#11223D",
          card: "#162C4E",
          border: "#1F3F6D",
          primary: "#1B365D",
          ocean: "#005A9C",
          cyan: "#60C1E5",
          ice: "#A0E0EF",
          mist: "#F0F9FF",
          coral: "#FF4B72",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "Sora", "sans-serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px -2px rgba(96, 193, 229, 0.35)",
        "glow-ocean": "0 12px 32px -4px rgba(0, 90, 156, 0.4)",
        "glow-cyan": "0 0 30px rgba(96, 193, 229, 0.45)",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;

