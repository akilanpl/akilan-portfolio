import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Akilan P L — AI/ML Engineer",
    short_name: "Akilan P L",
    description: "Portfolio of Akilan P L, AI/ML engineering student and researcher.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF9",
    theme_color: "#0B0C0E",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
