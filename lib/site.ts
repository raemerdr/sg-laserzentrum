/**
 * Language-neutral facts about the business. Copy lives in `lib/content.ts`.
 */

export const SITE_URL = "https://sg-laserzentrum.de";

export const COMPANY = {
  brand: "SG Laserzentrum",
  legalName: "SG Laserzentrum GmbH & Co. KG",
  street: "Westliche Ringstraße 32a",
  zip: "67227",
  city: "Frankenthal (Pfalz)",
  registerCourt: "Amtsgericht Ludwigshafen am Rhein",
  registerNumber: "HRA 62526",
  generalPartner: {
    name: "SG Laserzentrum Verwaltungs-GmbH",
    street: "Westliche Ringstraße 16",
    zip: "67227",
    city: "Frankenthal (Pfalz)",
    registerCourt: "Amtsgericht Ludwigshafen am Rhein",
    registerNumber: "HRB 70768",
  },
  managingDirectors: ["Gizem Achenbach", "Sinem Bulukgiray"],
  founded: 2022,
  /**
   * DE368172174 still belongs to the old GbR and must not be shown.
   * Set the new VAT ID here once the client sends it; the imprint picks it up.
   */
  vatId: null as string | null,
};

export const CONTACT = {
  phone: "0174 9593326",
  phoneHref: "tel:+491749593326",
  whatsapp: "https://wa.me/491749593326",
  /** Switch to info@sg-laserzentrum.de once that mailbox exists. */
  email: "sg-laser-beauty@hotmail.com",
  instagram: "https://www.instagram.com/sg_laserzentrum_mannheim/",
};

/** Agency credit in the footer, in English on every language version. */
export const CREDIT = {
  label: "Site made by",
  name: "nüll.",
  url: "https://xn--nll-hoa.com/",
};

/**
 * Figures the client asked to feature. Update them here only. The review count
 * is the total across all studios' Google profiles. Customer profiles (about
 * 9,000) include booked no-shows, so the client does not want them shown.
 */
export const FACTS = {
  treatments: "30.000",
  googleReviews: "1.200",
};

/**
 * The founders, named in this order under their photo on the home page.
 * The photo is still to come; an empty frame holds its place until then.
 */
export const FOUNDERS = [{ name: "Sinem Bulukgiray" }, { name: "Gizem Achenbach" }] as const;

/** Google Maps search listing every SG Laserzentrum studio with its rating and reviews. */
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=SG%20Laserzentrum";

/**
 * ProvenExpert. Paste the profile URL and the seal image URL from the
 * ProvenExpert dashboard ("Siegel & Widgets"). While either is null the
 * seal is not rendered.
 */
export const PROVEN_EXPERT = {
  profileUrl: null as string | null,
  sealImageUrl: null as string | null,
};
