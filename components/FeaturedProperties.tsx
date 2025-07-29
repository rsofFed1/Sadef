import React, { Suspense } from "react"
import { MapPin, Bed, Bath } from "lucide-react"
import { Button } from "./ui/button"
import type { Content } from "@/types/content"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { useProperties } from "@/hooks/useProperties"
import { Skeleton } from "@/components/ui/skeleton"
import { statusMap } from "@/app/properties/(components)/statysMap"
import { propertyOptions, unitsOptions } from "./constants/constants"
import getOptionLabel from "@/app/utils/getOptionLabel"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "./FeaturedProperties.css";

type Props = {
  currentContent: {
    featured: Content["en"]["featured"] | Content["ar"]["featured"]
  }
}

const getImageSrc = (img: string) => {
  if (!img) return "/images/SAFA_01.webp"
  if (/^([A-Za-z0-9+/=]+)$/.test(img) && img.length > 100) {
    return `data:image/png;base64,${img}`
  }
  return img
}

function FeaturedPropertiesSkeleton({ currentContent }: Props) {
  return (
    <section className="py-20 bg-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.featured.title}</h2>
          <p className="text-primaryText text-generalText">{currentContent.featured.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-bg-main border border-bg-light rounded-lg overflow-hidden">
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
  const { properties, loading, error } = useProperties()

  if (loading) {
    return <FeaturedPropertiesSkeleton currentContent={currentContent} />
  }

  if (error) {
    return (
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.featured.title}</h2>
            <p className="text-primaryText text-generalText">{currentContent.featured.subtitle}</p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">Error loading properties: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.featured.title}</h2>
          <p className="text-primaryText text-generalText">{currentContent.featured.subtitle}</p>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next.custom-nav",
            prevEl: ".swiper-button-prev.custom-nav"
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {properties.map((property) => {
            const statusKey = Number(property.status) as keyof typeof statusMap;
            const status = statusMap[statusKey] || { label: property.status, color: "bg-black", svg: null };
            return (
              <SwiperSlide key={property.id}>
                <Card key={property.id} className="bg-bg-main rounded-2xl shadow-md border border-bg-light overflow-hidden flex flex-col transition hover:shadow-lg relative">
                  <div className="relative">
                    {property.imageBase64Strings?.length > 0 ? (
                      <Image
                        src={getImageSrc(property.imageBase64Strings[0])}
                        alt={property.title ? `Photo of ${property.title}` : "Property image"}
                        width={400}
                        height={220}
                        className="w-full h-56 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 text-sm">
                        {currentContent.featured.noImageAvailable}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span className="bg-black/80 text-bg-main text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>{getOptionLabel(property.propertyType, propertyOptions)}</span>
                    </div>
                    {/* Top right badges */}
                    <div className={`absolute top-4 right-4 flex gap-2 z-10`}>
                      <span className={`${status.color} text-bg-main text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
                        {status.svg}
                        {status.label}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                      <span className="bg-bg-main/80 text-generalText text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> {getOptionLabel(property.unitCategory, unitsOptions)}</span>
                    </div>
                  </div>
                  <CardContent className="flex-1 flex flex-col p-6 pb-4">
                    <div className="mb-2 min-h-32">
                      <h3 className="text-h3 font-bold text-primary mb-1">{property.title}</h3>
                      <div className="flex flex-row justify-between gap-2 text-body mb-4">
                        <div className="flex items-center text-generalText gap-2">
                          <a
                            href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-primary transition"
                            title="View on Google Maps"
                          >
                            <div className="flex justify-between gap-2">
                              <MapPin className="h-5 w-5" />
                              <span className="text-secondary">{property.location}</span>
                            </div>
                          </a>
                        </div>
                        <div className="flex items-center text-secondary gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 0011.314-11.314l-4.243-4.243a4 4 0 00-5.657 5.657l4.243 4.243z"/>
                          </svg>
                          <span>{property.area || property.areaSize + ' sqm'}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-secondary">﷼ {property.price?.toLocaleString() || '80,000'}</span>
                      </div>
                    </div>
                    <hr className="my-2 border-[#F5E7D6]" />
                    <div className="flex items-center justify-between gap-6 text-secondary text-body mb-5">
                      <span className="flex items-center gap-1"><Bed className="w-5 h-5" /> {property.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath className="w-5 h-5" /> {property.bathrooms}</span>
                    </div>
                    <div className="flex mt-2 justify-center">
                      <Button className="rounded-full bg-primary hover:bg-primary-hover text-bg-main px-5" asChild><Link href={`/properties/${property.id}`}>View more</Link></Button>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            );
          })}
          {/* Swiper navigation arrows (custom class for responsive hide) */}
          <div className="swiper-button-prev custom-nav"></div>
          <div className="swiper-button-next custom-nav"></div>
        </Swiper>
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary-hover text-bg-main px-8 py-3" asChild>
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
