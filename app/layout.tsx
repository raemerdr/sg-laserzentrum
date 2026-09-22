import type { Metadata, Viewport } from "next";
import { Geist_Mono, Literata, Mona_Sans } from "next/font/google";
import localFont from "next/font/local";
import { LangProvider } from "@/components/LangProvider";
import DevLangToggle from "@/components/DevLangToggle";
import { BookingProvider } from "@/components/layout/BookingProvider";
import Nav from "@/components/layout/Nav";
import SkipLink from "@/components/layout/SkipLink";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/** Display serif. Closest free match to the reference's LT Superior Serif at opsz 36. */
const serif = Literata({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-literata",
  display: "swap",
});

/** Text face. The width axis gives the expanded labels in the hero. */
const sans = Mona_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

/**
 * The Rankings, the client's own display serif: the nav wordmark, the hero
 * word and the menu. `block` keeps the giant hero word from flashing in a
 * fallback face; the file is preloaded on every route because the nav uses it.
 */
const display = localFont({
  src: "./fonts/TheRankings.otf",
  weight: "400",
  style: "normal",
  display: "block",
  adjustFontFallback: "Times New Roman",
  variable: "--font-rankings",
});

const mono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SG Laserzentrum | Dauerhafte Haarentfernung",
    template: "%s | SG Laserzentrum",
  },
  description:
    "Dauerhafte Haarentfernung mit Laser: NiSV-zertifiziertes Fachpersonal, moderne Lasertechnik und faire Preise in sieben Studios in Deutschland.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "SG Laserzentrum",
    images: [{ url: "/images/hero-face.jpg", width: 2880, height: 1607 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ebdf",
};

/**
 * Runs before first paint. Flags JS (reveal states only hide content when
 * scripts run) and decides whether the home intro plays: once per session,
 * never with reduced motion. A timeout releases the page if the intro never
 * mounts.
 */
const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.setAttribute("data-js","");try{if(location.pathname==="/"&&!sessionStorage.getItem("sg-intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","play");setTimeout(function(){if(d.getAttribute("data-intro")!=="done")d.setAttribute("data-intro","done")},5000)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${serif.variable} ${sans.variable} ${mono.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>
        <LangProvider>
          <BookingProvider>
            <SkipLink />
            <Nav />
            {children}
            <WhatsAppButton />
            <SmoothScroll />
            <DevLangToggle />
          </BookingProvider>
        </LangProvider>
      </body>
    </html>
  );
}
