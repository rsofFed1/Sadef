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
        <section className="py-20 bg-bg-main">
        <div className="container mx-auto px-4">
          <ScrollAnimation delay={0.2} direction="left">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.services.title}</h2>
              <p className="text-primaryText text-generalText">{currentContent.services.subtitle}</p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Building2, title: currentContent.services.cardTitle1, description: currentContent.services.cardSubtitle1 },
              { Icon: TrendingUp, title: currentContent.services.cardTitle2, description: currentContent.services.cardSubtitle2 },
              { Icon: Shield, title: currentContent.services.cardTitle3, description: currentContent.services.cardSubtitle3 },
              { Icon: Award, title: currentContent.services.cardTitle4, description: currentContent.services.cardSubtitle4 },
            ].map((service, index) => (
              <ScrollAnimation key={service.title} delay={index * 0.1} direction="right">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow group bg-bg-main border border-bg-light rounded-lg">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.Icon className="h-8 w-8 text-bg-main" />
                  </div>
                  <h3 className="text-h3 font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-generalText">{service.description}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-bg-main px-8 py-3" asChild>
              <Link href="/services">{currentContent.services.cta}</Link>
            </Button>
          </div>
        </div>
      </section>
  );
}
