import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ScrollAnimation } from './animations/ScrollAnimation';
interface NewsItem {
  id: number;
  date: string;
  title: string;
  image: string;
}

export default function MediaCenter() {
  const news: NewsItem[] = [
    {
      id: 1,
      date: '19/11/2024',
      title: 'Launch of a New Real Estate Fund to Support the Re...',
      image: '/images/SAFA 052.jpg',
    },
    {
      id: 2,
      date: '19/11/2024',
      title: 'Development of Safa Alfursan Project in Partnershi...',
      image: '/images/SAFA 085.jpg',
    },
    {
      id: 3,
      date: '19/11/2024',
      title: 'Safa Investment Successfully Concludes Its Partici...',
      image: '/images/SAFA 101.jpg',
    },
        {
      id: 4,
      date: '19/11/2024',
      title: 'Launch of a New Real Estate Fund to Support the Re...',
      image: '/images/SAFA 052.jpg',
    },
    {
      id: 5,
      date: '19/11/2024',
      title: 'Development of Safa Alfursan Project in Partnershi...',
      image: '/images/SAFA 085.jpg',
    },
    {
      id: 6,
      date: '19/11/2024',
      title: 'Safa Investment Successfully Concludes Its Partici...',
      image: '/images/SAFA 101.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
          <h2 className="text-4xl font-normal text-center">
          <span className="text-[#BDA25A]">Media</span>
          <span className="text-[#243242]"> Center</span>
          </h2>
          <div className="flex flex-col md:flex-row space-y-8 gap-8">
            <ScrollAnimation delay={0.2} direction='left' className="flex md:flex-col justify-center md:justify-evenly items-center mt-4 w-100 md:w-[450px]">
                <div className="flex md:flex-col gap-4">
                    <h3 className="text-[#BDA25A] text-2xl">Latest News</h3>
                    <button className="bg-[#EEF1F4] rounded-full px-6 py-2 text-[#243242]">
                    Blogs
                    </button>
                </div>
                <div className="hidden md:flex gap-4 items-center">
                    <button 
                    className="custom-prev-button group relative"
                    aria-label="Previous slide"
                    >
                    <div className="bg-[#BDA25A] p-3 rounded-full transition-all duration-300 group-hover:bg-[#a08a3f] group-hover:shadow-lg">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.5} 
                        stroke="white" 
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                        >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M15.75 19.5L8.25 12l7.5-7.5" 
                        />
                        </svg>
                    </div>
                    </button>
                    <button 
                    className="custom-next-button group relative"
                    aria-label="Next slide"
                    >
                    <div className="bg-white p-3 rounded-full shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:bg-gray-50">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.5} 
                        stroke="#243242" 
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                        >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M8.25 4.5l7.5 7.5-7.5 7.5" 
                        />
                        </svg>
                    </div>
                    </button>
                </div>
                <div className="hidden md:flex items-center ">
                <button className="text-[#BDA25A] font-medium hover:text-[#a08a3f] transition-colors">
                    View all News
                </button>
                </div>
            </ScrollAnimation>

            {/* News Slider */}
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                  nextEl: '.custom-next-button',
                  prevEl: '.custom-prev-button'
              }}
              autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
              }}
              breakpoints={{
                  640: {
                  slidesPerView: 2,
                  },
                  1024: {
                  slidesPerView: 3,
                  },
              }}
              className="w-full"
              >
              {news.map((item) => (
                <SwiperSlide key={item.id}>
                <ScrollAnimation delay={0.2} direction='right' className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
                  <div className="relative h-52">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-3">{item.date}</p>
                    <h4 className="text-[#243242] text-lg font-medium mb-4">{item.title}</h4>
                    <button className="text-[#BDA25A] font-medium hover:text-[#a08a3f] transition-colors">
                      Read more
                    </button>
                  </div>
                  </ScrollAnimation>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </div>
    </section>
  );
}
