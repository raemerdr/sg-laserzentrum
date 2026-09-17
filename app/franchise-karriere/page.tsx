import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Careers from "@/components/pages/Careers";

export const metadata: Metadata = {
  title: "Franchise & Karriere",
  description:
    "Eröffnen Sie ein eigenes SG Laserzentrum oder werden Sie Teil unseres Teams: Franchise und Karriere bei SG Laserzentrum.",
  alternates: { canonical: "/franchise-karriere" },
};

export default function Page() {
  return (
    <div className="page">
      <main id="inhalt">
        <Careers />
      </main>
      <Footer />
    </div>
  );
}
