# SG Laserzentrum

Website for SG Laserzentrum GmbH & Co. KG: permanent laser hair removal at seven studios in Germany, with München in planning. Built with Next.js 16 (App Router). The public site is German only.

The visual system follows the Human Home Framer template (https://humanhome.framer.website/): warm near-black ink on a cream background (#F4EBDF), beige cards, a serif display face with mono labels, sticky photography with elliptical paper panels rising over it, and calm scroll motion. The full analysis and the decisions behind this build are in `docs/superpowers/specs/2026-09-16-humanhome-redesign-design.md`.

## Run

```bash
npm run dev
```

## Pages

| Route | Content |
| --- | --- |
| `/` | intro, hero with the trust figures, treatments stage, about and USPs, the brand story ("Von einem Standort zur Marke"), the founders ("Die Frauen hinter SG"), technology, reviews, FAQ, studios, booking |
| `/standorte` | all studios, München in planning |
| `/standorte/[slug]` | one page per studio: contact, opening hours with direct booking, five reviews from the studio's own Google listing with a link to all of them, FAQ, booking (price list off until real prices arrive) |
| `/franchise-karriere` | shared Franchise and Karriere page (draft, scope still to be agreed) |
| `/impressum`, `/datenschutz` | legal pages |

## Where content lives

- `lib/site.ts`: company and register data, central contact, headline figures (30.000+ treatments, 1.200+ Google reviews across all studios), the founders, ProvenExpert settings. The client's ~9,000 customer profiles include no-shows and are deliberately not shown.
- `lib/locations.ts`: the studios with address, phone, WhatsApp, Studiolution booking link, photo, optional opening hours and an optional Google rating (`google`), shown on the studio page once the client sends it. Default hours are Mo–Fr 09:00–20:00 and Sa 10:00–18:45.
- `lib/prices.ts`: one price list per studio, grouped per service. All lists are empty until the client sends them, so studio pages show a "Preisliste folgt" note. In development only, a labelled sample list shows the layout.
- `lib/services.ts`: services and the treatment areas in the home page stage.
- `lib/content.ts`: all copy. German (`COPY.de`) is the source; English (`COPY.en`) is typed against it, so a missing string fails the build.
- `lib/reviews.ts`: five 5-star reviews per studio from its own Google Maps listing, shown on that studio's page (quoted word for word, collected 22 September 2026). The home page shows the brand-wide quotes in `reviews.items`.

## Booking

Booking runs through Studiolution. Each studio has its own studiobookr.com page (studiobookr is Studiolution's booking front end). "Termin buchen" opens a studio chooser; on a studio page it links straight to that studio.

## Adding Aquafacial

1. Set `published: true` for `aquafacial` in `lib/services.ts`.
2. Finish its copy in `lib/content.ts` (`services.aquafacial`, `treatments.items.aquafacial`) and give it a photo in `TREATMENTS`.
3. Add its price groups per studio in `lib/prices.ts`.

It then appears in the treatments stage and in each studio's price list, with a tab per service.

## Design system

- Tokens and type scale are at the top of `app/globals.css`. Component styles are CSS Modules next to each component.
- Fonts are self-hosted through `next/font`: Literata (display, optical size 36, the closest free match to the reference's LT Superior Serif), Mona Sans (text; its width axis gives the expanded hero labels, and it sets the full-screen menu), Geist Mono (labels). LT Superior Serif is SIL OFL licensed and can replace Literata in `app/layout.tsx` if the exact face is wanted. The client's own The Rankings (`--font-display`) sets the hero lockup, its figures and the large SG beside the brand story.
- Motion: Lenis smooth scrolling, word-by-word headline reveals, curved panels whose edge deepens as they enter (CSS scroll-driven animation where supported), the card deck in the treatments stage, and a slowly turning photo ring in the booking section. `prefers-reduced-motion` turns all of it off.
- The black intro plays once per browser session on the home page. An inline script in `app/layout.tsx` decides before first paint, so there is no flash.

## Language switch (development only)

A floating DE / EN pill in the bottom-right corner switches the copy to English while working on the site. It is not rendered in production builds. The choice is remembered per browser.

## Nav

A full-width bar after the Marsea reference: the SG monogram on the left, small expanded capitals in the middle (Behandlungen and Standorte open dropdowns), "Menü" behind a hairline and a solid "Termin buchen" block in the right-hand corner. The bar is fixed, so booking stays one tap away while scrolling; on a studio page the button books that studio directly. "Menü" opens a full-screen menu set in Mona Sans on every screen size; below 1180px it replaces the centre links. The bar is transparent with cream type while hero photography sits under it (sections marked `data-nav-overlay`) and solid cream everywhere else; the booking block turns cream over the dark home hero.

A round WhatsApp button in WhatsApp green floats in the bottom-right corner of every page (`components/layout/WhatsAppButton.tsx`). On a studio page it opens that studio's WhatsApp, elsewhere (and for Köln, which has none yet) the central number. Layouts that reach into that corner, the hero's figures and the footer's last row, keep clear of it through `--wa-size` and `--wa-offset`.

## Logo

The client's SG monogram lives in `assets/brand/sg-monogram.png` (source artwork, not served). It was traced to vector for `components/ui/SgMonogram.tsx`, which draws in `currentColor`: gold (`--gold`) on cream, cream on photography. The favicon `app/icon.svg` uses the same path.

## Hero

The home hero follows the client's approved phone layout (September 2026): a full-bleed skin close-up with everything anchored bottom left. A short promise ("Schönheit beginnt mit Vertrauen"), SG stacked over LASERZENTRUM, one line of copy, a cream pill button that opens the studio chooser ("Standort wählen & Termin buchen"), and the four trust figures with line icons (30.000+ Behandlungen · 1.200+ Google-Bewertungen · 7 Standorte in Deutschland · NiSV-zertifiziertes Fachpersonal). On phones and portrait screens SG stacks over LASERZENTRUM as in the mockup: the word spans the full width, SG is 1.37 times its size, and the stack rises clear of the WhatsApp button. On landscape screens SG LASERZENTRUM runs on one line across the width, SG 1.5 times the size of the word on a shared baseline; the copy runs on one line with the button at the right, and the figures run along the bottom with their icons beside them. The sizes come from `--word-w` and `--mark-w` in `components/home/Hero.module.css`, the measured ink widths of the words; re-measure them if the words or the font change. The photo is art-directed: `hero-face.jpg` on landscape screens and the portrait crop `hero-face-mobile.jpg` on tall ones. Both come from one image generated with Nano Banana Pro for this layout, colour-graded to the warm amber tone of the Marsea reference.

## Technology

The technology section leads with the benefit ("Vier Wellenlängen. Eine Behandlung, individuell abgestimmt auf Ihren Haut- und Haartyp.") and an illustration generated for it with Nano Banana Pro (`public/images/technologie-wellenlaengen.jpg`): a skin cross-section in which four beams of light each follow a hair down to its root, deeper from left to right. It runs edge to edge, its top and bottom fading into the page, with the four label columns (wavelength, the skin and hair it suits) underneath. The beams sit at the centres of the image's quarters, so each column stays centred under its beam at any width; on phones the labels become a list. A CSS filter deepens the soft render's contrast (`.skin img` in `Technology.module.css`). It says "Hochleistungslaser" on purpose: "Medizinlaser" only once the device's official classification is confirmed. The device sits beside the headline: for now the existing product photo (`public/images/sg-xlaser-pro.jpg`, warmed slightly to the palette in CSS); swap in the client's own shot of the device in a studio or during a treatment when it arrives. The old cut-out (`sg-xlaser-pro-full.png`) is no longer used.

## Images

The other photographs in `public/images` are generated placeholders. They were shot against sage backdrops for the previous palette and regraded to warm stone with `scripts/regrade-images.py`, which moves only the green hue band so skin tones stay untouched. Replace them with real studio photography when available. Studio pages use them decoratively, so they carry empty alt text.

## Before launch

- Price lists for every studio (`lib/prices.ts`).
- Exact opening hours per studio (`lib/locations.ts`).
- New VAT ID (`COMPANY.vatId` in `lib/site.ts`). The old GbR ID is deliberately not shown.
- ProvenExpert profile URL and seal image (`PROVEN_EXPERT` in `lib/site.ts`).
- Full privacy policy text, covering hosting, Studiolution booking, ProvenExpert and WhatsApp links.
- Final Franchise & Karriere content.
- info@sg-laserzentrum.de once the mailbox exists (`CONTACT.email`).
- WhatsApp link for Köln.
- Real studio photography, a photo of the device in the studio or during a treatment, and a portrait of the founders for their section (a landscape shot of both; an empty frame labelled "Foto folgt" holds its place in `components/home/Founders.tsx`).
- Team members per studio, and optionally each studio's Google rating and review count (`google` in `lib/locations.ts`).
- Whether the SG XLaser Pro is officially classified as a medical laser; until then the site says "Hochleistungslaser".
