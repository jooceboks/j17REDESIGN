import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

/**
 * Generated from the same data the pages are, so a new service page can never
 * be missing from the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/mailing-list/founding", priority: 0.9 },
    { path: "/memberships", priority: 0.9 },
    { path: "/performance-index", priority: 0.8 },
    { path: "/recovery", priority: 0.8 },
    { path: "/cafe", priority: 0.6 },
    { path: "/first-timers", priority: 0.6 },
    { path: "/locations", priority: 0.7 },
    { path: "/contact-us", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}${service.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
