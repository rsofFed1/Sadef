"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Award, Users, CheckCircle, Phone } from "lucide-react"
import { content } from "@/components/language/services"

export default function ServicesPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-bg-main text-generalText ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-bg-light to-bg-main pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-helper mb-6">
            <Link href="/" className="hover:text-secondary">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-secondary">{language === "ar" ? "الخدمات" : "Services"}</span>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold text-primary">{currentContent.title}</h2>
            <p className="text-primaryText text-secondary mt-4">{currentContent.subtitle}</p>
            <p className="text-body text-generalText mt-4">{currentContent.intro}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-bg-main">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 bg-bg-main rounded-lg border border-bg-light">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-bg-main" />
                  </div>
                  <h3 className="text-h3 font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-generalText">{service.description}</p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-secondary mr-3 flex-shrink-0" />
                      <span className="text-body text-generalText">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.process.title}</h2>
            <p className="text-primaryText text-generalText">{currentContent.process.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.process.steps.map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-bg-main rounded-lg border border-bg-light">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-h2 font-bold text-bg-main">{step.step}</span>
                </div>
                <h3 className="text-h3 font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-generalText">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-bg-main">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 font-bold text-primary mb-6">Why Choose Our Services?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Award className="h-6 w-6 text-bg-main" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-primary mb-2">17+ Years Experience</h3>
                    <p className="text-generalText">Proven track record in Jeddah's real estate market</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="h-6 w-6 text-bg-main" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-primary mb-2">Full Transparency</h3>
                    <p className="text-generalText">Complete disclosure of all costs and projected returns</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-bg-main" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-primary mb-2">Dedicated Support</h3>
                    <p className="text-generalText">24/7 customer service and maintenance support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/SAFA_01.webp?height=500&width=600"
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
      <section className="py-20 bg-gradient-to-r from-secondary to-[#A8935A]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-bg-main">
            <h2 className="text-h2 font-bold mb-4">{currentContent.cta.title}</h2>
            <p className="text-h3 mb-8 opacity-90">{currentContent.cta.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-bg-main text-secondary hover:bg-bg-light px-8 py-3 text-body" asChild>
                <Link href="/contact">{currentContent.cta.button1}</Link>
              </Button>
              <Button
                size="lg"
                className="bg-bg-main text-secondary hover:bg-bg-light px-8 py-3 text-body"
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
