export type Lang = "de" | "en";

/**
 * Image sources. Files live in /public/images.
 * Set a value to null to fall back to the labelled placeholder.
 */
export const IMAGES: Record<string, string | null> = {
  hero: "/images/hero.jpg",
  xlaser: "/images/xlaser.jpg",
  benefit1: "/images/vorteil-1.jpg",
  benefit2: "/images/vorteil-2.jpg",
  benefit3: "/images/vorteil-3.jpg",
  treatment1: "/images/gesicht.jpg",
  treatment2: "/images/achseln.jpg",
  treatment3: "/images/bikinizone.jpg",
  treatment4: "/images/beine.jpg",
  band1: "/images/silk.jpg",
  proof1: "/images/portrait.jpg",
  proof2: "/images/laser.jpg",
  band2: "/images/studio.jpg",
};

export const LOCATIONS = [
  {
    slug: "mainz",
    city: "Mainz",
    street: "An der Fahrt 2A",
    zip: "55124 Mainz",
    phone: "01522 1799094",
    phoneHref: "tel:+4915221799094",
    whatsapp: "http://wa.me/message/KIFZ2RDI7H7YH1",
    booking: "https://www.studiobookr.com/sg-beauty-73325",
    image: "/images/studio.jpg",
    hasXLaser: true,
  },
  {
    slug: "karlsruhe",
    city: "Karlsruhe",
    street: "Peter und Paul Platz 4",
    zip: "76185 Karlsruhe",
    phone: "01525 5823470",
    phoneHref: "tel:+4915255823470",
    whatsapp: "http://wa.me/message/WJGAUTLGVEXRK1",
    booking: "https://www.studiobookr.com/sg-beauty-71344",
    image: "/images/vorteil-2.jpg",
    hasXLaser: true,
  },
  {
    slug: "mannheim",
    city: "Mannheim",
    street: "Schwetzinger Str. 69",
    zip: "68165 Mannheim",
    phone: "0176 83393934",
    phoneHref: "tel:+4917683393934",
    whatsapp: "http://wa.me/message/YEEFLIC27DFEO1",
    booking: "https://www.studiobookr.com/sinem-gizem-beauty-gbr-71750",
    image: "/images/hero-chair.jpg",
    hasXLaser: true,
  },
  {
    slug: "stuttgart",
    city: "Stuttgart",
    street: "Heilbronner Str. 93",
    zip: "70191 Stuttgart",
    phone: "0176 30636683",
    phoneHref: "tel:+4917630636683",
    whatsapp: "http://wa.me/message/HVGZUS2BWHG6I1",
    booking: "https://www.studiobookr.com/sg-beauty-stuttgart-73466",
    image: "/images/vorteil-3.jpg",
    hasXLaser: true,
  },
  {
    slug: "frankfurt",
    city: "Frankfurt",
    street: "Grempstr. 10",
    zip: "60487 Frankfurt am Main",
    phone: "0160 6337377",
    phoneHref: "tel:+491606337377",
    whatsapp: "tel:+491606337377",
    booking: "https://www.studiobookr.com/sg-beauty-72869",
    image: "/images/laser.jpg",
    hasXLaser: true,
  },
  {
    slug: "nuernberg",
    city: "Nürnberg",
    street: "Schönweißstr. 41",
    zip: "90461 Nürnberg",
    phone: "0172 2632858",
    phoneHref: "tel:+491722632858",
    whatsapp: "tel:+491722632858",
    booking: "https://www.studiobookr.com/sg-laserzentrum-nuernberg-74077",
    image: "/images/portrait.jpg",
    hasXLaser: true,
  },
];

export type Location = (typeof LOCATIONS)[number];

export function findLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}

/** Google Maps link built from the address, so no third-party embed is loaded. */
export function mapsUrl(l: Location) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `SG Laserzentrum, ${l.street}, ${l.zip}`,
  )}`;
}

/** Announced on sg-laserzentrum.de but not open yet. */
export const COMING_SOON = ["München", "Köln"];

export const CONTACT = {
  email: "sg-laser-beauty@hotmail.com",
  phone: "01525 5823470",
  phoneHref: "tel:+4915255823470",
  instagram: "https://www.instagram.com/sg_laserzentrum_mannheim/",
  company: "SinemgizemBeauty GbR",
  companyStreet: "Westliche Ringstr. 16",
  companyZip: "67227 Frankenthal",
  vat: "DE368172174",
  owners: "Gizem Achenbach & Sinem Bulukgiray",
};

const COPY_DE = {
  nav: [
    { label: "Behandlungen", href: "/#behandlungen" },
    { label: "Technologie", href: "/#technologie" },
    { label: "Ergebnisse", href: "/#ergebnisse" },
    { label: "Standorte", href: "/standorte" },
  ],
  navCta: "Termin buchen",
  menuOpen: "Menü öffnen",
  menuClose: "Menü schließen",
  brandLine: "Laserzentrum",

  hero: {
    badge: "Dauerhafte Haarentfernung",
    title: "seidig glatt",
    giant: "laserzentrum",
    lede: "SG Laserzentrum ist Ihr Spezialist für dauerhafte Haarentfernung und bringt langjährige Erfahrung mit allen Haar- und Hauttypen mit.",
    cta: "Termin buchen",
    tagLeft: "Sechs Standorte in Deutschland",
    tagRight: "Über 600 positive Google-Bewertungen",
    imageAlt: "Frau auf einem Stuhl mit erhobenem Arm vor warmem Hintergrund",
  },

  about: {
    eyebrow: "Über uns",
    title: "Schonend, präzise und auf Ihre Haut abgestimmt.",
    intro:
      "Wir arbeiten seit Jahren mit unterschiedlichsten Methoden und kennen die Unterschiede zwischen feinem und kräftigem Haar, heller und dunkler Haut. Daraus entsteht ein Behandlungsplan, der zu Ihnen passt und nicht umgekehrt.",
    benefits: [
      {
        id: "benefit1",
        title: "Schnelle Ergebnisse",
        body: "Unser Hochleistungs-Medizinlaser erfasst große Flächen in kurzer Zeit. Schon nach wenigen Sitzungen sehen und spüren Sie den Unterschied.",
        alt: "Nahaufnahme einer glatten Schulter",
      },
      {
        id: "benefit2",
        title: "Sanft statt schmerzhaft",
        body: "Die integrierte Kontaktkühlung bis −15 °C minimiert die Schmerzen erheblich. Die meisten Kundinnen beschreiben nur ein leichtes Kribbeln.",
        alt: "Entspannte Kundin während einer Behandlung",
      },
      {
        id: "benefit3",
        title: "Geprüfte Expertise",
        body: "Geschultes Fachpersonal, staatlich zertifiziert nach NiSV-Standards, faire Preise und eine Atmosphäre, in der Sie sich wohlfühlen.",
        alt: "Fachkraft bedient den medizinischen Laser",
      },
    ],
  },

  treatments: {
    eyebrow: "Behandlungen",
    title: "Behandlungen für jede Zone",
    intro:
      "Ob einzelnes Areal oder Komplettpaket: Wir stimmen Anzahl und Intensität der Sitzungen individuell auf Ihre Haut ab. Die Erstberatung ist kostenlos.",
    cta: "Termin buchen",
    badge: "Behandlung",
    items: [
      {
        id: "treatment1",
        lead: "Präzise und sanft",
        name: "Gesicht & Oberlippe",
        body: "Feine Areale wie Oberlippe, Kinn und Wangen verlangen eine ruhige Hand und kleine Impulse. Wir arbeiten Areal für Areal, damit die Haut rundherum unberührt bleibt.",
        alt: "Nahaufnahme des Gesichts einer Frau mit glatter Haut",
      },
      {
        id: "treatment2",
        lead: "In wenigen Minuten",
        name: "Achseln",
        body: "Der Klassiker unter den Zonen: schnell behandelt, dauerhaft glatt und endlich Schluss mit Rasurbrand und eingewachsenen Haaren.",
        alt: "Frau mit erhobenem Arm zeigt glatte Achsel",
      },
      {
        id: "treatment3",
        lead: "Besonders schonend",
        name: "Bikinizone",
        body: "Empfindliche Areale behandeln wir mit gekühltem Handstück und reduzierter Intensität, in einem geschützten Raum und in Ihrem Tempo.",
        alt: "Körpermitte einer Frau in heller Unterwäsche",
      },
      {
        id: "treatment4",
        lead: "Große Flächen, eine Sitzung",
        name: "Beine & Ganzkörper",
        body: "Vom Unterschenkel bis zum Komplettpaket: Das Hochleistungs-Handstück erfasst große Flächen zügig, ohne an Präzision zu verlieren.",
        alt: "Glatte Beine einer sitzenden Frau",
      },
    ],
  },

  statement: {
    eyebrow: "Unser Anspruch",
    title:
      "Effektive, schonende Haarentfernung auf höchstem Niveau. Modernste Medizintechnik, abgestimmt auf Ihre Haut.",
    imageAlt: "Weich fallender Seidenstoff in warmen Brauntönen",
  },

  proof: {
    label: "Zufriedene Kundinnen",
    stat: "99 %",
    body: "Über 600 positive Google-Bewertungen an sechs Standorten. Unsere Kundinnen kommen wieder und bringen ihre Freundinnen mit.",
    portraitAlt: "Ruhiges Porträt einer Frau mit glatter Haut",
    techAlt: "Handstück eines medizinischen Lasers in einer Behandlungskabine",
    notes: [
      "SG XLaser Pro",
      "Vier Wellenlängen: 808, 755, 955 und 1064 nm.",
      "Kontaktkühlung bis −15 °C für eine nahezu schmerzfreie Sitzung.",
    ],
  },

  numbers: {
    eyebrow: "In Zahlen",
    title: "Sichtbar glatt,",
    stats: ["99 %", "600+", "6"],
    statsLabel: "Kennzahlen",
    body: "Sechs Standorte in Deutschland, über 600 positive Bewertungen und ein Team, das jeden Haut- und Haartyp kennt.",
    imageAlt: "Ruhiger Behandlungsraum in warmen Naturtönen",
  },

  locations: {
    eyebrow: "Standorte",
    title: "Sechs Studios in Deutschland",
    intro:
      "Jedes Studio arbeitet mit demselben Gerät, denselben Standards und demselben geschulten Fachpersonal. Wählen Sie den Standort, der Ihnen am nächsten liegt.",
    comingLabel: "Bald auch in",
    detailPrefix: "SG Laserzentrum",
    addressLabel: "Adresse",
    phoneLabel: "Telefon",
    whatsappLabel: "WhatsApp",
    bookLabel: "Online Termin buchen",
    routeLabel: "Route planen",
    hoursLabel: "Öffnungszeiten",
    hoursNote: "Termine nach Vereinbarung. Schreiben Sie uns per WhatsApp oder buchen Sie direkt online.",
    otherTitle: "Weitere Standorte",
    backLabel: "Alle Standorte",
    cityIntro:
      "Dauerhafte Haarentfernung mit dem SG XLaser Pro, schonend und abgestimmt auf jeden Haut- und Haartyp.",
  },

  technology: {
    eyebrow: "Unsere Technologie",
    title: "SG XLaser Pro",
    intro:
      "Der SG XLaser Pro gehört zu den modernsten Hochleistungs-Medizinlasern und sorgt für ein herausragendes Behandlungserlebnis. Unsere Geräte arbeiten mit vier Wellenlängen, die eine optimale und professionelle Anwendung ermöglichen.",
    specsLabel: "Vier Wellenlängen",
    specs: [
      { value: "808 nm", label: "Diodenlaser" },
      { value: "755 nm", label: "Alexandritlaser" },
      { value: "955 nm", label: "Ergänzende Wellenlänge" },
      { value: "1064 nm", label: "Nd:YAG-Laser" },
    ],
    body: [
      "Dank des fortschrittlichen Handstücks des SG XLaser Pro erzielen wir noch schnellere und effektivere Ergebnisse.",
      "Ein besonderes Highlight ist die integrierte Kühlung, die Temperaturen bis −15 °C erreicht. Die Haut wird während der Behandlung gleichzeitig gekühlt, was die Schmerzen deutlich minimiert und die Sitzung besonders angenehm macht.",
    ],
    closing: "Effektive, schonende Haarentfernung auf höchstem Niveau.",
    imageAlt: "SG XLaser Pro Gerät neben einer Behandlungsliege",
  },

  reviews: {
    label: "Kundenfeedback",
    title: "Was unsere Kundinnen sagen",
    intro:
      "Wir danken unseren Kundinnen und Kunden für ihr tolles Feedback und freuen uns, Ihnen zu seidig glatter Haut verhelfen zu dürfen.",
    summary: "99 % zufriedene Kunden · Über 600 positive Google-Bewertungen",
    prev: "Vorherige Bewertung",
    next: "Nächste Bewertung",
    items: [
      {
        name: "Anna B.",
        quote:
          "Super Arbeit, sehr nette Mitarbeiterinnen! Schon nach kurzer Zeit sehe ich erste Ergebnisse! Nur weiterzuempfehlen.",
      },
      {
        name: "Nilo H.",
        quote: "Ich bin sehr zufrieden. Beratung, Behandlung, Hygiene und Freundlichkeit sind top!",
      },
      {
        name: "Donike Z.",
        quote:
          "Ich bin so unglaublich zufrieden. So freundlich, und die Ergebnisse sind der Wahnsinn! Absolut empfehlenswert!",
      },
      {
        name: "Katherina F.",
        quote:
          "Top Preis-Leistungs-Verhältnis! Man wird immer super freundlich empfangen, und ich habe schon nach zwei Anwendungen weniger Haarwuchs bemerkt!",
      },
      {
        name: "Vanessa G.",
        quote:
          "Ich bin das zweite Mal hier und super zufrieden. Sehr sauberes Studio und nette Gespräche während der Behandlungen. Einfühlsame Mitarbeiter, und ich wurde von Anfang an hervorragend beraten. Klare Empfehlung!",
      },
      {
        name: "Yasmin",
        quote:
          "Ich hatte gestern meine 6. Behandlung, und ich bin mehr als zufrieden. Sei es die Mitarbeiterinnen, die extrem viel Wert auf deinen Komfort legen, oder einfach nur die Behandlung. Kann ich nur mehr als weiterempfehlen!",
      },
    ],
  },

  faq: {
    label: "Häufige Fragen",
    title: "Häufige Fragen zur dauerhaften Haarentfernung",
    items: [
      {
        q: "Wie viele Behandlungen sind notwendig?",
        a: "Im Allgemeinen werden 8–12 Sitzungen benötigt. Die genaue Anzahl hängt von Faktoren wie der Haardicke, dem Hauttyp und der zu behandelnden Körperzone ab.",
        list: [] as string[],
      },
      {
        q: "Wie funktioniert die dauerhafte Haarentfernung überhaupt?",
        a: "Die dauerhafte Haarentfernung basiert auf der Absorption von Licht, das in Hitze umgewandelt wird. Das energiereiche Laserlicht erzeugt hohe Temperaturen im Haar; bei über 68 °C beginnt die Hitze, die Proteine in den Haarzellen und im Haarfollikel zu zerstören. Der Haarfollikel, der die Haarwurzel umgibt, verliert die Struktur, die zur Bildung neuer Haare notwendig ist. Die Haarwurzel wird verödet, sodass kein neues Haar nachwachsen kann.",
        list: [],
      },
      {
        q: "Wie dauerhaft ist die dauerhafte Haarentfernung wirklich?",
        a: "Die Ergebnisse sind langfristig, allerdings wird empfohlen, einmal jährlich eine Auffrischungsbehandlung durchzuführen, um das Ergebnis optimal zu erhalten. Die Notwendigkeit für Auffrischungen kann individuell variieren und hängt von Faktoren wie Hormonschwankungen oder anderen Einflüssen ab.",
        list: [],
      },
      {
        q: "Wie lange dauert eine Sitzung?",
        a: "Die Sitzungsdauer richtet sich nach der Größe des zu behandelnden Bereichs. Behandlungen größerer Areale wie Brust oder Beine dauern länger als kleinere, wie im Gesicht. Typischerweise können Sie mit einer Dauer von 30 bis 75 Minuten rechnen.",
        list: [],
      },
      {
        q: "Welche Haut- und Haartypen können behandelt werden?",
        a: "Optimale Ergebnisse erzielen wir bei hellen bis mittleren Hauttypen und bei Haaren mit ausreichend Melaningehalt, da Melanin das Haar pigmentiert und die Laserenergie besser absorbiert. Dunklere Haare sprechen daher am besten an. Für sehr helle oder feine Haare ist die Laserbehandlung weniger geeignet.",
        list: [],
      },
      {
        q: "Was ist vor einer Behandlung zu beachten?",
        a: "Vier Dinge helfen uns, das beste Ergebnis für Sie zu erzielen:",
        list: [
          "Rasur: Am Tag vor der Behandlung sollte das zu behandelnde Areal glatt rasiert sein.",
          "Gesichtsbehandlungen: Make-up muss vollständig entfernt und die Haut gründlich gereinigt sein.",
          "Sonnenexposition: Zwei Wochen vorher Sonnenbäder und Solariumbesuche vermeiden.",
          "Medikamente: Vor der Behandlung auf Impfungen und die Einnahme von Antibiotika verzichten.",
        ],
      },
    ],
  },

  footer: {
    eyebrow: "Termin vereinbaren",
    pitch: "Dauerhaft glatte Haut beginnt mit einem Gespräch. Wir beraten Sie kostenlos.",
    cta: "Termin buchen",
    locationsHeading: "Standorte",
    contactHeading: "Kontakt",
    bookLabel: "Online buchen",
    columns: [
      {
        heading: "Behandlungen",
        links: [
          { label: "Gesicht & Oberlippe", href: "#behandlungen" },
          { label: "Achseln", href: "#behandlungen" },
          { label: "Bikinizone", href: "#behandlungen" },
          { label: "Beine & Ganzkörper", href: "#behandlungen" },
        ],
      },
      {
        heading: "Über uns",
        links: [
          { label: "Unsere Technologie", href: "#technologie" },
          { label: "Bewertungen", href: "#bewertungen" },
          { label: "Häufige Fragen", href: "#faq" },
          { label: "Standorte", href: "/standorte" },
          { label: "Jobs & Franchise", href: "https://sg-laserzentrum.de/jobs-and-franchise-/" },
        ],
      },
      {
        heading: "Rechtliches",
        links: [
          { label: "Impressum", href: "https://sg-laserzentrum.de/online-terminbuchung/" },
          { label: "Datenschutz", href: "https://sg-laserzentrum.de/online-terminbuchung/" },
          { label: "AGB", href: "https://sg-laserzentrum.de/online-terminbuchung/" },
        ],
      },
    ],
    legal: "Inhaberinnen: Gizem Achenbach & Sinem Bulukgiray · USt-IdNr. DE368172174",
  },
};

export type Copy = typeof COPY_DE;

const COPY_EN: Copy = {
  nav: [
    { label: "Treatments", href: "/#behandlungen" },
    { label: "Technology", href: "/#technologie" },
    { label: "Results", href: "/#ergebnisse" },
    { label: "Locations", href: "/standorte" },
  ],
  navCta: "Book now",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  brandLine: "Laser Clinic",

  hero: {
    badge: "Permanent hair removal",
    title: "silky smooth",
    giant: "laser clinic",
    lede: "SG Laserzentrum is your specialist for permanent hair removal, with years of experience across every hair and skin type.",
    cta: "Book now",
    tagLeft: "Six locations across Germany",
    tagRight: "Over 600 positive Google reviews",
    imageAlt: "Woman seated with a raised arm against a warm backdrop",
  },

  about: {
    eyebrow: "About us",
    title: "Gentle, precise and matched to your skin.",
    intro:
      "We have worked with a wide range of methods for years, and we know the difference between fine and coarse hair, light and deep skin tones. The treatment plan is built around you, not the other way round.",
    benefits: [
      {
        id: "benefit1",
        title: "Fast results",
        body: "Our high-performance medical laser covers large areas quickly. You will see and feel the difference after only a few sessions.",
        alt: "Close-up of a smooth shoulder",
      },
      {
        id: "benefit2",
        title: "Gentle, not painful",
        body: "Built-in contact cooling down to −15 °C dramatically reduces discomfort. Most clients describe nothing more than a light tingle.",
        alt: "Relaxed client during a treatment",
      },
      {
        id: "benefit3",
        title: "Proven expertise",
        body: "Trained specialists, state certification to NiSV standards, fair prices and a space where you actually feel at ease.",
        alt: "Specialist operating the medical laser",
      },
    ],
  },

  treatments: {
    eyebrow: "Treatments",
    title: "Treatments for every area",
    intro:
      "A single area or the full package: we tailor the number and intensity of sessions to your skin. The first consultation is free.",
    cta: "Book now",
    badge: "Treatment",
    items: [
      {
        id: "treatment1",
        lead: "Precise and gentle",
        name: "Face & upper lip",
        body: "Delicate areas such as the upper lip, chin and cheeks call for a steady hand and small pulses. We work area by area so the surrounding skin stays untouched.",
        alt: "Close-up of a woman's face with smooth skin",
      },
      {
        id: "treatment2",
        lead: "In just a few minutes",
        name: "Underarms",
        body: "The classic zone: quick to treat, permanently smooth, and an end to razor burn and ingrown hairs.",
        alt: "Woman with a raised arm showing a smooth underarm",
      },
      {
        id: "treatment3",
        lead: "Especially gentle",
        name: "Bikini line",
        body: "Sensitive areas are treated with a cooled handpiece and reduced intensity, in a private room and at your own pace.",
        alt: "Midsection of a woman in light-coloured underwear",
      },
      {
        id: "treatment4",
        lead: "Large areas, one session",
        name: "Legs & full body",
        body: "From lower legs to the complete package: the high-performance handpiece covers large areas quickly without losing precision.",
        alt: "Smooth legs of a seated woman",
      },
    ],
  },

  statement: {
    eyebrow: "Our standard",
    title:
      "Effective, gentle hair removal at the highest level. Advanced medical technology, matched to your skin.",
    imageAlt: "Softly draped silk fabric in warm brown tones",
  },

  proof: {
    label: "Happy clients",
    stat: "99 %",
    body: "Over 600 positive Google reviews across six locations. Our clients come back and bring their friends.",
    portraitAlt: "Calm portrait of a woman with smooth skin",
    techAlt: "Medical laser handpiece in a treatment room",
    notes: [
      "SG XLaser Pro",
      "Four wavelengths: 808, 755, 955 and 1064 nm.",
      "Contact cooling to −15 °C for a near painless session.",
    ],
  },

  numbers: {
    eyebrow: "By the numbers",
    title: "Visibly smooth,",
    stats: ["99 %", "600+", "6"],
    statsLabel: "Key figures",
    body: "Six locations across Germany, more than 600 positive reviews and a team that knows every skin and hair type.",
    imageAlt: "Calm treatment room in warm natural tones",
  },

  locations: {
    eyebrow: "Locations",
    title: "Six studios across Germany",
    intro:
      "Every studio works with the same device, the same standards and the same trained specialists. Choose whichever one is closest to you.",
    comingLabel: "Coming soon to",
    detailPrefix: "SG Laserzentrum",
    addressLabel: "Address",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    bookLabel: "Book online",
    routeLabel: "Get directions",
    hoursLabel: "Opening hours",
    hoursNote: "By appointment. Message us on WhatsApp or book directly online.",
    otherTitle: "Other locations",
    backLabel: "All locations",
    cityIntro:
      "Permanent hair removal with the SG XLaser Pro, gentle and matched to every skin and hair type.",
  },

  technology: {
    eyebrow: "Our technology",
    title: "SG XLaser Pro",
    intro:
      "The SG XLaser Pro is one of the latest high-performance medical lasers and gives you an outstanding treatment experience. Our devices work with four wavelengths, which allows for optimal and professional handling.",
    specsLabel: "Four wavelengths",
    specs: [
      { value: "808 nm", label: "Diode laser" },
      { value: "755 nm", label: "Alexandrite laser" },
      { value: "955 nm", label: "Supporting wavelength" },
      { value: "1064 nm", label: "Nd:YAG laser" },
    ],
    body: [
      "Thanks to the advanced handpiece of the SG XLaser Pro, we achieve faster and more effective results.",
      "A particular highlight is the integrated cooling, which reaches temperatures down to −15 °C. The skin is cooled during the treatment itself, which noticeably reduces discomfort and makes the session especially comfortable.",
    ],
    closing: "Effective, gentle hair removal at the highest level.",
    imageAlt: "SG XLaser Pro device beside a treatment bed",
  },

  reviews: {
    label: "Client feedback",
    title: "What our clients say",
    intro:
      "We are grateful to our clients for their wonderful feedback, and glad to help them to silky smooth skin.",
    summary: "99 % satisfied clients · Over 600 positive Google reviews",
    prev: "Previous review",
    next: "Next review",
    items: [
      {
        name: "Anna B.",
        quote:
          "Great work, very kind staff. I could already see the first results after a short time. Thoroughly recommended.",
      },
      {
        name: "Nilo H.",
        quote: "I am very happy. The advice, the treatment, the hygiene and the friendliness are all excellent.",
      },
      {
        name: "Donike Z.",
        quote:
          "I am unbelievably happy. So friendly, and the results are incredible. Absolutely recommended.",
      },
      {
        name: "Katherina F.",
        quote:
          "Excellent value for money. You are always welcomed so warmly, and I noticed less hair growth after only two sessions.",
      },
      {
        name: "Vanessa G.",
        quote:
          "This is my second visit and I am delighted. A very clean studio and lovely conversation during the treatments. Considerate staff, and I was given excellent advice from the very start. A clear recommendation.",
      },
      {
        name: "Yasmin",
        quote:
          "I had my sixth treatment yesterday and I am more than happy. Whether it is the staff, who care enormously about your comfort, or simply the treatment itself. I can only recommend it.",
      },
    ],
  },

  faq: {
    label: "Frequently asked",
    title: "Common questions about permanent hair removal",
    items: [
      {
        q: "How many treatments are needed?",
        a: "Generally 8 to 12 sessions. The exact number depends on factors such as hair thickness, skin type and the area being treated.",
        list: [] as string[],
      },
      {
        q: "How does permanent hair removal actually work?",
        a: "It relies on light being absorbed and converted into heat. The high-energy laser light creates high temperatures in the hair; above 68 °C the heat begins to destroy the proteins in the hair cells and the follicle. The follicle surrounding the root loses the structure it needs to form new hair, so the root is sealed off and no new hair can grow.",
        list: [],
      },
      {
        q: "How permanent is permanent hair removal really?",
        a: "The results are long term, though we recommend one refresher treatment a year to keep them at their best. How often a refresher is needed varies from person to person and depends on factors such as hormonal changes.",
        list: [],
      },
      {
        q: "How long does a session take?",
        a: "Session length depends on the size of the area. Larger areas such as the chest or legs take longer than smaller ones such as the face. Typically you can expect 30 to 75 minutes.",
        list: [],
      },
      {
        q: "Which skin and hair types can be treated?",
        a: "We achieve the best results on light to medium skin types and on hair with enough melanin, since melanin pigments the hair and absorbs the laser energy better. Darker hair therefore responds best. Laser treatment is less suitable for very light or fine hair.",
        list: [],
      },
      {
        q: "What should I do before a treatment?",
        a: "Four things help us achieve the best result for you:",
        list: [
          "Shaving: the area should be shaved smooth the day before the treatment.",
          "Facial treatments: make-up must be fully removed and the skin thoroughly cleansed.",
          "Sun exposure: avoid sunbathing and tanning beds for two weeks beforehand.",
          "Medication: avoid vaccinations and courses of antibiotics before the treatment.",
        ],
      },
    ],
  },

  footer: {
    eyebrow: "Book an appointment",
    pitch: "Lasting smooth skin starts with a conversation. The consultation is free.",
    cta: "Book now",
    locationsHeading: "Locations",
    contactHeading: "Contact",
    bookLabel: "Book online",
    columns: [
      {
        heading: "Treatments",
        links: [
          { label: "Face & upper lip", href: "#behandlungen" },
          { label: "Underarms", href: "#behandlungen" },
          { label: "Bikini line", href: "#behandlungen" },
          { label: "Legs & full body", href: "#behandlungen" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "Our technology", href: "#technologie" },
          { label: "Reviews", href: "#bewertungen" },
          { label: "FAQs", href: "#faq" },
          { label: "Locations", href: "/standorte" },
          { label: "Jobs & franchise", href: "https://sg-laserzentrum.de/jobs-and-franchise-/" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Imprint", href: "https://sg-laserzentrum.de/online-terminbuchung/" },
          { label: "Privacy", href: "https://sg-laserzentrum.de/online-terminbuchung/" },
          { label: "Terms", href: "https://sg-laserzentrum.de/online-terminbuchung/" },
        ],
      },
    ],
    legal: "Owners: Gizem Achenbach & Sinem Bulukgiray · VAT ID DE368172174",
  },
};

export const COPY: Record<Lang, Copy> = { de: COPY_DE, en: COPY_EN };
