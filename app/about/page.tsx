"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Users, Award, Target, Eye, Heart, CheckCircle, TrendingUp, Shield, Star } from "lucide-react"

export default function AboutPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const content = {
    en: {
      title: "About Sadef Real Estate Development",
      subtitle: "17 Years of Excellence in Real Estate Development",
      intro:
        "Sadef Real Estate Development has been a pioneering force in Saudi Arabia's real estate sector for over 17 years, specializing in premium off-plan residential projects in Jeddah.",
      mission: {
        title: "Our Mission",
        description:
          "To create exceptional residential communities that enhance the quality of life while providing sustainable investment opportunities for our clients.",
      },
      vision: {
        title: "Our Vision",
        description:
          "To be the leading real estate development company in Saudi Arabia, recognized for innovation, quality, and customer satisfaction.",
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Excellence",
            description: "We strive for the highest standards in everything we do",
            icon: Star,
          },
          {
            title: "Transparency",
            description: "We believe in honest and open communication with our clients",
            icon: Shield,
          },
          {
            title: "Innovation",
            description: "We embrace new technologies and modern design concepts",
            icon: TrendingUp,
          },
          {
            title: "Sustainability",
            description: "We are committed to environmentally responsible development",
            icon: Heart,
          },
        ],
      },
      achievements: {
        title: "Our Achievements",
        items: [
          "17+ years of successful operations",
          "50+ completed residential projects",
          "1000+ satisfied investors",
          "Premium locations across Jeddah",
          "Award-winning architectural designs",
          "Consistent investment returns",
        ],
      },
      team: {
        title: "Our Leadership Team",
        description:
          "Led by experienced professionals with deep expertise in real estate development, investment, and construction management.",
      },
    },
    ar: {
      title: "عن سديف للتطوير العقاري",
      subtitle: "17 عاماً من التميز في التطوير العقاري",
      intro:
        "تعد سديف للتطوير العقاري قوة رائدة في قطاع العقارات في المملكة العربية السعودية لأكثر من 17 عاماً، متخصصة في المشاريع السكنية المتميزة على الخريطة في جدة.",
      mission: {
        title: "رسالتنا",
        description: "إنشاء مجتمعات سكنية استثنائية تعزز جودة الحياة مع توفير فرص استثمارية مستدامة لعملائنا.",
      },
      vision: {
        title: "رؤيتنا",
        description:
          "أن نكون شركة التطوير العقاري الرائدة في المملكة العربية السعودية، معترف بها للابتكار والجودة ورضا العملاء.",
      },
      values: {
        title: "قيمنا",
        items: [
          {
            title: "التميز",
            description: "نسعى لأعلى المعايير في كل ما نقوم به",
            icon: Star,
          },
          {
            title: "الشفافية",
            description: "نؤمن بالتواصل الصادق والمفتوح مع عملائنا",
            icon: Shield,
          },
          {
            title: "الابتكار",
            description: "نتبنى التقنيات الجديدة ومفاهيم التصميم الحديثة",
            icon: TrendingUp,
          },
          {
            title: "الاستدامة",
            description: "نلتزم بالتطوير المسؤول بيئياً",
            icon: Heart,
          },
        ],
      },
      achievements: {
        title: "إنجازاتنا",
        items: [
          "+17 سنة من العمليات الناجحة",
          "+50 مشروع سكني مكتمل",
          "+1000 مستثمر راضي",
          "مواقع متميزة في جميع أنحاء جدة",
          "تصاميم معمارية حائزة على جوائز",
          "عوائد استثمارية ثابتة",
        ],
      },
      team: {
        title: "فريق القيادة",
        description: "بقيادة محترفين ذوي خبرة مع خبرة عميقة في التطوير العقاري والاستثمار وإدارة البناء.",
      },
    },
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A]">{language === "ar" ? "من نحن" : "About Us"}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{currentContent.title}</h1>
              <p className="text-xl text-[#BDA25A] font-semibold">{currentContent.subtitle}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{currentContent.intro}</p>
              <Button size="lg" className="bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Sadef Real Estate Development"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 border-l-4 border-[#BDA25A]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#BDA25A] rounded-full flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{currentContent.mission.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.mission.description}</p>
            </Card>

            <Card className="p-8 border-l-4 border-[#BDA25A]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#BDA25A] rounded-full flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{currentContent.vision.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentContent.vision.description}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.values.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.values.items.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">{currentContent.achievements.title}</h2>
              <div className="space-y-4">
                {currentContent.achievements.items.map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-[#BDA25A] mr-4 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Sadef Achievements"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#BDA25A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <Building2 className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Completed Projects</div>
            </div>
            <div className="text-center text-white">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl lg:text-5xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Happy Investors</div>
            </div>
            <div className="text-center text-white">
              <Award className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl lg:text-5xl font-bold mb-2">17+</div>
              <div className="text-lg opacity-90">Years Experience</div>
            </div>
            <div className="text-center text-white">
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl lg:text-5xl font-bold mb-2">15%</div>
              <div className="text-lg opacity-90">Average Returns</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.team.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.team.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <Card key={member} className="text-center p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Member {member}</h3>
                <p className="text-[#BDA25A] font-semibold mb-2">Executive Position</p>
                <p className="text-gray-600 text-sm">
                  Experienced professional with extensive background in real estate development and investment.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#BDA25A] to-[#A8935A]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied investors who trust Sadef for their real estate investments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#BDA25A] hover:bg-gray-100" asChild>
                <Link href="/properties">View Properties</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#BDA25A]"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
