import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAFAF9",
          dark: "#08090B"
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#101114"
        },
        ink: {
          DEFAULT: "#0B0C0E",
          dark: "#F2F3F5"
        },
        muted: {
          DEFAULT: "#6B7078",
          dark: "#9096A1"
        },
        line: {
          DEFAULT: "rgba(11,12,14,0.09)",
          dark: "rgba(242,243,245,0.10)"
        },
        accent: {
          blue: "#3457FF",
          violet: "#7C5CFF",
          cyan: "#22D3EE"
        }
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      fontSize: {
        "display-1": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-2": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-3": ["clamp(1.6rem, 3vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }]
      },
      maxWidth: {
        content: "1180px"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(90deg, #3457FF 0%, #7C5CFF 55%, #22D3EE 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 32s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
