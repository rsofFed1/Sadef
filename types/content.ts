interface Hero {
  title: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
  watchVideo: string;
}

interface Stats {
  experience: string;
  projects: string;
  investors: string;
  returns: string;
}

interface Section {
  title: string;
  subtitle: string;
}

interface ContentLanguage {
  hero: Hero;
  stats: Stats;
  featured: Section;
  services: Section;
  whyChoose: Section;
}

export interface Content {
  en: ContentLanguage;
  ar: ContentLanguage;
}
