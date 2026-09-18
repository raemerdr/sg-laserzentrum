import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Imprint from "@/components/pages/Imprint";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von SG Laserzentrum: Anbieterkennzeichnung, Kontakt und Registerangaben.",
  alternates: { canonical: "/impressum" },
};

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <Imprint />
      </main>
      <Footer />
    </div>
  );
}
