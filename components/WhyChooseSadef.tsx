import { Content } from "@/types/content";
import { ScrollAnimation } from "./animations/ScrollAnimation";
import { Shield, Award, Star, MessageCircle } from "lucide-react";

type Props = {
  currentContent: {
    whyChoose: Content["en"]["whyChoose"] | Content["ar"]["whyChoose"];
  };
};

export default function WhyChooseSadef({ currentContent }: Props) {
  return (
    <section className="py-16 bg-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.whyChoose.title}</h2>
          <p className="text-primaryText text-generalText">{currentContent.whyChoose.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollAnimation
            delay={0.2}
            direction="left"
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-h3 font-bold text-primary mb-3">
              Full Transparency
            </h3>
            <p className="text-generalText">
              Complete disclosure of all costs and projected returns
            </p>
          </ScrollAnimation>

          <ScrollAnimation
            delay={0.2}
            direction="left"
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-h3 font-bold text-primary mb-3">
              17 Years Experience
            </h3>
            <p className="text-generalText">
              Proven track record in Jeddah's real estate market
            </p>
          </ScrollAnimation>

          <ScrollAnimation
            delay={0.2}
            direction="right"
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Star className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-h3 font-bold text-primary mb-3">
              Premium Quality
            </h3>
            <p className="text-generalText">
              High-standard construction and modern amenities
            </p>
          </ScrollAnimation>

          <ScrollAnimation
            delay={0.2}
            direction="right"
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-[#A8935A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-h3 font-bold text-primary mb-3">
              24/7 Support
            </h3>
            <p className="text-generalText">
              Dedicated customer service and maintenance support
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
