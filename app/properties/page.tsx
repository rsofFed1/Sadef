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
import { Search, Filter, MapPin, Building2, Bed, Bath, Square } from "lucide-react"
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
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (property.description && property.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = selectedType === "all" || property.propertyType.toLowerCase() === selectedType.toLowerCase()
      const matchesLocation =
        selectedLocation === "all" || property.location.toLowerCase().includes(selectedLocation.toLowerCase())

      return matchesSearch && matchesType && matchesLocation
    })

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = Number.parseInt(a.startingPrice.replace(/[^\d]/g, ""))
          const priceB = Number.parseInt(b.startingPrice.replace(/[^\d]/g, ""))
          return priceA - priceB
        })
        break
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = Number.parseInt(a.startingPrice.replace(/[^\d]/g, ""))
          const priceB = Number.parseInt(b.startingPrice.replace(/[^\d]/g, ""))
          return priceB - priceA
        })
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.completionDate || "").getTime() - new Date(a.completionDate || "").getTime())
        break
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.badge === "Featured" && b.badge !== "Featured") return -1
          if (a.badge !== "Featured" && b.badge === "Featured") return 1
          return 0
        })
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
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
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
              <SelectTrigger>
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
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{currentContent.noProperties}</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedProperties.map((property) => (
                    <Card
                      key={property.id}
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={property.imageUrl || property.images?.[0] || "/images/SAFA 01.jpg"}
                          alt={property.name}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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

                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                            <div className="flex items-center text-gray-600 mb-3">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">{property.location}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                              {property.bedrooms && (
                                <div className="flex items-center">
                                  <Bed className="h-4 w-4 mr-1" />
                                  <span>{property.bedrooms}</span>
                                </div>
                              )}
                              {property.bathrooms && (
                                <div className="flex items-center">
                                  <Bath className="h-4 w-4 mr-1" />
                                  <span>{property.bathrooms}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1" />
                                <span>{property.area}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 pt-4 border-t">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">{currentContent.startingPrice}:</span>
                              <span className="font-semibold text-[#BDA25A]">{property.startingPrice}</span>
                            </div>
                            {property.rentalYield && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{currentContent.annualYield}:</span>
                                <span className="font-semibold text-green-600">{property.rentalYield}</span>
                              </div>
                            )}
                            {property.resaleValue && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{currentContent.projectedResale}:</span>
                                <span className="font-semibold text-blue-600">{property.resaleValue}</span>
                              </div>
                            )}
                            {property.completionDate && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{currentContent.completionDate}:</span>
                                <span className="font-semibold text-gray-700">{property.completionDate}</span>
                              </div>
                            )}
                          </div>

                          {property.features && property.features.length > 0 && (
                            <div className="pt-4 border-t">
                              <p className="text-sm text-gray-600 mb-2">{currentContent.features}:</p>
                              <div className="flex flex-wrap gap-1">
                                {property.features.slice(0, 3).map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                                {property.features.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{property.features.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          <Button className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white mt-4" asChild>
                            <Link href={`/properties/${property.id}`}>{currentContent.viewDetails}</Link>
                          </Button>
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
