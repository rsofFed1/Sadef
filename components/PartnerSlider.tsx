import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ScrollAnimation } from './animations/ScrollAnimation';
interface Partner {
  id: number;
  name: string;
  logo: string;
}

export default function SuccessPartners() {
  const partners: Partner[] = [
    {
      id: 1,
      name: 'Banque Saudi Fransi',
      logo: '/images/partners/bank-1.png'
    },
    {
      id: 2,
      name: 'SAB',
      logo: '/images/partners/bank-2.png'
    },
    {
      id: 3,
      name: 'ANB',
      logo: '/images/partners/bank-3.png'
    },
    {
      id: 4,
      name: 'Subdivision',
      logo: '/images/partners/bank-4.png'
    },
    {
      id: 5,
      name: 'Aqarek',
      logo: '/images/partners/bank-5.png'
    },
    {
      id: 6,
      name: 'Al Shobaier',
      logo: '/images/partners/bank-6.png'
    },
    {
      id: 7,
      name: 'SNB',
      logo: '/images/partners/bank-7.png'
    },
    {
      id: 8,
      name: 'Musaed Trading Co',
      logo: '/images/partners/bank-8.png'
    },
    {
      id: 9,
      name: 'Bank Albilad',
      logo: '/images/partners/bank-9.png'
    },
    {
      id: 10,
      name: 'DGJ',
      logo: '/images/partners/bank-10.png'
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col space-y-8">
        <h2 className="text-4xl font-normal text-center text-[#243242]">
          Success Partners
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50
            }
          }}
          className="w-full py-8"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <ScrollAnimation delay={0.2} direction='down' className="flex items-center justify-center h-24 px-4">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    priority
                    className="object-contain transition-all duration-300"
                  />
                </div>
              </ScrollAnimation>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}