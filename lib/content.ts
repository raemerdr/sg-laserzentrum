import type { ServiceId, TreatmentId } from "./services";

export type Lang = "de" | "en";

type Link = { label: string; href: string };
type Faq = { q: string; a: string; list?: string[] };

const DE_NUMBERS = ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
const EN_NUMBERS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

const word = (list: string[], n: number) => list[n] ?? String(n);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const COPY_DE = {
  brand: "SG Laserzentrum",

  a11y: {
    skip: "Zum Inhalt springen",
    mainNav: "Hauptnavigation",
    footerNav: "Fußnavigation",
    opensNewTab: "(öffnet in neuem Tab)",
    devLang: "Sprache umschalten (nur Entwicklung)",
  },

  nav: {
    treatments: "Behandlungen",
    treatmentLinks: [
      { label: "Dauerhafte Haarentfernung", href: "/#behandlungen" },
      { label: "Technologie", href: "/#technologie" },
      { label: "Bewertungen", href: "/#bewertungen" },
      { label: "Häufige Fragen", href: "/#faq" },
    ] as Link[],
    studios: "Standorte",
    allStudios: "Alle Standorte",
    planned: "in Planung",
    links: [
      { label: "Über uns", href: "/#ueber-uns" },
      { label: "Karriere", href: "/franchise-karriere" },
      { label: "Kontakt", href: "#kontakt" },
    ] as Link[],
    start: "Startseite",
    book: "Termin buchen",
    bookShort: "Buchen",
    menu: "Menü",
    close: "Schließen",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    home: "SG Laserzentrum Startseite",
    contact: "Kontakt",
  },

  intro: {
    lead: "Dauerhaft",
    words: ["sanft", "präzise", "sicher", "glatt"],
  },

  hero: {
    brand: "SG Laserzentrum",
    word: "Laserzentrum",
    intro: "SG Laserzentrum – dauerhafte Haarentfernung mit Gefühl für Ihre Haut.",
    labels: (studios: number) => ["Dauerhafte Haarentfernung", "Moderne Lasertechnologie", `${studios} Standorte in Deutschland`],
    imageAlt: "Nahaufnahme eines Frauengesichts mit glatter, strahlender Haut",
  },

  statement: {
    eyebrow: "In wenigen Worten",
    text: "Seit 2022 konzentrieren wir uns auf eine einzige Sache: dauerhafte Haarentfernung. Mit moderner Lasertechnik, NiSV-zertifiziertem Fachpersonal und fairen, transparenten Preisen.",
  },

  services: {
    laser: "Dauerhafte Haarentfernung",
    aquafacial: "Aquafacial",
  } satisfies Record<ServiceId, string>,

  treatments: {
    listLabel: "Behandlungsbereiche",
    cta: "Preise & Termin",
    items: {
      gesicht: {
        name: "Gesicht",
        body: "Oberlippe, Kinn und Wangen behandeln wir mit kleinen Impulsen und ruhiger Hand, damit die Haut rundherum unberührt bleibt.",
        alt: "Frau mit geschlossenen Augen berührt ihr glattes Kinn",
      },
      achseln: {
        name: "Achseln",
        body: "In wenigen Minuten behandelt und dauerhaft glatt. Schluss mit Rasurbrand und eingewachsenen Haaren.",
        alt: "Frau mit erhobenem Arm zeigt eine glatte Achsel",
      },
      bikinizone: {
        name: "Bikinizone",
        body: "Sensible Bereiche behandeln wir mit gekühltem Handstück und angepasster Intensität, diskret und in Ihrem Tempo.",
        alt: "Körpermitte einer Frau in heller Unterwäsche",
      },
      beine: {
        name: "Beine & Körper",
        body: "Vom Unterschenkel bis zum Ganzkörperpaket: Das Hochleistungs-Handstück erfasst große Flächen zügig und präzise.",
        alt: "Glatte Beine einer Frau auf einem Holzhocker",
      },
      aquafacial: {
        name: "Aquafacial",
        body: "Tiefenreinigung, sanftes Peeling und intensive Feuchtigkeit in einer Behandlung, für einen frischen, ebenmäßigen Teint.",
        alt: "Nahaufnahme von glatter, gepflegter Gesichtshaut",
      },
    } satisfies Record<TreatmentId, { name: string; body: string; alt: string }>,
  },

  about: {
    eyebrow: "Über uns",
    title: "Ganz auf eines spezialisiert",
    body: (studios: number) =>
      `SG Laserzentrum wurde 2022 gegründet und widmet sich seitdem zu 100 % der dauerhaften Haarentfernung. Unser Fachpersonal ist nach NiSV zertifiziert, wird regelmäßig intern geschult und arbeitet mit moderner Lasertechnologie, heute an ${word(DE_NUMBERS, studios)} Standorten in Deutschland.`,
    imageAlt: "Heller Behandlungsraum mit Liege, Vorhängen und Pflanzen",
  },

  proof: {
    eyebrow: "Warum SG Laserzentrum",
    title: "Was uns ausmacht",
    stats: (studios: number, treatments: string, reviews: string) => [
      { value: `${treatments}+`, label: "durchgeführte Behandlungen" },
      { value: `${reviews}+`, label: "positive Google-Bewertungen" },
      { value: String(studios), label: "Standorte in Deutschland" },
      { value: "2022", label: "gegründet" },
    ],
    usps: (studios: number) => [
      {
        title: "100 % Haarentfernung",
        body: "Wir konzentrieren uns auf eine einzige Behandlung und beherrschen sie entsprechend gut.",
      },
      {
        title: "NiSV-zertifiziertes Personal",
        body: "Unser Fachpersonal ist nach der NiSV zertifiziert, der Verordnung für den Einsatz von Lasern am Menschen.",
      },
      {
        title: "Moderne Lasertechnologie",
        body: "Ein Hochleistungslaser mit vier Wellenlängen und integrierter Kontaktkühlung.",
      },
      {
        title: "Regelmäßige Schulungen",
        body: "Wir schulen unser Team laufend intern, damit jede Behandlung dem aktuellen Stand entspricht.",
      },
      {
        title: "Faire, transparente Preise",
        body: "Jeder Standort hat eine eigene, klar aufgeführte Preisliste.",
      },
      {
        title: `${cap(word(DE_NUMBERS, studios))} Standorte`,
        body: "Von Mainz bis Nürnberg, von Stuttgart bis Köln. München ist in Planung.",
      },
    ],
  },

  technology: {
    eyebrow: "Technologie",
    title: "SG XLaser Pro",
    body: "Ein Hochleistungs-Medizinlaser mit vier Wellenlängen, abgestimmt auf unterschiedliche Haut- und Haartypen. Die integrierte Kontaktkühlung bis −15 °C kühlt die Haut während der Behandlung und macht die Sitzung spürbar angenehmer.",
    specs: [
      { value: "755 nm", label: "Alexandrit" },
      { value: "808 nm", label: "Diode" },
      { value: "955 nm", label: "Ergänzende Wellenlänge" },
      { value: "1064 nm", label: "Nd:YAG" },
      { value: "−15 °C", label: "Kontaktkühlung" },
    ],
    imageAlt: "SG XLaser Pro mit Touchscreen und Handstück",
  },

  reviews: {
    title: "Vertrauen, das man in jeder Bewertung liest",
    source: "Google-Bewertung",
    rating: "5 von 5 Sternen",
    quoteOpen: "„",
    quoteClose: "“",
    summary: (reviews: string) => `Über ${reviews} positive Google-Bewertungen`,
    items: [
      // Quoted verbatim from Google reviews shown on sg-laserzentrum.de. Do not edit the wording.
      {
        name: "Anna B.",
        quote: "Super Arbeit, sehr nette Mitarbeiterinnen! Schon nach kurzer Zeit sehe ich erste Ergebnisse! Nur weiterzuempfehlen.",
        image: "/images/silk.jpg",
        alt: "Weich fallender Seidenstoff in warmem Grau",
      },
      {
        name: "Katherina F.",
        quote:
          "Top Preis-Leistungs-Verhältnis! Man wird immer super freundlich empfangen, und ich habe schon nach zwei Anwendungen weniger Haarwuchs bemerkt!",
        image: "/images/laser.jpg",
        alt: "Behandlung mit dem Laser-Handstück am Unterarm",
      },
      {
        name: "Donike Z.",
        quote: "Ich bin so unglaublich zufrieden. So freundlich, und die Ergebnisse sind der Wahnsinn! Absolut empfehlenswert!",
        image: "/images/vorteil-1.jpg",
        alt: "Glatte Schulter einer Frau vor einem Leinenvorhang",
      },
      {
        name: "Nilo H.",
        quote: "Ich bin sehr zufrieden. Beratung, Behandlung, Hygiene und Freundlichkeit sind top!",
        image: "/images/beine.jpg",
        alt: "Glatte Beine einer Frau auf einem Holzhocker",
      },
    ],
    provenExpert: {
      label: "ProvenExpert",
      link: "Alle Bewertungen auf ProvenExpert",
      devSlot: "ProvenExpert-Siegel: erscheint hier, sobald Profil-URL und Siegel in lib/site.ts eingetragen sind.",
    },
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Gut zu wissen",
    items: [
      {
        q: "Wie viele Behandlungen sind notwendig?",
        a: "Im Allgemeinen werden 8 bis 12 Sitzungen benötigt. Die genaue Anzahl hängt von Haardicke, Hauttyp und der behandelten Körperzone ab.",
      },
      {
        q: "Ist die Behandlung schmerzhaft?",
        a: "Die meisten Kundinnen und Kunden spüren nur ein leichtes Kribbeln. Die integrierte Kontaktkühlung bis −15 °C kühlt die Haut während der Behandlung und macht die Sitzung deutlich angenehmer.",
      },
      {
        q: "Wie funktioniert die dauerhafte Haarentfernung?",
        a: "Das Laserlicht wird vom Pigment im Haar aufgenommen und in Wärme umgewandelt. Ab etwa 68 °C werden die Proteine im Haarfollikel zerstört, sodass die Haarwurzel kein neues Haar mehr bilden kann.",
      },
      {
        q: "Wie dauerhaft ist das Ergebnis?",
        a: "Die Ergebnisse sind langfristig. Wir empfehlen eine Auffrischung etwa einmal im Jahr, da zum Beispiel hormonelle Veränderungen neue Haare anregen können.",
      },
      {
        q: "Wie lange dauert eine Sitzung?",
        a: "Das hängt von der Größe der Zone ab. Kleine Bereiche wie das Gesicht gehen schnell, große wie Beine oder Rücken dauern länger. Rechnen Sie mit 30 bis 75 Minuten.",
      },
      {
        q: "Welche Haut- und Haartypen können behandelt werden?",
        a: "Die besten Ergebnisse erzielen wir bei hellen bis mittleren Hauttypen und dunklerem Haar mit ausreichend Melanin. Sehr helles oder feines Haar spricht weniger gut an.",
      },
      {
        q: "Was sollte ich vor der Behandlung beachten?",
        a: "Vier Dinge helfen uns, das beste Ergebnis zu erzielen:",
        list: [
          "Am Tag vor der Behandlung die Zone glatt rasieren.",
          "Bei Gesichtsbehandlungen Make-up vollständig entfernen.",
          "Zwei Wochen vorher Sonnenbäder und Solarium meiden.",
          "Vorher auf Impfungen und Antibiotika verzichten.",
        ],
      },
      {
        q: "Wo finde ich die Preise?",
        a: "Jeder Standort hat eine eigene Preisliste. Sie finden sie auf der Seite Ihres Studios, dort können Sie auch direkt online buchen.",
      },
    ] as Faq[],
    toggle: "Antwort ein- oder ausblenden",
  },

  locations: {
    eyebrow: "Standorte",
    title: (studios: number) => `${cap(word(DE_NUMBERS, studios))} Studios in Deutschland`,
    intro:
      "Jedes Studio arbeitet mit derselben Technik und denselben Standards. Wählen Sie Ihren Standort für Öffnungszeiten, Preise und Online-Buchung.",
    planned: "In Planung",
    details: "Zum Standort",
    book: "Buchen",
    all: "Alle Standorte",
  },

  booking: {
    title: "Ihr Weg zu dauerhaft glatter Haut",
    body: "Wählen Sie Ihr Studio und buchen Sie Ihren Termin direkt online.",
    select: "Standort wählen",
    submit: "Termin buchen",
    dialogTitle: "Wo möchten Sie Ihren Termin buchen?",
    dialogBody: "Jedes Studio hat einen eigenen Online-Kalender. Die Buchung öffnet sich in einem neuen Tab.",
    close: "Schließen",
  },

  footer: {
    tagline: (studios: number) => `Dauerhafte Haarentfernung an ${word(DE_NUMBERS, studios)} Standorten in Deutschland.`,
    studios: "Standorte",
    company: "Unternehmen",
    contact: "Kontakt",
    links: [
      { label: "Behandlungen", href: "/#behandlungen" },
      { label: "Über uns", href: "/#ueber-uns" },
      { label: "Häufige Fragen", href: "/#faq" },
      { label: "Franchise & Karriere", href: "/franchise-karriere" },
    ] as Link[],
    legal: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ] as Link[],
    phone: "Telefon & WhatsApp",
    email: "E-Mail",
    planned: "in Planung",
  },

  studio: {
    eyebrow: "SG Laserzentrum",
    title: (city: string) => `Dauerhafte Haarentfernung in ${city}`,
    intro: "Moderne Lasertechnik, NiSV-zertifiziertes Fachpersonal und eine ruhige Atmosphäre, in der Sie sich wohlfühlen.",
    book: "Online Termin buchen",
    call: "Anrufen",
    whatsapp: "WhatsApp",
    address: "Adresse",
    route: "Route planen",
    contact: "Kontakt",
    hours: "Öffnungszeiten",
    weekdays: "Montag – Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    closed: "geschlossen",
    clock: "Uhr",
    pricesEyebrow: "Preise",
    pricesTitle: (city: string) => `Preise in ${city}`,
    pricesPending:
      "Die Preisliste für diesen Standort wird gerade aktualisiert. Gerne beraten wir Sie telefonisch, per WhatsApp oder direkt im Studio.",
    pricesSample: "Beispieldaten · nur in der Entwicklung sichtbar",
    others: "Weitere Standorte",
    all: "Alle Standorte",
  },

  studiosPage: {
    eyebrow: "Standorte",
    title: "Unsere Studios",
    intro: (studios: number) =>
      `${cap(word(DE_NUMBERS, studios))} Studios, ein Anspruch: dauerhafte Haarentfernung mit moderner Technik und geschultem Fachpersonal. München ist bereits in Planung.`,
    plannedBody: "Wir bereiten ein Studio in München vor. Die Eröffnung kündigen wir hier an.",
  },

  careers: {
    eyebrow: "Franchise & Karriere",
    title: "Wachsen Sie mit uns",
    intro: (studios: number) =>
      `Seit 2022 ist SG Laserzentrum auf ${word(DE_NUMBERS, studios)} Standorte gewachsen. Ob mit einem eigenen Studio oder als Teil unseres Teams: Wir freuen uns, von Ihnen zu hören.`,
    franchise: {
      eyebrow: "Franchise",
      title: "Ein eigenes SG Laserzentrum eröffnen",
      body: "Sie möchten ein Studio für dauerhafte Haarentfernung führen und auf ein klar fokussiertes Konzept setzen? Erzählen Sie uns von sich und Ihrem Wunschstandort.",
      points: [
        "Ein Konzept mit klarem Fokus: dauerhafte Haarentfernung",
        "Moderne Lasertechnologie",
        "Schulungen nach unseren internen Standards",
        "Eine Marke mit über 600 positiven Google-Bewertungen",
      ],
      cta: "Franchise-Anfrage senden",
      subject: "Franchise-Anfrage",
      imageAlt: "Heller Behandlungsraum mit Liege und Vorhängen",
    },
    jobs: {
      eyebrow: "Karriere",
      title: "Teil unseres Teams werden",
      body: "Wir suchen Menschen, die präzise arbeiten und sich gern um andere kümmern. Schicken Sie uns Ihre Bewerbung, auch initiativ.",
      points: ["Regelmäßige interne Schulungen", "Arbeit mit moderner Lasertechnologie", "Ein herzliches Team an mehreren Standorten"],
      cta: "Bewerbung senden",
      subject: "Bewerbung",
      imageAlt: "Fachkraft bereitet eine Behandlung vor",
    },
    contactTitle: "Direkter Kontakt",
    contactBody: "Schreiben Sie uns eine E-Mail oder eine Nachricht per WhatsApp.",
    draft: "Entwurf · Inhalt und Umfang werden noch mit SG Laserzentrum abgestimmt",
  },

  imprint: {
    title: "Impressum",
    provider: "Angaben gemäß § 5 DDG",
    register: "Registergericht",
    registerNumber: "Registernummer",
    representedBy: "Vertreten durch die persönlich haftende Gesellschafterin",
    managingDirectors: "Geschäftsführerinnen",
    contact: "Kontakt",
    phone: "Telefon & WhatsApp",
    email: "E-Mail",
    vat: "Umsatzsteuer-Identifikationsnummer",
    vatPending: "Wird nachgereicht",
  },

  privacy: {
    title: "Datenschutzerklärung",
    controller: "Verantwortliche Stelle",
    pending:
      "Die vollständige Datenschutzerklärung wird derzeit überarbeitet und hier veröffentlicht. Bei Fragen zum Datenschutz erreichen Sie uns jederzeit unter den oben genannten Kontaktdaten.",
    devNote: "Vor dem Livegang: vollständigen Text einsetzen (u. a. Hosting, Studiolution-Buchung, ProvenExpert, WhatsApp).",
  },

  notFound: {
    eyebrow: "404",
    title: "Diese Seite gibt es nicht",
    body: "Vielleicht wurde sie verschoben. Auf der Startseite finden Sie alles Wichtige.",
    cta: "Zur Startseite",
  },
};

export type Copy = typeof COPY_DE;

const COPY_EN: Copy = {
  brand: "SG Laserzentrum",

  a11y: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    footerNav: "Footer navigation",
    opensNewTab: "(opens in a new tab)",
    devLang: "Switch language (development only)",
  },

  nav: {
    treatments: "Treatments",
    treatmentLinks: [
      { label: "Permanent hair removal", href: "/#behandlungen" },
      { label: "Technology", href: "/#technologie" },
      { label: "Reviews", href: "/#bewertungen" },
      { label: "FAQ", href: "/#faq" },
    ],
    studios: "Locations",
    allStudios: "All locations",
    planned: "planned",
    links: [
      { label: "About", href: "/#ueber-uns" },
      { label: "Careers", href: "/franchise-karriere" },
      { label: "Contact", href: "#kontakt" },
    ],
    start: "Home",
    book: "Book now",
    bookShort: "Book",
    menu: "Menu",
    close: "Close",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    home: "SG Laserzentrum home",
    contact: "Contact",
  },

  intro: {
    lead: "Lastingly",
    words: ["gentle", "precise", "safe", "smooth"],
  },

  hero: {
    brand: "SG Laserzentrum",
    word: "Laserzentrum",
    intro: "SG Laserzentrum – permanent hair removal with a feel for your skin.",
    labels: (studios: number) => ["Permanent hair removal", "Modern laser technology", `${studios} locations in Germany`],
    imageAlt: "Close-up of a woman's face with smooth, glowing skin",
  },

  statement: {
    eyebrow: "In a few words",
    text: "Since 2022 we have focused on one thing only: permanent hair removal. With modern laser technology, NiSV-certified specialists and fair, transparent prices.",
  },

  services: {
    laser: "Permanent hair removal",
    aquafacial: "Aquafacial",
  },

  treatments: {
    listLabel: "Treatment areas",
    cta: "Prices & booking",
    items: {
      gesicht: {
        name: "Face",
        body: "Upper lip, chin and cheeks are treated with small pulses and a steady hand, so the surrounding skin stays untouched.",
        alt: "Woman with closed eyes touching her smooth chin",
      },
      achseln: {
        name: "Underarms",
        body: "Treated in a few minutes and smooth for good. No more razor burn or ingrown hairs.",
        alt: "Woman with a raised arm showing a smooth underarm",
      },
      bikinizone: {
        name: "Bikini line",
        body: "Sensitive areas are treated with a cooled handpiece and adjusted intensity, discreetly and at your pace.",
        alt: "Midsection of a woman in light underwear",
      },
      beine: {
        name: "Legs & body",
        body: "From lower legs to the full-body package: the high-performance handpiece covers large areas quickly and precisely.",
        alt: "Smooth legs of a woman on a wooden stool",
      },
      aquafacial: {
        name: "Aquafacial",
        body: "Deep cleansing, a gentle peel and intense hydration in one treatment, for a fresh, even complexion.",
        alt: "Close-up of smooth, well-kept facial skin",
      },
    },
  },

  about: {
    eyebrow: "About us",
    title: "Specialised in one thing",
    body: (studios: number) =>
      `SG Laserzentrum was founded in 2022 and has been 100% dedicated to permanent hair removal ever since. Our specialists are NiSV certified, trained in-house on a regular basis and work with modern laser technology, today at ${word(EN_NUMBERS, studios)} locations across Germany.`,
    imageAlt: "Bright treatment room with a couch, curtains and plants",
  },

  proof: {
    eyebrow: "Why SG Laserzentrum",
    title: "What sets us apart",
    stats: (studios: number, treatments: string, reviews: string) => [
      { value: `${treatments.replace(".", ",")}+`, label: "treatments performed" },
      { value: `${reviews}+`, label: "positive Google reviews" },
      { value: String(studios), label: "locations in Germany" },
      { value: "2022", label: "founded" },
    ],
    usps: (studios: number) => [
      {
        title: "100% hair removal",
        body: "We focus on a single treatment and are very good at it as a result.",
      },
      {
        title: "NiSV-certified staff",
        body: "Our specialists are certified under the NiSV, the German regulation on using lasers on people.",
      },
      {
        title: "Modern laser technology",
        body: "A high-performance laser with four wavelengths and built-in contact cooling.",
      },
      {
        title: "Regular training",
        body: "We train our team in-house on an ongoing basis, so every treatment reflects current practice.",
      },
      {
        title: "Fair, transparent prices",
        body: "Every location has its own clearly listed price list.",
      },
      {
        title: `${cap(word(EN_NUMBERS, studios))} locations`,
        body: "From Mainz to Nuremberg, from Stuttgart to Cologne. Munich is being planned.",
      },
    ],
  },

  technology: {
    eyebrow: "Technology",
    title: "SG XLaser Pro",
    body: "A high-performance medical laser with four wavelengths, matched to different skin and hair types. Built-in contact cooling down to −15 °C cools the skin during treatment and makes the session noticeably more comfortable.",
    specs: [
      { value: "755 nm", label: "Alexandrite" },
      { value: "808 nm", label: "Diode" },
      { value: "955 nm", label: "Supporting wavelength" },
      { value: "1064 nm", label: "Nd:YAG" },
      { value: "−15 °C", label: "Contact cooling" },
    ],
    imageAlt: "SG XLaser Pro with touchscreen and handpiece",
  },

  reviews: {
    title: "Trust you can read in every review",
    source: "Google review",
    rating: "5 out of 5 stars",
    quoteOpen: "“",
    quoteClose: "”",
    summary: (reviews: string) => `Over ${reviews} positive Google reviews`,
    items: [
      {
        name: "Anna B.",
        quote: "Great work, very kind staff! I could see the first results after a short time! Thoroughly recommended.",
        image: "/images/silk.jpg",
        alt: "Softly draped silk in warm grey",
      },
      {
        name: "Katherina F.",
        quote:
          "Excellent value for money! You are always welcomed so warmly, and I noticed less hair growth after only two sessions!",
        image: "/images/laser.jpg",
        alt: "Laser handpiece treatment on a forearm",
      },
      {
        name: "Donike Z.",
        quote: "I am so unbelievably happy. So friendly, and the results are incredible! Absolutely recommended!",
        image: "/images/vorteil-1.jpg",
        alt: "Smooth shoulder of a woman in front of a linen curtain",
      },
      {
        name: "Nilo H.",
        quote: "I am very happy. Advice, treatment, hygiene and friendliness are all excellent!",
        image: "/images/beine.jpg",
        alt: "Smooth legs of a woman on a wooden stool",
      },
    ],
    provenExpert: {
      label: "ProvenExpert",
      link: "All reviews on ProvenExpert",
      devSlot: "ProvenExpert seal: appears here once the profile URL and seal are set in lib/site.ts.",
    },
  },

  faq: {
    eyebrow: "Frequently asked",
    title: "Good to know",
    items: [
      {
        q: "How many treatments are needed?",
        a: "Generally 8 to 12 sessions. The exact number depends on hair thickness, skin type and the area treated.",
      },
      {
        q: "Does the treatment hurt?",
        a: "Most clients only feel a light tingle. Built-in contact cooling down to −15 °C cools the skin during treatment and makes the session much more comfortable.",
      },
      {
        q: "How does permanent hair removal work?",
        a: "The laser light is absorbed by the pigment in the hair and turned into heat. From around 68 °C the proteins in the follicle are destroyed, so the root can no longer grow new hair.",
      },
      {
        q: "How permanent is the result?",
        a: "The results are long term. We recommend a refresher roughly once a year, since hormonal changes, for example, can trigger new hair growth.",
      },
      {
        q: "How long does a session take?",
        a: "It depends on the size of the area. Small areas such as the face are quick, large ones such as legs or back take longer. Expect 30 to 75 minutes.",
      },
      {
        q: "Which skin and hair types can be treated?",
        a: "We get the best results on light to medium skin types and darker hair with enough melanin. Very light or fine hair responds less well.",
      },
      {
        q: "What should I do before a treatment?",
        a: "Four things help us get the best result:",
        list: [
          "Shave the area smooth the day before.",
          "For facial treatments, remove all make-up.",
          "Avoid sunbathing and tanning beds for two weeks beforehand.",
          "Avoid vaccinations and antibiotics beforehand.",
        ],
      },
      {
        q: "Where can I find the prices?",
        a: "Every location has its own price list. You will find it on your studio's page, where you can also book online.",
      },
    ],
    toggle: "Show or hide answer",
  },

  locations: {
    eyebrow: "Locations",
    title: (studios: number) => `${cap(word(EN_NUMBERS, studios))} studios across Germany`,
    intro:
      "Every studio works with the same technology and the same standards. Choose your location for opening hours, prices and online booking.",
    planned: "Planned",
    details: "View location",
    book: "Book",
    all: "All locations",
  },

  booking: {
    title: "Your way to lastingly smooth skin",
    body: "Choose your studio and book your appointment online.",
    select: "Choose location",
    submit: "Book now",
    dialogTitle: "Where would you like to book?",
    dialogBody: "Every studio has its own online calendar. Booking opens in a new tab.",
    close: "Close",
  },

  footer: {
    tagline: (studios: number) => `Permanent hair removal at ${word(EN_NUMBERS, studios)} locations across Germany.`,
    studios: "Locations",
    company: "Company",
    contact: "Contact",
    links: [
      { label: "Treatments", href: "/#behandlungen" },
      { label: "About", href: "/#ueber-uns" },
      { label: "FAQ", href: "/#faq" },
      { label: "Franchise & careers", href: "/franchise-karriere" },
    ],
    legal: [
      { label: "Imprint", href: "/impressum" },
      { label: "Privacy", href: "/datenschutz" },
    ],
    phone: "Phone & WhatsApp",
    email: "Email",
    planned: "planned",
  },

  studio: {
    eyebrow: "SG Laserzentrum",
    title: (city: string) => `Permanent hair removal in ${city}`,
    intro: "Modern laser technology, NiSV-certified specialists and a calm atmosphere where you feel at ease.",
    book: "Book online",
    call: "Call",
    whatsapp: "WhatsApp",
    address: "Address",
    route: "Get directions",
    contact: "Contact",
    hours: "Opening hours",
    weekdays: "Monday – Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "closed",
    clock: "",
    pricesEyebrow: "Prices",
    pricesTitle: (city: string) => `Prices in ${city}`,
    pricesPending:
      "The price list for this location is being updated. We are happy to advise you by phone, on WhatsApp or in the studio.",
    pricesSample: "Sample data · visible in development only",
    others: "Other locations",
    all: "All locations",
  },

  studiosPage: {
    eyebrow: "Locations",
    title: "Our studios",
    intro: (studios: number) =>
      `${cap(word(EN_NUMBERS, studios))} studios, one standard: permanent hair removal with modern technology and trained specialists. Munich is already being planned.`,
    plannedBody: "We are preparing a studio in Munich. The opening will be announced here.",
  },

  careers: {
    eyebrow: "Franchise & careers",
    title: "Grow with us",
    intro: (studios: number) =>
      `Since 2022 SG Laserzentrum has grown to ${word(EN_NUMBERS, studios)} locations. Whether with a studio of your own or as part of our team, we would love to hear from you.`,
    franchise: {
      eyebrow: "Franchise",
      title: "Open your own SG Laserzentrum",
      body: "Would you like to run a permanent hair removal studio built on a clearly focused concept? Tell us about yourself and the location you have in mind.",
      points: [
        "A concept with a clear focus: permanent hair removal",
        "Modern laser technology",
        "Training to our in-house standards",
        "A brand with over 600 positive Google reviews",
      ],
      cta: "Send a franchise enquiry",
      subject: "Franchise-Anfrage",
      imageAlt: "Bright treatment room with a couch and curtains",
    },
    jobs: {
      eyebrow: "Careers",
      title: "Join our team",
      body: "We are looking for people who work precisely and enjoy caring for others. Send us your application, speculative ones included.",
      points: ["Regular in-house training", "Working with modern laser technology", "A warm team across several locations"],
      cta: "Send an application",
      subject: "Bewerbung",
      imageAlt: "Specialist preparing a treatment",
    },
    contactTitle: "Direct contact",
    contactBody: "Send us an email or a WhatsApp message.",
    draft: "Draft · content and scope still to be agreed with SG Laserzentrum",
  },

  imprint: {
    title: "Imprint",
    provider: "Information pursuant to § 5 DDG",
    register: "Register court",
    registerNumber: "Registration number",
    representedBy: "Represented by the general partner",
    managingDirectors: "Managing directors",
    contact: "Contact",
    phone: "Phone & WhatsApp",
    email: "Email",
    vat: "VAT ID",
    vatPending: "To follow",
  },

  privacy: {
    title: "Privacy policy",
    controller: "Controller",
    pending:
      "The full privacy policy is being revised and will be published here. If you have questions about data protection, you can reach us at any time using the contact details above.",
    devNote: "Before launch: insert the full text (hosting, Studiolution booking, ProvenExpert, WhatsApp and so on).",
  },

  notFound: {
    eyebrow: "404",
    title: "This page does not exist",
    body: "It may have moved. You will find everything important on the home page.",
    cta: "Go to home page",
  },
};

export const COPY: Record<Lang, Copy> = { de: COPY_DE, en: COPY_EN };
