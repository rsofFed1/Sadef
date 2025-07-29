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
