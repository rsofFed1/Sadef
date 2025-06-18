"use client"

import { useState } from "react"
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

export default function PropertiesPage() {
  const [language, setLanguage] = useState<"en" | "ar">("ar")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const properties = [
    {
      id: 1,
      name: "Sadef Merano",
      location: "Al Nuzha District, Jeddah",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "173 m²",
      startingPrice: "SAR 115,000",
      rentalYield: "Up to SAR 75,000",
      resaleValue: "Up to SAR 600,000",
      annualReturn: "12-15%",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Featured",
      status: "Available",
      completionDate: "Q4 2025",
      features: ["Swimming Pool", "Gym", "Parking", "Security"],
    },
    {
      id: 2,
      name: "Sadef Fiore",
      location: "Premium Location, Jeddah",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: "145 m²",
      startingPrice: "SAR 95,000",
      rentalYield: "Up to SAR 60,000",
      resaleValue: "Up to SAR 480,000",
      annualReturn: "10-13%",
      image: "/placeholder.svg?height=300&width=400",
      badge: "New Launch",
      status: "Available",
      completionDate: "Q2 2026",
      features: ["Garden View", "Balcony", "Parking", "Storage"],
    },
    {
      id: 3,
      name: "Sadef Gardens",
      location: "North Jeddah",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: "250 m²",
      startingPrice: "SAR 180,000",
      rentalYield: "Up to SAR 120,000",
      resaleValue: "Up to SAR 900,000",
      annualReturn: "15-18%",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Luxury",
      status: "Available",
      completionDate: "Q1 2026",
      features: ["Private Garden", "Maid Room", "Driver Room", "Garage"],
    },
    {
      id: 4,
      name: "Sadef Heights",
      location: "Central Jeddah",
      type: "Apartment",
      bedrooms: 1,
      bathrooms: 1,
      area: "85 m²",
      startingPrice: "SAR 65,000",
      rentalYield: "Up to SAR 42,000",
      resaleValue: "Up to SAR 320,000",
      annualReturn: "11-14%",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Affordable",
      status: "Available",
      completionDate: "Q3 2025",
      features: ["City View", "Modern Kitchen", "Parking", "Elevator"],
    },
    {
      id: 5,
      name: "Sadef Towers",
      location: "Corniche, Jeddah",
      type: "Penthouse",
      bedrooms: 5,
      bathrooms: 4,
      area: "350 m²",
      startingPrice: "SAR 280,000",
      rentalYield: "Up to SAR 180,000",
      resaleValue: "Up to SAR 1,400,000",
      annualReturn: "16-20%",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Premium",
      status: "Limited",
      completionDate: "Q4 2026",
      features: ["Sea View", "Private Terrace", "Jacuzzi", "Smart Home"],
    },
    {
      id: 6,
      name: "Sadef Oasis",
      location: "East Jeddah",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 3,
      area: "200 m²",
      startingPrice: "SAR 140,000",
      rentalYield: "Up to SAR 90,000",
      resaleValue: "Up to SAR 700,000",
      annualReturn: "13-16%",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Family",
      status: "Available",
      completionDate: "Q1 2027",
      features: ["Private Entrance", "Garden", "Parking", "Storage"],
    },
  ]

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || property.type.toLowerCase() === selectedType.toLowerCase()
    const matchesLocation =
      selectedLocation === "all" || property.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesType && matchesLocation
  })

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
    },
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
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
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
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
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder={currentContent.location} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{currentContent.allLocations}</SelectItem>
                <SelectItem value="al nuzha">Al Nuzha District</SelectItem>
                <SelectItem value="north">North Jeddah</SelectItem>
                <SelectItem value="central">Central Jeddah</SelectItem>
                <SelectItem value="corniche">Corniche</SelectItem>
                <SelectItem value="east">East Jeddah</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-[#BDA25A] hover:bg-[#A8935A] text-white">
              <Filter className="h-4 w-4 mr-2" />
              {currentContent.applyFilters}
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            {currentContent.showing} {filteredProperties.length} {currentContent.of} {properties.length}{" "}
            {currentContent.properties}
          </p>
          <Select defaultValue="featured">
            <SelectTrigger className="w-48">
              <SelectValue placeholder={currentContent.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="return-high">Highest Returns</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-[#BDA25A] text-white">{property.badge}</Badge>
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
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
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
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{currentContent.annualYield}:</span>
                      <span className="font-semibold text-green-600">{property.rentalYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{currentContent.projectedResale}:</span>
                      <span className="font-semibold text-blue-600">{property.resaleValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{currentContent.completionDate}:</span>
                      <span className="font-semibold text-gray-700">{property.completionDate}</span>
                    </div>
                  </div>

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

                  <Button className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white mt-4" asChild>
                    <Link href={`/properties/${property.id}`}>{currentContent.viewDetails}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  )
}
