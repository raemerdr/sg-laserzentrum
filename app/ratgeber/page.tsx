import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ArticleList from "@/components/ratgeber/ArticleList";
import { COMPANY } from "@/lib/site";

const title = "Ratgeber Laser-Haarentfernung";
const description =
  "Ratgeber zur Laser-Haarentfernung: Anzahl der Sitzungen, Laser oder IPL, dunkle Haut, Vorbereitung und Schmerzempfinden. Antworten von SG Laserzentrum.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ratgeber" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: COMPANY.brand,
    url: "/ratgeber",
    title,
    description,
    images: [{ url: "/images/ratgeber-laser-haarentfernung-sitzungen.jpg", width: 2048, height: 1374 }],
  },
};

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <ArticleList />
      </main>
      <Footer />
    </div>
  );
}
