import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { getProjects, getBlogList } from "@/lib/content";
import { flatNav } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = flatNav.map((link) => ({
    url: `${SITE_URL}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.7
  }));

  const projectRoutes = getProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const blogRoutes = getBlogList()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.5
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
