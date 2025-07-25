import Image from 'next/image';
import { ScrollAnimation } from './animations/ScrollAnimation';
import { Content } from '@/types/content';

type Props = {
  currentContent: {
    featureContent: Content["en"]["featureContent"] | Content["ar"]["featureContent"]
  }
}

const FeaturedSection = ({ currentContent }: Props) => {
  return (
    <section className="py-16 bg-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.featureContent.title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <ScrollAnimation delay={0.2} direction="left">
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-secondary font-tajawal">
                Sustainable Urban Communities
              </h2>
              <p className="text-generalText text-body leading-relaxed">
                By combining our long-standing experience and keeping pace with modern
                engineering developments, we at SAFA work to build upscale, smart and
                sustainable residential complexes, providing a high-quality living experience
                for your family.
              </p>
            </div>
          </ScrollAnimation>
          {/* Right Column - Feature Cards */}
          <div className="space-y-6">
            {/* Feature Card 1 */}
            <ScrollAnimation delay={0.1} direction="right">
              <div className="bg-bg-main rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64">
                    <Image
                      src="/images/SAFA_085.webp"
                      alt="Exquisite Architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-h3 font-bold text-secondary mb-3 font-tajawal">
                      Exquisite Architecture
                    </h3>
                    <p className="text-generalText">
                      Carefully designed to give you comfort, tranquility and relaxation,
                      making it an ideal place to live and enjoy life.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Feature Card 2 */}
            <ScrollAnimation delay={0.2} direction="right">
              <div className="bg-bg-main rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64">
                    <Image
                      src="/images/SAFA_101.webp"
                      alt="Unmatched Quality"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-h3 font-bold text-secondary mb-3 font-tajawal">
                      Unmatched Quality
                    </h3>
                    <p className="text-generalText">
                      Your Ideal Life Begins Here: A Luxurious Residence Where Desires Come to Life,
                      Without Ever Leaving Home.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
