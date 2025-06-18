"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Building2, Users, HeadphonesIcon } from "lucide-react"

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "ar">("ar")
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

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with our real estate experts",
      intro:
        "Ready to start your real estate investment journey? Our team of experts is here to help you every step of the way.",
      form: {
        title: "Send us a Message",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        subject: "Subject",
        message: "Message",
        preferredContact: "Preferred Contact Method",
        submit: "Send Message",
        placeholders: {
          name: "Enter your full name",
          email: "Enter your email address",
          phone: "Enter your phone number",
          subject: "Select a subject",
          message: "Tell us about your requirements...",
        },
        subjects: {
          general: "General Inquiry",
          investment: "Investment Consultation",
          property: "Property Information",
          maintenance: "Maintenance Request",
          legal: "Legal Support",
        },
        contactMethods: {
          email: "Email",
          phone: "Phone Call",
          whatsapp: "WhatsApp",
        },
      },
      contactInfo: {
        title: "Contact Information",
        address: {
          title: "Office Address",
          value: "Jeddah, Saudi Arabia",
        },
        phone: {
          title: "Phone Number",
          value: "+966 12 XXX XXXX",
        },
        email: {
          title: "Email Address",
          value: "info@sadef.com.sa",
        },
        hours: {
          title: "Business Hours",
          value: "Sunday - Thursday: 9:00 AM - 6:00 PM",
        },
      },
      quickActions: {
        title: "Quick Actions",
        whatsapp: "WhatsApp Chat",
        call: "Call Now",
        email: "Send Email",
        schedule: "Schedule Meeting",
      },
      departments: {
        title: "Contact Departments",
        sales: {
          title: "Sales Department",
          description: "Property sales and investment opportunities",
          phone: "+966 12 XXX XXXX",
          email: "sales@sadef.com.sa",
        },
        support: {
          title: "Customer Support",
          description: "General inquiries and customer service",
          phone: "+966 12 XXX XXXX",
          email: "support@sadef.com.sa",
        },
        maintenance: {
          title: "Maintenance Department",
          description: "Property maintenance and technical support",
          phone: "+966 12 XXX XXXX",
          email: "maintenance@sadef.com.sa",
        },
      },
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "تواصل مع خبراء العقارات لدينا",
      intro: "مستعد لبدء رحلة استثمارك العقاري؟ فريق خبرائنا هنا لمساعدتك في كل خطوة على الطريق.",
      form: {
        title: "أرسل لنا رسالة",
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        phone: "رقم الهاتف",
        subject: "الموضوع",
        message: "الرسالة",
        preferredContact: "طريقة التواصل المفضلة",
        submit: "إرسال الرسالة",
        placeholders: {
          name: "أدخل اسمك الكامل",
          email: "أدخل عنوان بريدك الإلكتروني",
          phone: "أدخل رقم هاتفك",
          subject: "اختر موضوعاً",
          message: "أخبرنا عن متطلباتك...",
        },
        subjects: {
          general: "استفسار عام",
          investment: "استشارة استثمارية",
          property: "معلومات العقار",
          maintenance: "طلب صيانة",
          legal: "دعم قانوني",
        },
        contactMethods: {
          email: "البريد الإلكتروني",
          phone: "مكالمة هاتفية",
          whatsapp: "واتساب",
        },
      },
      contactInfo: {
        title: "معلومات الاتصال",
        address: {
          title: "عنوان المكتب",
          value: "جدة، المملكة العربية السعودية",
        },
        phone: {
          title: "رقم الهاتف",
          value: "+966 12 XXX XXXX",
        },
        email: {
          title: "عنوان البريد الإلكتروني",
          value: "info@sadef.com.sa",
        },
        hours: {
          title: "ساعات العمل",
          value: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
        },
      },
      quickActions: {
        title: "إجراءات سريعة",
        whatsapp: "محادثة واتساب",
        call: "اتصل الآن",
        email: "إرسال بريد إلكتروني",
        schedule: "جدولة اجتماع",
      },
      departments: {
        title: "أقسام الاتصال",
        sales: {
          title: "قسم المبيعات",
          description: "مبيعات العقارات والفرص الاستثمارية",
          phone: "+966 12 XXX XXXX",
          email: "sales@sadef.com.sa",
        },
        support: {
          title: "دعم العملاء",
          description: "الاستفسارات العامة وخدمة العملاء",
          phone: "+966 12 XXX XXXX",
          email: "support@sadef.com.sa",
        },
        maintenance: {
          title: "قسم الصيانة",
          description: "صيانة العقارات والدعم الفني",
          phone: "+966 12 XXX XXXX",
          email: "maintenance@sadef.com.sa",
        },
      },
    },
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A]">{language === "ar" ? "اتصل بنا" : "Contact"}</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{currentContent.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{currentContent.subtitle}</p>
            <p className="text-lg text-gray-700">{currentContent.intro}</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentContent.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{currentContent.form.name}</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.placeholders.name}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{currentContent.form.email}</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.placeholders.email}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{currentContent.form.phone}</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.placeholders.phone}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.form.subject}
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={currentContent.form.placeholders.subject} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{currentContent.form.subjects.general}</SelectItem>
                        <SelectItem value="investment">{currentContent.form.subjects.investment}</SelectItem>
                        <SelectItem value="property">{currentContent.form.subjects.property}</SelectItem>
                        <SelectItem value="maintenance">{currentContent.form.subjects.maintenance}</SelectItem>
                        <SelectItem value="legal">{currentContent.form.subjects.legal}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.preferredContact}
                  </label>
                  <Select
                    value={formData.preferredContact}
                    onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">{currentContent.form.contactMethods.email}</SelectItem>
                      <SelectItem value="phone">{currentContent.form.contactMethods.phone}</SelectItem>
                      <SelectItem value="whatsapp">{currentContent.form.contactMethods.whatsapp}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{currentContent.form.message}</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.placeholders.message}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white">
                  <Send className="h-4 w-4 mr-2" />
                  {currentContent.form.submit}
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{currentContent.contactInfo.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#BDA25A] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{currentContent.contactInfo.address.title}</h4>
                      <p className="text-gray-600">{currentContent.contactInfo.address.value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-[#BDA25A] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{currentContent.contactInfo.phone.title}</h4>
                      <p className="text-gray-600">{currentContent.contactInfo.phone.value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-[#BDA25A] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{currentContent.contactInfo.email.title}</h4>
                      <p className="text-gray-600">{currentContent.contactInfo.email.value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-[#BDA25A] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{currentContent.contactInfo.hours.title}</h4>
                      <p className="text-gray-600">{currentContent.contactInfo.hours.value}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{currentContent.quickActions.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                    <Link href="https://wa.me/966XXXXXXXXX" target="_blank">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {currentContent.quickActions.whatsapp}
                    </Link>
                  </Button>

                  <Button className="bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                    <Link href="tel:+966XXXXXXXXX">
                      <Phone className="h-4 w-4 mr-2" />
                      {currentContent.quickActions.call}
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#BDA25A] text-[#BDA25A] hover:bg-[#BDA25A] hover:text-white"
                    asChild
                  >
                    <Link href="mailto:info@sadef.com.sa">
                      <Mail className="h-4 w-4 mr-2" />
                      {currentContent.quickActions.email}
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#BDA25A] text-[#BDA25A] hover:bg-[#BDA25A] hover:text-white"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {currentContent.quickActions.schedule}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.departments.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentContent.departments.sales.title}</h3>
              <p className="text-gray-600 mb-4">{currentContent.departments.sales.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#BDA25A] mr-2" />
                  <span>{currentContent.departments.sales.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#BDA25A] mr-2" />
                  <span>{currentContent.departments.sales.email}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentContent.departments.support.title}</h3>
              <p className="text-gray-600 mb-4">{currentContent.departments.support.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#BDA25A] mr-2" />
                  <span>{currentContent.departments.support.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#BDA25A] mr-2" />
                  <span>{currentContent.departments.support.email}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentContent.departments.maintenance.title}</h3>
              <p className="text-gray-600 mb-4">{currentContent.departments.maintenance.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#BDA25A] mr-2" />
                  <span>{currentContent.departments.maintenance.phone}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#BDA25A] mr-2" />
                  <span>{currentContent.departments.maintenance.email}</span>
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
