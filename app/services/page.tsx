"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, TrendingUp, Shield, Award, Users, Calculator, CheckCircle, Phone } from "lucide-react"

export default function ServicesPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const content = {
    en: {
      title: "Our Services",
      subtitle: "Comprehensive real estate solutions tailored to your needs",
      intro:
        "At Sadef Real Estate Development, we offer a complete range of services to support your real estate investment journey from start to finish.",
      services: [
        {
          title: "Property Development",
          description: "Premium off-plan residential projects with modern amenities and strategic locations",
          icon: Building2,
          features: [
            "Strategic location selection",
            "Modern architectural design",
            "Quality construction management",
            "Timely project delivery",
            "Premium amenities integration",
          ],
        },
        {
          title: "Investment Consulting",
          description: "Expert guidance on property investment opportunities with transparent projections",
          icon: TrendingUp,
          features: [
            "Market analysis and insights",
            "Investment opportunity assessment",
            "ROI projections and analysis",
            "Portfolio diversification advice",
            "Risk assessment and mitigation",
          ],
        },
        {
          title: "Property Maintenance",
          description: "Complete maintenance and management services for your properties",
          icon: Shield,
          features: [
            "24/7 maintenance support",
            "Regular property inspections",
            "Preventive maintenance programs",
            "Emergency repair services",
            "Tenant management services",
          ],
        },
        {
          title: "Legal Support",
          description: "Full legal assistance for property transactions and documentation",
          icon: Award,
          features: [
            "Contract preparation and review",
            "Legal documentation assistance",
            "Property registration support",
            "Dispute resolution services",
            "Compliance and regulatory guidance",
          ],
        },
        {
          title: "Financial Planning",
          description: "Comprehensive financial planning and payment solutions",
          icon: Calculator,
          features: [
            "Flexible payment plans",
            "Financing options guidance",
            "Investment structuring advice",
            "Tax optimization strategies",
            "Financial risk assessment",
          ],
        },
        {
          title: "Customer Support",
          description: "Dedicated customer service throughout your investment journey",
          icon: Users,
          features: [
            "Dedicated account managers",
            "Regular progress updates",
            "Investor portal access",
            "24/7 customer helpline",
            "Multilingual support team",
          ],
        },
      ],
      process: {
        title: "Our Process",
        subtitle: "How we work with you",
        steps: [
          {
            step: "01",
            title: "Consultation",
            description: "Initial consultation to understand your investment goals and preferences",
          },
          {
            step: "02",
            title: "Property Selection",
            description: "Curated property recommendations based on your criteria and budget",
          },
          {
            step: "03",
            title: "Investment Analysis",
            description: "Detailed financial analysis and ROI projections for selected properties",
          },
          {
            step: "04",
            title: "Documentation",
            description: "Complete legal documentation and contract preparation",
          },
          {
            step: "05",
            title: "Project Monitoring",
            description: "Regular updates on construction progress and project milestones",
          },
          {
            step: "06",
            title: "Handover & Support",
            description: "Property handover and ongoing maintenance support",
          },
        ],
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Contact our experts today for personalized service",
        button1: "Schedule Consultation",
        button2: "Call Now",
      },
    },
    ar: {
      title: "خدماتنا",
      subtitle: "حلول عقارية شاملة مصممة خصيصاً لاحتياجاتك",
      intro: "في سديف للتطوير العقاري، نقدم مجموعة كاملة من الخدمات لدعم رحلة استثمارك العقاري من البداية إلى النهاية.",
      services: [
        {
          title: "التطوير العقاري",
          description: "مشاريع سكنية متميزة على الخريطة مع وسائل راحة حديثة ومواقع استراتيجية",
          icon: Building2,
          features: [
            "اختيار المواقع الاستراتيجية",
            "التصميم المعماري الحديث",
            "إدارة البناء عالية الجودة",
            "تسليم المشاريع في الوقت المحدد",
            "دمج وسائل الراحة المتميزة",
          ],
        },
        {
          title: "الاستشارات الاستثمارية",
          description: "إرشاد خبير حول فرص الاستثمار العقاري مع توقعات شفافة",
          icon: TrendingUp,
          features: [
            "تحليل السوق والرؤى",
            "تقييم الفرص الاستثمارية",
            "توقعات وتحليل العائد على الاستثمار",
            "نصائح تنويع المحفظة",
            "تقييم المخاطر والتخفيف منها",
          ],
        },
        {
          title: "صيانة العقارات",
          description: "خدمات صيانة وإدارة شاملة لعقاراتك",
          icon: Shield,
          features: [
            "دعم صيانة 24/7",
            "فحوصات دورية للعقارات",
            "برامج الصيانة الوقائية",
            "خدمات الإصلاح الطارئة",
            "خدمات إدارة المستأجرين",
          ],
        },
        {
          title: "الدعم القانوني",
          description: "مساعدة قانونية كاملة للمعاملات العقارية والوثائق",
          icon: Award,
          features: [
            "إعداد ومراجعة العقود",
            "مساعدة في الوثائق القانونية",
            "دعم تسجيل العقارات",
            "خدمات حل النزاعات",
            "إرشادات الامتثال والتنظيم",
          ],
        },
        {
          title: "التخطيط المالي",
          description: "تخطيط مالي شامل وحلول دفع",
          icon: Calculator,
          features: [
            "خطط دفع مرنة",
            "إرشادات خيارات التمويل",
            "نصائح هيكلة الاستثمار",
            "استراتيجيات تحسين الضرائب",
            "تقييم المخاطر المالية",
          ],
        },
        {
          title: "دعم العملاء",
          description: "خدمة عملاء مخصصة طوال رحلة استثمارك",
          icon: Users,
          features: [
            "مديري حسابات مخصصين",
            "تحديثات منتظمة للتقدم",
            "الوصول إلى بوابة المستثمرين",
            "خط مساعدة العملاء 24/7",
            "فريق دعم متعدد اللغات",
          ],
        },
      ],
      process: {
        title: "عمليتنا",
        subtitle: "كيف نعمل معك",
        steps: [
          {
            step: "01",
            title: "الاستشارة",
            description: "استشارة أولية لفهم أهدافك الاستثمارية وتفضيلاتك",
          },
          {
            step: "02",
            title: "اختيار العقار",
            description: "توصيات عقارية منتقاة بناءً على معاييرك وميزانيتك",
          },
          {
            step: "03",
            title: "تحليل الاستثمار",
            description: "تحليل مالي مفصل وتوقعات العائد على الاستثمار للعقارات المختارة",
          },
          {
            step: "04",
            title: "التوثيق",
            description: "توثيق قانوني كامل وإعداد العقود",
          },
          {
            step: "05",
            title: "مراقبة المشروع",
            description: "تحديثات منتظمة حول تقدم البناء ومعالم المشروع",
          },
          {
            step: "06",
            title: "التسليم والدعم",
            description: "تسليم العقار ودعم الصيانة المستمر",
          },
        ],
      },
      cta: {
        title: "مستعد للبدء؟",
        subtitle: "اتصل بخبرائنا اليوم للحصول على خدمة شخصية",
        button1: "جدولة استشارة",
        button2: "اتصل الآن",
      },
    },
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A]">{language === "ar" ? "الخدمات" : "Services"}</span>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{currentContent.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{currentContent.subtitle}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{currentContent.intro}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-[#BDA25A] mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.process.title}</h2>
            <p className="text-xl text-gray-600">{currentContent.process.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.process.steps.map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#BDA25A] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">17+ Years Experience</h3>
                    <p className="text-gray-600">Proven track record in Jeddah's real estate market</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#BDA25A] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Full Transparency</h3>
                    <p className="text-gray-600">Complete disclosure of all costs and projected returns</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#BDA25A] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Dedicated Support</h3>
                    <p className="text-gray-600">24/7 customer service and maintenance support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/SAFA 01.jpg?height=500&width=600"
                alt="Sadef Services"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#BDA25A] to-[#A8935A]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{currentContent.cta.title}</h2>
            <p className="text-xl mb-8 opacity-90">{currentContent.cta.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#BDA25A] hover:bg-gray-100 px-8 py-3 text-lg" asChild>
                <Link href="/contact">{currentContent.cta.button1}</Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-[#BDA25A] hover:bg-gray-100 px-8 py-3 text-lg"
                asChild
              >
                <Link href="tel:+966XXXXXXXXX">
                  <Phone className="h-5 w-5 mr-2" />
                  {currentContent.cta.button2}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
