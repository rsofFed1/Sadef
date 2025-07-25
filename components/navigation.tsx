"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
        blogs: "Blogs",
        contact: "Contact",
      },
    },
    ar: {
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        properties: "العقارات",
        services: "الخدمات",
        blogs: "المدونات",
        contact: "اتصل بنا",
      },
    },
  }

  const currentContent = content[language]

  const navItems = [
    { href: "/", label: currentContent.nav.home },
    { href: "/about", label: currentContent.nav.about },
    { href: "/properties", label: currentContent.nav.properties },
    { href: "/services", label: currentContent.nav.services },
    { href: "/blogs", label: currentContent.nav.blogs },
    { href: "/contact", label: currentContent.nav.contact },
  ]

  return (

    <header className="absolute left-0 right-0 top-0 bg-bg-main text-primary py-0 px-1 md:px-12 h-[110px] z-50 lg:left-[7.5%] lg:right-[7.5%] lg:top-[2%] lg:rounded-t-[20px] lg:py-0 lg:px-12 md:left-0 md:right-0 md:top-0 md:rounded-0 md:p-0">
      <div className="container mx-auto h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/sadef-logo-horizontal.png"
              alt="Sadef Real Estate"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors hover:text-secondary ${
                  pathname === item.href ? "text-secondary border-b-2 border-secondary pb-1" : "text-generalText"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle */}
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

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="hidden"></SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-h3 font-medium ${pathname === item.href ? "text-secondary" : "text-primary"}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button variant="outline" onClick={onLanguageToggle} className="w-full mb-4">
                      <Globe className="h-4 w-4 mr-2" />
                      {language === "en" ? "English" : "العربية"}
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
