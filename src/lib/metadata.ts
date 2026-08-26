import type { Metadata } from "next";

export const SITE_URL = "https://akilanpl.dev";
export const SITE_NAME = "Akilan P L";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const { title, description, path = "" } = opts;
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" ? title : `${title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/og-image.png`]
    }
  };
}
