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

  const properties = [
    {
      id: 1,
      name: "Sadef Merano",
      location: "Al Nuzha District, Jeddah",
      type: "3-Bedroom Apartment",
      area: "173 m²",
      startingPrice: "SAR 115,000",
      rentalYield: "Up to SAR 75,000",
      resaleValue: "Up to SAR 600,000",
      image: "/images/SAFA 101.jpg",
      badge: "Featured",
    },
    {
      id: 2,
      name: "Sadef Fiore",
      location: "Premium Location, Jeddah",
      type: "2-Bedroom Apartment",
      area: "145 m²",
      startingPrice: "SAR 95,000",
      rentalYield: "Up to SAR 60,000",
      resaleValue: "Up to SAR 480,000",
      image: "/images/SAFA 052.jpg",
      badge: "New Launch",
    },
    {
      id: 3,
      name: "Sadef Gardens",
      location: "North Jeddah",
      type: "4-Bedroom Villa",
      area: "250 m²",
      startingPrice: "SAR 180,000",
      rentalYield: "Up to SAR 120,000",
      resaleValue: "Up to SAR 900,000",
      image: "/images/SAFA 085.jpg",
      badge: "Luxury",
    },
  ]

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Hero Section */}
      <HeroSection currentContent={{hero: currentContent.hero}}/>

      {/* Stats Section */}
      <StatsSection currentContent={{stats: currentContent.stats}}/>

      {/* Featured Properties */}
      <ScrollAnimation delay={0.2}>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollAnimation delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {currentContent.featured.title}
                </h2>
                <p className="text-xl text-gray-600">{currentContent.featured.subtitle}</p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <ScrollAnimation key={property.id} delay={index * 0.1}>
                  <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#BDA25A] text-white">{property.badge}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Building2 className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {property.type} • {property.area}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Starting Price:</span>
                            <span className="font-semibold text-[#BDA25A]">{property.startingPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Annual Rental Yield:</span>
                            <span className="font-semibold text-green-600">{property.rentalYield}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Projected Resale:</span>
                            <span className="font-semibold text-blue-600">{property.resaleValue}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white mt-4" asChild>
                          <Link href={`/properties/${property.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-[#BDA25A] text-[#BDA25A] hover:bg-[#BDA25A] hover:text-white px-8 py-3"
                asChild
              >
                <Link href="/properties">View All Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation delay={0.2} direction="left">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.services.title}</h2>
              <p className="text-xl text-gray-600">{currentContent.services.subtitle}</p>
            </div>
          </ScrollAnimation >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Building2, title: "Property Development", description: "Premium off-plan residential projects with modern amenities" },
              { Icon: TrendingUp, title: "Investment Consulting", description: "Expert guidance on property investment opportunities" },
              { Icon: Shield, title: "Property Maintenance", description: "Complete maintenance and management services" },
              { Icon: Award, title: "Legal Support", description: "Full legal assistance for property transactions" },
            ].map((service, index) => (
              <ScrollAnimation key={service.title} delay={index * 0.1} direction="right">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow group">
                  <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#BDA25A] hover:bg-[#A8935A] text-white px-8 py-3" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <FeaturedSection />
      <InteractiveMap />
      <MediaCenter />
      <SuccessPartners />

      {/* Why Choose Sadef */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.whyChoose.title}</h2>
            <p className="text-xl text-gray-600">{currentContent.whyChoose.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollAnimation delay={0.2} direction="left" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BDA25A] to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Transparency</h3>
              <p className="text-gray-600">Complete disclosure of all costs and projected returns</p>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2} direction="left" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BDA25A] to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">17 Years Experience</h3>
              <p className="text-gray-600">Proven track record in Jeddah's real estate market</p>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2} direction="right" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BDA25A] to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">High-standard construction and modern amenities</p>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2} direction="right" className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BDA25A] to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer service and maintenance support</p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ScrollAnimation>
        <section className="py-20 bg-gradient-to-r from-[#BDA25A] to-[#A8935A]">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Invest in Your Future?</h2>
              <p className="text-xl mb-8 opacity-90">Contact our experts today for personalized investment guidance</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#BDA25A] hover:bg-gray-100 px-8 py-3 text-lg" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-[#BDA25A] hover:bg-gray-100 px-8 py-3 text-lg"
                  asChild
                >
                  <Link href="https://wa.me/966XXXXXXXXX" target="_blank">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Link>
                </Button>
                <WhatsAppButton/>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <Footer language={language} />
    </div>
  )
}
