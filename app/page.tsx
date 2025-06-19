"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Building2, MapPin, Star, TrendingUp, Shield, Award, MessageCircle, Play, ArrowRight } from "lucide-react"
import WhatsAppButton from "@/components/WhatsAppButton"
import InteractiveMap from "@/components/InteractiveMap"
import FeaturedSection from "@/components/FeaturedSection"
import MediaCenter from "@/components/MediaCenter"
import SuccessPartners from "@/components/PartnerSlider"
import { ScrollAnimation } from "@/components/animations/ScrollAnimation"
import { Content } from "@/types/content"
import HeroSection from "@/components/HeroSection"
import StatsSection from "@/components/StatsSection"
import FeaturedProperties from "@/components/FeaturedProperties"
import OurServices from "@/components/OurServices"
import WhyChooseSadef from "@/components/WhyChooseSadef"
import ContactCTA from "@/components/ContactCta"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const content: Content = {
    en: {
      hero: {
        title: "Sadef.. The Fabric of the Present",
        subtitle: "Premium Real Estate Development",
        description: "17 years of excellence in creating exceptional residential projects in Jeddah",
        cta1: "Explore Properties",
        cta2: "Learn More",
        watchVideo: "Watch Video",
      },
      stats: {
        experience: "17+ Years Experience",
        projects: "50+ Completed Projects",
        investors: "1000+ Happy Investors",
        returns: "Up to 15% Annual Returns",
      },
      featured: {
        title: "Featured Properties",
        subtitle: "Discover our premium residential developments",
      },
      services: {
        title: "Our Services",
        subtitle: "Comprehensive real estate solutions",
      },
      whyChoose: {
        title: "Why Choose Sadef",
        subtitle: "Your trusted partner in real estate investment",
      },
    },
    ar: {
      hero: {
        title: "سديف .. نسيج الحاضر",
        subtitle: "التطوير العقاري المتميز",
        description: "17 عاماً من التميز في إنشاء مشاريع سكنية استثنائية في جدة",
        cta1: "استكشف العقارات",
        cta2: "تعرف على المزيد",
        watchVideo: "شاهد الفيديو",
      },
      stats: {
        experience: "+17 سنة خبرة",
        projects: "+50 مشروع مكتمل",
        investors: "+1000 مستثمر راضي",
        returns: "عوائد سنوية تصل إلى 15%",
      },
      featured: {
        title: "العقارات المميزة",
        subtitle: "اكتشف مشاريعنا السكنية المتميزة",
      },
      services: {
        title: "خدماتنا",
        subtitle: "حلول عقارية شاملة",
      },
      whyChoose: {
        title: "لماذا تختار سديف",
        subtitle: "شريكك الموثوق في الاستثمار العقاري",
      },
    },
  }

  const currentContent = content[language]
  const isRTL = language === "ar"

  return (
    <div className={`min-h-screen overflow-hidden bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
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
      <FeaturedSection />

      {/* Interactive Map component */}
      <InteractiveMap />

      {/* Media Center component */}
      <MediaCenter />

      {/* Success Partners component */}
      <SuccessPartners />

      {/* Why Choose Sadef component */}
      <WhyChooseSadef currentContent={{whyChoose: currentContent.whyChoose}} />

      {/* Contact CTA component */}
      <ContactCTA />

      <WhatsAppButton />

      <Footer language={language} />
    </div>
  )
}
