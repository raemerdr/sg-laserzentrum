import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { STUDIOS } from "@/lib/locations";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string) => ({ url: `${SITE_URL}${path}`, lastModified });
  const latestArticle = ARTICLES.map((a) => a.updated).sort().at(-1);
  return [
    page(""),
    page("/standorte"),
    ...STUDIOS.map((s) => page(`/standorte/${s.slug}`)),
    page("/ratgeber", latestArticle),
    ...ARTICLES.map((a) => page(`/ratgeber/${a.slug}`, a.updated)),
    page("/kontakt"),
    page("/franchise-karriere"),
    page("/impressum"),
    page("/datenschutz"),
  ];
}
