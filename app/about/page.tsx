"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Users, Award, Target, Eye, Heart, CheckCircle, TrendingUp, Shield, Star, Briefcase, Download, MessageCircle } from "lucide-react"

export default function AboutPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const content = {
    en: {
      title: "Welcome to the Sadef Real Estate Development platform",
      subtitle: "We offer you the best real estate projects in the Kingdom of Saudi Arabia with high quality and a distinctive future vision. Discover our projects or contact us to book a real estate consultation immediately.",
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
      stats: {
        completedProjects: {
          value: "50+",
          label: "Completed Projects"
        },
        happyInvestors: {
          value: "1000+",
          label: "Happy Investors"
        },
        yearsExperience: {
          value: "17+",
          label: "Years Experience"
        },
        averageReturns: {
          value: "15%",
          label: "Average Returns"
        }
      },
      team: {
        title: "Our Leadership Team",
        description:"Led by experienced professionals with deep expertise in real estate development, investment, and construction management.",
        teamMembers: [
          {
            name: "Leadership Member 1",
            position: "Executive Position",
            description: "Experienced professional with extensive background in real estate development and investment.",
          },
          {
            name: "Leadership Member 2",
            position: "Executive Position",
            description: "Experienced professional with extensive background in real estate development and investment.",
          },
          {
            name: "Leadership Member 3",
            position: "Executive Position",
            description: "Experienced professional with extensive background in real estate development and investment.",
          },
        ],
      },
      cta: {
        title: "Ready to Start Your Investment Journey?",
        subtitle: "Join thousands of satisfied investors who trust Sadef for their real estate investments",
        button1: "View Properties",
        button2: "Contact Us",
      },
    },
    ar: {
      title: "مرحبًا بكم في منصة سدث للتطوير العقاري",
      subtitle: "نقدم لكم أفضل المشاريع العقارية في المملكة العربية السعودية بجودة عالية ورؤية مستقبلية مميزة. اكتشف مشاريعنا أو تواصل معنا لحجز استشارة عقارية فورًا",
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
      stats: {
        completedProjects: {
          value: "٥٠+",
          label: "المشاريع المكتملة"
        },
        happyInvestors: {
          value: "١٠٠٠+",
          label: "المستثمرون السعداء"
        },
        yearsExperience: {
          value: "١٧+",
          label: "سنوات الخبرة"
        },
        averageReturns: {
          value: "١٥٪",
          label: "متوسط العائد"
        }
      },
      team: {
        title: "فريق القيادة",
        description: "بقيادة محترفين ذوي خبرة مع خبرة عميقة في التطوير العقاري والاستثمار وإدارة البناء.",
        teamMembers: [
          {
            name: "عضو القيادة 1",
            position: "منصب تنفيذي",
            description: "محترف ذو خبرة واسعة في تطوير العقارات والاستثمار.",
          },
          {
            name: "عضو القيادة 2",
            position: "منصب تنفيذي",
            description: "محترف ذو خبرة واسعة في تطوير العقارات والاستثمار.",
          },
          {
            name: "عضو القيادة 3",
            position: "منصب تنفيذي",
            description: "محترف ذو خبرة واسعة في تطوير العقارات والاستثمار.",
          },
        ],
      },
      cta: {
        title: "هل أنت مستعد لبدء رحلتك الاستثمارية؟",
        subtitle: "انضم إلى آلاف المستثمرين الراضين الذين يثقون بسديف لاستثماراتهم العقارية",
        button1: "عرض العقارات",
        button2: "تواصل معنا",
      },
    },
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-bg-main text-generalText ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-bg-light to-bg-main pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-helper mb-6">
            <Link href="/" className="hover:text-secondary">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-secondary">{language === "ar" ? "من نحن" : "About Us"}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-primary">{currentContent.title}</h2>
              <p className="text-primaryText text-secondary">{currentContent.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-bg-main flex items-center gap-2"
                  asChild
                >
                  <Link href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    {language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  </Link>
                </Button>

                {/* Download Brochure */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-secondary text-bg-main hover:bg-[#B5A56B] flex items-center gap-2"
                  asChild
                >
                  <a
                    href="https://ascpt.onlinelibrary.wiley.com/doi/pdf/10.1002%2Fcpt.1796"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    {language === "ar" ? "تحميل البروشور" : "Download Brochure"}
                  </a>
                </Button>

                {/* Call Now */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-[#00BCD4] text-white hover:bg-[#00A3BA] flex items-center gap-2"
                  asChild
                >
                  <Link href="tel:+966500000000">
                    <Briefcase className="w-5 h-5" />
                    {language === "ar" ? "فرص استثمارية" : "Investment Opportunities"}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/SAFA_02.webp?height600&width=800"
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
      <section className="py-20 bg-bg-main">
        <div className="container mx-auto px-4 ">
          <div className="grid md:grid-cols-2 gap-12 ">
            <Card className="p-8 border-l-4 border-secondary bg-bg-main hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className= {`w-12 h-12 bg-secondary rounded-full flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4' }`  }>
                  <Target className="h-6 w-6 text-bg-main" />
                </div>
                <h2 className="text-h2 font-bold text-primary">{currentContent.mission.title}</h2>
              </div>
              <p className="text-generalText leading-relaxed">{currentContent.mission.description}</p>
            </Card>

            <Card className="p-8 border-l-4 border-secondary bg-bg-main hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
              <div className= {`w-12 h-12 bg-secondary rounded-full flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4' }`}>
                  <Eye className="h-6 w-6 text-bg-main" />
                </div>
                <h2 className="text-h2 font-bold text-primary">{currentContent.vision.title}</h2>
              </div>
              <p className="text-generalText leading-relaxed">{currentContent.vision.description}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.values.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.values.items.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow bg-bg-main rounded-lg border border-bg-light">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-bg-main" />
                </div>
                <h3 className="text-h3 font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-generalText">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-bg-main">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 font-bold text-primary mb-8">{currentContent.achievements.title}</h2>
              <div className="space-y-4">
                {currentContent.achievements.items.map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className={`h-5 w-5 text-secondary ${isRTL ? "ml-4" : "mr-4"}  flex-shrink-0`} />
                    <span className="text-primaryText text-generalText">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/SAFA_03.webp?height=500&width=600"
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
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-bg-main">
              <Building2 className="h-10 w-10 mx-auto mb-4" />
              <h3 className="text-h3 font-bold mb-2">{currentContent.stats.averageReturns.value}</h3>
              <p className="text-primaryText opacity-90">{currentContent.stats.averageReturns.label}</p>
            </div>
            <div className="text-center text-bg-main">
              <Users className="h-10 w-10 mx-auto mb-4" />
              <h3 className="text-h3 font-bold mb-2">{currentContent.stats.completedProjects.value}</h3>
              <p className="text-primaryTextopacity-90">{currentContent.stats.completedProjects.label}</p>
            </div>
            <div className="text-center text-bg-main">
              <Award className="h-10 w-10 mx-auto mb-4" />
              <h3 className="text-h3 font-bold mb-2">{currentContent.stats.yearsExperience.value}</h3>
              <p className="text-primaryText opacity-90">{currentContent.stats.yearsExperience.label}</p>
            </div>
            <div className="text-center text-bg-main">
              <TrendingUp className="h-10 w-10 mx-auto mb-4" />
              <h3 className="text-h3 font-bold mb-2">{currentContent.stats.happyInvestors.value}</h3>
              <p className="text-primaryText opacity-90">{currentContent.stats.happyInvestors.label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.team.title}</h2>
            <p className="text-primaryText text-generalText max-w-3xl mx-auto">{currentContent.team.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.team.teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 bg-bg-main rounded-lg border border-bg-light hover:shadow-lg transition-shadow"
              >
                <img
                  className="w-24 h-24 bg-bg-light rounded-full mx-auto mb-4 object-cover shadow-md"
                  src={`/images/MEMBER 0${index + 1}.jpg`}
                  alt={member.name}
                />
                <h3 className="text-h3 font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-secondary font-semibold mb-2">{member.position}</p>
                <p className="text-helper">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-secondary to-[#A8935A]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-bg-main">
            <h2 className="text-h2 font-bold mb-4">{currentContent.cta.title}</h2>
            <p className="text-h3 mb-8 opacity-90">{currentContent.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-bg-main text-secondary hover:bg-bg-light" asChild>
                <Link href="/properties">{currentContent.cta.button1}</Link>
              </Button>
              <Button
                size="lg"
                className="bg-bg-main text-secondary hover:bg-bg-light"
                asChild
              >
                <Link href="/contact">{currentContent.cta.button2}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
