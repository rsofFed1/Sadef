"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface FooterProps {
  language: "en" | "ar"
}

export function Footer({ language }: FooterProps) {
  const content = {
    en: {
      description: "Leading real estate development company in Saudi Arabia with 17 years of excellence.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact Info",
      followUs: "Follow Us",
      rights: "© 2024 Sadef Real Estate Development. All rights reserved.",
      nav: {
        home: "Home",
        about: "About Us",
        properties: "Properties",
        services: "Services",
        contact: "Contact",
        maintenance: "Maintenance",
      },
      servicesList: {
        development: "Property Development",
        investment: "Investment Consulting",
        maintenance: "Property Maintenance",
        legal: "Legal Support",
      },
      contactInfo: {
        phone: "+966 12 XXX XXXX",
        email: "info@sadef.com.sa",
        address: "Jeddah, Saudi Arabia",
      },
    },
    ar: {
      description: "شركة رائدة في التطوير العقاري في المملكة العربية السعودية مع 17 عاماً من التميز.",
      quickLinks: "روابط سريعة",
      services: "الخدمات",
      contact: "معلومات الاتصال",
      followUs: "تابعنا",
      rights: "© 2024 سديف للتطوير العقاري. جميع الحقوق محفوظة.",
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        properties: "العقارات",
        services: "الخدمات",
        contact: "اتصل بنا",
        maintenance: "الصيانة",
      },
      servicesList: {
        development: "التطوير العقاري",
        investment: "الاستشارات الاستثمارية",
        maintenance: "صيانة العقارات",
        legal: "الدعم القانوني",
      },
      contactInfo: {
        phone: "+966 12 XXX XXXX",
        email: "info@sadef.com.sa",
        address: "جدة، المملكة العربية السعودية",
      },
    },
  }

  const currentContent = content[language]

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/images/sadef-logo-horizontal.png"
              alt="Sadef Real Estate"
              width={150}
              height={50}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed">{currentContent.description}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{currentContent.quickLinks}</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                {currentContent.nav.about}
              </Link>
              <Link href="/properties" className="block text-gray-400 hover:text-white transition-colors">
                {currentContent.nav.properties}
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                {currentContent.nav.services}
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                {currentContent.nav.contact}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{currentContent.services}</h3>
            <div className="space-y-2">
              <div className="text-gray-400">{currentContent.servicesList.development}</div>
              <div className="text-gray-400">{currentContent.servicesList.investment}</div>
              <div className="text-gray-400">{currentContent.servicesList.maintenance}</div>
              <div className="text-gray-400">{currentContent.servicesList.legal}</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{currentContent.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-3" />
                {currentContent.contactInfo.phone}
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3" />
                {currentContent.contactInfo.email}
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-3" />
                {currentContent.contactInfo.address}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">{currentContent.rights}</p>
        </div>
      </div>
    </footer>
  )
}
