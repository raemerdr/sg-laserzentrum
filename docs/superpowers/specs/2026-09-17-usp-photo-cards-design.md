# USP photo cards

Date: 2026-09-17 (revised the same day)
References: first a beauty-clinic services grid (label top-left, round arrow); final design follows a treatment-card strip (tall photo cards, italic serif title centered at the top, small white pill button at the bottom).
Scope: the six USPs ("100 % Haarentfernung" … "Sieben Standorte") on the home page.

## Decisions

- **Own section, below the About photo.** The tiles moved out of `Proof` into `components/home/Usps.tsx`, placed between `About` (no longer pinned) and the paper panel. `Proof` keeps its heading and the four figures.
- **Edge to edge, square corners.** No side gutters and no radius; 4px hairline gaps between tiles.
- **Curve transition kept.** The strip is `position: sticky` with `top` set to 100svh minus its own height (calculated from `--cols`, `--rows`, `--gap` and `--ratio`), so it pins once the last row reaches the bottom of the screen and the paper panel's curve rises over it.
- **Two rows of three** on desktop, two columns on tablets, one on phones.
- **Tile:** tall photo (3:4, 4:5 on phones) with a light ink shade at the top behind the text.
- **Title:** Literata italic (loaded again for this), 28–40px, `--paper`, centered at the top.
- **Sub text:** the one-sentence description, 15/22, `--paper`, centered under the title.
- **Earlier iterations**, all dropped: arrows, a 4 : 3 : 3 grid inside the panel, a two-column version, a plain Standorte card, cards sliding over the pinned About photo, "Termin buchen" pills.

## Content

`lib/content.ts`: `type Usp = { title; body; photo: { src; alt; position } }`. `position` is the `object-position` for the tall crop of the 3:2 photos:

| Point | File | Position |
| --- | --- | --- |
| 100 % Haarentfernung | `usp-spezialisiert.jpg` | 60% 50% |
| NiSV-zertifiziertes Personal | `usp-fachpersonal.jpg` | 60% 50% |
| Moderne Lasertechnologie | `usp-technologie.jpg` | 78% 50% |
| Regelmäßige Schulungen | `usp-schulungen.jpg` | 62% 50% |
| Faire, transparente Preise | `usp-preise.jpg` | 60% 50% |
| Sieben Standorte | `usp-standorte.jpg` | 55% 50% |

## Photography

Six Magnific images, Nano Banana Pro, 3:2 at 2K, saved as 2048px JPEGs in `public/images/`: warm editorial campaign light, muted nude/beige/cream, no text, logos or jewellery. The subjects sit right of centre, so the tall crops are shifted per photo (table above). If a crop ever feels tight, portrait-format versions can be generated instead.

## Verification

- `npx tsc --noEmit` and `npm run lint` pass.
- 1933×1267: tiles 642×856 edge to edge, strip pins with its bottom at the screen edge and the panel curve rises over it; 375×812: one column, pins the same way, no page overflow.
- English titles, sub text and alts show through the dev toggle.
