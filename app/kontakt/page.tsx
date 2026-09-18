import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/pages/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zu SG Laserzentrum: Telefon, WhatsApp und E-Mail, dazu Adresse und Telefonnummer aller Studios. Termine buchen Sie direkt online.",
  alternates: { canonical: "/kontakt" },
};

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
