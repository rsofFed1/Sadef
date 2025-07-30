"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { content } from "@/components/language/services"
import { useLanguage } from "@/hooks/useLanguage"

export default function ServicesPage() {
  const {language, isRTL, mounted, toggleLanguage} = useLanguage()

  if (!mounted) {
    return null
  }

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
      <Footer language={language} />
    </div>
  )
}
