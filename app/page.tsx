import About from "@/components/home/About";
import Belief from "@/components/home/Belief";
import Founders from "@/components/home/Founders";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Story from "@/components/home/Story";
import Technology from "@/components/home/Technology";
import Treatments from "@/components/home/Treatments";
import Usps from "@/components/home/Usps";
import Footer from "@/components/layout/Footer";
import IntroOverlay from "@/components/layout/IntroOverlay";
import BookingCta from "@/components/sections/BookingCta";
import Faq from "@/components/sections/Faq";
import Reviews from "@/components/sections/Reviews";
import StudioList from "@/components/sections/StudioList";
import Panel from "@/components/ui/Panel";
import PinToBottom from "@/components/ui/PinToBottom";
import { COMPANY, CONTACT, FOUNDERS, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: "Dauerhafte Haarentfernung mit Laser | SG Laserzentrum" },
  alternates: { canonical: "/" },
};

/** The brand itself; each studio page links to it as its parent organisation. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.brand,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: CONTACT.email,
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  foundingDate: String(COMPANY.founded),
  founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name })),
};

export default function Home() {
  return (
    <div className="page">
      <IntroOverlay />
      <main id="inhalt">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className={styles.stackTop}>
          <Hero />
          <Panel overhang>
            <Statement />
            <Belief />
            <Treatments />
          </Panel>
        </div>

        <div id="ueber-uns" className={styles.stackBottom} data-scroll-offset="-80">
          {/* photo and tile strip hold still together while the panel's curve rises over them */}
          <PinToBottom>
            <About />
            <Usps />
          </PinToBottom>
          <Panel>
            <Story />
            <Founders />
            <Technology />
            <Reviews />
            <Faq />
            <StudioList />
            <BookingCta />
          </Panel>
        </div>
      </main>
      <Footer />
    </div>
  );
}
