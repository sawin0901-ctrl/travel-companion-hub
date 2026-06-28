import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { DESTINATIONS } from "@/lib/destinations";
import { FLIGHT_ROUTES } from "@/lib/flight-routes";
import { BLOG_POSTS } from "@/lib/blog-posts";

const BASE_URL = "https://jetsale.online";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/flights", changefreq: "daily", priority: "0.9" },
          { path: "/hotels", changefreq: "daily", priority: "0.9" },
          { path: "/oteli", changefreq: "weekly", priority: "0.8" },
          { path: "/aviabilety", changefreq: "weekly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/legal/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/legal/terms", changefreq: "yearly", priority: "0.3" },
          ...DESTINATIONS.map((d) => ({
            path: `/oteli/${d.slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...FLIGHT_ROUTES.map((r) => ({
            path: `/aviabilety/${r.slug}`,
            changefreq: "daily" as const,
            priority: "0.8",
          })),
          ...BLOG_POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});