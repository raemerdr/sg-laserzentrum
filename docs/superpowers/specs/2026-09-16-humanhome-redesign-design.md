# SG Laserzentrum redesign in the Human Home design language

Date: 2026-09-16
Reference: https://humanhome.framer.website/ (Framer template "Human Home")
Scope: rebuild the SG Laserzentrum Next.js site with the reference's visual system, using the client's updated brief (new company details, seven locations, Studiolution booking per location, per-location prices, Aquafacial-ready services, Franchise & Karriere page, German only).

## 1. What the reference does

### Typography

| Role | Reference | Size / line / tracking (desktop → mobile) |
| --- | --- | --- |
| Display serif | LT Superior Serif Medium 500 | 76/72 −4px → 38/42 −1px (hero, big section titles) |
| Section serif | same | 56/56 −1.25px → 30/34 −0.5px |
| Statement serif | same | 40/44 −1px → 24/28 −0.25px |
| Quote serif | same | 32/36 −1px |
| Wordmark | same | 20/20 −1px |
| Sans | Mona Sans 400/500 | body 16/24, lead 20/28, nav 14/20 (500), list 28/32 (500, −0.5px) |
| Mono labels | Geist Mono 600 | 14/16, +1.25px, uppercase (eyebrows, names, footer line, intro words) |

LT Superior Serif is not on Google Fonts. The closest free match is **Literata** at optical size 36, weight 400 (checked side by side in the browser). Mona Sans and Geist Mono are on Google Fonts. All three are self-hosted through `next/font/google`, so no request goes to Google.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| ink | #130C06 | text on light |
| black | #1A1816 | buttons |
| paper | #F9F8F5 | page, panels |
| stone | #EAE6DE | FAQ cards, input field |
| white | #FFFFFF | testimonial cards |
| scrim | rgba(22,21,20,.32) / rgba(19,12,6,.48) | over photography |
| muted | rgba(19,12,6,.64) | secondary text |
| faint | rgba(19,12,6,.12) | inactive list items |

This already matches the client's "mainly black and white with subtle beige or nude tones".

### Shape

Cards 24px radius with an 8px inset image at 16px, FAQ items 12px, nav pill 12px with 4px padding, buttons 10px, input pill 14px, round icon buttons. Content max 1312px; text columns 680px; 64px side gutters on desktop, 24px on mobile.

### Structure

1. Intro overlay: black screen, mono "HUMAN" plus a vertical word ticker (CARE → TOUCH → HEALTH → HOME). The black lifts, the two words slide to the far left and right edges and stay as side labels on the hero.
2. Hero, sticky, full viewport: video with 32% scrim, centred serif headline revealed word by word, glass pill nav dropping in from above.
3. Services panel: off-white panel whose top edge is an ellipse (`border-radius: 50% / 300px 300px 0 0`, 80px wider than the viewport on each side) rising over the sticky hero. Mono eyebrow, serif statement, then a sticky stage: service list on the left (active item full ink, others 12%), a deck of photo cards in the middle, description on the right. Each service change flies the top card up out of view (−1200px, ~0.8s ease-in-out) while the next card scales from 0.92 to 1.
4. About: sticky full-bleed photo with a 48% scrim, serif title bottom-left, lead paragraph right.
5. Reviews panel rising over it: huge sticky serif title, white cards (photo left, serif quote right, mono name and role) scrolling over the title.
6. FAQ: stone accordion cards, round +/× icon.
7. Book: centred serif title, sentence, inline pill form (stone field plus black button), with a slowly rotating ring of tilted photo cards around it.
8. Footer: one mono line.

Motion runs on Lenis smooth scrolling. Everything is calm: fades with small translation, one easing family, no bounce.

## 2. SG Laserzentrum adaptation

### Decisions

- **Static hero** (client asked for no video): regraded studio photograph with scrim.
- **Photography**: the existing generated placeholders had sage-green backdrops. `scripts/regrade-images.py` moves only the green hue band to warm stone, leaving skin tones alone, so they sit in the black/white/nude palette. Real studio photography replaces them later.
- **Booking**: every "Termin buchen" opens a location chooser that links to that studio's Studiolution (studiobookr.com) page. On a location page the button goes straight to that studio.
- **Language**: German is the only public language. The dev-only DE/EN toggle stays (not rendered in production), with English typed against German so a missing string fails the build.
- **Intro overlay**: kept as a signature moment but short (≈2s), shown once per browser session, skipped for reduced motion, never blocking content underneath. An inline head script decides before first paint, so there is no flash.

### Information architecture

| Route | Content |
| --- | --- |
| `/` | intro, hero, statement + treatments stage, about (sticky photo), numbers + USPs, technology, reviews + ProvenExpert, FAQ, locations, booking ring, footer |
| `/standorte` | all seven studios plus München "in Planung" |
| `/standorte/[slug]` | location hero, address/contact/hours cards, per-location price list, reviews, FAQ, other studios, booking ring |
| `/franchise-karriere` | shared Franchise & Karriere page (scope to be agreed with client) |
| `/impressum` | new GmbH & Co. KG details |
| `/datenschutz` | controller details; full text still to be supplied |

### Content model (`lib/`)

- `site.ts`: company (GmbH & Co. KG, register data, general partner, managing directors, founded 2022, VAT ID `null` until the new one arrives), central contact (0174 9593326 phone/WhatsApp, sg-laser-beauty@hotmail.com; swap to info@sg-laserzentrum.de once the mailbox exists), facts (30.000+ treatments, 600+ Google reviews), ProvenExpert config.
- `locations.ts`: seven open studios (Mainz, Karlsruhe, Mannheim, Stuttgart, Frankfurt, Nürnberg, Köln) plus München `planned`; each with address, phone, optional WhatsApp, Studiolution link, image, optional hours override. Default hours Mo–Fr 09:00–20:00, Sa 10:00–18:45.
- `services.ts`: services with a `published` flag. Laser hair removal is published; Aquafacial is drafted and hidden. Treatment-stage items belong to a service and only render when their service is published.
- `prices.ts`: `PRICES[locationSlug][serviceId] = PriceGroup[]`, empty until the client sends the lists. Location pages show a quiet "Preisliste folgt" state; in development only, a clearly labelled sample list shows the layout.
- `content.ts`: all UI copy, `COPY.de` and `COPY.en`.

Launching Aquafacial = set `published: true`, finish its copy, add its price groups per location.

### Components

- Primitives: `Button` (black, paper, glass), `SplitWords` (word stagger reveal), `useInView`, `Panel` (curved light panel), `Photo` (next/image fill wrapper).
- Chrome: `Nav` (glass pill, surface-aware light/dark, mobile sheet), `BookingProvider` + dialog, `SmoothScroll` (Lenis), `IntroOverlay`, `Footer`, `DevLangToggle`.
- Home: `Hero`, `TreatmentsStage`, `AboutStage`, `Proof`, `Technology`, `Reviews` (+ `ProvenExpert`), `Faq`, `LocationList`, `BookingRing`.
- Locations: `LocationHero`, `LocationFacts`, `PriceList`.
- Styling: CSS Modules per component, tokens and type utilities in `app/globals.css`.

### Motion spec

- Easing `cubic-bezier(0.76, 0, 0.24, 1)` for the card deck; `cubic-bezier(0.22, 1, 0.36, 1)` for reveals.
- Word reveal: opacity 0→1, translateY 0.35em→0, blur 6px→0, 0.9s, 60ms stagger.
- Nav entrance: translateY −72px→0, 1s, after the intro.
- Panels: elliptical top edge; where CSS scroll-driven animations exist, the curve deepens as the panel enters.
- Card deck: active changes when the next trigger's top crosses the viewport middle.
- Ring: 160s per revolution.
- `prefers-reduced-motion`: no Lenis, no intro, no ring spin, reveals shown immediately, deck crossfades.

### Open items for the client (not blocking the build)

- Price lists per location.
- Exact opening hours per location.
- New VAT ID (old GbR ID is deliberately not shown).
- ProvenExpert embed code or profile URL.
- Full privacy policy text (Datenschutzerklärung), including Studiolution booking and ProvenExpert.
- Franchise & Karriere scope.
- Professional mailbox info@sg-laserzentrum.de.
- WhatsApp link for Köln.
- Real studio photography.
