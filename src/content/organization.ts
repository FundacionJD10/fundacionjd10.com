// Single source of truth for public legal/organization details.
// Must match the official registry and Goodstack documents word-for-word.
export const ORGANIZATION = {
  legalName: "Fundación JD10",
  // Plain, dot-free form so search crawlers can match `902081518-1` in page text.
  nit: "902081518-1",
  email: "contacto@fundacionjd10.com",
  streetAddress: "Diagonal 5 #9-88 Condominio Samanes, Prados del Este",
  city: "Cúcuta",
  region: "Norte de Santander",
  country: "Colombia",
  countryCode: "CO",
  foundingDate: "2026-07-02",
  founder: "José Daniel Durán",
} as const;

export const ORGANIZATION_ADDRESS = `${ORGANIZATION.streetAddress}, ${ORGANIZATION.city}, ${ORGANIZATION.region}, ${ORGANIZATION.country}`;
