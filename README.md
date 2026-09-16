# SG Laserzentrum

Website for SG Laserzentrum (SinemgizemBeauty GbR) — permanent laser hair removal with six studios in Germany. Built with Next.js (App Router). The site is in German; the layout is one fluid build that serves desktop and mobile, with the navigation collapsing to a drawer below 900px.

## Run

```bash
npm run dev
```

## Language switch (development only)

A floating DE / EN pill sits in the bottom-right corner so the site can be read in English while working on it. It is rendered only when `NODE_ENV` is not `production`, so the published site stays German-only. The choice is remembered per browser in `localStorage`.

German is the source of truth. Both languages live in `lib/content.ts` under `COPY.de` and `COPY.en`; the English object is typed against the German one, so a missing translation is a build error.

## Where things live

- `app/page.tsx` — section order
- `components/` — one component per section (`Hero`, `About`, `Treatments`, `Statement`, `Proof`, `Numbers`, `Footer`) plus shared pieces (`Header`, `PillButton`, `ImageSlot`, `Wordmark`, `LangProvider`, `DevLangToggle`)
- `lib/content.ts` — all copy in both languages, the six studio locations with their booking links, contact and imprint details, and the image map
- `app/globals.css` — every style. Sizing uses container-query units so sections scale with the page rather than the viewport.

## Business content

Copy, addresses, phone numbers, booking links and imprint data were taken from sg-laserzentrum.de. Each studio links to its own StudioBookr booking page. Every "Termin buchen" button on the page scrolls to the locations block, because booking is per studio.

## Images

The nine photographs in `public/images` were generated with Google Nano Banana 2 as placeholders, shot against sage green backdrops with oat and cream wardrobe so they sit with the green palette. Swapping the palette means reshooting or regrading these too, since a scrim in one hue over photography in another goes muddy. Replace them with real studio photography when it is available; the filenames are mapped in the `IMAGES` object in `lib/content.ts`, and any entry set to `null` falls back to a labelled placeholder box.

## Brand

Colour tokens are at the top of `app/globals.css`: forest `#2C3828`, soft bone `#F2F0E8`, sage `#68795A` and the gold `#C6A36E` from the SG monogram. A warm espresso and caramel alternative sits beside them in a comment; swapping five values flips the whole site between the two.

Headings use The Rankings, the client's own display serif, self-hosted from `app/fonts` through `next/font/local`. Body copy is DM Sans. The licence for The Rankings travels with the client, not with this repo.

Treatments render as four full-viewport split panels that alternate which side carries the copy. Source photography is capped at 2400px wide and the image optimizer is limited to matching widths in `next.config.ts`, because upscaling past the source stalls the dev optimizer.

## Not built yet

- Prices are deliberately absent. Add them to the treatment items in `lib/content.ts` once confirmed.
- Imprint, privacy and terms links point at the old site.
- Opening hours were not published on the old site, so they are not shown.
