interface Hero {
  title: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
  whatsAppChat: string;
}

interface Stats {
  experience: string;
  projects: string;
  investors: string;
  returns: string;
}

interface Section {
  title: string;
  subtitle?: string;
  noImageAvailable?: string;
  cardTitle1?: string;
  cardSubtitle1?: string;
  cardTitle2?: string;
  cardSubtitle2?: string;
  cardTitle3?: string;
  cardSubtitle3?: string;
  cardTitle4?: string;
  cardSubtitle4?: string;
  cta?: string;
  description?: string;
  cardTitle?: string;
  latestNews?: string;
  blogs?: string;
  viewAllNews?: string;
  readMore?: string;
  error?: string;
  getInTouch?: string;
  whatsApp?: string;
  locationName?: string;
  locationDescription?: string;
  locationName2?: string;
  locationDescription2?: string;
  locationName3?: string;
  locationDescription3?: string;
  viewAllProperties?: string;
  all?: string;
  viewMore?: string;
  sortBy?: string;
  properties?: string;
  showing?: string;
  noProperties?: string;
  tryAdjusting?: string;
}

interface ContentLanguage {
  hero: Hero;
  stats: Stats;
  featured: Section;
  services: Section;
  whyChoose: Section;
  contactCTA: Section;
  interactiveMap: Section;
  mediaCenter: Section;
  featureContent: Section
  successPartners: Section
}

export interface Content {
  en: ContentLanguage;
  ar: ContentLanguage;
}
