import type { Lang } from "./content";
import type { StudioSlug } from "./locations";

export type StudioReview = { name: string } & Record<Lang, string>;

/**
 * Five 5-star reviews from each studio's own Google Maps listing, shown on
 * that studio's page. The German is quoted word for word: the opening
 * sentences where a review runs long, emojis left out. Names are the first
 * name and initial as Google shows them. The English is for reviewing in
 * development only. Collected on 22 September 2026; replace them freely,
 * but keep them real and verbatim.
 */
export const STUDIO_REVIEWS: Record<StudioSlug, StudioReview[]> = {
  frankfurt: [
    {
      name: "Vivien B.",
      de: "Ich bin absolut zufrieden und kann das Studio nur weiterempfehlen! Von Anfang an habe ich mich sehr gut aufgehoben gefühlt. Die Beratung war ausführlich, ehrlich und kompetent, sodass keine Fragen offen geblieben sind.",
      en: "I am absolutely happy and can only recommend the studio! I felt in very good hands from the start. The consultation was thorough, honest and competent, so no questions were left open.",
    },
    {
      name: "Lara E.",
      de: "Ich bin super zufrieden mit meiner Behandlung im SG Laser Zentrum! Die Behandlung ist nahezu schmerzfrei und man sieht wirklich schnell erste Ergebnisse.",
      en: "I am very happy with my treatment at SG Laser Zentrum! The treatment is almost painless and you really see the first results quickly.",
    },
    {
      name: "Daisy R.",
      de: "Bin super zufrieden mit dem Ergebnis, mit dem Team und dem Preis-Leistungsverhältnis. Ich hatte jetzt 6 Sitzungen und an den Beinen und den Achseln passiert kaum noch was - da rasiere ich die restlichen 7 Haare einmal im Monat.",
      en: "Very happy with the result, the team and the value for money. I have now had 6 sessions and hardly anything grows on my legs and underarms any more – I shave the remaining 7 hairs once a month.",
    },
    {
      name: "Armonela S.",
      de: "Ich bin wirklich sehr zufrieden mit meinem Besuch im Laserzentrum! Von Anfang an habe ich mich bestens aufgehoben gefühlt. Das Team ist super freundlich, professionell und nimmt sich Zeit für alle Fragen.",
      en: "I am really very happy with my visit to the laser centre! I felt in the best hands from the start. The team is super friendly, professional and takes time for every question.",
    },
    {
      name: "Sibel V.",
      de: "Ich mache meine Laserbehandlungen bei Sorour und bin wirklich sehr zufrieden. Sorour ist unglaublich lieb und arbeitet sehr genau und sorgfältig.",
      en: "I have my laser treatments with Sorour and am really very happy. Sorour is incredibly kind and works very precisely and carefully.",
    },
  ],
  karlsruhe: [
    {
      name: "Klara M.",
      de: "Ich hatte meine erste Behandlung vor ein paar Wochen und merke jetzt schon einen großen Unterschied! Die Haare sind schon jetzt deutlich weniger geworden und wachsen außerdem viel langsamer nach als vorher.",
      en: "I had my first treatment a few weeks ago and can already notice a big difference! There is already much less hair, and it grows back much more slowly than before.",
    },
    {
      name: "Julia W.",
      de: "Ich fühle mich hier sehr gut aufgehoben. Die ersten Ergebnisse sind schon nach den ersten Behandlungen sichtbar und ich freue mich schon auf das Endergebnis.",
      en: "I feel in very good hands here. The first results were visible after the first treatments and I am already looking forward to the end result.",
    },
    {
      name: "Kübra T.",
      de: "Ich war kürzlich das Erste Mal dort und bin begeistert. Die liebe İlknur hat sich sehr fürsorglich um mich gekümmert und mir ein entspanntes Gefühl gegeben.",
      en: "I was there for the first time recently and I am delighted. Lovely İlknur looked after me very caringly and made me feel relaxed.",
    },
    {
      name: "Debby",
      de: "Einfach super! Alle Mitarbeiterinnen Mega lieb und es wird alles super präzise gemacht. Schon nach der ersten Behandlung Veränderungen bemerkt.",
      en: "Simply great! All the staff are so lovely and everything is done very precisely. Noticed changes after the very first treatment.",
    },
    {
      name: "Emelie F.",
      de: "Personal ist immer sehr nett, fühle mich sehr wohl, nach ein paar Behandlungen werden die Haare schon wesentlich weniger und dünner",
      en: "The staff are always very nice and I feel very comfortable; after a few treatments the hair is already much sparser and finer",
    },
  ],
  koeln: [
    {
      name: "Okan Y.",
      de: "Ich bin sehr zufrieden mit der dauerhaften Haarentfernung. Das neue Kosmetikstudio ist sehr schön, sauber und man fühlt sich direkt wohl.",
      en: "I am very happy with the permanent hair removal. The new studio is very beautiful and clean, and you feel at ease straight away.",
    },
    {
      name: "Manal T.",
      de: "Ich bin sehr zufrieden mit meiner Laserbehandlung. Ich hatte inzwischen meine zweite Sitzung und bin bereits sehr positiv mit den ersten Ergebnissen.",
      en: "I am very happy with my laser treatment. I have now had my second session and I am already very pleased with the first results.",
    },
    {
      name: "Nhatvy J.",
      de: "Super liebes Team und eine richtig angenehme Atmosphäre! Man fühlt sich direkt wohl und gut aufgehoben. Bin mit der Behandlung und dem Ergebnis sehr zufrieden.",
      en: "A really lovely team and a truly pleasant atmosphere! You feel comfortable and in good hands straight away. Very happy with the treatment and the result.",
    },
    {
      name: "Ani H.",
      de: "Ich war bei der zweiten Behandlung, bin sehr zufrieden und sehe bereits eine Verbesserung. Das Studio ist ebenfalls sehr schön.",
      en: "I have been for my second treatment, I am very happy and can already see an improvement. The studio is very beautiful too.",
    },
    {
      name: "Celina C.",
      de: "Ich bin super zufrieden! Man fühlt sich direkt wohl und wird total freundlich und professionell behandelt. Die Behandlung ist angenehm und alles wird vorher genau erklärt.",
      en: "I am super happy! You feel comfortable straight away and are treated in a really friendly, professional way. The treatment is pleasant and everything is explained carefully beforehand.",
    },
  ],
  mainz: [
    {
      name: "Esra T.",
      de: "Ich habe mich von Anfang an sehr wohl und gut aufgehoben gefühlt. Die Behandlung wurde professionell und verständlich erklärt, und es wurde sich viel Zeit für meine Fragen genommen.",
      en: "I felt very comfortable and in good hands from the start. The treatment was explained professionally and clearly, and plenty of time was taken for my questions.",
    },
    {
      name: "Tugce Z.",
      de: "Ich habe meine Laserbehandlung für den Körper hier gemacht und bin wirklich super zufrieden! Schon beim ersten Termin habe ich mich sehr wohl und gut beraten gefühlt.",
      en: "I had my body laser treatment here and I am really very happy! From the first appointment I felt very comfortable and well advised.",
    },
    {
      name: "Jenni A.",
      de: "Ich bin bei Sibel in Behandlung und rundum zufrieden! Sie arbeitet sehr professionell, ist dabei herzlich und aufmerksam.",
      en: "I am being treated by Sibel and I am completely happy! She works very professionally while being warm and attentive.",
    },
    {
      name: "Dounia T.",
      de: "Ich bin sehr begeistert! Sowohl vom Service als auch von der Behandlung. Die liebe Sibel nimmt sich für alle Fragen Zeit und beantwortet sie geduldig.",
      en: "I am thrilled! With both the service and the treatment. Lovely Sibel takes time for every question and answers them patiently.",
    },
    {
      name: "Aleyna",
      de: "Ich bin jetzt seit ca. sieben Sitzungen bei Sibel im Laserstudio und bin wirklich rundum begeistert!",
      en: "I have now had about seven sessions with Sibel at the laser studio and I am truly delighted all round!",
    },
  ],
  mannheim: [
    {
      name: "David S.",
      de: "Ich bin sehr zufrieden mit dem Laserzentrum! Das Team ist unglaublich freundlich und man fühlt sich vom ersten Moment an wohl. Die Atmosphäre ist entspannt und professionell zugleich.",
      en: "I am very happy with the laser centre! The team is incredibly friendly and you feel at ease from the very first moment. The atmosphere is relaxed and professional at the same time.",
    },
    {
      name: "Sümeyye G.",
      de: "Habe meine 5. Behandlung kürzlich gehabt und bin super zufrieden mit den Ergebnissen. Personal auch super freundlich und man fühlt sich echt wohl in dem Studio.",
      en: "I recently had my fifth treatment and I am super happy with the results. The staff are super friendly too and you really feel comfortable in the studio.",
    },
    {
      name: "Mina T.",
      de: "Ich bin bei Duygu zur Laserbehandlung und wirklich sehr zufrieden. Sie arbeitet professionell, hygienisch und nimmt sich Zeit für ihre Kunden.",
      en: "I go to Duygu for laser treatment and I am really very happy. She works professionally and hygienically and takes time for her clients.",
    },
    {
      name: "Farrouki O.",
      de: "Super liebes und professionelles Team! Ich habe mich vom ersten Moment an sehr wohl und bestens betreut gefühlt. Die Behandlung war angenehm und alles wurde ruhig erklärt.",
      en: "A really lovely, professional team! I felt very comfortable and well looked after from the first moment. The treatment was pleasant and everything was explained calmly.",
    },
    {
      name: "Marina G.",
      de: "Ich bin sehr zufrieden mit diesem Laser-Haarentfernungsstudio. Das Personal ist immer sehr freundlich, aufmerksam und gleichzeitig sehr kompetent.",
      en: "I am very happy with this laser hair removal studio. The staff are always very friendly, attentive and very competent at the same time.",
    },
  ],
  nuernberg: [
    {
      name: "Xenia G.",
      de: "Tolles Laser Studio! Ich habe mich für das 4-Zonen-Paket entschieden und bin rundum zufrieden. Ich fühle mich bei den Behandlungen sehr wohl und sehe schon jetzt erste deutliche Ergebnisse. Klare Empfehlung!",
      en: "Great laser studio! I chose the four-zone package and I am completely happy. I feel very comfortable during the treatments and can already see clear first results. A clear recommendation!",
    },
    {
      name: "Edanur Ö.",
      de: "Ich bin sehr zufrieden mit meiner Laser-Haarentfernung. Die Beratung war professionell und ehrlich, die Behandlung angenehmer als erwartet. Schon nach wenigen Sitzungen sieht man deutliche Ergebnisse.",
      en: "I am very happy with my laser hair removal. The consultation was professional and honest, and the treatment more pleasant than expected. You see clear results after just a few sessions.",
    },
    {
      name: "Elena G.",
      de: "Ich bin sehr zufrieden mit der Laserbehandlung! Die Aufklärung am Anfang war ausführlich und verständlich und die Behandlung selbst professionell und angenehm, ich sehe schon tolle Ergebnisse.",
      en: "I am very happy with the laser treatment! The information at the start was thorough and easy to understand, and the treatment itself professional and pleasant; I can already see great results.",
    },
    {
      name: "Vanessa B.",
      de: "Ich bin mit der Laserbehandlung sehr zufrieden. Die Beratung war sehr freundlich. Ich habe mich während der gesamten Behandlung sehr gut aufgehoben und wohl gefühlt.",
      en: "I am very happy with the laser treatment. The consultation was very friendly. I felt in very good hands and comfortable throughout the treatment.",
    },
    {
      name: "Anna E.",
      de: "Doina ist super nett und macht das Ganze richtig gut. Man kommt pünktlich dran und es wird sehr gründlich und hygienisch gearbeitet!",
      en: "Doina is super nice and does it really well. You are seen on time and the work is very thorough and hygienic!",
    },
  ],
  stuttgart: [
    {
      name: "Anna W.",
      de: "Absolut empfehlenswert. Super Preis-Leistung Verhältnis. Ceylan ist sehr lieb, nett und arbeitet richtig präzise. Das Studio ist sehr sauber. Ergebnis sieht man schon nach dem ersten Besuch. Absolut top.",
      en: "Absolutely recommended. Great value for money. Ceylan is very kind and nice and works really precisely. The studio is very clean. You see a result after the first visit. Absolutely top.",
    },
    {
      name: "Asinas E.",
      de: "Nach drei Behandlungen bin ich sehr zufrieden mit dem Ergebnis. Schon nach der zweiten Sitzung habe ich einen Unterschied bemerkt. Das Team ist sehr freundlich, professionell und sorgt dafür, dass man sich wohlfühlt.",
      en: "After three treatments I am very happy with the result. I noticed a difference after the second session. The team is very friendly and professional and makes sure you feel comfortable.",
    },
    {
      name: "Aya S.",
      de: "Ich bin sehr zufrieden! Der Service war professionell und freundlich. Man hat sich Zeit genommen, alles verständlich zu erklären, und ich habe mich gut aufgehoben gefühlt.",
      en: "I am very happy! The service was professional and friendly. They took the time to explain everything clearly, and I felt in good hands.",
    },
    {
      name: "Kateryna K.",
      de: "Bin fast am Ende meiner Sitzungen und die Ergebnisse sprechen für sich! Super professionell und hygienisch. Bin Mega zufrieden und würde es jedem in meinem Umfeld empfehlen.",
      en: "I am almost at the end of my sessions and the results speak for themselves! Super professional and hygienic. I am really happy and would recommend it to everyone I know.",
    },
    {
      name: "W. M.",
      de: "Bin super zufrieden mit der Laserbehandlung, schon nach den ersten beiden Behandlungen wachsen viel weniger Haare. Die Behandlung geht schnell, ist vergleichsweise günstig und vor allem schmerzfrei.",
      en: "Very happy with the laser treatment; after the first two treatments much less hair is growing. The treatment is quick, comparatively inexpensive and, above all, painless.",
    },
  ],
};
