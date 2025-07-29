"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import InteractiveMap from "@/components/InteractiveMap"
import FeaturedSection from "@/components/FeaturedSection"
import MediaCenter from "@/components/MediaCenter"
import SuccessPartners from "@/components/PartnerSlider"
import HeroSection from "@/components/HeroSection"
import StatsSection from "@/components/StatsSection"
import FeaturedProperties from "@/components/FeaturedProperties"
import OurServices from "@/components/OurServices"
import WhyChooseSadef from "@/components/WhyChooseSadef"
import ContactCTA from "@/components/ContactCta"
import { content } from "../components/language/home"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const currentContent = content[language]
  const isRTL = language === "ar"

  return (
    <div className={`min-h-screen overflow-hidden bg-bg-main text-generalText ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Hero Section component */}
      <HeroSection currentContent={{hero: currentContent.hero}}/>

      {/* Stats Section component */}
      <StatsSection currentContent={{stats: currentContent.stats}}/>

      {/* Featured Properties component */}
      <FeaturedProperties currentContent={{featured: currentContent.featured}}/>

      {/* Services Preview component */}
      <OurServices currentContent={{services: currentContent.services}} />

      {/* Featured Section component */}
      <FeaturedSection currentContent={{featureContent: currentContent.featureContent}} />

      {/* Interactive Map component */}
      <InteractiveMap currentContent={{interactiveMap: currentContent.interactiveMap}} />

      {/* Media Center component */}
      <MediaCenter currentContent={{mediaCenter: currentContent.mediaCenter}}/>

      {/* Success Partners component */}
      <SuccessPartners currentContent={{successPartners: currentContent.successPartners}}/>

      {/* Why Choose Sadef component */}
      <WhyChooseSadef currentContent={{whyChoose: currentContent.whyChoose}} />

      {/* Contact CTA component */}
      <ContactCTA currentContent={{contactCTA: currentContent.contactCTA}} />

      <WhatsAppButton />

      <Footer language={language} />
    </div>
  )
}
