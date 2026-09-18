import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import StudioPage from "@/components/studio/StudioPage";
import { STUDIOS, findStudio, hoursFor, mapsUrl, type TimeRange } from "@/lib/locations";
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
    title: `Dauerhafte Haarentfernung ${studio.city}`,
    description: `Dauerhafte Haarentfernung in ${studio.city} mit Diodenlaser: Gesicht, Achseln, Intimbereich, Beine. ${studio.street}, ${studio.zip}. Online-Termin buchen.`,
    alternates: { canonical: `/standorte/${studio.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/standorte/[slug]">) {
  const { slug } = await params;
  const studio = findStudio(slug);
  if (!studio) notFound();

  const [postalCode, ...locality] = studio.zip.split(" ");
  const hours = hoursFor(studio);
  const opening = (dayOfWeek: string[], range: TimeRange | null) =>
    range ? [{ "@type": "OpeningHoursSpecification", dayOfWeek, opens: range.open, closes: range.close }] : [];
  // Everything here is shown on the page too (address, phone, hours, photo, map).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/standorte/${studio.slug}#studio`,
    name: `SG Laserzentrum ${studio.city}`,
    url: `${SITE_URL}/standorte/${studio.slug}`,
    image: `${SITE_URL}${studio.image}`,
    telephone: studio.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.street,
      postalCode,
      addressLocality: locality.join(" "),
      addressCountry: "DE",
    },
    hasMap: mapsUrl(studio),
    openingHoursSpecification: [
      ...opening(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], hours.weekdays),
      ...opening(["Saturday"], hours.saturday),
      ...opening(["Sunday"], hours.sunday),
    ],
    parentOrganization: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: COMPANY.brand, url: SITE_URL },
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
