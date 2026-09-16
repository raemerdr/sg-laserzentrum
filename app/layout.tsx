import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import DevLangToggle from "@/components/DevLangToggle";
import Header from "@/components/Header";
import "./globals.css";

/** The Rankings — client-supplied display serif, used for every heading. */
const display = localFont({
  src: "./fonts/TheRankings.otf",
  weight: "400",
  style: "normal",
  variable: "--font-display-var",
  display: "swap",
  fallback: ["Didot", "Georgia", "serif"],
});

const sans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SG Laserzentrum | Dauerhafte Haarentfernung",
  description:
    "SG Laserzentrum ist Ihr Spezialist für dauerhafte Haarentfernung: schonend, präzise und abgestimmt auf jeden Haut- und Haartyp. Sechs Standorte in Deutschland.",
};

export const viewport: Viewport = {
  themeColor: "#2C3828",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable}`}>
      <body>
        <LangProvider>
          <Header />
          {children}
          <DevLangToggle />
        </LangProvider>
      </body>
    </html>
  );
}
