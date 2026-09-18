import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ArticlePage from "@/components/ratgeber/ArticlePage";
import { ARTICLES, ARTICLE_COPY, ARTICLE_IMAGE_SIZE, findArticle, wordCount } from "@/lib/articles";
import { COMPANY, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/ratgeber/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  const copy = ARTICLE_COPY.de[article.slug];
  const path = `/ratgeber/${article.slug}`;
  const image = { url: article.image, ...ARTICLE_IMAGE_SIZE, alt: copy.imageAlt };
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: { canonical: path },
    // A page's openGraph replaces the layout's completely, so it repeats site name and locale.
    openGraph: {
      type: "article",
      locale: "de_DE",
      siteName: COMPANY.brand,
      url: path,
      title: copy.title,
      description: copy.description,
      publishedTime: article.published,
      modifiedTime: article.updated,
      section: "Ratgeber",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps<"/ratgeber/[slug]">) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();
  const copy = ARTICLE_COPY.de[article.slug];
  const url = `${SITE_URL}/ratgeber/${article.slug}`;

  // Mirrors the visible page: the article with its photo and dates, written
  // and published by the studio, and the breadcrumb trail above the title.
  const organization = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: COMPANY.brand, url: SITE_URL };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: copy.title,
        description: copy.description,
        image: { "@type": "ImageObject", url: `${SITE_URL}${article.image}`, ...ARTICLE_IMAGE_SIZE },
        datePublished: article.published,
        dateModified: article.updated,
        inLanguage: "de-DE",
        articleSection: "Ratgeber",
        wordCount: wordCount(copy),
        author: organization,
        publisher: { ...organization, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` } },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${SITE_URL}/ratgeber` },
          { "@type": "ListItem", position: 3, name: copy.crumb, item: url },
        ],
      },
    ],
  };

  return (
    <div className="page">
      <main id="inhalt">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <ArticlePage slug={article.slug} />
      </main>
      <Footer />
    </div>
  );
}
