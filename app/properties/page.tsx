"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Bed, Bath } from "lucide-react"
import { useProperties } from "@/hooks/useProperties"

export default function PropertiesPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  const { properties, loading, error, totalPages, totalCount } = useProperties(currentPage, pageSize)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  // Get unique property types and locations for filters
  const propertyTypes = useMemo(() => {
    const types = [...new Set(properties.map((p) => p.propertyType).filter(Boolean))]
    return types
  }, [properties])

  const locations = useMemo(() => {
    const locs = [...new Set(properties.map((p) => p.location).filter(Boolean))]
    return locs
  }, [properties])

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (property.description && property.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = selectedType === "all" || property.propertyType.toLowerCase() === selectedType.toLowerCase()
      const matchesLocation =
        selectedLocation === "all" || property.location.toLowerCase().includes(selectedLocation.toLowerCase())

      return matchesSearch && matchesType && matchesLocation
    })

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "featured":
      default:
        // No special sorting, just return as is
        break
    }

    return filtered
  }, [properties, searchTerm, selectedType, selectedLocation, sortBy])

  const content = {
    en: {
      title: "Our Properties",
      subtitle: "Discover premium real estate investment opportunities",
      searchPlaceholder: "Search properties...",
      propertyType: "Property Type",
      location: "Location",
      allTypes: "All Types",
      allLocations: "All Locations",
      applyFilters: "Apply Filters",
      sortBy: "Sort by",
      showing: "Showing",
      of: "of",
      properties: "properties",
      viewDetails: "View Details",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      startingPrice: "Starting Price",
      annualYield: "Annual Rental Yield",
      projectedResale: "Projected Resale",
      completionDate: "Completion Date",
      features: "Features",
      loading: "Loading properties...",
      error: "Error loading properties",
      noProperties: "No properties found",
      previousPage: "Previous",
      nextPage: "Next",
    },
    ar: {
      title: "عقاراتنا",
      subtitle: "اكتشف فرص الاستثمار العقاري المتميزة",
      searchPlaceholder: "البحث في العقارات...",
      propertyType: "نوع العقار",
      location: "الموقع",
      allTypes: "جميع الأنواع",
      allLocations: "جميع المواقع",
      applyFilters: "تطبيق المرشحات",
      sortBy: "ترتيب حسب",
      showing: "عرض",
      of: "من",
      properties: "عقار",
      viewDetails: "عرض التفاصيل",
      bedrooms: "غرف النوم",
      bathrooms: "دورات المياه",
      startingPrice: "السعر الابتدائي",
      annualYield: "العائد السنوي من الإيجار",
      projectedResale: "إعادة البيع المتوقعة",
      completionDate: "تاريخ الإنجاز",
      features: "المميزات",
      loading: "جاري تحميل العقارات...",
      error: "خطأ في تحميل العقارات",
      noProperties: "لم يتم العثور على عقارات",
      previousPage: "السابق",
      nextPage: "التالي",
    },
  }

  const currentContent = content[language]

  const getImageSrc = (img: string) => {
    if (!img) return "/images/SAFA 01.jpg"
    if (/^([A-Za-z0-9+/=]+)$/.test(img) && img.length > 100) {
      return `data:image/png;base64,${img}`
    }
    return img
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A]">{language === "ar" ? "العقارات" : "Properties"}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{currentContent.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{currentContent.subtitle}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-gray-900 py-2">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={currentContent.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-white text-gray-900">
                <SelectValue placeholder={currentContent.propertyType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{currentContent.allTypes}</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="bg-white text-gray-900">
                <SelectValue placeholder={currentContent.location} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{currentContent.allLocations}</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="bg-[#BDA25A] hover:bg-[#A8935A] text-white">
              <Filter className="h-4 w-4 mr-2" />
              {currentContent.applyFilters}
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BDA25A]"></div>
            <span className="ml-4 text-gray-600">{currentContent.loading}</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">
              {currentContent.error}: {error}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                {currentContent.showing} {filteredAndSortedProperties.length} {currentContent.of} {totalCount}{" "}
                {currentContent.properties}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={currentContent.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredAndSortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{currentContent.noProperties}</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedProperties.map((property) => (
                    <Card
                      key={property.id}
                      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition hover:shadow-lg relative"
                      style={{ background: '#FCF7F1' }}
                    >
                      <div className="relative">
                        <Image
                          src={property.imageBase64Strings && property.imageBase64Strings.length > 0 ? getImageSrc(property.imageBase64Strings[0]) : "/images/SAFA 01.jpg"}
                          alt={property.title ? `Photo of ${property.title}` : "Property image"}
                          width={400}
                          height={220}
                          className="w-full h-56 object-cover"
                        />
                        {/* Top left badges */}
                        <div className="absolute top-4 left-4 flex gap-2 z-10">
                          <span className="bg-black/80 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg> For rent</span>
                        </div>
                        {/* Overlay property type and icons */}
                        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                          <span className="bg-white/80 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> {property.unitCategory || property.propertyType || 'Apartment'}</span>
                        </div>
                      </div>
                      <CardContent className="flex-1 flex flex-col p-6 pb-4">
                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                          <div className="flex items-center text-[#BDA25A] text-sm gap-2 mb-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z"/></svg>
                            <span>{property.area || property.areaSize + ' sqm'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#BDA25A]">﷼ {property.price?.toLocaleString() || '80,000'}</span>
                          </div>
                        </div>
                        <hr className="my-2 border-[#F5E7D6]" />
                        <div className="flex items-center gap-6 text-[#BDA25A] text-sm mb-3">
                          <span className="flex items-center gap-1"><Bed className="w-5 h-5" /> {property.bedrooms}</span>
                          <span className="flex items-center gap-1"><Bath className="w-5 h-5" /> {property.bathrooms}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div><span className="font-semibold">Unit Name:</span> {property.unitName}</div>
                          <div><span className="font-semibold">Projected Resale:</span> {property.projectedResaleValue}</div>
                          <div><span className="font-semibold">Annual Rent:</span> {property.expectedAnnualRent}</div>
                          <div><span className="font-semibold">Warranty:</span> {property.warrantyInfo}</div>
                          {/* <div><span className="font-semibold">Lat/Lng:</span> {property.latitude}, {property.longitude}</div> */}
                          {/* <div><span className="font-semibold">WhatsApp:</span> {property.whatsAppNumber}</div> */}
                          <div><span className="font-semibold">Delivery:</span> {property.expectedDeliveryDate?.split('T')[0]}</div>
                          <div><span className="font-semibold">Investor Only:</span> {property.isInvestorOnly ? 'Yes' : 'No'}</div>
                          <div><span className="font-semibold">Status:</span> {property.status}</div>
                          {/* <div><span className="font-semibold">Expiry:</span> {property.expiryDate}</div> */}
                          <div><span className="font-semibold">Expired:</span> {property.isExpired ? 'Yes' : 'No'}</div>
                          {/* <div className="col-span-2"><span className="font-semibold">Videos:</span> {property.videoUrls && Array.isArray(property.videoUrls) && property.videoUrls.length > 0 ? property.videoUrls.join(', ') : '-'}</div> */}
                          <div className="col-span-2"><span className="font-semibold">Features:</span> {property.features && property.features.length > 0 ? property.features.join(', ') : '-'}</div>
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <Button className="rounded-full bg-[#BDA25A] hover:bg-[#BDA25A] text-white px-5" asChild><Link href={`/properties/${property.id}`}>View more</Link></Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      {currentContent.previousPage}
                    </Button>

                    <span className="text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      {currentContent.nextPage}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer language={language} />
    </div>
  )
}
