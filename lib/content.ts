import type { ServiceId, TreatmentId } from "./services";
import type { ZoneSlug } from "./zones";

export type Lang = "de" | "en";

type Link = { label: string; href: string };
type Faq = { q: string; a: string; list?: string[] };
type PolicySection = { title: string; body: string[]; list?: string[]; after?: string[] };
/** `position` is the photo's object-position inside the tall card crop. */
type Usp = { title: string; body: string; photo: { src: string; alt: string; position: string } };

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
      { label: "Kontakt", href: "/kontakt" },
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
    heading: "SG Laserzentrum: dauerhafte Haarentfernung mit Laser",
    word: "Laserzentrum",
    intro: "SG Laserzentrum – dauerhafte Haarentfernung mit Gefühl für Ihre Haut.",
    labels: (studios: number) => ["Dauerhafte Haarentfernung", "Moderne Lasertechnologie", `${studios} Standorte in Deutschland`],
    imageAlt: "Nahaufnahme eines Frauengesichts mit glatter, strahlender Haut",
  },

  statement: {
    eyebrow: "In wenigen Worten",
    text: "Seit 2022 konzentrieren wir uns auf eine einzige Sache: dauerhafte Haarentfernung. Mit moderner Lasertechnik, NiSV-zertifiziertem Fachpersonal und fairen, transparenten Preisen.",
  },

  belief: {
    eyebrow: "Unser Anspruch",
    title: "Wir glauben an glatte Haut, die bleibt.",
    body: "Dauerhafte Haarentfernung ist Vertrauenssache. Deshalb arbeitet jedes unserer Studios mit denselben Standards, derselben Technik und einem Team, das regelmäßig geschult wird.",
    imageAlt: "Glatte Beine einer Frau, in die Luft gestreckt und überkreuzt, vor sandfarbenem Hintergrund",
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

  zones: {
    eyebrow: "Laser-Haarentfernung",
    listEyebrow: "Behandlungsbereiche",
    book: "Termin buchen",
    toStudios: "Standorte ansehen",
    facts: [
      { value: "8–12", label: "Sitzungen im Durchschnitt" },
      { value: "−15 °C", label: "Kontaktkühlung für angenehme Sitzungen" },
      { value: "4", label: "Wellenlängen für unterschiedliche Haut- und Haartypen" },
      { value: "NiSV", label: "zertifiziertes Fachpersonal" },
    ],
    stepsEyebrow: "Ablauf",
    stepsTitle: "So läuft Ihre Behandlung ab",
    steps: [
      {
        title: "Beratung",
        body: "Wir besprechen Hauttyp, Haarstruktur und Ihre Wunschzone und stimmen die Behandlung darauf ab.",
      },
      {
        title: "Vorbereitung",
        body: "Rasieren Sie die Zone am Tag vor der Behandlung und meiden Sie zwei Wochen vorher Sonnenbäder und Solarium.",
      },
      {
        title: "Behandlung",
        body: "Der SG XLaser Pro vereint Dioden-, Alexandrit- und Nd:YAG-Wellenlängen. Die Kontaktkühlung bis −15 °C hält die Haut dabei angenehm kühl.",
      },
      {
        title: "Ergebnis",
        body: "Im Allgemeinen sind 8 bis 12 Sitzungen nötig. Danach empfehlen wir etwa einmal im Jahr eine Auffrischung.",
      },
    ],
    noteTitle: "Gut zu wissen",
    studiosTitle: (zone: string) => `Haarentfernung ${zone} in Ihrer Stadt`,
    othersTitle: "Weitere Behandlungsbereiche",
    cityTitle: (city: string) => `Laser-Haarentfernung in ${city}`,
    cityIntro: (city: string) =>
      `In unserem Studio in ${city} entfernen wir Haare an Gesicht, Achseln, Intimbereich und Beinen dauerhaft, mit dem SG XLaser Pro und NiSV-zertifiziertem Fachpersonal.`,
    more: "Mehr erfahren",
    items: {
      gesicht: {
        name: "Gesicht",
        title: "Laser-Haarentfernung im Gesicht",
        intro:
          "Oberlippe, Kinn und Wangen behandeln wir mit kleinen Impulsen und ruhiger Hand, damit die Haut rundherum unberührt bleibt. Die Kontaktkühlung bis −15 °C macht die kurzen Sitzungen im Gesicht angenehm.",
        note: "Vor einer Behandlung im Gesicht muss das Make-up vollständig entfernt und die Haut gründlich gereinigt werden. Kleine Bereiche wie das Gesicht gehören zu den kürzesten Sitzungen.",
      },
      achseln: {
        name: "Achseln",
        title: "Laser-Haarentfernung an den Achseln",
        intro: "In wenigen Minuten behandelt und dauerhaft glatt: Schluss mit täglichem Rasieren, Rasurbrand und eingewachsenen Haaren.",
        note: "Die Achseln sind eine kleine Zone und schnell behandelt. Rasieren Sie sie am Tag vor der Sitzung und meiden Sie in den zwei Wochen davor Sonnenbäder und Solarium.",
      },
      intimbereich: {
        name: "Intimbereich",
        title: "Laser-Haarentfernung im Intimbereich",
        intro: "Bikinizone und Intimbereich behandeln wir mit gekühltem Handstück und angepasster Intensität, diskret und in Ihrem Tempo.",
        note: "Für empfindliche Haut stimmen wir die Intensität individuell ab. Die Kontaktkühlung bis −15 °C macht die Behandlung spürbar angenehmer.",
      },
      beine: {
        name: "Beine",
        title: "Laser-Haarentfernung an den Beinen",
        intro: "Vom Unterschenkel bis zum Ganzkörperpaket: Das Hochleistungs-Handstück erfasst große Flächen zügig und präzise.",
        note: "Große Zonen wie die Beine dauern länger als kleine. Je nach Umfang sollten Sie mit 30 bis 75 Minuten pro Sitzung rechnen.",
      },
    } satisfies Record<ZoneSlug, { name: string; title: string; intro: string; note: string }>,
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
    usps: (studios: number): Usp[] => [
      {
        title: "100\u00A0% Haarentfernung",
        body: "Wir konzentrieren uns auf eine einzige Behandlung und beherrschen sie entsprechend gut.",
        photo: { src: "/images/usp-spezialisiert.jpg", alt: "Glatte, nackte Schulter einer Frau im warmen Licht", position: "60% 50%" },
      },
      {
        title: "NiSV-zertifiziertes Personal",
        body: "Unser Fachpersonal ist nach der NiSV zertifiziert, der Verordnung für den Einsatz von Lasern am Menschen.",
        photo: { src: "/images/usp-fachpersonal.jpg", alt: "Fachkraft in Leinenkasack hält das Laser-Handstück mit Handschuhen", position: "60% 50%" },
      },
      {
        title: "Moderne Lasertechnologie",
        body: "Ein Hochleistungslaser mit vier Wellenlängen und integrierter Kontaktkühlung.",
        photo: { src: "/images/usp-technologie.jpg", alt: "Laser-Handstück mit Kühlfenster auf hellem Leinen", position: "78% 50%" },
      },
      {
        title: "Regelmäßige Schulungen",
        body: "Wir schulen unser Team laufend intern, damit jede Behandlung dem aktuellen Stand entspricht.",
        photo: { src: "/images/usp-schulungen.jpg", alt: "Eine erfahrene Fachkraft führt die Hand einer Kollegin am Laser-Handstück", position: "62% 50%" },
      },
      {
        title: "Faire, transparente Preise",
        body: "Jeder Standort hat eine eigene, klar aufgeführte Preisliste.",
        photo: { src: "/images/usp-preise.jpg", alt: "Empfangstheke aus Travertin mit Karte und Trockengräsern", position: "60% 50%" },
      },
      {
        title: `${cap(word(DE_NUMBERS, studios))} Standorte`,
        body: "Von Mainz bis Nürnberg, von Stuttgart bis Köln. München ist in Planung.",
        photo: { src: "/images/usp-standorte.jpg", alt: "Eingang eines Studios mit Glastür, Leinenvorhang und Olivenbaum", position: "55% 50%" },
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
      },
      {
        name: "Katherina F.",
        quote:
          "Top Preis-Leistungs-Verhältnis! Man wird immer super freundlich empfangen, und ich habe schon nach zwei Anwendungen weniger Haarwuchs bemerkt!",
      },
      {
        name: "Donike Z.",
        quote: "Ich bin so unglaublich zufrieden. So freundlich, und die Ergebnisse sind der Wahnsinn! Absolut empfehlenswert!",
      },
      {
        name: "Nilo H.",
        quote: "Ich bin sehr zufrieden. Beratung, Behandlung, Hygiene und Freundlichkeit sind top!",
      },
      {
        name: "Vanessa G.",
        quote:
          "Ich bin das zweite Mal hier und super zufrieden. Sehr sauberes Studio und nette Gespräche während der Behandlungen. Einfühlsame Mitarbeiter, und ich wurde von Anfang an hervorragend beraten. Klare Empfehlung!",
      },
    ],
    provenExpert: {
      label: "ProvenExpert",
      link: "Alle Bewertungen auf ProvenExpert",
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

  contact: {
    eyebrow: "Kontakt",
    title: "Wir sind für Sie da",
    intro:
      "Fragen zur Behandlung, zu Preisen oder Terminen? Rufen Sie uns an, schreiben Sie uns per WhatsApp oder E-Mail oder buchen Sie direkt online in Ihrem Studio.",
    phone: "Telefon & WhatsApp",
    email: "E-Mail",
    emailSubject: "Anfrage über die Website",
    booking: "Online-Termin",
    bookingBody: "Jedes Studio hat einen eigenen Online-Kalender.",
    studiosEyebrow: "Standorte",
    studiosTitle: "Direkt zu Ihrem Studio",
    studiosIntro: "Adresse und Telefonnummer jedes Studios auf einen Blick.",
    toStudio: "Zum Standort",
  },

  footer: {
    tagline: (studios: number) => `Dauerhafte Haarentfernung an ${word(DE_NUMBERS, studios)} Standorten in Deutschland.`,
    studios: "Standorte",
    company: "Unternehmen",
    treatments: "Behandlungen",
    contact: "Kontakt",
    links: [
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
    factsTitle: (city: string) => `Besuchen Sie uns in ${city}`,
    factsIntro: "Adresse, Kontakt und Öffnungszeiten auf einen Blick. Wir freuen uns auf Ihren Besuch.",
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
    others: "Weitere Standorte",
    all: "Alle Standorte",
    map: {
      title: (city: string) => `Google Maps: SG Laserzentrum ${city}`,
    },
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
      subject: "Franchise-Anfrage: eigenes SG Laserzentrum eröffnen",
      imageAlt: "Heller Behandlungsraum mit Liege und Vorhängen",
    },
    jobs: {
      eyebrow: "Karriere",
      title: "Teil unseres Teams werden",
      body: "Wir suchen Menschen, die präzise arbeiten und sich gern um andere kümmern. Schicken Sie uns Ihre Bewerbung, auch initiativ.",
      points: ["Regelmäßige interne Schulungen", "Arbeit mit moderner Lasertechnologie", "Ein herzliches Team an mehreren Standorten"],
      cta: "Bewerbung senden",
      subject: "Bewerbung bei SG Laserzentrum",
      imageAlt: "Fachkraft bereitet eine Behandlung vor",
    },
    contactTitle: "Direkter Kontakt",
    contactBody: "Schreiben Sie uns eine E-Mail oder eine Nachricht per WhatsApp.",
    contactSubject: "Anfrage zu Franchise & Karriere",
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
    controllerIntro: "Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:",
    sections: [
      {
        title: "Überblick",
        body: [
          "Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten wir beim Besuch unserer Website und bei einer Kontaktaufnahme verarbeiten, zu welchen Zwecken und auf welcher Rechtsgrundlage. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
          "Wir setzen keine Analyse-, Tracking- oder Werbe-Tools ein und erstellen keine Nutzungsprofile.",
        ],
      },
      {
        title: "Hosting und Server-Logfiles",
        body: [
          "Diese Website wird bei einem externen Dienstleister (Hoster) betrieben. Bei jedem Aufruf erfasst der Server automatisch Informationen, die Ihr Browser übermittelt:",
        ],
        list: [
          "IP-Adresse",
          "Datum und Uhrzeit der Anfrage",
          "aufgerufene Seite und übertragene Datenmenge",
          "Referrer-URL (die zuvor besuchte Seite)",
          "Browsertyp und -version sowie Betriebssystem",
        ],
        after: [
          "Diese Daten sind technisch erforderlich, um die Website stabil und sicher auszuliefern. Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Die Logfiles werden nicht mit anderen Datenquellen zusammengeführt und nach kurzer Zeit gelöscht, sofern sie nicht zur Aufklärung eines Sicherheitsvorfalls benötigt werden. Mit unserem Hoster besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.",
        ],
      },
      {
        title: "SSL- bzw. TLS-Verschlüsselung",
        body: [
          "Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.",
        ],
      },
      {
        title: "Kontakt per Telefon, E-Mail oder WhatsApp",
        body: [
          "Wenn Sie uns per Telefon, E-Mail oder WhatsApp kontaktieren, verarbeiten wir Ihre Angaben, etwa Name, Telefonnummer, E-Mail-Adresse und den Inhalt Ihrer Anfrage, um Ihr Anliegen zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage mit einem Vertrag oder einer Terminvereinbarung zusammenhängt, andernfalls unser berechtigtes Interesse an der Beantwortung von Anfragen nach Art. 6 Abs. 1 lit. f DSGVO. Wir löschen die Daten, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
          "Für WhatsApp nutzen wir den Dienst der WhatsApp Ireland Limited in Irland. Dabei können Daten auch an die Meta Platforms Inc. in den USA übermittelt werden; Grundlage dafür ist das EU-US Data Privacy Framework. Nachrichteninhalte sind Ende-zu-Ende-verschlüsselt, Metadaten verarbeitet WhatsApp in eigener Verantwortung. Es gelten zusätzlich die Datenschutzbestimmungen von WhatsApp. Die Nutzung ist freiwillig; Sie erreichen uns ebenso per Telefon oder E-Mail.",
        ],
      },
      {
        title: "Online-Terminbuchung",
        body: [
          "Für die Online-Buchung verlinken wir auf die Buchungsseiten unserer Studios beim Anbieter Studiolution (studiobookr.com). Erst wenn Sie einen dieser Links öffnen, werden Daten an Studiolution übertragen. Die dort eingegebenen Angaben, etwa Name, Kontaktdaten sowie gewünschter Termin und gewünschte Behandlung, verarbeiten wir zur Durchführung Ihres Termins nach Art. 6 Abs. 1 lit. b DSGVO. Studiolution ist dabei als Auftragsverarbeiter für uns tätig.",
        ],
      },
      {
        title: "Google Maps",
        body: [
          "Auf unseren Standortseiten binden wir Karten des Dienstes Google Maps ein, damit Sie unsere Studios leicht finden. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.",
          "Beim Laden einer Karte wird Ihre IP-Adresse an Google übertragen. Google kann dabei Cookies setzen und Daten an die Google LLC in den USA übermitteln; Grundlage dafür ist das EU-US Data Privacy Framework. Rechtsgrundlage für die Einbindung ist unser berechtigtes Interesse an einer leicht auffindbaren Darstellung unserer Standorte nach Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen finden Sie in der Datenschutzerklärung von Google unter policies.google.com/privacy.",
        ],
      },
      {
        title: "Links zu anderen Anbietern",
        body: [
          "Unsere Website enthält Links zu externen Angeboten, zum Beispiel zu Instagram und zu unseren Google-Bewertungen. Erst wenn Sie einen solchen Link anklicken, werden Daten an den jeweiligen Anbieter übertragen; es gelten dann dessen Datenschutzbestimmungen.",
        ],
      },
      {
        title: "Speicherung im Browser und Schriftarten",
        body: [
          "Wir setzen keine Cookies zu Analyse- oder Werbezwecken. Damit die Startanimation pro Besuch nur einmal erscheint, legen wir im Sitzungsspeicher Ihres Browsers (sessionStorage) einen technischen Merker ohne personenbezogene Daten ab. Er wird gelöscht, sobald Sie das Browserfenster schließen (§ 25 Abs. 2 Nr. 2 TDDDG).",
          "Alle Schriftarten werden von unserem eigenen Server geladen. Eine Verbindung zu Google Fonts oder anderen Schriftanbietern findet nicht statt.",
        ],
      },
      {
        title: "Speicherdauer",
        body: [
          "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen es verlangen, etwa aus dem Handels- und Steuerrecht. Danach werden die Daten gelöscht.",
        ],
      },
      {
        title: "Ihre Rechte",
        body: ["Sie haben uns gegenüber jederzeit das Recht auf:"],
        list: [
          "Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)",
          "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
          "Löschung Ihrer Daten (Art. 17 DSGVO)",
          "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Datenübertragbarkeit (Art. 20 DSGVO)",
          "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
        ],
        after: [
          "Wenden Sie sich dazu einfach an die oben genannten Kontaktdaten.",
        ],
      },
      {
        title: "Widerspruchsrecht",
        body: [
          "Soweit wir Daten auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie dieser Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen (Art. 21 DSGVO). Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen überwiegen.",
        ],
      },
      {
        title: "Beschwerderecht bei einer Aufsichtsbehörde",
        body: [
          "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Bundesland Ihres Wohnorts, Ihres Arbeitsplatzes oder des mutmaßlichen Verstoßes. Für uns zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.",
        ],
      },
    ] as PolicySection[],
    updated: "Stand: September 2026",
    devNote:
      "Vor dem Livegang prüfen: Namen des Hosters ergänzen und die Auftragsverarbeitungsverträge mit Hoster und Studiolution abschließen. Sobald das ProvenExpert-Siegel eingebunden wird, einen Abschnitt dazu ergänzen.",
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
      { label: "Contact", href: "/kontakt" },
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
    heading: "SG Laserzentrum: permanent laser hair removal",
    word: "Laserzentrum",
    intro: "SG Laserzentrum – permanent hair removal with a feel for your skin.",
    labels: (studios: number) => ["Permanent hair removal", "Modern laser technology", `${studios} locations in Germany`],
    imageAlt: "Close-up of a woman's face with smooth, glowing skin",
  },

  statement: {
    eyebrow: "In a few words",
    text: "Since 2022 we have focused on one thing only: permanent hair removal. With modern laser technology, NiSV-certified specialists and fair, transparent prices.",
  },

  belief: {
    eyebrow: "Our promise",
    title: "We believe in smooth skin that lasts.",
    body: "Permanent hair removal is a matter of trust. That is why every one of our studios works to the same standards, with the same technology and a team that is trained regularly.",
    imageAlt: "A woman's smooth legs raised into the air and crossed, against a sand-coloured backdrop",
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

  zones: {
    eyebrow: "Laser hair removal",
    listEyebrow: "Treatment areas",
    book: "Book now",
    toStudios: "See locations",
    facts: [
      { value: "8–12", label: "sessions on average" },
      { value: "−15 °C", label: "contact cooling for comfortable sessions" },
      { value: "4", label: "wavelengths for different skin and hair types" },
      { value: "NiSV", label: "certified specialists" },
    ],
    stepsEyebrow: "How it works",
    stepsTitle: "How your treatment works",
    steps: [
      {
        title: "Consultation",
        body: "We discuss your skin type, hair structure and the area you want treated, and tailor the treatment to them.",
      },
      {
        title: "Preparation",
        body: "Shave the area the day before and avoid sunbathing and sunbeds for two weeks beforehand.",
      },
      {
        title: "Treatment",
        body: "The SG XLaser Pro combines diode, alexandrite and Nd:YAG wavelengths. Contact cooling down to −15 °C keeps your skin comfortably cool.",
      },
      {
        title: "Result",
        body: "Generally 8 to 12 sessions are needed. After that we recommend a top-up about once a year.",
      },
    ],
    noteTitle: "Good to know",
    studiosTitle: (zone: string) => `${zone} hair removal near you`,
    othersTitle: "More treatment areas",
    cityTitle: (city: string) => `Laser hair removal in ${city}`,
    cityIntro: (city: string) =>
      `At our studio in ${city} we permanently remove hair on the face, underarms, intimate area and legs, with the SG XLaser Pro and NiSV-certified specialists.`,
    more: "Learn more",
    items: {
      gesicht: {
        name: "Face",
        title: "Laser hair removal on the face",
        intro:
          "We treat the upper lip, chin and cheeks with small pulses and a steady hand, so the skin around them stays untouched. Contact cooling down to −15 °C makes the short facial sessions comfortable.",
        note: "Before a facial treatment, make-up must be removed completely and the skin cleaned thoroughly. Small areas like the face are among the shortest sessions.",
      },
      achseln: {
        name: "Underarms",
        title: "Laser hair removal on the underarms",
        intro: "Treated in a few minutes and smooth for good: no more daily shaving, razor burn or ingrown hairs.",
        note: "The underarms are a small area and quick to treat. Shave them the day before your session and avoid sunbathing and sunbeds for two weeks beforehand.",
      },
      intimbereich: {
        name: "Intimate area",
        title: "Laser hair removal in the intimate area",
        intro: "We treat the bikini line and intimate area with a cooled handpiece and adjusted intensity, discreetly and at your pace.",
        note: "For sensitive skin we adjust the intensity individually. Contact cooling down to −15 °C makes the treatment noticeably more comfortable.",
      },
      beine: {
        name: "Legs",
        title: "Laser hair removal on the legs",
        intro: "From the lower legs to the full-body package: the high-performance handpiece covers large areas quickly and precisely.",
        note: "Large areas like the legs take longer than small ones. Depending on the extent, allow 30 to 75 minutes per session.",
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
    usps: (studios: number): Usp[] => [
      {
        title: "100% hair removal",
        body: "We focus on a single treatment and are very good at it as a result.",
        photo: { src: "/images/usp-spezialisiert.jpg", alt: "A woman's smooth bare shoulder in warm light", position: "60% 50%" },
      },
      {
        title: "NiSV-certified staff",
        body: "Our specialists are certified under the NiSV, the German regulation on using lasers on people.",
        photo: { src: "/images/usp-fachpersonal.jpg", alt: "Specialist in a linen tunic holding the laser handpiece in gloved hands", position: "60% 50%" },
      },
      {
        title: "Modern laser technology",
        body: "A high-performance laser with four wavelengths and built-in contact cooling.",
        photo: { src: "/images/usp-technologie.jpg", alt: "Laser handpiece with its cooling window on pale linen", position: "78% 50%" },
      },
      {
        title: "Regular training",
        body: "We train our team in-house on an ongoing basis, so every treatment reflects current practice.",
        photo: { src: "/images/usp-schulungen.jpg", alt: "An experienced specialist guiding a colleague's hand on the laser handpiece", position: "62% 50%" },
      },
      {
        title: "Fair, transparent prices",
        body: "Every location has its own clearly listed price list.",
        photo: { src: "/images/usp-preise.jpg", alt: "Travertine reception counter with a card and dried grasses", position: "60% 50%" },
      },
      {
        title: `${cap(word(EN_NUMBERS, studios))} locations`,
        body: "From Mainz to Nuremberg, from Stuttgart to Cologne. Munich is being planned.",
        photo: { src: "/images/usp-standorte.jpg", alt: "Studio entrance with a glass door, linen curtain and olive tree", position: "55% 50%" },
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
      },
      {
        name: "Katherina F.",
        quote:
          "Excellent value for money! You are always welcomed so warmly, and I noticed less hair growth after only two sessions!",
      },
      {
        name: "Donike Z.",
        quote: "I am so unbelievably happy. So friendly, and the results are incredible! Absolutely recommended!",
      },
      {
        name: "Nilo H.",
        quote: "I am very happy. Advice, treatment, hygiene and friendliness are all excellent!",
      },
      {
        name: "Vanessa G.",
        quote:
          "This is my second visit and I am very happy. A very clean studio and pleasant conversations during the treatments. Caring staff, and I was given excellent advice from the start. A clear recommendation!",
      },
    ],
    provenExpert: {
      label: "ProvenExpert",
      link: "All reviews on ProvenExpert",
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

  contact: {
    eyebrow: "Contact",
    title: "We are here for you",
    intro:
      "Questions about treatments, prices or appointments? Call us, message us on WhatsApp or by email, or book online directly at your studio.",
    phone: "Phone & WhatsApp",
    email: "Email",
    emailSubject: "Anfrage über die Website",
    booking: "Online booking",
    bookingBody: "Every studio has its own online calendar.",
    studiosEyebrow: "Locations",
    studiosTitle: "Straight to your studio",
    studiosIntro: "Every studio's address and phone number at a glance.",
    toStudio: "View location",
  },

  footer: {
    tagline: (studios: number) => `Permanent hair removal at ${word(EN_NUMBERS, studios)} locations across Germany.`,
    studios: "Locations",
    company: "Company",
    treatments: "Treatments",
    contact: "Contact",
    links: [
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
    factsTitle: (city: string) => `Visit us in ${city}`,
    factsIntro: "Address, contact details and opening hours at a glance. We look forward to your visit.",
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
    others: "Other locations",
    all: "All locations",
    map: {
      title: (city: string) => `Google Maps: SG Laserzentrum ${city}`,
    },
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
      subject: "Franchise-Anfrage: eigenes SG Laserzentrum eröffnen",
      imageAlt: "Bright treatment room with a couch and curtains",
    },
    jobs: {
      eyebrow: "Careers",
      title: "Join our team",
      body: "We are looking for people who work precisely and enjoy caring for others. Send us your application, speculative ones included.",
      points: ["Regular in-house training", "Working with modern laser technology", "A warm team across several locations"],
      cta: "Send an application",
      subject: "Bewerbung bei SG Laserzentrum",
      imageAlt: "Specialist preparing a treatment",
    },
    contactTitle: "Direct contact",
    contactBody: "Send us an email or a WhatsApp message.",
    contactSubject: "Anfrage zu Franchise & Karriere",
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
    controllerIntro: "The controller responsible for processing data on this website within the meaning of the General Data Protection Regulation (GDPR) is:",
    sections: [
      {
        title: "Overview",
        body: [
          "This privacy policy explains which personal data we process when you visit our website or contact us, for what purposes and on what legal basis. Personal data is any data that can be used to identify you personally.",
          "We do not use analytics, tracking or advertising tools and do not build usage profiles.",
        ],
      },
      {
        title: "Hosting and server log files",
        body: [
          "This website is run by an external service provider (host). Each time a page is requested, the server automatically records information that your browser transmits:",
        ],
        list: [
          "IP address",
          "date and time of the request",
          "page requested and amount of data transferred",
          "referrer URL (the page visited before)",
          "browser type and version and operating system",
        ],
        after: [
          "This data is technically necessary to deliver the website reliably and securely. The legal basis is our legitimate interest under Art. 6(1)(f) GDPR. Log files are not combined with other data sources and are deleted after a short time unless they are needed to investigate a security incident. We have a data processing agreement with our host under Art. 28 GDPR.",
        ],
      },
      {
        title: "SSL/TLS encryption",
        body: [
          "For security reasons this website uses SSL/TLS encryption. You can recognise an encrypted connection by “https://” in your browser's address bar.",
        ],
      },
      {
        title: "Contact by phone, email or WhatsApp",
        body: [
          "If you contact us by phone, email or WhatsApp, we process the details you give us, such as your name, phone number, email address and the content of your enquiry, to deal with your request. The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to a contract or an appointment, otherwise our legitimate interest in answering enquiries under Art. 6(1)(f) GDPR. We delete the data once it is no longer needed and no statutory retention obligations apply.",
          "For WhatsApp we use the service of WhatsApp Ireland Limited in Ireland. Data may also be transferred to Meta Platforms Inc. in the USA, on the basis of the EU-US Data Privacy Framework. Message content is end-to-end encrypted; WhatsApp processes metadata under its own responsibility, and WhatsApp's privacy policy also applies. Using WhatsApp is voluntary; you can equally reach us by phone or email.",
        ],
      },
      {
        title: "Online booking",
        body: [
          "For online booking we link to our studios' booking pages with the provider Studiolution (studiobookr.com). Data is only transferred to Studiolution once you open one of these links. We process the details entered there, such as your name, contact details and the appointment and treatment you want, to carry out your appointment under Art. 6(1)(b) GDPR. Studiolution acts as our processor.",
        ],
      },
      {
        title: "Google Maps",
        body: [
          "On our location pages we embed maps from Google Maps so you can find our studios easily. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.",
          "When a map loads, your IP address is transferred to Google. Google may set cookies and transfer data to Google LLC in the USA, on the basis of the EU-US Data Privacy Framework. The legal basis for the embed is our legitimate interest in presenting our locations so they are easy to find, under Art. 6(1)(f) GDPR. More information is in Google's privacy policy at policies.google.com/privacy.",
        ],
      },
      {
        title: "Links to other providers",
        body: [
          "Our website contains links to external services, for example Instagram and our Google reviews. Data is only transferred to the provider once you click such a link; their privacy policy then applies.",
        ],
      },
      {
        title: "Browser storage and fonts",
        body: [
          "We do not use cookies for analytics or advertising. So that the opening animation only plays once per visit, we store a technical flag without personal data in your browser's session storage. It is deleted when you close the browser window (Section 25(2) No. 2 TDDDG).",
          "All fonts are loaded from our own server. No connection is made to Google Fonts or any other font provider.",
        ],
      },
      {
        title: "Storage period",
        body: [
          "We keep personal data only for as long as the purpose requires or statutory retention periods demand, for example under commercial and tax law. The data is then deleted.",
        ],
      },
      {
        title: "Your rights",
        body: ["You have the right at any time to:"],
        list: [
          "access the data stored about you (Art. 15 GDPR)",
          "rectification of inaccurate data (Art. 16 GDPR)",
          "erasure of your data (Art. 17 GDPR)",
          "restriction of processing (Art. 18 GDPR)",
          "data portability (Art. 20 GDPR)",
          "withdraw consent you have given, with effect for the future (Art. 7(3) GDPR)",
        ],
        after: ["Simply get in touch using the contact details above."],
      },
      {
        title: "Right to object",
        body: [
          "Where we process data on the basis of our legitimate interest under Art. 6(1)(f) GDPR, you may object to this processing at any time on grounds relating to your particular situation (Art. 21 GDPR). We will then stop processing the data unless we can demonstrate compelling legitimate grounds that override your interests.",
        ],
      },
      {
        title: "Right to lodge a complaint",
        body: [
          "You have the right to lodge a complaint with a data protection supervisory authority, in particular in the federal state where you live, work or where the alleged infringement took place. The authority responsible for us is the State Commissioner for Data Protection and Freedom of Information of Rhineland-Palatinate.",
        ],
      },
    ],
    updated: "Last updated: September 2026",
    devNote:
      "Check before launch: add the host's name and conclude the data processing agreements with the host and Studiolution. Once the ProvenExpert seal is embedded, add a section on it.",
  },

  notFound: {
    eyebrow: "404",
    title: "This page does not exist",
    body: "It may have moved. You will find everything important on the home page.",
    cta: "Go to home page",
  },
};

export const COPY: Record<Lang, Copy> = { de: COPY_DE, en: COPY_EN };
