import Image from 'next/image';
import { ScrollAnimation } from './animations/ScrollAnimation';

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <ScrollAnimation delay={0.2} direction="left">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#BDA25A] font-tajawal">
                Sustainable Urban Communities
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
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
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64">
                    <Image
                      src="/images/SAFA 085.jpg"
                      alt="Exquisite Architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-2xl font-bold text-[#BDA25A] mb-3 font-tajawal">
                      Exquisite Architecture
                    </h3>
                    <p className="text-gray-600">
                      Carefully designed to give you comfort, tranquility and relaxation,
                      making it an ideal place to live and enjoy life.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Feature Card 2 */}
            <ScrollAnimation delay={0.2} direction="right">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64">
                    <Image
                      src="/images/SAFA 101.jpg"
                      alt="Unmatched Quality"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-2xl font-bold text-[#BDA25A] mb-3 font-tajawal">
                      Unmatched Quality
                    </h3>
                    <p className="text-gray-600">
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
