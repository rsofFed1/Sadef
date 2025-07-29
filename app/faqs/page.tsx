"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"
import { content } from "@/components/language/faqs"

export default function FAQPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [displayCount, setDisplayCount] = useState(6)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const currentContent = content[language]

  const filteredFaqs = currentContent.faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const displayedFaqs = filteredFaqs.slice(0, displayCount)
  const hasMoreFaqs = displayedFaqs.length < filteredFaqs.length

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6)
  }

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
            <span className="text-secondary">{language === "ar" ? "الأسئلة الشائعة" : "FAQs"}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-h2 font-bold text-primary">{currentContent.title}</h2>
                <p className="text-primaryText text-secondary mt-4">{currentContent.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mt-8">
        <div className="flex items-center justify-between">
          <p className="text-helper">
            {currentContent.showing} {displayedFaqs.length}{" "}
            {currentContent.faqs}
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-helper" />
            <Input
              placeholder={currentContent.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-bg-main text-primary"
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {displayedFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-helper">{currentContent.noFaqs}</p>
            </div>
          ) : (
            <>
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {displayedFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border border-gray-200 rounded-lg">
                      <AccordionTrigger className="text-left px-6 py-4 hover:bg-gray-50">
                        <span className="font-semibold text-primary">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-secondaryText leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Load More Button */}
              {hasMoreFaqs && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    className="bg-primary hover:bg-primary-hover text-bg-main px-8 py-3"
                  >
                    {currentContent.loadMore}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
