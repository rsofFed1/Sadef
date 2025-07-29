"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Building2, Users, HeadphonesIcon } from "lucide-react"
import { propertyOptions } from "@/components/constants/constants";
import { content } from "../../components/language/contactUs"

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "",
  })

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-bg-light text-generalText ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-bg-light to-bg-main pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-helper mb-6">
            <Link href="/" className="hover:text-secondary">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-secondary">{language === "ar" ? "اتصل بنا" : "Contact"}</span>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold text-primary">{currentContent.title}</h2>
            <p className="text-primaryText text-secondary mt-4">{currentContent.subtitle}</p>
            <p className="text-body text-generalText mt-4">{currentContent.intro}</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-bg-main pb-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-h2 font-bold text-primary mb-6">{currentContent.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-helper mb-2">{currentContent.form.name}</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.placeholders.name}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-helper mb-2">{currentContent.form.phone}</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.placeholders.phone}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-helper mb-2">
                    {currentContent.form.preferredContact}
                  </label>
                  <Select
                    value={formData.preferredContact}
                    onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.label}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-bg-main">
                  <Send className="h-4 w-4 mr-2" />
                  {currentContent.form.submit}
                </Button>
              </form>
              {/* Quick Actions */}
              <div className="mt-6">
                <h3 className="text-h3 font-bold text-primary mb-6">{currentContent.quickActions.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-bg-main" asChild>
                    <Link href="https://wa.me/966595344758" target="_blank">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {currentContent.quickActions.whatsapp}
                    </Link>
                  </Button>

                  <Button className="bg-green-600 hover:bg-green-700 text-bg-main" asChild>
                    <Link href="tel:+966595344758">
                      <Phone className="h-4 w-4 mr-2" />
                      {currentContent.quickActions.call}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <h3 className="text-h3 font-bold text-primary mb-6">{currentContent.contactInfo.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-secondary mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">{currentContent.contactInfo.address.title}</h4>
                      <p className="text-helper">{currentContent.contactInfo.address.value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-secondary mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">{currentContent.contactInfo.phone.title}</h4>
                      <p className="text-helper">{currentContent.contactInfo.phone.value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-secondary mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">{currentContent.contactInfo.email.title}</h4>
                      <p className="text-helper">{currentContent.contactInfo.email.value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-secondary mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary">{currentContent.contactInfo.hours.title}</h4>
                      <p className="text-helper">{currentContent.contactInfo.hours.value}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.departments.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-bg-main" />
              </div>
              <h3 className="text-h3 font-bold text-primary mb-2">{currentContent.departments.sales.title}</h3>
              <p className="text-helper mb-4">{currentContent.departments.sales.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-secondary">{currentContent.departments.sales.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-secondary">{currentContent.departments.sales.email}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-bg-main" />
              </div>
              <h3 className="text-h3 font-bold text-primary mb-2">{currentContent.departments.support.title}</h3>
              <p className="text-helper mb-4">{currentContent.departments.support.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-secondary">{currentContent.departments.support.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-secondary">{currentContent.departments.support.email}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-bg-main" />
              </div>
              <h3 className="text-h3 font-bold text-primary mb-2">{currentContent.departments.maintenance.title}</h3>
              <p className="text-helper mb-4">{currentContent.departments.maintenance.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-secondary">{currentContent.departments.maintenance.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-secondary">{currentContent.departments.maintenance.email}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
