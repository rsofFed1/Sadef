"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Globe, Menu, MessageCircle, Phone } from "lucide-react"

interface NavigationProps {
  language: "en" | "ar"
  onLanguageToggle: () => void
}

export function Navigation({ language, onLanguageToggle }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRTL = language === "ar"

  const content = {
    en: {
      nav: {
        home: "Home",
        about: "About Us",
        properties: "Properties",
        services: "Services",
        contact: "Contact",
        maintenance: "Maintenance",
      },
    },
    ar: {
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        properties: "العقارات",
        services: "الخدمات",
        contact: "اتصل بنا",
        maintenance: "الصيانة",
      },
    },
  }

  const currentContent = content[language]

  const navItems = [
    { href: "/", label: currentContent.nav.home },
    { href: "/about", label: currentContent.nav.about },
    { href: "/properties", label: currentContent.nav.properties },
    { href: "/services", label: currentContent.nav.services },
    { href: "/maintenance", label: currentContent.nav.maintenance },
    { href: "/contact", label: currentContent.nav.contact },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/sadef-logo-horizontal.png"
              alt="Sadef Real Estate"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors hover:text-[#BDA25A] ${
                  pathname === item.href ? "text-[#BDA25A] border-b-2 border-[#BDA25A] pb-1" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & WhatsApp */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageToggle}
              className="hidden md:flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>

            <Button size="sm" className="hidden md:flex bg-green-600 hover:bg-green-700 text-white" asChild>
              <Link href="https://wa.me/966XXXXXXXXX" target="_blank">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Link>
            </Button>

            <Button size="sm" className="hidden md:flex bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
              <Link href="tel:+966XXXXXXXXX">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium ${pathname === item.href ? "text-[#BDA25A]" : "text-gray-700"}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button variant="outline" onClick={onLanguageToggle} className="w-full mb-4">
                      <Globe className="h-4 w-4 mr-2" />
                      {language === "en" ? "العربية" : "English"}
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-2" asChild>
                      <Link href="https://wa.me/966XXXXXXXXX" target="_blank">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Link>
                    </Button>
                    <Button className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                      <Link href="tel:+966XXXXXXXXX">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
