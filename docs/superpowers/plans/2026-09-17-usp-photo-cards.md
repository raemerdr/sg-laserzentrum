# USP Photo Cards Implementation Plan

> **Superseded.** This plan covers the first iteration (4 : 3 : 3 grid inside the panel). The design changed several times the same day; `docs/superpowers/specs/2026-09-17-usp-photo-cards-design.md` describes what shipped.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the six USP text cards on the home page into the reference's photo-card grid, using five new Magnific photos.

**Architecture:** Five photos are generated with the Magnific MCP connector and saved to `public/images/`. The USP entries in the typed content module get an optional `photo`. `Proof.tsx` renders a photo card when an entry has one and a plain card when it doesn't. The grid is a wrapping flex row sized after the reference.

**Tech Stack:** Next.js 16.3.5 (App Router, Turbopack), React 19, CSS Modules, `next/image` through `components/ui/Photo.tsx`, Magnific MCP (`images_generate`, Nano Banana Pro).

Spec: `docs/superpowers/specs/2026-09-17-usp-photo-cards-design.md`

## Global Constraints

- Next.js 16 differs from older versions. Check `node_modules/next/dist/docs/` before using an API, and use `preload`, since `priority` is deprecated.
- German copy is authoritative. `Copy = typeof COPY_DE`, so every German change needs an English twin or the type check fails.
- Palette: black, white and nude only, with no saturated colours.
- USP cards have no arrows, no links and no hover effects. Index numbers (01–06) are removed.
- Magnific: model `imagen-nano-banana-2` (Nano Banana Pro), `aspectRatio` "3:2", `resolution` "2k", `count` 1. That is 75 credits per image and 375 in total. Regenerate only an image that misses its brief.
- Saved photos are JPEG and at most 2048px wide (`next.config.ts` caps `deviceSizes` at 2048).
- Do not commit unless Rodil asks.

## File Structure

| File | Change | Responsibility |
| --- | --- | --- |
| `public/images/usp-spezialisiert.jpg` … `usp-preise.jpg` | create (5) | USP photography |
| `lib/content.ts` | modify | `Usp` type; `photo` on USP items 1–5 in DE and EN |
| `components/home/Proof.tsx` | modify | render photo cards and the plain card |
| `components/home/Proof.module.css` | modify | grid, card, scrim and responsive rules |

---

### Task 1: Generate and save the five photos

**Files:**
- Create: `public/images/usp-spezialisiert.jpg`, `usp-fachpersonal.jpg`, `usp-technologie.jpg`, `usp-schulungen.jpg`, `usp-preise.jpg`

**Interfaces:**
- Produces: the five paths above, used by Task 2.

Every prompt ends with this shared style block (STYLE):

> Muted warm nude, beige, cream and soft brown tones only, no saturated colours. Warm soft window light from the right, the left third of the frame falling into soft, even warm shadow, a few gentle out-of-focus bokeh highlights. The subject sits in the right two thirds of the frame; the left third stays calm and uncluttered for overlaid text. Shot on a medium format camera, shallow depth of field, fine film grain, calm, intimate and luxurious, photorealistic. No text, no letters, no logos, no watermark, no jewellery.

- [ ] **Step 1: Generate five images, one `images_generate` call each** (`mode: "imagen-nano-banana-2"`, `aspectRatio: "3:2"`, `resolution: "2k"`, `count: 1`). Each prompt is the subject below followed by STYLE:

| File | Subject (prompt start) |
| --- | --- |
| `usp-spezialisiert.jpg` | Editorial beauty campaign photograph for a high-end laser hair removal clinic. Close-up of a young woman's smooth bare shoulder, collarbone and the side of her neck, perfectly smooth hair-free skin with fine natural texture and a soft dewy glow, a few loose light-brown hair strands falling across the shoulder, face out of frame, modest and tasteful. |
| `usp-fachpersonal.jpg` | Editorial campaign photograph for a high-end laser hair removal clinic. A professional specialist in a clean cream linen tunic holds a sleek white laser hair removal handpiece with calm, precise hands at chest height, her face out of frame above the top edge, in a bright minimal treatment room with a cream plaster wall and a sheer linen curtain, conveying trust and expertise. |
| `usp-technologie.jpg` | Editorial product detail photograph for a high-end laser hair removal clinic. Macro close-up of the tip of a sleek modern white medical laser handpiece with a clear square sapphire cooling window, a faint delicate wisp of cold mist rising from the tip, resting on softly draped cream linen, precise and premium. |
| `usp-schulungen.jpg` | Editorial campaign photograph for a high-end laser hair removal clinic. Wide shot of two specialists in clean cream linen tunics in a bright minimal treatment room: an experienced trainer stands beside a younger colleague and gently guides her hand as she holds a sleek white laser handpiece above a folded cream towel on a treatment bed, a focused and friendly teaching moment, faces softly out of focus. |
| `usp-preise.jpg` | Editorial interior photograph for a high-end laser hair removal clinic. A calm reception counter of cream travertine stone with a small blank white card with no writing standing in a clear acrylic stand, a matte ceramic vase with dried pampas grass beside it, a soft plaster wall behind, no people, honest, clear and inviting. |

- [ ] **Step 2: Show and wait.** Call `creations_show` with all five identifiers, then `creations_wait` until every one is terminal.

- [ ] **Step 3: Review each image against its brief.** It should be on-palette, have a calm left third, contain no text, logos or jewellery, and have no anatomy or device glitches. Regenerate only an image that fails, one call per failure.

- [ ] **Step 4: Save to disk.** Call `creations_register_download` with the five identifiers. Get the full-resolution `url` for each from `creations_get`, then:

```bash
S="$SCRATCHPAD/usp"; mkdir -p "$S"
curl -fsSL "<url>" -o "$S/usp-spezialisiert.src"   # repeat per file
sips -s format jpeg -s formatOptions 86 -Z 2048 "$S/usp-spezialisiert.src" --out public/images/usp-spezialisiert.jpg
```

Expected: five JPEGs, each at most 2048px wide (`sips -g pixelWidth public/images/usp-*.jpg`).

### Task 2: Photo cards

**Files:**
- Modify: `lib/content.ts` (type block near line 6, `proof.usps` in DE near line 124 and EN near line 503)
- Modify: `components/home/Proof.tsx`
- Modify: `components/home/Proof.module.css`

**Interfaces:**
- Consumes: the five image paths from Task 1.
- Produces: `type Usp = { title: string; body: string; photo?: { src: string; alt: string } }`; `proof.usps(studios: number): Usp[]`.

- [ ] **Step 1: Add the type** in `lib/content.ts` below `type Faq`:

```ts
type Usp = { title: string; body: string; photo?: { src: string; alt: string } };
```

- [ ] **Step 2: German USPs.** Replace `usps: (studios: number) => [` in `COPY_DE.proof` with `usps: (studios: number): Usp[] => [` and add a `photo` to items 1–5:

```ts
      {
        title: "100 % Haarentfernung",
        body: "Wir konzentrieren uns auf eine einzige Behandlung und beherrschen sie entsprechend gut.",
        photo: { src: "/images/usp-spezialisiert.jpg", alt: "Glatte Schulter einer Frau im warmen Licht" },
      },
      {
        title: "NiSV-zertifiziertes Personal",
        body: "Unser Fachpersonal ist nach der NiSV zertifiziert, der Verordnung für den Einsatz von Lasern am Menschen.",
        photo: { src: "/images/usp-fachpersonal.jpg", alt: "Fachkraft hält das Laser-Handstück in ruhigen Händen" },
      },
      {
        title: "Moderne Lasertechnologie",
        body: "Ein Hochleistungslaser mit vier Wellenlängen und integrierter Kontaktkühlung.",
        photo: { src: "/images/usp-technologie.jpg", alt: "Spitze eines Laser-Handstücks mit Kühlfenster in Nahaufnahme" },
      },
      {
        title: "Regelmäßige Schulungen",
        body: "Wir schulen unser Team laufend intern, damit jede Behandlung dem aktuellen Stand entspricht.",
        photo: { src: "/images/usp-schulungen.jpg", alt: "Eine Fachkraft führt die Hand einer Kollegin am Laser-Handstück" },
      },
      {
        title: "Faire, transparente Preise",
        body: "Jeder Standort hat eine eigene, klar aufgeführte Preisliste.",
        photo: { src: "/images/usp-preise.jpg", alt: "Empfangstheke aus hellem Stein mit Preiskarte" },
      },
```

Item 6 (`Standorte`) stays unchanged, with no `photo`. If a picked image differs from its subject, update the alt to describe the actual photo.

- [ ] **Step 3: English USPs.** Same change in `COPY_EN.proof`:

```ts
      {
        title: "100% hair removal",
        body: "We focus on a single treatment and are very good at it as a result.",
        photo: { src: "/images/usp-spezialisiert.jpg", alt: "A woman's smooth bare shoulder in warm light" },
      },
      {
        title: "NiSV-certified staff",
        body: "Our specialists are certified under the NiSV, the German regulation on using lasers on people.",
        photo: { src: "/images/usp-fachpersonal.jpg", alt: "A specialist holding the laser handpiece with steady hands" },
      },
      {
        title: "Modern laser technology",
        body: "A high-performance laser with four wavelengths and built-in contact cooling.",
        photo: { src: "/images/usp-technologie.jpg", alt: "Close-up of a laser handpiece tip with its cooling window" },
      },
      {
        title: "Regular training",
        body: "We train our team in-house on an ongoing basis, so every treatment reflects current practice.",
        photo: { src: "/images/usp-schulungen.jpg", alt: "A specialist guiding a colleague's hand on the laser handpiece" },
      },
      {
        title: "Fair, transparent prices",
        body: "Every location has its own clearly listed price list.",
        photo: { src: "/images/usp-preise.jpg", alt: "Light stone reception counter with a price card" },
      },
```

- [ ] **Step 4: Render the cards.** In `components/home/Proof.tsx`, add `import Photo from "../ui/Photo";` above the `Reveal` import and replace the `<ul className={styles.usps}>` block with:

```tsx
      <ul className={styles.usps}>
        {t.proof.usps(STUDIOS.length).map((u, i) => (
          <li key={u.title}>
            <Reveal className={`${styles.usp} ${u.photo ? styles.photoCard : ""}`} delay={(i % 3) * 90}>
              {u.photo && (
                <Photo
                  src={u.photo.src}
                  alt={u.photo.alt}
                  sizes="(max-width: 599px) 92vw, (max-width: 999px) 46vw, 520px"
                  className={styles.photo}
                />
              )}
              <h3 className={styles.uspTitle}>{u.title}</h3>
              <p className={styles.uspBody}>{u.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
```

- [ ] **Step 5: Styles.** In `components/home/Proof.module.css`, replace everything from `.usps {` through `.uspBody { … }`, drop `.index`, and replace the `.usps` rules inside both media queries. The `.stats`/`.stat` rules stay as they are.

```css
/* Grid after the reference: three equal cards, then 4 : 3 : 3 */
.usps {
  --gap: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  margin-top: clamp(64px, 8vw, 120px);
}

.usps > li {
  display: flex;
  flex: 0 0 calc((100% - 2 * var(--gap)) / 3);
  height: clamp(260px, 23vw, 300px);
}

.usps > li:nth-child(4) {
  flex-basis: calc((100% - 2 * var(--gap)) * 0.4);
}

.usps > li:nth-child(n + 5) {
  flex-basis: calc((100% - 2 * var(--gap)) * 0.3);
}

.usp {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 24px;
  overflow: hidden;
  border-radius: var(--r-card);
  background: var(--white);
}

.photoCard {
  /* shows while the photo loads */
  background: var(--stone-deep);
  color: var(--paper);
}

/* darker at the top and bottom edges so white text reads on light photos */
.photoCard::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(var(--ink-rgb), 0.4),
    rgba(var(--ink-rgb), 0) 34%,
    rgba(var(--ink-rgb), 0) 52%,
    rgba(var(--ink-rgb), 0.55)
  );
}

.photo {
  z-index: -2;
}

.uspTitle {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: -0.3px;
}

.uspBody {
  max-width: 30em;
  font-size: 15px;
  line-height: 22px;
  color: var(--muted);
}

.photoCard .uspBody {
  color: rgba(var(--paper-rgb), 0.82);
}
```

Inside `@media (max-width: 999px)`, in place of the old `.usps` rule:

```css
  .usps > li:nth-child(n) {
    flex-basis: calc((100% - var(--gap)) / 2);
    height: 300px;
  }
```

Replace the whole `@media (max-width: 599px)` block with:

```css
@media (max-width: 599px) {
  .usps > li:nth-child(n) {
    flex-basis: 100%;
    height: auto;
  }

  .usp {
    padding: 20px;
  }

  .photoCard {
    min-height: 340px;
  }
}
```

- [ ] **Step 6: Type check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit 0 with no errors.

- [ ] **Step 7: Verify in the browser** (the `sg-dev` preview, scrolled to "Was uns ausmacht"):
  - At 1440×900: row 1 has three equal cards; row 2's first card is visibly wider (about 40%); the Standorte card is plain cream; all text is readable; there are no arrows or numbers.
  - At 768×1024: two equal columns, with every card 300px tall.
  - At 375×812: one column, photo cards at least 340px tall, and the plain card sized by its content.
  - The dev language toggle shows English titles and descriptions.
  - `read_console_messages` with `onlyErrors` shows nothing new; `preview_logs` shows no image 404s.

- [ ] **Step 8: Commit, but only when Rodil asks**

```bash
git add public/images/usp-*.jpg lib/content.ts components/home/Proof.tsx components/home/Proof.module.css docs/superpowers
git commit -m "Turn the USP cards into photo cards after the clinic grid reference"
```
