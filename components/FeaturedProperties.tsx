import React, { Suspense } from "react"
import { Building2, MapPin, Bed, Bath } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "@/components/ui/badge"
import type { Content } from "@/types/content"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { useProperties } from "@/hooks/useProperties"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  currentContent: {
    featured: Content["en"]["featured"] | Content["ar"]["featured"]
  }
}

const getImageSrc = (img: string) => {
  if (!img) return "/images/SAFA 01.jpg"
  if (/^([A-Za-z0-9+/=]+)$/.test(img) && img.length > 100) {
    return `data:image/png;base64,${img}`
  }
  return img
}

function FeaturedPropertiesSkeleton({ currentContent }: Props) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.featured.title}</h2>
          <p className="text-xl text-gray-600">{currentContent.featured.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-64" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedPropertiesContent({ currentContent }: Props) {
  const { properties, loading, error } = useProperties(1, 3)

  if (loading) {
    return <FeaturedPropertiesSkeleton currentContent={currentContent} />
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.featured.title}</h2>
            <p className="text-xl text-gray-600">{currentContent.featured.subtitle}</p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">Error loading properties: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.featured.title}</h2>
          <p className="text-xl text-gray-600">{currentContent.featured.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property, index) => (
            <div key={property.id}>
              <Card key={property.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition hover:shadow-lg relative">
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
                  <div className="flex items-center justify-between gap-6 text-[#BDA25A] text-sm mb-5">
                    <span className="flex items-center gap-1"><Bed className="w-5 h-5" /> {property.bedrooms}</span>
                    <span className="flex items-center gap-1"><Bath className="w-5 h-5" /> {property.bathrooms}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center justify-between gap-6 text-gray-600 text-sm mb-3">
                      <span className="font-semibold">Unit Name:</span> {property.unitName}
                    </div>
                    <div className="flex items-center justify-between gap-6 text-gray-600 text-sm mb-3">
                      <span className="font-semibold">Projected Resale:</span> {property.projectedResaleValue}
                    </div>
                    <div className="flex items-center justify-between gap-6 text-gray-600 text-sm mb-3">
                      <span className="font-semibold">Annual Rent:</span> {property.expectedAnnualRent}
                    </div>
                    <div className="flex items-center justify-between gap-6 text-gray-600 text-sm mb-3">
                      <span className="font-semibold">Delivery:</span> {property.expectedDeliveryDate?.split('T')[0]}
                    </div>
                    <div className="flex items-center justify-between gap-6 text-gray-600 text-sm mb-3">
                      <span className="font-semibold">Investor Only:</span> {property.isInvestorOnly ? 'Yes' : 'No'}
                    </div>
                    <div className="flex items-center justify-between gap-6 text-gray-600 text-sm mb-3">
                      <span className="font-semibold">Status:</span> {property.status}
                    </div>
                  </div>
                  <div className="flex mt-2 justify-center">
                    <Button className="rounded-full bg-[#BDA25A] hover:bg-[#A8935A] text-white px-5" asChild><Link href={`/properties/${property.id}`}>View more</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" className="bg-[#BDA25A] hover:bg-[#A8935A] text-white px-8 py-3" asChild>
              <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function FeaturedProperties({ currentContent }: Props) {
  return (
    <Suspense fallback={<FeaturedPropertiesSkeleton currentContent={currentContent} />}>
      <FeaturedPropertiesContent currentContent={currentContent} />
    </Suspense>
  )
}
