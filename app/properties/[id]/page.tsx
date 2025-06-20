"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = Number.parseInt(params.id as string);

  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BDA25A]"></div>
            <span className="ml-4 text-gray-600">{currentContent.loading}</span>
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

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
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
      <section className="py-12">
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
            <div className="space-y-6">
              {/* Property Stats */}
              <Card className="p-6 bg-white border border-white shadow-lg">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                  {property.description && (
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {property.description}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4"> {currentContent.propertyDetails} </h3>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-[#BDA25A] mr-2" />
                      <div className="flex">
                        <p className="text-sm text-gray-600">
                          {currentContent.propertyType}
                        </p>
                        <p className="font-semibold text-sm text-gray-600 ml-2">{property.propertyType}</p>
                      </div>
                    </div>

                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 text-[#BDA25A] mr-2" />
                        <div className="flex">
                          <p className="text-sm text-gray-600">
                            {currentContent.bedrooms}
                          </p>
                          <p className="font-semibold text-sm text-gray-600 ml-2">{property.bedrooms}</p>
                        </div>
                      </div>
                    )}

                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 text-[#BDA25A] mr-2" />
                        <div className="flex">
                          <p className="text-sm text-gray-600">
                            {currentContent.bathrooms}
                          </p>
                          <p className="font-semibold text-sm text-gray-600 ml-2">{property.bathrooms}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Square className="h-5 w-5 text-[#BDA25A] mr-2" />
                      <div className="flex">
                        <p className="text-sm text-gray-600">
                          {currentContent.area}
                        </p>
                        <p className="font-semibold text-sm text-gray-600 ml-2">{property.areaSize} m²</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4"> Investment Details </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600"> {currentContent.startingPrice}: </span>
                      <span className="font-bold text-[#BDA25A] text-lg"> {property.price} </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"> Unit Name:: </span>
                      <span className="font-bold text-[#BDA25A] text-lg"> {property.unitName} </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"> Projected Resale: </span>
                      <span className="font-bold text-[#BDA25A] text-lg"> {property.projectedResaleValue} </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"> Annual Rent: </span>
                      <span className="font-bold text-[#BDA25A] text-lg"> {property.expectedAnnualRent} </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"> Warranty </span>
                      <span className="font-bold text-[#BDA25A] text-lg"> {property.warrantyInfo} </span>
                    </div>
                  </div>
                </div>
                <div>
                  {/* {property.features && property.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {currentContent.features}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-[#BDA25A] rounded-full mr-3"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {currentContent.features}
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600"> {currentContent.features}: </span>
                    <span className="font-bold text-[#BDA25A] text-lg"> {property.features} </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600"> Delivery: </span>
                    <span className="font-bold text-[#BDA25A] text-lg"> {property.expectedDeliveryDate?.split('T')[0]} </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600"> {currentContent.features}: </span>
                    <span className="font-bold text-[#BDA25A] text-lg"> {property.features} </span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-gray-600"> Investor Only:: </span>
                    <span className="font-bold text-[#BDA25A] text-lg"> {property.isInvestorOnly ? 'Yes' : 'No'} </span>
                  </div>
                </div>
              </Card>
              {/* Contact Actions */}
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="h-5 w-5 mr-2" />
                    {currentContent.contactUs}
                  </Link>
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white"
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
  );
}
