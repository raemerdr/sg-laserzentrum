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
| `/` | intro, hero, treatments stage, about, figures and USPs, technology, reviews, FAQ, studios, booking |
| `/standorte` | all studios, München in planning |
| `/standorte/[slug]` | one page per studio: contact, opening hours, price list, reviews, FAQ, booking |
| `/franchise-karriere` | shared Franchise and Karriere page (draft, scope still to be agreed) |
| `/impressum`, `/datenschutz` | legal pages |

## Where content lives

- `lib/site.ts`: company and register data, central contact, headline figures (30.000+ treatments, 600+ reviews), ProvenExpert settings.
- `lib/locations.ts`: the studios with address, phone, WhatsApp, Studiolution booking link, photo and optional opening hours. Default hours are Mo–Fr 09:00–20:00 and Sa 10:00–18:45.
- `lib/prices.ts`: one price list per studio, grouped per service. All lists are empty until the client sends them, so studio pages show a "Preisliste folgt" note. In development only, a labelled sample list shows the layout.
- `lib/services.ts`: services and the treatment areas in the home page stage.
- `lib/content.ts`: all copy. German (`COPY.de`) is the source; English (`COPY.en`) is typed against it, so a missing string fails the build.

## Booking

Booking runs through Studiolution. Each studio has its own studiobookr.com page (studiobookr is Studiolution's booking front end). "Termin buchen" opens a studio chooser; on a studio page it links straight to that studio.

## Adding Aquafacial

1. Set `published: true` for `aquafacial` in `lib/services.ts`.
2. Finish its copy in `lib/content.ts` (`services.aquafacial`, `treatments.items.aquafacial`) and give it a photo in `TREATMENTS`.
3. Add its price groups per studio in `lib/prices.ts`.

It then appears in the treatments stage and in each studio's price list, with a tab per service.

## Design system

- Tokens and type scale are at the top of `app/globals.css`. Component styles are CSS Modules next to each component.
- Fonts are self-hosted through `next/font`: Literata (display, optical size 36, the closest free match to the reference's LT Superior Serif), Mona Sans (text; its width axis gives the expanded hero labels), Geist Mono (labels). LT Superior Serif is SIL OFL licensed and can replace Literata in `app/layout.tsx` if the exact face is wanted. The client's own The Rankings sets the nav wordmark, the giant hero word and the menu (`--font-display`).
- Motion: Lenis smooth scrolling, word-by-word headline reveals, curved panels whose edge deepens as they enter (CSS scroll-driven animation where supported), the card deck in the treatments stage, and a slowly turning photo ring in the booking section. `prefers-reduced-motion` turns all of it off.
- The black intro plays once per browser session on the home page. An inline script in `app/layout.tsx` decides before first paint, so there is no flash.

## Language switch (development only)

A floating DE / EN pill in the bottom-right corner switches the copy to English while working on the site. It is not rendered in production builds. The choice is remembered per browser.

## Nav

A full-width bar after the Marsea reference: the SG monogram on the left, small expanded capitals in the middle (Behandlungen and Standorte open dropdowns), and "Termin buchen" and "Menü" at the right behind hairline dividers. "Menü" opens a full-screen menu on every screen size; below 1180px it replaces the centre links. The bar is transparent with cream type while hero photography sits under it (sections marked `data-nav-overlay`) and solid cream everywhere else.

## Logo

The client's SG monogram lives in `assets/brand/sg-monogram.png` (source artwork, not served). It was traced to vector for `components/ui/SgMonogram.tsx`, which draws in `currentColor`: gold (`--gold`) on cream, cream on photography. The favicon `app/icon.svg` uses the same path.

## Hero

The home hero follows the Marsea campaign layout: a full-bleed skin close-up, one giant word ("Laserzentrum") across the bottom that exactly fills the width, a short line of copy above it on the right and three expanded labels beneath. The word's size comes from `--fit` in `components/home/Hero.module.css`, the measured width of the word in em; re-measure it if the word or font changes. The photo is art-directed: `hero-face.jpg` on landscape screens and the portrait crop `hero-face-mobile.jpg` on tall ones. Both come from one image generated with Nano Banana Pro for this layout, colour-graded to the warm amber tone of the Marsea reference.

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
- Real studio photography.
