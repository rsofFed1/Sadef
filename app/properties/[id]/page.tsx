"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PropertyCardSkeleton } from "@/components/PropertyCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, MapPin, Building2, Bed, Bath, Square, Phone, MessageCircle } from "lucide-react";
import { getPropertyById, type Property } from "@/lib/api";
import dynamic from "next/dynamic";
import { locations } from "@/app/data/locations";
import { DetailRow, PropertyDetail, statusMap } from "../(components)/statysMap";
import { propertyOptions, propertyStatuses } from "@/components/constants/constants";
import getOptionLabel from "@/app/utils/getOptionLabel";
import { contentPropertyDeatil } from "@/components/language/properties";

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = Number.parseInt(params.id as string);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const MapComponent = dynamic(() => import('@/components/MapContainer'), {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-[#BDA25A]">Loading map...</div>
      </div>
    ),
  });

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const isRTL = language === "ar";

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPropertyById(propertyId);

        if (response.succeeded && response.data) {
          setProperty(response.data);
          console.log('Fetched property:', response.data);
        } else {
          setError(response.message || "Property not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const currentContent = contentPropertyDeatil[language];

  const getImageSrc = (img: string) => {
    if (!img) return "/placeholder.svg";
    if (/^([A-Za-z0-9+/=]+)$/.test(img) && img.length > 100) {
      return `data:image/png;base64,${img}`;
    }
    return img;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <Navigation language={language} onLanguageToggle={toggleLanguage} />
        <div className="container mx-auto px-4 py-40">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            </div>
            <PropertyCardSkeleton />
          </div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
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
    );
  }

  const images = property.imageBase64Strings && property.imageBase64Strings.length > 0
    ? property.imageBase64Strings.map((img) => ({ type: "image", src: img }))
    : [{ type: "image", src: "/placeholder.svg" }];
  const videos = property.videoUrls && property.videoUrls.length > 0
    ? property.videoUrls.map((vid) => ({ type: "video", src: vid }))
    : [];
  const gallery = [...images, ...videos];

  const statusKey = Number(property.status) as keyof typeof statusMap;
  const status = statusMap[statusKey] || { label: property.status, color: "bg-black", svg: null };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-start space-x-2 text-sm text-helper">
              <Link href="/" className="hover:text-primary">
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/properties" className="hover:text-primary">
                {language === "ar" ? "العقارات" : "Properties"}
              </Link>
              <span>/</span>
              <span className="text-primary text-center">{property.title}</span>
            </div>
            <Button className="w-full lg:w-auto mt-4 lg:mt-0" variant="outline" asChild>
              <Link href="/properties">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentContent.backToProperties}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12 pt-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images & Videos */}
            <div className="space-y-4">
              <div className="relative h-96 w-full rounded-lg overflow-hidden flex items-center justify-center bg-black">
                {gallery[selectedImageIndex].type === "image" ? (
                  <Image
                    src={getImageSrc(gallery[selectedImageIndex].src)}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={gallery[selectedImageIndex].src}
                    controls
                    className="w-full h-full object-cover rounded-lg bg-black"
                  />
                )}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="bg-black/80 text-bg-main text-xs px-3 py-1 rounded-full flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>{getOptionLabel(property.propertyType, propertyOptions)}</span>
                </div>
                {/* Top right badges */}
                <div className={`absolute top-4 right-4 flex gap-2 z-10`}>
                  <span className={`${status.color} text-white text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
                    {status.svg}
                    {status.label}
                  </span>
                </div>
              </div>
              {/* Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {gallery.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-20 w-full rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index
                          ? "border-[#BDA25A]"
                          : "border-gray-200"
                      } flex items-center justify-center bg-black`}
                    >
                      {item.type === "image" ? (
                        <Image
                          src={getImageSrc(item.src)}
                          alt={`${property.title} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <>
                          <video
                            src={item.src}
                            className="object-cover w-full h-full opacity-70"
                            style={{ pointerEvents: "none" }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Property Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-white border border-gray-200 shadow-xl rounded-2xl space-y-8">
                {/* Title & Location */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3">{property.title}</h1>
                  <a
                    href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#BDA25A] hover:text-[#a8935a] transition text-base"
                    title="View on Google Maps"
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="underline">{property.location}</span>
                  </a>
                </div>

                <div
                  dangerouslySetInnerHTML={{__html: property.description}}
                  className="prose max-w-none text-body">
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="property-details">
                    <AccordionTrigger className="text-xl font-semibold text-primary">
                      {currentContent.propertyDetails}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <PropertyDetail icon={<Building2 className="text-[#BDA25A]" />} label={currentContent.propertyType} value={property.propertyType} />
                        <PropertyDetail icon={<Bed className="text-[#BDA25A]" />} label={currentContent.bedrooms} value={property.bedrooms} />
                        <PropertyDetail icon={<Bath className="text-[#BDA25A]" />} label={currentContent.bathrooms} value={property.bathrooms} />
                        <PropertyDetail icon={<Square className="text-[#BDA25A]" />} label={currentContent.area} value={`${property.areaSize} m²`} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Investment Section */}
                  <AccordionItem value="investment-details">
                    <AccordionTrigger className="text-xl font-semibold text-primary">
                      {currentContent.investmentDetails}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-4 text-sm text-primary pt-4">
                        <DetailRow label={currentContent.startingPrice} value={property.price} />
                        <DetailRow label="Unit Name" value={property.unitName} />
                        <DetailRow label="Projected Resale" value={property.projectedResaleValue} />
                        <DetailRow label="Annual Rent" value={property.expectedAnnualRent} />
                        <DetailRow label="Warranty" value={property.warrantyInfo} />
                        <DetailRow label="Status" value={propertyStatuses.find((status) => status.value === property.status)?.label ?? property.status}/>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Features Section */}
                  <AccordionItem value="features">
                    <AccordionTrigger className="text-xl font-semibold text-primary">
                      {currentContent.features}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {property.features?.length > 0 ? (
                          property.features.map((feature, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-primary px-3 py-1 rounded-full border border-gray-200">
                              {feature}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No features listed</span>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Additional Info Section */}
                  <AccordionItem value="additional-info">
                    <AccordionTrigger className="text-xl font-semibold text-primary">
                      {currentContent.additionalInfo}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <DetailRow label="Delivery" value={property.expectedDeliveryDate?.split('T')[0]} />
                        <DetailRow label="Investor Only" value={property.isInvestorOnly ? 'Yes' : 'No'} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </Card>

              {/* Contact Buttons */}
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-bg-main flex items-center gap-2"
                  asChild
                >
                  <Link href={`https://wa.me/${property.whatsAppNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    {language === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-[#00BCD4] text-white hover:bg-[#00A3BA] flex items-center gap-2"
                  asChild
                >
                  <Link href={`tel:${property.whatsAppNumber}`}>
                    <Phone className="w-5 h-5" />
                    {language === "ar" ? "فرص" : "Call"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container p-0 my-12 w-full h-[500px] rounded-sm overflow-hidden shadow-md">
        <MapComponent
          locations={locations}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
        />
      </div>
      <Footer language={language} />
    </div>
  );
}
