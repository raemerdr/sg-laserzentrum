import type { MetadataRoute } from "next";
import { STUDIOS } from "@/lib/locations";
import { ZONES, zonePath } from "@/lib/zones";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/standorte",
    ...STUDIOS.map((s) => `/standorte/${s.slug}`),
    ...ZONES.map((z) => zonePath(z.slug)),
    "/kontakt",
    "/franchise-karriere",
    "/impressum",
    "/datenschutz",
  ];
  return pages.map((path) => ({ url: `${SITE_URL}${path}` }));
}
