import type { Lang } from "./content";

/**
 * Ratgeber (guide) articles under /ratgeber/<slug>. The German text is what
 * the public site shows; the English version is for reviewing in development.
 * Claims stay within what the studios already state on their site (sessions,
 * 68 °C, cooling, wavelengths, preparation, session length) plus
 * well-established general facts, always worded without promising a result.
 *
 * Text may link inline with [label](/path). Bump `updated` whenever an article
 * changes: it feeds the sitemap and the article's structured data.
 */
export const ARTICLES = [
  {
    slug: "wie-viele-sitzungen-laser-haarentfernung",
    image: "/images/ratgeber-laser-haarentfernung-sitzungen.jpg",
    published: "2026-09-18",
    updated: "2026-09-18",
  },
  {
    slug: "laser-oder-ipl",
    image: "/images/ratgeber-laser-oder-ipl.jpg",
    published: "2026-09-18",
    updated: "2026-09-18",
  },
  {
    slug: "laser-haarentfernung-dunkle-haut",
    image: "/images/ratgeber-laser-haarentfernung-dunkle-haut.jpg",
    published: "2026-09-18",
    updated: "2026-09-18",
  },
  {
    slug: "vorbereitung-laser-haarentfernung",
    image: "/images/ratgeber-vorbereitung-laser-haarentfernung.jpg",
    published: "2026-09-18",
    updated: "2026-09-22",
  },
  {
    slug: "tut-laser-haarentfernung-weh",
    image: "/images/ratgeber-laser-haarentfernung-schmerzen.jpg",
    published: "2026-09-18",
    updated: "2026-09-18",
  },
] as const;

/** Pixel size of every article photo, for Open Graph and structured data. */
export const ARTICLE_IMAGE_SIZE = { width: 2048, height: 1374 } as const;

export type Article = (typeof ARTICLES)[number];
export type ArticleSlug = Article["slug"];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "note"; title: string; text: string };

export type ArticleCopy = {
  /** The page's H1 and the headline in search results and structured data. */
  title: string;
  /** Title tag. The layout appends " | SG Laserzentrum", so at most 42 characters. */
  metaTitle: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  /** Teaser on the article cards. */
  excerpt: string;
  /** Short name for the breadcrumb trail. */
  crumb: string;
  imageAlt: string;
  /** Opening paragraph under the photo. */
  intro: string;
  /** Direct answer to the title's question, 40 to 60 words, shown as "Kurz gesagt". */
  answer: string;
  blocks: ArticleBlock[];
  faq: { q: string; a: string }[];
};

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Inline link syntax in article text: [label](/path). */
export const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Article text without link syntax. */
export function plainText(copy: ArticleCopy) {
  const blocks = copy.blocks.map((b) => {
    switch (b.type) {
      case "list":
      case "steps":
        return b.items.join(" ");
      case "table":
        return [b.caption, ...b.head, ...b.rows.flat()].join(" ");
      case "note":
        return `${b.title} ${b.text}`;
      default:
        return b.text;
    }
  });
  const faq = copy.faq.map((f) => `${f.q} ${f.a}`);
  return [copy.intro, copy.answer, ...blocks, ...faq].join(" ").replace(INLINE_LINK, "$1");
}

export function wordCount(copy: ArticleCopy) {
  return plainText(copy).split(/\s+/).filter(Boolean).length;
}

/** Minutes at about 200 words a minute, never less than one. */
export function readingMinutes(copy: ArticleCopy) {
  return Math.max(1, Math.round(wordCount(copy) / 200));
}

/** Anchor id for a heading, so the table of contents can link to it. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const DE: Record<ArticleSlug, ArticleCopy> = {
  "wie-viele-sitzungen-laser-haarentfernung": {
    title: "Wie viele Sitzungen braucht die Laser-Haarentfernung?",
    metaTitle: "Laser-Haarentfernung: Wie viele Sitzungen?",
    description:
      "Wie viele Sitzungen braucht die Laser-Haarentfernung? Meist 8 bis 12 im Abstand einiger Wochen. Wovon die Zahl abhängt und wann Sie Ergebnisse sehen.",
    excerpt:
      "Im Allgemeinen sind 8 bis 12 Sitzungen nötig. Warum es mehrere Termine braucht, wie viel Zeit dazwischen liegt und wovon die genaue Zahl abhängt.",
    crumb: "Anzahl der Sitzungen",
    imageAlt: "Fachkraft mit Handschuhen behandelt das Bein einer Kundin mit dem Laser-Handstück",
    intro:
      "„Wie oft muss ich kommen, bis die Haut glatt bleibt?“ Diese Frage hören wir in unseren Studios fast täglich. Verständlich, denn vor einer dauerhaften Haarentfernung möchte man wissen, worauf man sich einlässt. Hier erklären wir, warum eine Sitzung nicht reicht, wovon die Anzahl der Sitzungen abhängt und wann Sie mit sichtbaren Ergebnissen rechnen können.",
    answer:
      "Für eine dauerhafte Laser-Haarentfernung sind im Allgemeinen 8 bis 12 Sitzungen nötig. Der Grund ist der Wachstumszyklus der Haare: Der Laser wirkt nur auf Haare, die gerade wachsen. Deshalb liegen zwischen den Terminen einige Wochen. Wie viele Sitzungen es bei Ihnen genau werden, hängt von Haardicke, Hauttyp und Körperzone ab.",
    blocks: [
      { type: "h2", text: "Warum reicht eine Sitzung nicht aus?" },
      {
        type: "p",
        text: "Das Laserlicht wird vom Pigment im Haar, dem Melanin, aufgenommen und in Wärme umgewandelt. Ab etwa 68 °C werden die Proteine im Haarfollikel zerstört, sodass die Haarwurzel kein neues Haar mehr bilden kann.",
      },
      {
        type: "p",
        text: "Das gelingt allerdings nur, solange das Haar fest mit seiner Wurzel verbunden ist. Und das ist nur in einer bestimmten Phase des Haarwachstums der Fall.",
      },
      { type: "h3", text: "Die drei Phasen des Haarwachstums" },
      {
        type: "list",
        items: [
          "Wachstumsphase (Anagen): Das Haar ist fest mit der Wurzel verbunden und enthält viel Pigment. Nur jetzt erreicht der Laser die Wurzel wirksam.",
          "Übergangsphase (Katagen): Das Haar löst sich von der Wurzel. Die Energie des Lasers kommt dort kaum noch an.",
          "Ruhephase (Telogen): Das Haar fällt aus, die Wurzel ruht. Danach beginnt ein neuer Zyklus.",
        ],
      },
      {
        type: "p",
        text: "Zu jedem Zeitpunkt befindet sich nur ein Teil Ihrer Haare in der Wachstumsphase. Jede Sitzung erfasst genau diesen Teil. Erst über mehrere Termine hinweg wird jedes Haar einmal im richtigen Moment erreicht.",
      },
      { type: "h2", text: "Wie viele Sitzungen sind nötig?" },
      {
        type: "p",
        text: "Im Allgemeinen werden 8 bis 12 Sitzungen benötigt. Diese Spanne gilt für die meisten Körperzonen und Haartypen. Manche sind schon nach weniger Terminen zufrieden, bei anderen braucht es etwas mehr Geduld.",
      },
      { type: "h2", text: "Wovon hängt die Anzahl der Sitzungen ab?" },
      {
        type: "list",
        items: [
          "Haarfarbe und Haardicke: Kräftiges, dunkles Haar nimmt das Licht besonders gut auf. Sehr helles oder feines Haar spricht weniger gut an.",
          "Hauttyp: Er bestimmt, welche Wellenlänge und Intensität wir einsetzen. Die besten Ergebnisse erzielen wir bei hellen bis mittleren Hauttypen.",
          "Körperzone: Jede Zone hat ihren eigenen Haarwuchs. Im Gesicht braucht es oft mehr Termine als an den Beinen.",
          "Hormone: Hormonelle Veränderungen, etwa in den Wechseljahren, können neue Haare anregen.",
          "Regelmäßigkeit: Wer die empfohlenen Abstände einhält, erfasst die Haare im richtigen Moment.",
        ],
      },
      {
        type: "p",
        text: "Welche Faktoren bei Ihnen zusammenkommen, schätzen wir im persönlichen Gespräch vor der ersten Behandlung ein. Wenn Sie eher dunkle Haut haben, lesen Sie auch unseren Ratgeber zur [Laser-Haarentfernung bei dunkler Haut](/ratgeber/laser-haarentfernung-dunkle-haut).",
      },
      { type: "h2", text: "Wie viel Zeit liegt zwischen den Sitzungen?" },
      {
        type: "p",
        text: "Die Abstände richten sich nach dem Haarzyklus der jeweiligen Körperzone. Im Gesicht wachsen die Haare schneller nach als an den Beinen, deshalb liegen die Termine dort näher beieinander.",
      },
      {
        type: "table",
        caption: "Übliche Abstände zwischen den Sitzungen",
        head: ["Körperzone", "Üblicher Abstand"],
        rows: [
          ["Gesicht", "etwa 4 bis 6 Wochen"],
          ["Achseln, Arme und Bikinizone", "etwa 6 bis 8 Wochen"],
          ["Beine und Rücken", "etwa 8 bis 10 Wochen"],
        ],
      },
      {
        type: "p",
        text: "Diese Werte sind Richtwerte, den passenden Rhythmus legen wir im Studio für Ihre Zone fest. Kommen Sie zu früh, sind noch zu wenige Haare in der Wachstumsphase. Die gesamte Behandlungsreihe erstreckt sich deshalb meist über viele Monate, oft über ein Jahr oder etwas länger.",
      },
      { type: "h2", text: "Ab wann sieht man Ergebnisse?" },
      {
        type: "p",
        text: "Oft schon nach den ersten Terminen: Das Haar wächst lichter und feiner nach, und die Abstände zwischen den Rasuren werden länger. In den ein bis drei Wochen nach einer Sitzung fallen die behandelten Haare nach und nach aus. Das ist normal und ein gutes Zeichen.",
      },
      {
        type: "p",
        text: "Mit jeder weiteren Sitzung wird der Haarwuchs spürbar weniger. Am Ende der Behandlungsreihe bleiben in der Regel nur noch vereinzelte, feine Haare.",
      },
      { type: "h2", text: "Wie dauerhaft ist das Ergebnis?" },
      {
        type: "p",
        text: "Die Ergebnisse sind langfristig. Weil zum Beispiel hormonelle Veränderungen neue Haare anregen können, empfehlen wir etwa einmal im Jahr eine Auffrischung. So bleibt die Haut auch auf lange Sicht glatt.",
      },
      {
        type: "note",
        title: "Unser Tipp",
        text: "Planen Sie die Behandlungsreihe mit Blick auf den Kalender: Zwei Wochen vor jeder Sitzung sollten Sie Sonnenbäder und Solarium meiden. Wer im Herbst oder Winter beginnt, ist zum Sommer hin oft schon weit gekommen.",
      },
      { type: "h2", text: "Fazit: Geduld zahlt sich aus" },
      {
        type: "p",
        text: "Eine dauerhafte Haarentfernung ist kein einzelner Termin, sondern eine Behandlungsreihe von meist 8 bis 12 Sitzungen. Wer die Abstände einhält und sich gut vorbereitet, sieht oft schon nach wenigen Terminen deutliche Fortschritte. Wie das geht, lesen Sie in unserem Ratgeber zur [Vorbereitung auf die Laser-Haarentfernung](/ratgeber/vorbereitung-laser-haarentfernung).",
      },
      {
        type: "p",
        text: "Wie viele Sitzungen es bei Ihnen voraussichtlich braucht, besprechen wir gern persönlich in einem unserer [Studios](/standorte).",
      },
    ],
    faq: [
      {
        q: "Reichen 6 Sitzungen Laser-Haarentfernung aus?",
        a: "Bei manchen Zonen und Haartypen sind nach sechs Sitzungen schon deutliche Ergebnisse sichtbar. Für ein langfristig glattes Ergebnis sind im Allgemeinen aber 8 bis 12 Sitzungen nötig.",
      },
      {
        q: "Kann ich die Abstände verkürzen, um schneller fertig zu sein?",
        a: "Das bringt leider nichts. Solange sich erst wenige neue Haare in der Wachstumsphase befinden, kann der Laser auch nur wenige erfassen. Die empfohlenen Abstände sind deshalb der schnellste Weg zum Ziel.",
      },
      {
        q: "Was passiert, wenn ich eine Sitzung verpasse?",
        a: "Nichts Schlimmes. Vereinbaren Sie einfach zeitnah einen neuen Termin. Liegt eine Sitzung deutlich später als geplant, kann sich die Behandlungsreihe etwas verlängern.",
      },
      {
        q: "Wie lange dauert eine einzelne Sitzung?",
        a: "Das hängt von der Größe der Zone ab. Kleine Bereiche wie das Gesicht gehen schnell, große wie Beine oder Rücken dauern länger. Rechnen Sie mit 30 bis 75 Minuten.",
      },
    ],
  },

  "laser-oder-ipl": {
    title: "Laser oder IPL: Was ist der Unterschied?",
    metaTitle: "Laser oder IPL: Was ist der Unterschied?",
    description:
      "Laser oder IPL zur Haarentfernung? Beide arbeiten mit Licht, aber verschieden. Die Unterschiede im Überblick und worauf Sie bei der Wahl achten sollten.",
    excerpt:
      "Beide Verfahren arbeiten mit Licht, aber auf sehr unterschiedliche Weise. Was Laser und IPL unterscheidet und worauf Sie bei der Wahl achten sollten.",
    crumb: "Laser oder IPL",
    imageAlt: "Weißes Handstück für die Haarentfernung auf einem Leinentuch",
    intro:
      "Wer sich über dauerhafte Haarentfernung informiert, stößt schnell auf zwei Begriffe: Laser und IPL. Beide Verfahren nutzen Licht, um die Haarwurzel zu schwächen, und werden oft in einem Atemzug genannt. Wie sie arbeiten und was sie leisten, unterscheidet sich jedoch deutlich. Hier erfahren Sie, was hinter den beiden Methoden steckt und worauf Sie bei der Wahl achten sollten.",
    answer:
      "Der wichtigste Unterschied zwischen Laser und IPL liegt im Licht: Ein Laser arbeitet mit einer genau definierten Wellenlänge, deren Energie gebündelt auf das Pigment im Haar wirkt. IPL sendet dagegen ein breites Lichtspektrum aus, das weniger gezielt wirkt. Für eine dauerhafte Haarentfernung gilt der Laser deshalb als das präzisere Verfahren.",
    blocks: [
      { type: "h2", text: "Was ist IPL?" },
      {
        type: "p",
        text: "IPL steht für „Intense Pulsed Light“, also intensives gepulstes Licht. Eine Blitzlampe sendet ein breites Spektrum an Wellenlängen aus, das durch Filter nur grob eingegrenzt wird. Die Energie verteilt sich damit auf viele Wellenlängen, von denen nur ein Teil gezielt vom Pigment im Haar aufgenommen wird.",
      },
      {
        type: "p",
        text: "IPL-Geräte gibt es auch für die Anwendung zu Hause. Sie arbeiten mit deutlich geringerer Leistung und werden deshalb meist über längere Zeit regelmäßig angewendet.",
      },
      { type: "h2", text: "Wie funktioniert die Laser-Haarentfernung?" },
      {
        type: "p",
        text: "Ein Laser erzeugt Licht einer genau definierten Wellenlänge. Diese Energie wird gebündelt und gezielt vom Pigment im Haar aufgenommen. Dort entsteht Wärme, die die Haarwurzel so schädigt, dass sie kein neues Haar mehr bildet.",
      },
      {
        type: "p",
        text: "Weil sich die Energie auf eine Wellenlänge konzentriert, lässt sie sich genau auf Haut und Haar abstimmen. Das umliegende Gewebe wird dabei weitgehend geschont.",
      },
      { type: "h2", text: "Welche Laserarten gibt es?" },
      {
        type: "p",
        text: "Für die Haarentfernung werden vor allem drei Laserarten eingesetzt. Sie unterscheiden sich in ihrer Wellenlänge und damit darin, wie tief das Licht eindringt und für welche Haut- und Haartypen es sich eignet.",
      },
      {
        type: "list",
        items: [
          "Alexandritlaser (755 nm): Sein Licht wird besonders stark vom Pigment aufgenommen. Er eignet sich vor allem für helle Haut und feinere Haare.",
          "Diodenlaser (808 nm): Er gilt als vielseitiger Standard der Laser-Haarentfernung und eignet sich für viele Haut- und Haartypen.",
          "Nd:YAG-Laser (1064 nm): Sein Licht dringt am tiefsten ein und wird von der Hautoberfläche am wenigsten aufgenommen. Er gilt deshalb als gängige Wahl für dunklere Hauttypen.",
        ],
      },
      {
        type: "p",
        text: "Unser SG XLaser Pro vereint vier Wellenlängen in einem Gerät: 755 nm (Alexandrit), 808 nm (Diode), 955 nm als ergänzende Wellenlänge und 1064 nm (Nd:YAG). So können wir die Behandlung auf unterschiedliche Haut- und Haartypen abstimmen. Die integrierte Kontaktkühlung bis −15 °C kühlt die Haut dabei und macht die Sitzung spürbar angenehmer.",
      },
      { type: "h2", text: "Laser und IPL im direkten Vergleich" },
      {
        type: "table",
        caption: "Laser und IPL im Vergleich",
        head: ["Merkmal", "Laser", "IPL"],
        rows: [
          ["Licht", "Eine genau definierte Wellenlänge", "Breites Lichtspektrum"],
          ["Wirkung", "Gebündelt und gezielt auf das Pigment im Haar", "Auf viele Wellenlängen verteilt, weniger gezielt"],
          ["Anpassung", "Wellenlänge und Intensität genau auf Haut und Haar abstimmbar", "Nur grob über Filter einstellbar"],
          ["Dunklere Haut", "Mit passender Wellenlänge wie 1064 nm häufig möglich", "In der Regel weniger geeignet"],
        ],
      },
      { type: "h2", text: "Ist Laser besser als IPL?" },
      {
        type: "p",
        text: "Beide Verfahren können den Haarwuchs reduzieren. Der Laser arbeitet jedoch gezielter und lässt sich genauer auf Ihre Haut und Ihr Haar abstimmen. Für eine dauerhafte Haarentfernung setzen wir deshalb auf moderne Lasertechnik.",
      },
      {
        type: "p",
        text: "Mindestens so wichtig wie das Gerät ist, wer es bedient. Die NiSV, die Verordnung zum Schutz vor nichtionisierender Strahlung bei der Anwendung am Menschen, schreibt für kosmetische Behandlungen mit Laser und IPL eine nachgewiesene Fachkunde vor. In unseren Studios behandelt NiSV-zertifiziertes Fachpersonal.",
      },
      { type: "h2", text: "Worauf sollten Sie bei der Wahl achten?" },
      {
        type: "list",
        items: [
          "Beratung vorab: Ein seriöses Studio schaut sich Haut und Haar an, bevor es behandelt.",
          "Zertifiziertes Personal: Fragen Sie nach der Fachkunde nach NiSV.",
          "Moderne Technik: Mehrere Wellenlängen und eine gute Kühlung machen die Behandlung genauer und angenehmer.",
          "Ehrliche Aussagen: Seriöse Anbieter nennen realistische Sitzungszahlen, statt ein perfektes Ergebnis nach wenigen Terminen zu versprechen.",
        ],
      },
      {
        type: "p",
        text: "Welche Wellenlänge und Intensität zu Ihrer Haut passt, klären wir vor der ersten Sitzung im Studio. Wie viele Termine Sie ungefähr einplanen sollten, lesen Sie in unserem Ratgeber [Wie viele Sitzungen braucht die Laser-Haarentfernung?](/ratgeber/wie-viele-sitzungen-laser-haarentfernung)",
      },
    ],
    faq: [
      {
        q: "Ist IPL eine dauerhafte Haarentfernung?",
        a: "IPL kann den Haarwuchs deutlich reduzieren. Weil das Licht weniger gezielt wirkt, braucht es aber meist mehr Anwendungen, und Heimgeräte müssen regelmäßig wiederholt werden. Für ein langfristiges Ergebnis gilt der Laser als das gezieltere Verfahren.",
      },
      {
        q: "Tut Laser mehr weh als IPL?",
        a: "Das Empfinden ist individuell. Entscheidend sind vor allem die Einstellung und die Kühlung. Unser Laser kühlt die Haut mit einer Kontaktkühlung bis −15 °C, die meisten spüren nur ein leichtes Kribbeln. Mehr dazu lesen Sie in unserem Ratgeber [Tut Laser-Haarentfernung weh?](/ratgeber/tut-laser-haarentfernung-weh)",
      },
      {
        q: "Kann ich von IPL zum Laser wechseln?",
        a: "Ja, das ist in der Regel problemlos möglich. Erzählen Sie uns im Beratungsgespräch einfach, welche Behandlungen Sie schon hatten. Wichtig ist, dass Sie vor der Laserbehandlung nur rasieren und nicht wachsen oder epilieren.",
      },
    ],
  },

  "laser-haarentfernung-dunkle-haut": {
    title: "Laser-Haarentfernung bei dunkler Haut: Was ist möglich?",
    metaTitle: "Laser-Haarentfernung bei dunkler Haut",
    description:
      "Laser-Haarentfernung bei dunkler Haut: welche Wellenlänge geeignet ist, worauf es bei Hauttyp und Kühlung ankommt und warum die Beratung vorab zählt.",
    excerpt:
      "Dunklere Haut braucht bei der Laser-Haarentfernung besondere Sorgfalt. Welche Wellenlänge sich eignet und warum die Beratung vorab so wichtig ist.",
    crumb: "Dunkle Haut",
    imageAlt: "Porträt einer Frau mit dunkler Haut im Profil vor warmem, sandfarbenem Hintergrund",
    intro:
      "Viele Menschen mit dunklerer Haut haben gehört, dass eine Laser-Haarentfernung für sie nicht infrage kommt. Moderne Laser mit mehreren Wellenlängen machen eine Behandlung heute jedoch in vielen Fällen möglich, sofern sie sorgfältig geplant wird. Hier erklären wir, worauf es ankommt und was Sie realistisch erwarten können.",
    answer:
      "Laser-Haarentfernung ist bei dunkler Haut häufig möglich, braucht aber besondere Sorgfalt. Weil dunkle Haut selbst viel Pigment enthält, nimmt sie einen Teil der Lichtenergie auf. Entscheidend sind deshalb eine passende Wellenlänge wie 1064 nm (Nd:YAG), eine angepasste Intensität und eine gute Kühlung. Ob Ihre Haut geeignet ist, klären wir im Beratungsgespräch.",
    blocks: [
      { type: "h2", text: "Warum braucht dunkle Haut besondere Sorgfalt?" },
      {
        type: "p",
        text: "Die Laser-Haarentfernung wirkt über das Pigment Melanin: Das Laserlicht wird vom dunklen Pigment im Haar aufgenommen und in Wärme umgewandelt. Dunklere Haut enthält jedoch auch selbst mehr Melanin.",
      },
      {
        type: "p",
        text: "Deshalb nimmt sie ebenfalls einen Teil der Lichtenergie auf. Ist die Einstellung nicht passend, kann das die Haut reizen, im ungünstigen Fall mit vorübergehenden hellen oder dunklen Flecken. Bei dunklerer Haut kommt es deshalb besonders auf die richtige Wellenlänge, eine angepasste Intensität und eine gute Kühlung an.",
      },
      { type: "h2", text: "Welche Hauttypen gibt es?" },
      {
        type: "p",
        text: "Fachleute ordnen die Haut meist nach der Fitzpatrick-Skala ein. Sie beschreibt sechs Hauttypen, von sehr heller Haut, die schnell einen Sonnenbrand bekommt, bis zu sehr dunkler Haut, die kaum verbrennt.",
      },
      {
        type: "table",
        caption: "Hauttypen nach Fitzpatrick",
        head: ["Hauttyp", "Beschreibung"],
        rows: [
          ["I und II", "Sehr helle bis helle Haut, bräunt kaum und bekommt schnell einen Sonnenbrand"],
          ["III und IV", "Mittlere bis olivfarbene Haut, bräunt gut"],
          ["V und VI", "Dunkelbraune bis sehr dunkle Haut, bekommt selten einen Sonnenbrand"],
        ],
      },
      {
        type: "p",
        text: "Die besten Ergebnisse erzielen wir bei hellen bis mittleren Hauttypen mit dunklerem Haar. Bei den Hauttypen V und VI ist eine Behandlung häufig ebenfalls möglich, braucht aber eine besonders sorgfältige Einschätzung.",
      },
      { type: "h2", text: "Welcher Laser eignet sich für dunkle Haut?" },
      {
        type: "p",
        text: "Längere Wellenlängen dringen tiefer in die Haut ein und werden von den oberen Hautschichten weniger stark aufgenommen. Die Wellenlänge von 1064 nm (Nd:YAG) gilt deshalb als gängige Wahl für dunklere Hauttypen: Sie erreicht die Haarwurzel, während die Hautoberfläche weniger Energie abbekommt.",
      },
      {
        type: "p",
        text: "Unser SG XLaser Pro verfügt neben 755, 808 und 955 nm auch über diese Wellenlänge. Die Kontaktkühlung bis −15 °C schützt die Hautoberfläche zusätzlich während der Behandlung. Mehr über die verschiedenen Laserarten lesen Sie in unserem Ratgeber [Laser oder IPL](/ratgeber/laser-oder-ipl).",
      },
      { type: "h2", text: "Wie läuft die Behandlung bei dunkler Haut ab?" },
      {
        type: "steps",
        items: [
          "Beratung: Wir schauen uns Haut und Haar an und fragen nach Hautreaktionen, die Sie von sich kennen.",
          "Einstellung: Wellenlänge, Intensität und Pulsdauer stimmen wir auf Ihren Hauttyp ab.",
          "Test: Oft ist es sinnvoll, zunächst eine kleine Stelle zu behandeln und die Reaktion der Haut abzuwarten.",
          "Behandlung: Danach behandeln wir die ganze Zone, mit gekühltem Handstück und in Ihrem Tempo.",
        ],
      },
      { type: "h2", text: "Was können Sie realistisch erwarten?" },
      {
        type: "p",
        text: "Ehrlich gesagt: Bei dunkler Haut wählen wir die Einstellungen oft vorsichtiger. Das kann bedeuten, dass es einige Sitzungen mehr braucht als bei hellerer Haut. Auch das Haar spielt eine Rolle: Dunkles, kräftiges Haar spricht gut an, sehr helles oder feines Haar weniger.",
      },
      {
        type: "p",
        text: "Ob und wie wir Ihre Haut behandeln, entscheiden wir erst nach einem persönlichen Beratungsgespräch. Wie viele Termine üblich sind, lesen Sie in unserem Ratgeber [Wie viele Sitzungen braucht die Laser-Haarentfernung?](/ratgeber/wie-viele-sitzungen-laser-haarentfernung)",
      },
      { type: "h2", text: "So bereiten Sie dunkle Haut auf die Behandlung vor" },
      {
        type: "list",
        items: [
          "Meiden Sie zwei Wochen vor der Behandlung Sonnenbäder und Solarium. Frisch gebräunte Haut enthält mehr Pigment.",
          "Verzichten Sie in dieser Zeit auch auf Selbstbräuner.",
          "Rasieren Sie die Zone am Tag vorher, und verzichten Sie auf Zupfen oder Wachsen.",
          "Erzählen Sie uns von Hautreaktionen, die Sie von sich kennen, etwa dunklen Flecken nach kleinen Verletzungen.",
        ],
      },
      {
        type: "p",
        text: "Alle Punkte im Überblick finden Sie in unserem Ratgeber zur [Vorbereitung auf die Laser-Haarentfernung](/ratgeber/vorbereitung-laser-haarentfernung).",
      },
      {
        type: "note",
        title: "Gut zu wissen",
        text: "Nach der Behandlung ist Sonnenschutz besonders wichtig. Schützen Sie die behandelte Zone in den folgenden Tagen konsequent vor starker Sonne, am besten mit hohem Lichtschutzfaktor.",
      },
    ],
    faq: [
      {
        q: "Ist Laser-Haarentfernung auch bei sehr dunkler Haut möglich?",
        a: "Häufig ja, mit einer passenden Wellenlänge wie 1064 nm und angepassten Einstellungen. Ob es in Ihrem Fall sinnvoll ist, klären wir vorab im persönlichen Beratungsgespräch.",
      },
      {
        q: "Kann der Laser dunkle Flecken verursachen?",
        a: "Bei unpassender Einstellung kann die Haut mit vorübergehenden Pigmentveränderungen reagieren. Deshalb stimmen wir Wellenlänge und Intensität sorgfältig auf Ihren Hauttyp ab und kühlen die Haut während der Behandlung.",
      },
      {
        q: "Funktioniert der Laser bei dunkler Haut und hellem Haar?",
        a: "Leider kaum. Der Laser braucht Pigment im Haar, um wirken zu können. Sehr helles, graues oder weißes Haar enthält zu wenig davon, und zwar unabhängig vom Hauttyp.",
      },
    ],
  },

  "vorbereitung-laser-haarentfernung": {
    title: "Laser-Haarentfernung: So bereiten Sie sich richtig vor",
    metaTitle: "Vorbereitung auf die Laser-Haarentfernung",
    description:
      "Vorbereitung auf die Laser-Haarentfernung: rasieren statt wachsen, Sonne meiden, Haut reinigen. Die Checkliste für vor, während und nach der Behandlung.",
    excerpt:
      "Mit ein paar einfachen Schritten holen Sie das Beste aus jeder Sitzung heraus. Die Checkliste für vor, während und nach der Laser-Haarentfernung.",
    crumb: "Vorbereitung",
    imageAlt: "Rasierer, Handtuch und ein Glas Wasser auf einer Ablage aus Travertin im Morgenlicht",
    intro:
      "Eine gute Vorbereitung macht die Laser-Haarentfernung angenehmer und das Ergebnis besser. Die meisten Punkte sind schnell erledigt, einige sollten Sie aber schon ein paar Wochen vor dem Termin im Blick haben. Hier finden Sie alles, was vor, während und nach der Behandlung wichtig ist.",
    answer:
      "Zur Vorbereitung auf die Laser-Haarentfernung rasieren Sie die Zone am Tag vorher glatt und meiden zwei Wochen lang Sonnenbäder und Solarium. Zupfen, Wachsen und Epilieren sind während der Behandlungsreihe tabu, weil der Laser die Haarwurzel braucht. Informieren Sie uns vorab über Medikamente und kürzlich erhaltene Impfungen, und entfernen Sie bei Gesichtsbehandlungen das Make-up vollständig.",
    blocks: [
      { type: "h2", text: "Checkliste: Was Sie vor der Behandlung beachten sollten" },
      {
        type: "steps",
        items: [
          "Zwei Wochen vorher: Sonnenbäder und Solarium meiden und auch auf Selbstbräuner verzichten.",
          "Während der ganzen Behandlungsreihe: nur rasieren, nicht zupfen, wachsen oder epilieren.",
          "Vor dem Termin: uns über Medikamente und kürzlich erhaltene Impfungen informieren. Bei Bedarf ärztliche Rücksprache halten oder den Termin verschieben.",
          "Am Tag vorher: die Zone glatt rasieren.",
          "Am Behandlungstag: die Haut reinigen und keine Creme, kein Deo und kein Make-up auf die Zone auftragen.",
        ],
      },
      { type: "h2", text: "Warum rasieren und nicht wachsen?" },
      {
        type: "p",
        text: "Der Laser braucht die Haarwurzel, um wirken zu können. Beim Rasieren bleibt sie in der Haut, beim Zupfen, Wachsen oder Epilieren wird sie dagegen mit herausgezogen. Dann findet das Laserlicht kein Ziel mehr.",
      },
      {
        type: "p",
        text: "Rasieren Sie deshalb während der gesamten Behandlungsreihe, und verzichten Sie auf Methoden, die das Haar mitsamt Wurzel entfernen.",
      },
      { type: "h3", text: "Warum am Tag vorher?" },
      {
        type: "p",
        text: "Frisch rasierte Haut ist oft noch etwas gereizt. Rasieren Sie am Vortag, dann hat sich die Haut bis zum Termin beruhigt. Stehen die Haare dagegen zu lang über der Haut, wird ein Teil der Energie schon an der Oberfläche frei, statt in der Wurzel zu wirken. Das ist weniger wirksam und fühlt sich unangenehmer an.",
      },
      { type: "h2", text: "Warum spielt die Sonne eine Rolle?" },
      {
        type: "p",
        text: "Gebräunte Haut enthält mehr Pigment und nimmt dadurch mehr Lichtenergie auf. Das kann die Haut unnötig belasten. Meiden Sie deshalb zwei Wochen vor jeder Sitzung Sonnenbäder und Solarium, und planen Sie Ihre Termine mit etwas Abstand zum Urlaub.",
      },
      {
        type: "p",
        text: "Warum das bei dunklerer Haut besonders wichtig ist, lesen Sie in unserem Ratgeber zur [Laser-Haarentfernung bei dunkler Haut](/ratgeber/laser-haarentfernung-dunkle-haut).",
      },
      { type: "h2", text: "Was Sie uns vorab sagen sollten" },
      {
        type: "list",
        items: [
          "Medikamente, die Sie einnehmen, vor allem solche, die die Haut lichtempfindlicher machen können",
          "Eine Schwangerschaft oder Stillzeit",
          "Hauterkrankungen, Allergien oder frische Verletzungen in der Behandlungszone",
          "Tattoos oder auffällige Muttermale in der Zone, denn diese Stellen werden bei der Behandlung ausgespart",
        ],
      },
      { type: "p", text: "So können wir die Behandlung sicher planen und bei Bedarf anpassen." },
      { type: "h2", text: "Was passiert während der Sitzung?" },
      {
        type: "p",
        text: "Vor der ersten Behandlung besprechen wir mit Ihnen Haut, Haar und Ihre Wünsche. Während der Sitzung tragen Sie eine Schutzbrille, und das gekühlte Handstück wird Stück für Stück über die Zone geführt. Die meisten Kundinnen und Kunden spüren dabei nur ein leichtes Kribbeln.",
      },
      {
        type: "p",
        text: "Wie lange eine Sitzung dauert, hängt von der Zone ab: Kleine Bereiche wie das Gesicht gehen schnell, große wie die Beine dauern länger. Rechnen Sie mit 30 bis 75 Minuten. Wie sich die Behandlung genau anfühlt, lesen Sie in unserem Ratgeber [Tut Laser-Haarentfernung weh?](/ratgeber/tut-laser-haarentfernung-weh)",
      },
      { type: "h2", text: "Nach der Behandlung: So pflegen Sie Ihre Haut" },
      {
        type: "list",
        items: [
          "Leichte Rötungen oder ein Wärmegefühl sind normal und klingen meist nach wenigen Stunden ab.",
          "Schützen Sie die behandelte Zone in den folgenden Tagen vor starker Sonne, am besten mit hohem Lichtschutzfaktor.",
          "Verzichten Sie am Behandlungstag auf Sauna, Solarium und sehr heißes Baden.",
          "Nach einer Behandlung der Achseln lassen Sie das Deo am besten bis zum nächsten Tag weg.",
          "In den ein bis drei Wochen nach der Sitzung fallen die behandelten Haare nach und nach aus. Helfen Sie dabei nicht mit Zupfen nach.",
        ],
      },
      {
        type: "note",
        title: "Unser Tipp",
        text: "Rasieren, Sonne meiden, Haut sauber halten: Mit diesen drei Punkten sind Sie gut auf Ihren Termin vorbereitet. Wenn Sie unsicher sind, melden Sie sich jederzeit in Ihrem [Studio](/standorte).",
      },
    ],
    faq: [
      {
        q: "Wann sollte ich mich vor der Laser-Haarentfernung rasieren?",
        a: "Am besten am Tag vor der Behandlung. So ist die Zone glatt, und die Haut hat sich bis zum Termin wieder beruhigt.",
      },
      {
        q: "Darf ich vor der Laser-Haarentfernung Deo benutzen?",
        a: "Am Behandlungstag sollte die Zone sauber und frei von Deo, Cremes und Make-up sein. Rückstände auf der Haut können die Behandlung beeinträchtigen.",
      },
      {
        q: "Darf ich während der Behandlungsreihe in die Sonne?",
        a: "Meiden Sie zwei Wochen vor jeder Sitzung Sonnenbäder und Solarium, und schützen Sie die behandelte Haut danach mit hohem Lichtschutzfaktor. Normales Tageslicht im Alltag ist in der Regel kein Problem.",
      },
    ],
  },

  "tut-laser-haarentfernung-weh": {
    title: "Tut Laser-Haarentfernung weh?",
    metaTitle: "Tut Laser-Haarentfernung weh?",
    description:
      "Tut Laser-Haarentfernung weh? Die meisten spüren nur ein leichtes Kribbeln. Welche Zonen empfindlicher sind und wie Kühlung die Sitzung angenehm macht.",
    excerpt:
      "Die meisten spüren nur ein leichtes Kribbeln. Wie sich die Behandlung anfühlt, welche Zonen empfindlicher sind und was die Sitzung angenehm macht.",
    crumb: "Schmerzempfinden",
    imageAlt: "Entspannte Frau liegt mit geschlossenen Augen auf einer Behandlungsliege",
    intro:
      "Viele, die über eine dauerhafte Haarentfernung nachdenken, fragen sich zuerst: Wie fühlt sich das an, und tut es weh? Die gute Nachricht: Die meisten Kundinnen und Kunden spüren nur ein leichtes Kribbeln. Hier erklären wir, woher das Gefühl kommt, welche Zonen empfindlicher sind und was Sie selbst tun können, damit die Sitzung angenehm bleibt.",
    answer:
      "Laser-Haarentfernung tut in der Regel kaum weh: Die meisten Kundinnen und Kunden spüren nur ein leichtes Kribbeln oder ein kurzes, warmes Pieksen, wenn der Laser auslöst. Etwas empfindlicher sind Zonen mit dünner Haut oder kräftigem Haarwuchs, etwa die Bikinizone. Eine Kontaktkühlung bis −15 °C und eine angepasste Intensität machen die Sitzung zusätzlich angenehmer.",
    blocks: [
      { type: "h2", text: "Wie fühlt sich Laser-Haarentfernung an?" },
      {
        type: "p",
        text: "Beim Auslösen des Lasers entsteht in der Haarwurzel kurz Wärme. Auf der Haut fühlt sich das wie ein leichtes Kribbeln oder ein kurzes, warmes Pieksen an. Viele vergleichen es mit dem Schnipsen eines Gummibands.",
      },
      {
        type: "p",
        text: "Das Gefühl dauert nur einen Augenblick. Wie deutlich man es spürt, ist individuell und hängt auch von der Zone ab.",
      },
      { type: "h2", text: "Welche Zonen sind empfindlicher?" },
      {
        type: "p",
        text: "Bereiche mit dünner Haut oder kräftigem, dichtem Haarwuchs nimmt man meist etwas deutlicher wahr. Dort sitzt viel Pigment auf engem Raum, und entsprechend mehr Energie wird in Wärme umgewandelt.",
      },
      {
        type: "table",
        caption: "Empfinden nach Körperzone",
        head: ["Körperzone", "Empfinden (Richtwert)"],
        rows: [
          ["Beine, Arme und Rücken", "eher gering"],
          ["Achseln", "mittel"],
          ["Oberlippe und Kinn", "etwas deutlicher"],
          ["Bikinizone und Intimbereich", "etwas deutlicher"],
        ],
      },
      {
        type: "p",
        text: "In empfindlichen Bereichen behandeln wir mit gekühltem Handstück und angepasster Intensität, diskret und in Ihrem Tempo.",
      },
      { type: "h2", text: "Was macht die Behandlung angenehmer?" },
      {
        type: "list",
        items: [
          "Kontaktkühlung: Der SG XLaser Pro kühlt die Haut während der Behandlung auf bis zu −15 °C.",
          "Angepasste Intensität: Für empfindliche Bereiche wie die Bikinizone stimmen wir die Intensität individuell ab.",
          "Glatt rasierte Haut: Stehen Haare über der Haut, wird ein Teil der Energie an der Oberfläche frei, und das fühlt sich unangenehmer an.",
          "Ruhige Atmosphäre: Wir nehmen uns Zeit, erklären jeden Schritt und arbeiten in Ihrem Tempo.",
        ],
      },
      { type: "h2", text: "Wird es mit jeder Sitzung angenehmer?" },
      {
        type: "p",
        text: "In der Regel ja. Mit jeder Sitzung wachsen weniger und feinere Haare nach. Weniger Pigment bedeutet auch weniger Wärme in der Haut, deshalb empfinden viele die späteren Termine als deutlich angenehmer als die ersten.",
      },
      { type: "h2", text: "Was Sie selbst tun können" },
      {
        type: "list",
        items: [
          "Rasieren Sie die Zone am Tag vor der Behandlung glatt.",
          "Legen Sie Termine für empfindliche Zonen möglichst nicht in die Tage kurz vor oder während Ihrer Periode. Viele empfinden die Haut dann als empfindlicher.",
          "Sagen Sie uns sofort, wenn Ihnen etwas unangenehm ist. Wir passen die Einstellung dann an.",
        ],
      },
      {
        type: "p",
        text: "Alle weiteren Tipps finden Sie in unserem Ratgeber zur [Vorbereitung auf die Laser-Haarentfernung](/ratgeber/vorbereitung-laser-haarentfernung).",
      },
      { type: "h2", text: "Und nach der Behandlung?" },
      {
        type: "p",
        text: "Direkt nach der Sitzung kann die Haut leicht gerötet oder warm sein, manchmal zeigen sich kleine Schwellungen rund um die Haarwurzeln. Das ist eine normale Reaktion und klingt in der Regel nach wenigen Stunden ab. Schützen Sie die behandelte Zone in den folgenden Tagen vor starker Sonne.",
      },
      {
        type: "note",
        title: "Gut zu wissen",
        text: "Das Empfinden ist sehr individuell. Wenn Sie unsicher sind, besprechen Sie Ihre Fragen einfach vor der ersten Sitzung mit uns. Wir erklären Ihnen jeden Schritt, bevor es losgeht.",
      },
      {
        type: "p",
        text: "Möchten Sie es selbst ausprobieren? Ihren Termin buchen Sie in einem unserer [Studios](/standorte).",
      },
    ],
    faq: [
      {
        q: "Ist Laser-Haarentfernung im Intimbereich schmerzhaft?",
        a: "Die Bikinizone und der Intimbereich gehören zu den empfindlicheren Zonen. Mit Kontaktkühlung und angepasster Intensität empfinden die meisten die Behandlung aber als gut auszuhalten. Wir arbeiten dort besonders behutsam und in Ihrem Tempo.",
      },
      {
        q: "Tut Laser mehr weh als Waxing?",
        a: "Viele empfinden die Laserbehandlung als angenehmer als Waxing, weil der Impuls nur kurz ist und die Haut dabei gekühlt wird. Das Empfinden bleibt aber individuell.",
      },
      {
        q: "Brauche ich eine Betäubungscreme?",
        a: "In der Regel nicht. Die Kontaktkühlung bis −15 °C macht die Behandlung für die meisten gut erträglich. Wenn Sie besonders empfindlich sind, sprechen Sie uns vorab an.",
      },
    ],
  },
};

const EN: Record<ArticleSlug, ArticleCopy> = {
  "wie-viele-sitzungen-laser-haarentfernung": {
    title: "How many sessions does laser hair removal take?",
    metaTitle: "Laser hair removal: how many sessions?",
    description:
      "How many sessions does laser hair removal take? Usually 8 to 12, a few weeks apart. What the number depends on and when you will see results.",
    excerpt:
      "Generally 8 to 12 sessions are needed. Why it takes several appointments, how much time lies between them and what the exact number depends on.",
    crumb: "Number of sessions",
    imageAlt: "A gloved specialist treating a client's leg with the laser handpiece",
    intro:
      "“How often do I need to come until my skin stays smooth?” We hear this question in our studios almost every day. Understandably, because before permanent hair removal you want to know what you are signing up for. Here we explain why one session is not enough, what the number of sessions depends on and when you can expect visible results.",
    answer:
      "Permanent laser hair removal generally takes 8 to 12 sessions. The reason is the hair growth cycle: the laser only works on hairs that are actively growing. That is why appointments are a few weeks apart. Exactly how many sessions you need depends on hair thickness, skin type and body area.",
    blocks: [
      { type: "h2", text: "Why is one session not enough?" },
      {
        type: "p",
        text: "The laser light is absorbed by the pigment in the hair, melanin, and turned into heat. From about 68 °C the proteins in the hair follicle are destroyed, so the root can no longer grow a new hair.",
      },
      {
        type: "p",
        text: "However, this only works while the hair is firmly attached to its root. And that is only the case in one particular phase of hair growth.",
      },
      { type: "h3", text: "The three phases of hair growth" },
      {
        type: "list",
        items: [
          "Growth phase (anagen): the hair is firmly attached to the root and contains plenty of pigment. Only now can the laser reach the root effectively.",
          "Transition phase (catagen): the hair detaches from the root. Hardly any of the laser's energy arrives there.",
          "Resting phase (telogen): the hair falls out and the root rests. Then a new cycle begins.",
        ],
      },
      {
        type: "p",
        text: "At any time, only some of your hairs are in the growth phase. Each session catches exactly that share. Only over several appointments is every hair reached once at the right moment.",
      },
      { type: "h2", text: "How many sessions are needed?" },
      {
        type: "p",
        text: "Generally 8 to 12 sessions are needed. This range applies to most body areas and hair types. Some people are happy after fewer appointments, others need a little more patience.",
      },
      { type: "h2", text: "What does the number of sessions depend on?" },
      {
        type: "list",
        items: [
          "Hair colour and thickness: strong, dark hair absorbs the light particularly well. Very light or fine hair responds less well.",
          "Skin type: it decides which wavelength and intensity we use. We achieve the best results on light to medium skin types.",
          "Body area: every area has its own hair growth. The face often needs more appointments than the legs.",
          "Hormones: hormonal changes, for example during menopause, can stimulate new hair.",
          "Regularity: keeping to the recommended intervals means hairs are caught at the right moment.",
        ],
      },
      {
        type: "p",
        text: "We assess which factors apply to you in a personal conversation before the first treatment. If you have darker skin, also read our guide to [laser hair removal on darker skin](/ratgeber/laser-haarentfernung-dunkle-haut).",
      },
      { type: "h2", text: "How much time lies between sessions?" },
      {
        type: "p",
        text: "The intervals follow the hair cycle of each body area. Hair on the face grows back faster than on the legs, so appointments there are closer together.",
      },
      {
        type: "table",
        caption: "Typical intervals between sessions",
        head: ["Body area", "Typical interval"],
        rows: [
          ["Face", "about 4 to 6 weeks"],
          ["Underarms, arms and bikini line", "about 6 to 8 weeks"],
          ["Legs and back", "about 8 to 10 weeks"],
        ],
      },
      {
        type: "p",
        text: "These are guide values; we set the right rhythm for your area in the studio. If you come too early, too few hairs are in the growth phase yet. The whole course of treatment therefore usually spans many months, often a year or a little longer.",
      },
      { type: "h2", text: "When will you see results?" },
      {
        type: "p",
        text: "Often after the first appointments: hair grows back sparser and finer, and the gaps between shaves get longer. In the one to three weeks after a session, the treated hairs gradually fall out. This is normal and a good sign.",
      },
      {
        type: "p",
        text: "With every further session, hair growth becomes noticeably less. By the end of the course, usually only a few fine hairs remain.",
      },
      { type: "h2", text: "How lasting is the result?" },
      {
        type: "p",
        text: "The results are long-term. Because hormonal changes, for example, can stimulate new hair, we recommend a top-up about once a year. That keeps your skin smooth in the long run.",
      },
      {
        type: "note",
        title: "Our tip",
        text: "Plan the course of treatment with the calendar in mind: avoid sunbathing and sunbeds for two weeks before each session. If you start in autumn or winter, you are often well along by summer.",
      },
      { type: "h2", text: "Conclusion: patience pays off" },
      {
        type: "p",
        text: "Permanent hair removal is not a single appointment but a course of usually 8 to 12 sessions. If you keep to the intervals and prepare well, you often see clear progress after just a few appointments. Read how in our guide to [preparing for laser hair removal](/ratgeber/vorbereitung-laser-haarentfernung).",
      },
      {
        type: "p",
        text: "We are happy to discuss in person at one of our [studios](/standorte) how many sessions you are likely to need.",
      },
    ],
    faq: [
      {
        q: "Are 6 sessions of laser hair removal enough?",
        a: "For some areas and hair types, clear results are visible after six sessions. For a smooth result in the long term, however, 8 to 12 sessions are generally needed.",
      },
      {
        q: "Can I shorten the intervals to finish sooner?",
        a: "Unfortunately that does not help. As long as only a few new hairs are in the growth phase, the laser can only catch a few. The recommended intervals are therefore the fastest way to your goal.",
      },
      {
        q: "What happens if I miss a session?",
        a: "Nothing serious. Simply book a new appointment soon. If a session takes place much later than planned, the course of treatment may take a little longer.",
      },
      {
        q: "How long does a single session take?",
        a: "That depends on the size of the area. Small areas like the face are quick, large ones like the legs or back take longer. Allow 30 to 75 minutes.",
      },
    ],
  },

  "laser-oder-ipl": {
    title: "Laser or IPL: what is the difference?",
    metaTitle: "Laser or IPL: what is the difference?",
    description:
      "Laser or IPL for hair removal? Both work with light, but differently. The differences at a glance and what to look for when choosing.",
    excerpt:
      "Both methods work with light, but in very different ways. What sets laser and IPL apart and what to look for when choosing.",
    crumb: "Laser or IPL",
    imageAlt: "A white hair removal handpiece resting on a linen cloth",
    intro:
      "Anyone reading up on permanent hair removal soon comes across two terms: laser and IPL. Both use light to weaken the hair root and are often mentioned in the same breath. How they work and what they achieve, however, differs considerably. Here you will learn what is behind the two methods and what to look for when choosing.",
    answer:
      "The main difference between laser and IPL lies in the light: a laser works with one precisely defined wavelength whose energy acts in a focused way on the pigment in the hair. IPL, by contrast, emits a broad spectrum of light that acts less precisely. For permanent hair removal, laser is therefore considered the more precise method.",
    blocks: [
      { type: "h2", text: "What is IPL?" },
      {
        type: "p",
        text: "IPL stands for intense pulsed light. A flash lamp emits a broad spectrum of wavelengths that filters only roughly narrow down. The energy is spread across many wavelengths, of which only some are absorbed specifically by the pigment in the hair.",
      },
      {
        type: "p",
        text: "IPL devices also exist for home use. They work at much lower power and are therefore usually used regularly over a longer period.",
      },
      { type: "h2", text: "How does laser hair removal work?" },
      {
        type: "p",
        text: "A laser produces light of one precisely defined wavelength. This energy is focused and absorbed specifically by the pigment in the hair. There it creates heat that damages the hair root so that it no longer grows a new hair.",
      },
      {
        type: "p",
        text: "Because the energy is concentrated on one wavelength, it can be tailored precisely to skin and hair. The surrounding tissue is largely spared.",
      },
      { type: "h2", text: "What types of laser are there?" },
      {
        type: "p",
        text: "Three types of laser are mainly used for hair removal. They differ in wavelength and therefore in how deeply the light penetrates and which skin and hair types it suits.",
      },
      {
        type: "list",
        items: [
          "Alexandrite laser (755 nm): its light is absorbed very strongly by pigment. It is best suited to light skin and finer hair.",
          "Diode laser (808 nm): it is considered the versatile standard of laser hair removal and suits many skin and hair types.",
          "Nd:YAG laser (1064 nm): its light penetrates deepest and is absorbed least by the skin surface. It is therefore a common choice for darker skin types.",
        ],
      },
      {
        type: "p",
        text: "Our SG XLaser Pro combines four wavelengths in one device: 755 nm (alexandrite), 808 nm (diode), 955 nm as a complementary wavelength and 1064 nm (Nd:YAG). This lets us tailor the treatment to different skin and hair types. Its built-in contact cooling down to −15 °C cools the skin and makes the session noticeably more comfortable.",
      },
      { type: "h2", text: "Laser and IPL compared" },
      {
        type: "table",
        caption: "Laser and IPL compared",
        head: ["Feature", "Laser", "IPL"],
        rows: [
          ["Light", "One precisely defined wavelength", "Broad spectrum of light"],
          ["Effect", "Focused, targeting the pigment in the hair", "Spread across many wavelengths, less targeted"],
          ["Adjustment", "Wavelength and intensity can be matched precisely to skin and hair", "Only roughly adjustable with filters"],
          ["Darker skin", "Often possible with a suitable wavelength such as 1064 nm", "Usually less suitable"],
        ],
      },
      { type: "h2", text: "Is laser better than IPL?" },
      {
        type: "p",
        text: "Both methods can reduce hair growth. The laser, however, works more precisely and can be matched more closely to your skin and hair. For permanent hair removal we therefore rely on modern laser technology.",
      },
      {
        type: "p",
        text: "Who operates the device matters at least as much as the device itself. The NiSV, the German regulation on protection against non-ionising radiation used on people, requires proven expertise for cosmetic treatments with laser and IPL. In our studios, NiSV-certified specialists carry out the treatment.",
      },
      { type: "h2", text: "What should you look for when choosing?" },
      {
        type: "list",
        items: [
          "Consultation first: a reputable studio looks at your skin and hair before treating.",
          "Certified staff: ask about expertise under the NiSV.",
          "Modern technology: several wavelengths and good cooling make treatment more precise and more comfortable.",
          "Honest statements: reputable providers give realistic session numbers instead of promising a perfect result after a few appointments.",
        ],
      },
      {
        type: "p",
        text: "We decide which wavelength and intensity suit your skin in the studio before the first session. Read how many appointments to plan for in our guide [How many sessions does laser hair removal take?](/ratgeber/wie-viele-sitzungen-laser-haarentfernung)",
      },
    ],
    faq: [
      {
        q: "Is IPL permanent hair removal?",
        a: "IPL can reduce hair growth considerably. Because the light acts less precisely, it usually needs more applications, and home devices have to be used again regularly. For a long-term result, laser is considered the more targeted method.",
      },
      {
        q: "Does laser hurt more than IPL?",
        a: "How it feels varies from person to person. What matters most is the setting and the cooling. Our laser cools the skin with contact cooling down to −15 °C, and most people feel only a slight tingling. Read more in our guide [Does laser hair removal hurt?](/ratgeber/tut-laser-haarentfernung-weh)",
      },
      {
        q: "Can I switch from IPL to laser?",
        a: "Yes, that is usually no problem. Simply tell us in the consultation which treatments you have had. What matters is that you only shave before laser treatment, and do not wax or epilate.",
      },
    ],
  },

  "laser-haarentfernung-dunkle-haut": {
    title: "Laser hair removal on darker skin: what is possible?",
    metaTitle: "Laser hair removal on darker skin",
    description:
      "Laser hair removal on darker skin: which wavelength is suitable, what matters for skin type and cooling, and why the consultation beforehand counts.",
    excerpt:
      "Darker skin needs particular care in laser hair removal. Which wavelength is suitable and why the consultation beforehand is so important.",
    crumb: "Darker skin",
    imageAlt: "Profile portrait of a woman with dark skin against a warm, sand-coloured background",
    intro:
      "Many people with darker skin have heard that laser hair removal is not an option for them. Today, however, modern lasers with several wavelengths make treatment possible in many cases, provided it is carefully planned. Here we explain what matters and what you can realistically expect.",
    answer:
      "Laser hair removal is often possible on darker skin, but it needs particular care. Because darker skin itself contains a lot of pigment, it absorbs part of the light energy. What matters is a suitable wavelength such as 1064 nm (Nd:YAG), adjusted intensity and good cooling. We clarify in a consultation whether your skin is suitable.",
    blocks: [
      { type: "h2", text: "Why does darker skin need particular care?" },
      {
        type: "p",
        text: "Laser hair removal works through the pigment melanin: the laser light is absorbed by the dark pigment in the hair and turned into heat. Darker skin, however, also contains more melanin itself.",
      },
      {
        type: "p",
        text: "It therefore also absorbs part of the light energy. With the wrong settings this can irritate the skin, in unfavourable cases with temporary light or dark patches. With darker skin, the right wavelength, adjusted intensity and good cooling matter all the more.",
      },
      { type: "h2", text: "What skin types are there?" },
      {
        type: "p",
        text: "Specialists usually classify skin using the Fitzpatrick scale. It describes six skin types, from very fair skin that burns quickly to very dark skin that hardly burns.",
      },
      {
        type: "table",
        caption: "Skin types according to Fitzpatrick",
        head: ["Skin type", "Description"],
        rows: [
          ["I and II", "Very fair to fair skin, hardly tans and burns quickly"],
          ["III and IV", "Medium to olive skin, tans well"],
          ["V and VI", "Dark brown to very dark skin, rarely burns"],
        ],
      },
      {
        type: "p",
        text: "We achieve the best results on light to medium skin types with darker hair. On skin types V and VI, treatment is often possible too, but it needs a particularly careful assessment.",
      },
      { type: "h2", text: "Which laser is suitable for darker skin?" },
      {
        type: "p",
        text: "Longer wavelengths penetrate deeper into the skin and are absorbed less by its upper layers. The 1064 nm wavelength (Nd:YAG) is therefore a common choice for darker skin types: it reaches the hair root while the skin surface receives less energy.",
      },
      {
        type: "p",
        text: "Besides 755, 808 and 955 nm, our SG XLaser Pro also has this wavelength. Contact cooling down to −15 °C additionally protects the skin surface during treatment. Read more about the different types of laser in our guide [Laser or IPL](/ratgeber/laser-oder-ipl).",
      },
      { type: "h2", text: "How does treatment on darker skin work?" },
      {
        type: "steps",
        items: [
          "Consultation: we look at your skin and hair and ask about any skin reactions you know you have.",
          "Settings: we match wavelength, intensity and pulse duration to your skin type.",
          "Test: it often makes sense to treat a small spot first and wait to see how the skin reacts.",
          "Treatment: we then treat the whole area, with a cooled handpiece and at your pace.",
        ],
      },
      { type: "h2", text: "What can you realistically expect?" },
      {
        type: "p",
        text: "To be honest: on darker skin we often choose more cautious settings. That can mean a few more sessions than on lighter skin. The hair plays a role too: dark, strong hair responds well, very light or fine hair less so.",
      },
      {
        type: "p",
        text: "We only decide whether and how to treat your skin after a personal consultation. Read how many appointments are usual in our guide [How many sessions does laser hair removal take?](/ratgeber/wie-viele-sitzungen-laser-haarentfernung)",
      },
      { type: "h2", text: "How to prepare darker skin for treatment" },
      {
        type: "list",
        items: [
          "Avoid sunbathing and sunbeds for two weeks before treatment. Freshly tanned skin contains more pigment.",
          "Also avoid self-tanner during this time.",
          "Shave the area the day before, and do not pluck or wax.",
          "Tell us about skin reactions you know you have, such as dark marks after small injuries.",
        ],
      },
      {
        type: "p",
        text: "You will find all the points at a glance in our guide to [preparing for laser hair removal](/ratgeber/vorbereitung-laser-haarentfernung).",
      },
      {
        type: "note",
        title: "Good to know",
        text: "Sun protection is especially important after treatment. Consistently protect the treated area from strong sun over the following days, ideally with a high sun protection factor.",
      },
    ],
    faq: [
      {
        q: "Is laser hair removal possible on very dark skin?",
        a: "Often yes, with a suitable wavelength such as 1064 nm and adjusted settings. We clarify in a personal consultation beforehand whether it makes sense in your case.",
      },
      {
        q: "Can the laser cause dark patches?",
        a: "With unsuitable settings, the skin can react with temporary changes in pigmentation. That is why we carefully match wavelength and intensity to your skin type and cool the skin during treatment.",
      },
      {
        q: "Does the laser work on darker skin with light hair?",
        a: "Unfortunately hardly. The laser needs pigment in the hair to work. Very light, grey or white hair contains too little of it, whatever the skin type.",
      },
    ],
  },

  "vorbereitung-laser-haarentfernung": {
    title: "Laser hair removal: how to prepare",
    metaTitle: "Preparing for laser hair removal",
    description:
      "Preparing for laser hair removal: shave instead of waxing, avoid the sun, clean the skin. The checklist for before, during and after treatment.",
    excerpt:
      "A few simple steps help you get the most out of every session. The checklist for before, during and after laser hair removal.",
    crumb: "Preparation",
    imageAlt: "A razor, a towel and a glass of water on a travertine shelf in morning light",
    intro:
      "Good preparation makes laser hair removal more comfortable and the result better. Most points are quickly done, but a few you should keep in mind a couple of weeks before your appointment. Here you will find everything that matters before, during and after treatment.",
    answer:
      "To prepare for laser hair removal, shave the area smooth the day before and avoid sunbathing and sunbeds for two weeks. Plucking, waxing and epilating are off limits during the course of treatment, because the laser needs the hair root. Tell us beforehand about any medication and recent vaccinations, and for facial treatments remove all make-up.",
    blocks: [
      { type: "h2", text: "Checklist: what to consider before treatment" },
      {
        type: "steps",
        items: [
          "Two weeks before: avoid sunbathing and sunbeds, and skip self-tanner too.",
          "Throughout the course of treatment: only shave; do not pluck, wax or epilate.",
          "Before your appointment: tell us about any medication and recent vaccinations. If necessary, check with your doctor or postpone the appointment.",
          "The day before: shave the area smooth.",
          "On the day: clean the skin and apply no cream, deodorant or make-up to the area.",
        ],
      },
      { type: "h2", text: "Why shave and not wax?" },
      {
        type: "p",
        text: "The laser needs the hair root in order to work. Shaving leaves it in the skin, whereas plucking, waxing or epilating pull it out. Then the laser light has nothing left to target.",
      },
      {
        type: "p",
        text: "So shave throughout the whole course of treatment, and avoid methods that remove the hair along with its root.",
      },
      { type: "h3", text: "Why the day before?" },
      {
        type: "p",
        text: "Freshly shaved skin is often still a little irritated. Shave the day before, and your skin will have calmed down by the appointment. If the hairs stand too long above the skin, on the other hand, part of the energy is released at the surface instead of working in the root. That is less effective and feels less comfortable.",
      },
      { type: "h2", text: "Why does the sun matter?" },
      {
        type: "p",
        text: "Tanned skin contains more pigment and so absorbs more light energy. That can put unnecessary strain on the skin. So avoid sunbathing and sunbeds for two weeks before every session, and plan your appointments with some distance to your holidays.",
      },
      {
        type: "p",
        text: "Read why this is especially important for darker skin in our guide to [laser hair removal on darker skin](/ratgeber/laser-haarentfernung-dunkle-haut).",
      },
      { type: "h2", text: "What you should tell us beforehand" },
      {
        type: "list",
        items: [
          "Medication you take, especially any that can make the skin more sensitive to light",
          "A pregnancy or breastfeeding",
          "Skin conditions, allergies or fresh injuries in the treatment area",
          "Tattoos or prominent moles in the area, as these spots are left out during treatment",
        ],
      },
      { type: "p", text: "This lets us plan the treatment safely and adjust it if needed." },
      { type: "h2", text: "What happens during the session?" },
      {
        type: "p",
        text: "Before the first treatment we discuss your skin, your hair and your wishes with you. During the session you wear protective goggles, and the cooled handpiece is guided over the area section by section. Most clients feel only a slight tingling.",
      },
      {
        type: "p",
        text: "How long a session takes depends on the area: small areas like the face are quick, large ones like the legs take longer. Allow 30 to 75 minutes. Read exactly what the treatment feels like in our guide [Does laser hair removal hurt?](/ratgeber/tut-laser-haarentfernung-weh)",
      },
      { type: "h2", text: "After treatment: how to care for your skin" },
      {
        type: "list",
        items: [
          "Slight redness or a feeling of warmth is normal and usually fades after a few hours.",
          "Protect the treated area from strong sun over the following days, ideally with a high sun protection factor.",
          "Avoid saunas, sunbeds and very hot baths on the day of treatment.",
          "After underarm treatment, it is best to skip deodorant until the next day.",
          "In the one to three weeks after the session, the treated hairs gradually fall out. Do not help them along by plucking.",
        ],
      },
      {
        type: "note",
        title: "Our tip",
        text: "Shave, avoid the sun, keep the skin clean: with these three points you are well prepared for your appointment. If you are unsure, contact your [studio](/standorte) at any time.",
      },
    ],
    faq: [
      {
        q: "When should I shave before laser hair removal?",
        a: "Ideally the day before treatment. That way the area is smooth and your skin has calmed down again by the appointment.",
      },
      {
        q: "Can I use deodorant before laser hair removal?",
        a: "On the day of treatment, the area should be clean and free of deodorant, creams and make-up. Residue on the skin can interfere with the treatment.",
      },
      {
        q: "Can I go in the sun during the course of treatment?",
        a: "Avoid sunbathing and sunbeds for two weeks before each session, and protect the treated skin afterwards with a high sun protection factor. Normal daylight in everyday life is usually not a problem.",
      },
    ],
  },

  "tut-laser-haarentfernung-weh": {
    title: "Does laser hair removal hurt?",
    metaTitle: "Does laser hair removal hurt?",
    description:
      "Does laser hair removal hurt? Most people feel only a slight tingling. Which areas are more sensitive and how cooling makes the session comfortable.",
    excerpt:
      "Most people feel only a slight tingling. What the treatment feels like, which areas are more sensitive and what makes the session comfortable.",
    crumb: "How it feels",
    imageAlt: "A relaxed woman lying on a treatment bed with her eyes closed",
    intro:
      "Many people thinking about permanent hair removal first wonder: what does it feel like, and does it hurt? The good news: most clients feel only a slight tingling. Here we explain where the sensation comes from, which areas are more sensitive and what you can do yourself to keep the session comfortable.",
    answer:
      "Laser hair removal usually hardly hurts: most clients feel only a slight tingling or a brief, warm prick when the laser fires. Areas with thin skin or strong hair growth, such as the bikini line, are a little more sensitive. Contact cooling down to −15 °C and adjusted intensity make the session even more comfortable.",
    blocks: [
      { type: "h2", text: "What does laser hair removal feel like?" },
      {
        type: "p",
        text: "When the laser fires, heat briefly builds up in the hair root. On the skin this feels like a slight tingling or a brief, warm prick. Many compare it to the snap of a rubber band.",
      },
      {
        type: "p",
        text: "The sensation lasts only a moment. How strongly you feel it varies from person to person and also depends on the area.",
      },
      { type: "h2", text: "Which areas are more sensitive?" },
      {
        type: "p",
        text: "Areas with thin skin or strong, dense hair growth are usually felt a little more clearly. There is a lot of pigment in a small space, so correspondingly more energy is turned into heat.",
      },
      {
        type: "table",
        caption: "Sensation by body area",
        head: ["Body area", "Sensation (guide value)"],
        rows: [
          ["Legs, arms and back", "rather mild"],
          ["Underarms", "moderate"],
          ["Upper lip and chin", "a little more noticeable"],
          ["Bikini line and intimate area", "a little more noticeable"],
        ],
      },
      {
        type: "p",
        text: "In sensitive areas we treat with a cooled handpiece and adjusted intensity, discreetly and at your pace.",
      },
      { type: "h2", text: "What makes treatment more comfortable?" },
      {
        type: "list",
        items: [
          "Contact cooling: the SG XLaser Pro cools the skin to as low as −15 °C during treatment.",
          "Adjusted intensity: for sensitive areas like the bikini line we adjust the intensity individually.",
          "Smoothly shaved skin: if hairs stand above the skin, part of the energy is released at the surface, which feels less comfortable.",
          "A calm atmosphere: we take our time, explain every step and work at your pace.",
        ],
      },
      { type: "h2", text: "Does it get more comfortable with every session?" },
      {
        type: "p",
        text: "Usually, yes. With every session fewer and finer hairs grow back. Less pigment also means less heat in the skin, which is why many find later appointments much more comfortable than the first ones.",
      },
      { type: "h2", text: "What you can do yourself" },
      {
        type: "list",
        items: [
          "Shave the area smooth the day before treatment.",
          "If possible, do not book sensitive areas for the days just before or during your period. Many find their skin more sensitive then.",
          "Tell us straight away if anything feels uncomfortable. We will then adjust the setting.",
        ],
      },
      {
        type: "p",
        text: "You will find all further tips in our guide to [preparing for laser hair removal](/ratgeber/vorbereitung-laser-haarentfernung).",
      },
      { type: "h2", text: "And after treatment?" },
      {
        type: "p",
        text: "Right after the session the skin may be slightly red or warm, and small swellings sometimes appear around the hair roots. This is a normal reaction and usually fades after a few hours. Protect the treated area from strong sun over the following days.",
      },
      {
        type: "note",
        title: "Good to know",
        text: "How it feels is very individual. If you are unsure, simply discuss your questions with us before the first session. We explain every step before we begin.",
      },
      {
        type: "p",
        text: "Would you like to try it for yourself? Book your appointment at one of our [studios](/standorte).",
      },
    ],
    faq: [
      {
        q: "Is laser hair removal in the intimate area painful?",
        a: "The bikini line and intimate area are among the more sensitive areas. With contact cooling and adjusted intensity, however, most people find the treatment easy to bear. We work especially gently there and at your pace.",
      },
      {
        q: "Does laser hurt more than waxing?",
        a: "Many find laser treatment more comfortable than waxing, because the pulse is only brief and the skin is cooled at the same time. How it feels remains individual, though.",
      },
      {
        q: "Do I need a numbing cream?",
        a: "Usually not. Contact cooling down to −15 °C makes the treatment easy to bear for most people. If you are particularly sensitive, talk to us beforehand.",
      },
    ],
  },
};

export const ARTICLE_COPY: Record<Lang, Record<ArticleSlug, ArticleCopy>> = { de: DE, en: EN };
