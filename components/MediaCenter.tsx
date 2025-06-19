"use client"

import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { ScrollAnimation } from "./animations/ScrollAnimation"
import { useBlogs } from "@/hooks/useBlogs"
import { format } from "date-fns"

export default function MediaCenter() {
  const { blogs, loading, error } = useBlogs(1, 6)

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-normal text-center">
            <span className="text-[#BDA25A]">Media</span>
            <span className="text-[#243242]"> Center</span>
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BDA25A]"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-normal text-center">
            <span className="text-[#BDA25A]">Media</span>
            <span className="text-[#243242]"> Center</span>
          </h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-600">Error loading blogs: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-normal text-center">
          <span className="text-[#BDA25A]">Media</span>
          <span className="text-[#243242]"> Center</span>
        </h2>
        <div className="flex flex-col md:flex-row space-y-8 gap-8">
          <ScrollAnimation
            delay={0.2}
            direction="left"
            className="flex md:flex-col justify-center md:justify-evenly items-center mt-4 w-100 md:w-[450px]"
          >
            <div className="flex md:flex-col gap-4">
              <h3 className="text-[#BDA25A] text-2xl">Latest News</h3>
              <button className="bg-[#EEF1F4] rounded-full px-6 py-2 text-[#243242]">Blogs</button>
            </div>
            <div className="hidden md:flex gap-4 items-center">
              <button className="custom-prev-button group relative" aria-label="Previous slide">
                <div className="bg-[#BDA25A] p-3 rounded-full transition-all duration-300 group-hover:bg-[#a08a3f] group-hover:shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="white"
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </div>
              </button>
              <button className="custom-next-button group relative" aria-label="Next slide">
                <div className="bg-white p-3 rounded-full shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="#243242"
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </button>
            </div>
            <div className="hidden md:flex items-center">
              <Link href="/blogs" className="text-[#BDA25A] font-medium hover:text-[#a08a3f] transition-colors">
                View all News
              </Link>
            </div>
          </ScrollAnimation>

          {/* News Slider */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next-button",
              prevEl: ".custom-prev-button",
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
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <ScrollAnimation
                  delay={0.2}
                  direction="right"
                  className="bg-white rounded-lg shadow-sm overflow-hidden h-full"
                >
                  <div className="relative h-52">
                    <Image
                      src={blog.imageUrl || "/images/SAFA 052.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-3">{format(new Date(blog.publishedDate), "dd/MM/yyyy")}</p>
                    <h4 className="text-[#243242] text-lg font-medium mb-4 line-clamp-2">{blog.title}</h4>
                    {blog.excerpt && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>}
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="text-[#BDA25A] font-medium hover:text-[#a08a3f] transition-colors"
                    >
                      Read more
                    </Link>
                  </div>
                </ScrollAnimation>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
