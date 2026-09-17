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

/** Figures the client asked to feature. Update them here only. */
export const FACTS = {
  treatments: "30.000",
  googleReviews: "600",
};

/**
 * ProvenExpert. Paste the profile URL and the seal image URL from the
 * ProvenExpert dashboard ("Siegel & Widgets"). While both are null nothing
 * is rendered in production and a labelled slot is shown in development.
 */
export const PROVEN_EXPERT = {
  profileUrl: null as string | null,
  sealImageUrl: null as string | null,
};
