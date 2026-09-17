import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";
import Technology from "@/components/home/Technology";
import Treatments from "@/components/home/Treatments";
import Footer from "@/components/layout/Footer";
import IntroOverlay from "@/components/layout/IntroOverlay";
import BookingRing from "@/components/sections/BookingRing";
import Faq from "@/components/sections/Faq";
import Reviews from "@/components/sections/Reviews";
import StudioList from "@/components/sections/StudioList";
import Panel from "@/components/ui/Panel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="page">
      <IntroOverlay />
      <main id="inhalt">
        <div className={styles.stackTop}>
          <Hero />
          <Panel overhang>
            <Treatments />
          </Panel>
        </div>

        <div id="ueber-uns" className={styles.stackBottom} data-scroll-offset="-80">
          <About />
          <Panel>
            <Proof />
            <Technology />
            <Reviews />
            <Faq />
            <StudioList />
            <BookingRing />
          </Panel>
        </div>
      </main>
      <Footer />
    </div>
  );
}
