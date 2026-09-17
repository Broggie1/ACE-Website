import { createFileRoute } from "@tanstack/react-router";

const ROUTES = [
  ["/", "1.0", "weekly"], ["/about", "0.8", "monthly"], ["/what-we-do", "0.8", "monthly"], ["/projects", "0.8", "weekly"], ["/get-involved", "0.8", "monthly"], ["/faqs", "0.8", "monthly"], ["/contact", "0.7", "monthly"], ["/governance", "0.6", "monthly"], ["/privacy", "0.4", "yearly"], ["/cookies", "0.4", "yearly"], ["/accessibility", "0.4", "yearly"], ["/website-terms", "0.4", "yearly"],
] as const;

export const Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
  const origin = new URL(request.url).origin; const today = new Date().toISOString().split("T")[0];
  const urls = ROUTES.map(([path, priority, changefreq]) => `  <url>\n    <loc>${origin}${path === "/" ? "" : path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
} } } });
