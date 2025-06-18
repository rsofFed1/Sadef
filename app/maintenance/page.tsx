"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Phone, MessageCircle, AlertTriangle } from "lucide-react"

export default function MaintenancePage() {
  const [language, setLanguage] = useState<"en" | "ar">("ar")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyId: "",
    issueType: "",
    priority: "",
    description: "",
    preferredTime: "",
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
    console.log("Maintenance request submitted:", formData)
  }

  const content = {
    en: {
      title: "Property Maintenance",
      subtitle: "Professional maintenance services for your property",
      intro: "Our dedicated maintenance team is available 24/7 to ensure your property is always in perfect condition. Submit a request or contact us directly for immediate assistance.",
      form: {
        title: "Submit Maintenance Request",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        propertyId: "Property ID",
        issueType: "Issue Type",
        priority: "Priority Level",
        description: "Issue Description",
        preferredTime: "Preferred Time",
        attachments: "Attach Photos",
        submit: "Submit Request",
        placeholders: {
          name: "Enter your full name",
          email: "Enter your email address",
          phone: "Enter your phone number",
          propertyId: "Enter your property ID",
          description: "Describe the maintenance issue in detail...",
          preferredTime: "When would you prefer the maintenance visit?",
        },
        issueTypes: {
          plumbing: "Plumbing",
          electrical: "Electrical",
          hvac: "HVAC/Air Conditioning",
          appliances: "Appliances",
          structural: "Structural",
          cleaning: "Cleaning",
          security: "Security System",
          other: "Other",
        },
        priorities: {
          emergency: "Emergency",
          high: "High",
          medium: "Medium",
          low: "Low",
        },
      },
      services: {
        title: "Our Maintenance Services",
        emergency: {
          title: "Emergency Services",
          description: "24/7 emergency maintenance for urgent issues",
          response: "Response time: Within 2 hours",
        },
        routine: {
          title: "Routine Maintenance",
          description: "Regular maintenance to prevent issues",
          response: "Scheduled visits: Weekly/Monthly",
        },
        repairs: {
          title: "Repairs & Fixes",
          description: "Professional repair services for all issues",
          response: "Response time: Within 24 hours",
        },
        cleaning: {
          title: "Cleaning Services",
          description: "Professional cleaning and housekeeping",
          response: "Flexible scheduling available",
        },
      },
      contact: {
        title: "Emergency Contact",
        subtitle: "For urgent maintenance issues, contact us immediately",
        phone: "+966 12 XXX XXXX",
        whatsapp: "WhatsApp Support",
        email: "maintenance@sadef.com.sa",
      },
      status: {
        title: "Check Request Status",
        subtitle: "Track your maintenance request",
        requestId: "Request ID",
        check: "Check Status",
      },
      tips: {
        title: "Maintenance Tips",
        items: [
          "Report issues as soon as you notice them",
          "Provide detailed descriptions and photos if possible",
          "Be available during scheduled maintenance visits",
          "Keep your property ID handy for faster service",
          "For emergencies, call our 24/7 hotline immediately",
        ],
      },
    },
    ar: {
      title: "صيانة العقارات",
      subtitle: "خدمات صيانة احترافية لعقارك",
      intro: "فريق الصيانة المخصص لدينا متاح 24/7 لضمان أن عقارك في حالة مثالية دائماً. قدم طلباً أو اتصل بنا مباشرة للحصول على مساعدة فورية.",
      form: {
        title: "تقديم طلب صيانة",
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        phone: "رقم الهاتف",
        propertyId: "رقم العقار",
        issueType: "نوع المشكلة",
        priority: "مستوى الأولوية",
        description: "وصف المشكلة",
        preferredTime: "الوقت المفضل",
        attachments: "إرفاق صور",
        submit: "تقديم الطلب",
        placeholders: {
          name: "أدخل اسمك الكامل",
          email: "أدخل عنوان بريدك الإلكتروني",
          phone: "أدخل رقم هاتفك",
          propertyId: "أدخل رقم عقارك",
          description: "اوصف مشكلة الصيانة بالتفصيل...",
          preferredTime: "متى تفضل زيارة الصيانة؟",
        },
        issueTypes: {
          plumbing: "السباكة",
          electrical: "الكهرباء",
          hvac: "التكييف والتهوية",
          appliances: "الأجهزة",
          structural: "هيكلي",
          cleaning: "التنظيف",
          security: "نظام الأمان",
          other: "أخرى",
        },
        priorities: {
          emergency: "طارئ",
          high: "عالي",
          medium: "متوسط",
          low: "منخفض",
        },
      },
      services: {
        title: "خدمات الصيانة لدينا",
        emergency: {
          title: "الخدمات الطارئة",
          description: "صيانة طارئة 24/7 للمشاكل العاجلة",
          response: "وقت الاستجابة: خلال ساعتين",
        },
        routine: {
          title: "الصيانة الدورية",
          description: "صيانة منتظمة لمنع المشاكل",
          response: "زيارات مجدولة: أسبوعية/شهرية",
        },
        repairs: {
          title: "الإصلاحات والتصليحات",
          description: "خدمات إصلاح احترافية لجميع المشاكل",
          response: "وقت الاستجابة: خلال 24 ساعة",
        },
        cleaning: {
          title: "خدمات التنظيف",
          description: "تنظيف احترافي وخدمات التدبير المنزلي",
          response: "جدولة مرنة متاحة",
        },
      },
      contact: {
        title: "اتصال طارئ",
        subtitle: "لمشاكل الصيانة العاجلة، اتصل بنا فوراً",
        phone: "+966 12 XXX XXXX",
        whatsapp: "دعم واتساب",
        email: "maintenance@sadef.com.sa",
      },
      status: {
        title: "تحقق من حالة الطلب",
        subtitle: "تتبع طلب الصيانة الخاص بك",
        requestId: "رقم الطلب",
        check: "تحقق من الحالة",
      },
      tips: {
        title: "نصائح الصيانة",
        items: [
          "أبلغ عن المشاكل بمجرد ملاحظتها",
          "قدم أوصافاً مفصلة وصوراً إن أمكن",
          "كن متاحاً أثناء زيارات الصيانة المجدولة",
          "احتفظ برقم عقارك في متناول اليد للحصول على خدمة أسرع",
          "للطوارئ، اتصل بخطنا الساخن 24/7 فوراً",
        ],
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
            <span className="text-[#BDA25A]">{language === "ar" ? "الصيانة" : "Maintenance"}</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{currentContent.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{currentContent.subtitle}</p>
            <p className="text-lg text-gray-700">{currentContent.intro}</p>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-l-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-red-700">{currentContent.contact.title}</h2>
            </div>
            <p className="text-red-600 mb-6">{currentContent.contact.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href={`tel:${currentContent.contact.phone}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  {currentContent.contact.phone}
                </Link>
              </Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link href="https://wa.me/966XXXXXXXXX" target="_blank">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {currentContent.contact.whatsapp}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Request Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentContent.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.form.name}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.placeholders.name}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.form.email}
                    </label>
                    <Input
                      type="email"
                      name="email\
