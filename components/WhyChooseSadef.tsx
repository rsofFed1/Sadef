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
              {currentContent.whyChoose.cardTitle1}
            </h3>
            <p className="text-generalText">
              {currentContent.whyChoose.cardSubtitle1}
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
              {currentContent.whyChoose.cardTitle2}
            </h3>
            <p className="text-generalText">
              {currentContent.whyChoose.cardSubtitle2}
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
              {currentContent.whyChoose.cardTitle3}
            </h3>
            <p className="text-generalText">
              {currentContent.whyChoose.cardSubtitle3}
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
              {currentContent.whyChoose.cardTitle4}
            </h3>
            <p className="text-generalText">
              {currentContent.whyChoose.cardSubtitle4}
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
