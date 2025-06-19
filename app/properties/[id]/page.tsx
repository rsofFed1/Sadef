"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Building2, Bed, Bath, Square, Phone, MessageCircle } from "lucide-react"
import { getPropertyById, type Property } from "@/lib/api"

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = Number.parseInt(params.id as string)

  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getPropertyById(propertyId)

        if (response.succeeded && response.data) {
          setProperty(response.data)
        } else {
          setError(response.message || "Property not found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (propertyId) {
      fetchProperty()
    }
  }, [propertyId])

  const content = {
    en: {
      backToProperties: "Back to Properties",
      propertyDetails: "Property Details",
      features: "Features",
      contactUs: "Contact Us",
      scheduleViewing: "Schedule Viewing",
      loading: "Loading property...",
      error: "Error loading property",
      notFound: "Property not found",
      startingPrice: "Starting Price",
      annualYield: "Annual Rental Yield",
      projectedResale: "Projected Resale",
      completionDate: "Completion Date",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      area: "Area",
      location: "Location",
      propertyType: "Property Type",
      status: "Status",
    },
    ar: {
      backToProperties: "العودة إلى العقارات",
      propertyDetails: "تفاصيل العقار",
      features: "المميزات",
      contactUs: "اتصل بنا",
      scheduleViewing: "جدولة معاينة",
      loading: "جاري تحميل العقار...",
      error: "خطأ في تحميل العقار",
      notFound: "العقار غير موجود",
      startingPrice: "السعر الابتدائي",
      annualYield: "العائد السنوي من الإيجار",
      projectedResale: "إعادة البيع المتوقعة",
      completionDate: "تاريخ الإنجاز",
      bedrooms: "غرف النوم",
      bathrooms: "دورات المياه",
      area: "المساحة",
      location: "الموقع",
      propertyType: "نوع العقار",
      status: "الحالة",
    },
  }

  const currentContent = content[language]

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Navigation language={language} onLanguageToggle={toggleLanguage} />
        <div className="container mx-auto px-4 py-40">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BDA25A]"></div>
            <span className="ml-4 text-gray-600">{currentContent.loading}</span>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Navigation language={language} onLanguageToggle={toggleLanguage} />
        <div className="container mx-auto px-4 py-40">
          <div className="text-center py-12">
            <p className="text-red-600">{error || currentContent.notFound}</p>
            <Button className="mt-4" asChild>
              <Link href="/properties">{currentContent.backToProperties}</Link>
            </Button>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  const images =
    property.images && property.images.length > 0 ? property.images : [property.imageUrl || "/images/SAFA 01.jpg"]

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-white pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-[#BDA25A]">
              {language === "ar" ? "العقارات" : "Properties"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A] truncate">{property.name}</span>
          </div>

          <Button variant="outline" className="mb-6" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentContent.backToProperties}
            </Link>
          </Button>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImageIndex] || "/placeholder.svg"}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
                {property.badge && (
                  <Badge className="absolute top-4 left-4 bg-[#BDA25A] text-white">{property.badge}</Badge>
                )}
                <Badge
                  className={`absolute top-4 right-4 ${
                    property.status === "Available" ? "bg-green-600" : "bg-orange-600"
                  } text-white`}
                >
                  {property.status}
                </Badge>
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-20 w-full rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? "border-[#BDA25A]" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${property.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{property.name}</h1>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>

                {property.description && <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>}
              </div>

              {/* Property Stats */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{currentContent.propertyDetails}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-[#BDA25A] mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">{currentContent.propertyType}</p>
                      <p className="font-semibold">{property.propertyType}</p>
                    </div>
                  </div>

                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-[#BDA25A] mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">{currentContent.bedrooms}</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}

                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 text-[#BDA25A] mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">{currentContent.bathrooms}</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-[#BDA25A] mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">{currentContent.area}</p>
                      <p className="font-semibold">{property.area}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pricing Information */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{currentContent.startingPrice}:</span>
                    <span className="font-bold text-[#BDA25A] text-lg">{property.startingPrice}</span>
                  </div>
                  {property.rentalYield && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{currentContent.annualYield}:</span>
                      <span className="font-semibold text-green-600">{property.rentalYield}</span>
                    </div>
                  )}
                  {property.resaleValue && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{currentContent.projectedResale}:</span>
                      <span className="font-semibold text-blue-600">{property.resaleValue}</span>
                    </div>
                  )}
                  {property.completionDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{currentContent.completionDate}:</span>
                      <span className="font-semibold text-gray-700">{property.completionDate}</span>
                    </div>
                  )}
                  {property.annualReturn && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Return:</span>
                      <span className="font-semibold text-purple-600">{property.annualReturn}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{currentContent.features}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#BDA25A] rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Contact Actions */}
              <div className="space-y-4">
                <Button size="lg" className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                  <Link href="/contact">
                    <Phone className="h-5 w-5 mr-2" />
                    {currentContent.contactUs}
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-[#BDA25A] text-[#BDA25A] hover:bg-[#BDA25A] hover:text-white"
                  asChild
                >
                  <Link href="https://wa.me/966595344758" target="_blank">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
