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
import { Search, Filter, MapPin, Bed, Bath, CloudCog, Bell } from "lucide-react"
import { useProperties } from "@/hooks/useProperties"
import { PropertyCardSkeleton } from "@/components/PropertyCardSkeleton";
import getOptionLabel from "../utils/getOptionLabel"
import { propertyOptions, unitsOptions } from "@/components/constants/constants"
import { statusMap } from "./(components)/statysMap"
import { InquiryModal } from "./(components)/InquiryModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { content } from "../../components/language/properties"

export default function PropertiesPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const pageSize = 9
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const { properties, loading, error} = useProperties()
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

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

  const visibleProperties = filteredAndSortedProperties.slice(0, visibleCount)

  const currentContent = content[language]

  const getImageSrc = (img: string) => {
    if (!img) return "/images/SAFA_01.webp"
    if (/^([A-Za-z0-9+/=]+)$/.test(img) && img.length > 100) {
      return `data:image/png;base64,${img}`
    }
    return img
  }

  return (
    <div className={`min-h-scree text-generalText ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="pb-10 bg-gradient-to-b pt-40 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-helper mb-4">
            <Link href="/" className="hover:text-secondary">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-secondary">{language === "ar" ? "العقارات" : "Properties"}</span>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold text-primary">{currentContent.title}</h2>
            <p className="text-primaryText text-secondary mt-4">{currentContent.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="container-fluid border-b bg-primary py-2 mb-3">
          <div className="container mx-auto px-4 py-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-helper" />
                <Input
                  placeholder={currentContent.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-bg-main text-primary"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-bg-main text-primary">
                  <SelectValue placeholder={currentContent.propertyType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{currentContent.allTypes}</SelectItem>
                  {propertyTypes.map((type) =>
                    typeof type === "string" ? (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ) : null
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-bg-main text-primary">
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

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                {currentContent.applyFilters}
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
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
              <p className="text-helper">
                {currentContent.showing} {filteredAndSortedProperties.length}{" "}
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
                <h3 className="text-h3 font-semibold mb-2">{currentContent.noProperties}</h3>
                <p className="text-helper">Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleProperties.map((property) => {
                    const statusKey = Number(property.status) as keyof typeof statusMap;
                    const status = statusMap[statusKey] || { label: property.status, color: "bg-black", svg: null };
                    return (
                      <Card
                        key={property.id}
                        className="bg-bg-main rounded-2xl shadow-md border border-bg-light overflow-hidden flex flex-col transition hover:shadow-lg relative"
                      >
                        <div className="relative">
                          {property.imageBase64Strings?.length > 0 ? (
                            <Image
                              src={getImageSrc(property.imageBase64Strings[0])}
                              alt={property.title ? `Photo of ${property.title}` : "Property image"}
                              width={400}
                              height={220}
                              className="w-full h-56 object-cover rounded-lg rounded-b-none"
                            />
                          ) : (
                            <div className="w-full h-56 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 text-sm">
                              {currentContent.noImageAvailable}
                            </div>
                          )}
                          <div className="absolute top-4 left-4 flex gap-2 z-10">
                            <span className="bg-black/80 text-bg-main text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>{getOptionLabel(property.propertyType, propertyOptions)}</span>
                          </div>
                          <div className={`absolute top-4 right-4 flex gap-2 z-10`}>
                            <span className={`${status.color} text-bg-main text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
                              {status.svg}
                              {status.label}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                            <span className="bg-bg-main/80 text-generalText text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> {getOptionLabel(property.unitCategory, unitsOptions)}</span>
                          </div>
                          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  className="text-secondary"
                                  title="Inquire about this property"
                                  onClick={() => {
                                    setSelectedPropertyId(property.id);
                                    setModalOpen(true);
                                  }}
                                >
                                  <Bell className="h-6 w-6" />
                                </button>
                              </DialogTrigger>
                            </Dialog>
                          </div>
                        </div>
                        <CardContent className="flex-1 flex flex-col p-6 pb-4">
                          <div className="flex-1 flex flex-col justify-between">
                            {/* Content Section */}
                            <div>
                              <h3 className="text-xl font-bold text-primary mb-2">{property.title}</h3>
                              <div className="flex flex-wrap justify-between items-start gap-4 text-sm text-gray-600 mb-4">
                                <a
                                  href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 hover:text-primary transition-colors"
                                  title="View on Google Maps"
                                >
                                  <MapPin className="w-5 h-5 text-secondary" />
                                  <span className="text-helper text-secondary">{property.location}</span>
                                </a>
                                <div className="flex items-center gap-2 text-secondary">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z" />
                                  </svg>
                                  <span>{property.area || property.areaSize + ' sqm'}</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-between mb-4">
                                <span className="text-primaryText font-extrabold text-secondary tracking-tight">
                                  ﷼ {property.price?.toLocaleString()}
                                </span>
                                <div className="flex flex-wrap gap-1 text-sm text-secondary">
                                  <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                                    <Bed className="w-5 h-5 mr-2" /> {property.bedrooms}
                                  </span>
                                  <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                                    <Bath className="w-5 h-5 mr-2" /> {property.bathrooms}
                                  </span>
                                </div>
                              </div>
                              <hr className="my-3 border-gray-200" />
                              {/* Property Overview */}
                              <div className="space-y-6">
                                <div className="flex justify-between items-center border-b pb-4">
                                  <h3 className="text-lg font-semibold text-gray-900">{currentContent.propertyOverview}</h3>
                                  <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
                                    {property.isInvestorOnly ? currentContent.investorOnly : currentContent.general}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-700">
                                  <div>
                                    <span className="block font-medium text-gray-900 mb-1">{currentContent.unitName}</span>
                                    <span>{property.unitName}</span>
                                  </div>
                                  <div>
                                    <span className="block font-medium text-gray-900 mb-1">{currentContent.projectedResale}</span>
                                    <span>{property.projectedResaleValue}</span>
                                  </div>
                                  <div>
                                    <span className="block font-medium text-gray-900 mb-1">{currentContent.annualRent}</span>
                                    <span>{property.expectedAnnualRent}</span>
                                  </div>
                                  <div>
                                    <span className="block font-medium text-gray-900 mb-1">{currentContent.delivery}</span>
                                    <span>{property.expectedDeliveryDate?.split("T")[0] || "-"}</span>
                                  </div>
                                  <div>
                                    <span className="block font-medium text-gray-900 mb-1">{currentContent.warranty}</span>
                                    <span>{property.warrantyInfo || "-"}</span>
                                  </div>
                                </div>

                                {/* Features */}
                                <div>
                                  <span className="block font-medium text-gray-900 mb-2">{currentContent.features}</span>
                                  <div className="flex flex-wrap gap-2">
                                    {property.features?.length ? (
                                      property.features.map((feature, idx) => (
                                        <span
                                          key={idx}
                                          className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-300"
                                        >
                                          {feature}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-sm text-gray-500">No features listed</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Button at Bottom */}
                            <div className="mt-6 flex justify-end">
                              <Button className="rounded-full bg-green-600 text-white hover:bg-green-500 px-6 py-2 text-sm shadow" asChild>
                                <Link href={`/properties/${property.id}`}>{currentContent.viewDetails}</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
                {visibleCount < filteredAndSortedProperties.length && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setVisibleCount((prev) => prev + pageSize)}
                      className="px-6 py-2 text-base font-medium"
                    >
                      {currentContent.loadMore}
                    </Button>
                  </div>
                )}
                {selectedPropertyId !== null && (
                  <InquiryModal
                    open={modalOpen}
                    onOpenChange={(open) => {
                      setModalOpen(open);
                      if (!open) setSelectedPropertyId(null);
                    }}
                    propertyId={selectedPropertyId}
                  />
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
