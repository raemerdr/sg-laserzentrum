import About from "@/components/home/About";
import Belief from "@/components/home/Belief";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";
import Statement from "@/components/home/Statement";
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
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="page">
      <IntroOverlay />
      <main id="inhalt">
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
            <Proof />
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
