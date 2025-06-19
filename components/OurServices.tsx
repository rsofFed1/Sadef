import { Button } from "./ui/button";
import { Content } from "@/types/content";
import Link from "next/link";
import { ScrollAnimation } from "./animations/ScrollAnimation";
import { Building2, TrendingUp, Shield, Award } from "lucide-react"

import { Card } from "./ui/card";

type Props = {
    currentContent: {
        services: Content['en']['services'] | Content['ar']['services'];
    };
}

export default function OurServices( { currentContent }: Props ) {
  return (
        <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation delay={0.2} direction="left">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{currentContent.services.title}</h2>
              <p className="text-xl text-gray-600">{currentContent.services.subtitle}</p>
            </div>
          </ScrollAnimation >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Building2, title: "Property Development", description: "Premium off-plan residential projects with modern amenities" },
              { Icon: TrendingUp, title: "Investment Consulting", description: "Expert guidance on property investment opportunities" },
              { Icon: Shield, title: "Property Maintenance", description: "Complete maintenance and management services" },
              { Icon: Award, title: "Legal Support", description: "Full legal assistance for property transactions" },
            ].map((service, index) => (
              <ScrollAnimation key={service.title} delay={index * 0.1} direction="right">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow group">
                  <div className="w-16 h-16 bg-[#BDA25A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#BDA25A] hover:bg-[#A8935A] text-white px-8 py-3" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
  );
}
