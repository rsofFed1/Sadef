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
import {
  ArrowLeft,
  MapPin,
  Building2,
  Bed,
  Bath,
  Square,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getPropertyById, type Property } from "@/lib/api";
import dynamic from "next/dynamic";
import { locations } from "@/app/data/locations";
import { DetailRow, PropertyDetail, statusMap } from "../(components)/statysMap";
import { propertyOptions, propertyStatuses } from "@/components/constants/constants";
import getOptionLabel from "@/app/utils/getOptionLabel";

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
  };

  const currentContent = content[language];

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

  const images =
    property.imageBase64Strings && property.imageBase64Strings.length > 0
      ? property.imageBase64Strings
      : ["/placeholder.svg"];

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
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-[#BDA25A]">
              {language === "ar" ? "العقارات" : "Properties"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A] truncate">{property.title}</span>
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
      <section className="py-12 pt-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={getImageSrc(images[selectedImageIndex])}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
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

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-20 w-full rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index
                          ? "border-[#BDA25A]"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={getImageSrc(image)}
                        alt={`${property.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
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
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
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
                  dangerouslySetInnerHTML={{__html: property.description || "<span class='text-gray-400'>No description provided.</span>",}}
                  className="prose max-w-none text-gray-700">
                </div>

                {/* Property Details Section */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{currentContent.propertyDetails}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PropertyDetail icon={<Building2 className="text-[#BDA25A]" />} label={currentContent.propertyType} value={property.propertyType} />
                    {property.bedrooms && <PropertyDetail icon={<Bed className="text-[#BDA25A]" />} label={currentContent.bedrooms} value={property.bedrooms} />}
                    {property.bathrooms && <PropertyDetail icon={<Bath className="text-[#BDA25A]" />} label={currentContent.bathrooms} value={property.bathrooms} />}
                    <PropertyDetail icon={<Square className="text-[#BDA25A]" />} label={currentContent.area} value={`${property.areaSize} m²`} />
                  </div>
                </section>
                {/* Investment Section */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-h3 font-bold text-generalText mb-6 flex items-center gap-2">Investment Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                    <DetailRow label={currentContent.startingPrice} value={property.price} />
                    <DetailRow label="Unit Name" value={property.unitName} />
                    <DetailRow label="Projected Resale" value={property.projectedResaleValue} />
                    <DetailRow label="Annual Rent" value={property.expectedAnnualRent} />
                    <DetailRow label="Warranty" value={property.warrantyInfo} />
                    <DetailRow label="Status" value={propertyStatuses.find((status) => status.value === property.status)?.label ?? property.status}/>
                  </div>
                </section>

                {/* Features Section */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{currentContent.features}</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features?.length > 0 ? (
                      property.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200">
                          {feature}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No features listed</span>
                    )}
                  </div>
                </section>

                {/* Delivery & Investor Info */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <DetailRow label="Delivery" value={property.expectedDeliveryDate?.split('T')[0]} />
                  <DetailRow label="Investor Only" value={property.isInvestorOnly ? 'Yes' : 'No'} />
                </section>
              </Card>

              {/* Contact Buttons */}
              <div className="space-y-4">
                <Button size="lg" className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                  <Link href="/contact">
                    <Phone className="h-5 w-5 mr-2" />
                    {property.whatsAppNumber}
                  </Link>
                </Button>
                <Button size="lg" className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                  <Link href={`https://wa.me/${property.whatsAppNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
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
