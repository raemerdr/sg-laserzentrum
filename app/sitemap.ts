import type { MetadataRoute } from "next";
import { STUDIOS } from "@/lib/locations";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/standorte", ...STUDIOS.map((s) => `/standorte/${s.slug}`), "/franchise-karriere", "/impressum", "/datenschutz"];
  return pages.map((path) => ({ url: `${SITE_URL}${path}` }));
}
