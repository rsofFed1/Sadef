import { ArrowRight, Building2, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge"
import { Content } from "@/types/content";
import Link from "next/link";
import { ScrollAnimation } from "./animations/ScrollAnimation";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

type Props = {
  currentContent: {
    featured: Content["en"]["featured"] | Content["ar"]["featured"];
  };
};

const properties = [
    {
      id: 1,
      name: "Sadef Merano",
      location: "Al Nuzha District, Jeddah",
      type: "3-Bedroom Apartment",
      area: "173 m²",
      startingPrice: "SAR 115,000",
      rentalYield: "Up to SAR 75,000",
      resaleValue: "Up to SAR 600,000",
      image: "/images/SAFA 101.jpg",
      badge: "Featured",
    },
    {
      id: 2,
      name: "Sadef Fiore",
      location: "Premium Location, Jeddah",
      type: "2-Bedroom Apartment",
      area: "145 m²",
      startingPrice: "SAR 95,000",
      rentalYield: "Up to SAR 60,000",
      resaleValue: "Up to SAR 480,000",
      image: "/images/SAFA 052.jpg",
      badge: "New Launch",
    },
    {
      id: 3,
      name: "Sadef Gardens",
      location: "North Jeddah",
      type: "4-Bedroom Villa",
      area: "250 m²",
      startingPrice: "SAR 180,000",
      rentalYield: "Up to SAR 120,000",
      resaleValue: "Up to SAR 900,000",
      image: "/images/SAFA 085.jpg",
      badge: "Luxury",
    },
  ]

export default function FeaturedProperties({ currentContent }: Props) {
  return (
    <ScrollAnimation delay={0.2}>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {currentContent.featured.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentContent.featured.subtitle}
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <ScrollAnimation key={property.id} delay={index * 0.1}>
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#BDA25A] text-white">
                      {property.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {property.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {property.type} • {property.area}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Starting Price:
                          </span>
                          <span className="font-semibold text-[#BDA25A]">
                            {property.startingPrice}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Annual Rental Yield:
                          </span>
                          <span className="font-semibold text-green-600">
                            {property.rentalYield}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Projected Resale:
                          </span>
                          <span className="font-semibold text-blue-600">
                            {property.resaleValue}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white mt-4"
                        asChild
                      >
                        <Link href={`/properties/${property.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-[#BDA25A] text-[#BDA25A] hover:bg-[#BDA25A] hover:text-white px-8 py-3"
              asChild
            >
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
}
