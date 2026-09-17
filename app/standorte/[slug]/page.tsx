import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import StudioPage from "@/components/studio/StudioPage";
import { STUDIOS, findStudio } from "@/lib/locations";
import { COMPANY, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return STUDIOS.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/standorte/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const studio = findStudio(slug);
  if (!studio) return {};
  return {
    title: `Dauerhafte Haarentfernung in ${studio.city}`,
    description: `SG Laserzentrum ${studio.city}, ${studio.street}, ${studio.zip}: dauerhafte Haarentfernung mit moderner Lasertechnik und NiSV-zertifiziertem Fachpersonal. Preise, Öffnungszeiten und Online-Terminbuchung.`,
    alternates: { canonical: `/standorte/${studio.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/standorte/[slug]">) {
  const { slug } = await params;
  const studio = findStudio(slug);
  if (!studio) notFound();

  const [postalCode, ...locality] = studio.zip.split(" ");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: `SG Laserzentrum ${studio.city}`,
    url: `${SITE_URL}/standorte/${studio.slug}`,
    telephone: studio.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.street,
      postalCode,
      addressLocality: locality.join(" "),
      addressCountry: "DE",
    },
    parentOrganization: { "@type": "Organization", name: COMPANY.legalName, url: SITE_URL },
  };

  return (
    <div className="page">
      <main id="inhalt">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <StudioPage slug={studio.slug} />
      </main>
      <Footer />
    </div>
  );
}
