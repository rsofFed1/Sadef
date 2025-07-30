"use client"

import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { ScrollAnimation } from "./animations/ScrollAnimation"
import { useBlogs } from "@/hooks/useBlogs"
import { MediaCenterSkeleton } from "./PropertyCardSkeleton"
import { Content } from "@/types/content"
import { formatDateTime } from "@/app/utils/dateUtils"

type Props = {
  currentContent: {
    mediaCenter: Content["en"]["mediaCenter"] | Content["ar"]["mediaCenter"]
  }
  language?: "en" | "ar"
}

export default function MediaCenter({ currentContent, language = "en" }: Props) {
  const { blogs, loading, error } = useBlogs()

  const isRTL = language === "ar"

  if (loading) {
    return <MediaCenterSkeleton />;
  }

  if (loading) {
    return (
      <section className="py-16 bg-bg-light">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.mediaCenter.title}</h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-bg-light">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.mediaCenter.title}</h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-600">{currentContent.mediaCenter.error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-bg-light">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.mediaCenter.title}</h2>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 gap-8">
          <ScrollAnimation
            delay={0.2}
            direction="left"
            className="flex md:flex-col justify-center md:justify-evenly items-center mt-4 w-100 md:w-[450px]"
          >
            <div className="flex md:flex-col gap-4">
              <h3 className="text-primary text-h3">{currentContent.mediaCenter.latestNews}</h3>
              <Link href="/blogs" passHref legacyBehavior>
                <button className="bg-bg-light rounded-full px-6 py-2 text-primary">{currentContent.mediaCenter.blogs}</button>
              </Link>
            </div>
            <div className="hidden md:flex gap-4 items-center">
              <button className={`${isRTL ? "custom-next-button" : "custom-prev-button"} group relative`} aria-label="Previous slide">
                <div className="bg-primary p-3 rounded-full transition-all duration-300 group-hover:bg-primary-hover group-hover:shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="white"
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M8.25 4.5l7.5 7.5-7.5 7.5" : "M15.75 19.5L8.25 12l7.5-7.5"} />
                  </svg>
                </div>
              </button>
              <button className={`${isRTL ? "custom-prev-button" : "custom-next-button"} group relative`} aria-label="Next slide">
                <div className="bg-white p-3 rounded-full shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="#243242"
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"} />
                  </svg>
                </div>
              </button>
            </div>
            <div className="hidden md:flex items-center mt-4">
              <Link href="/blogs" className="text-secondary font-medium hover:text-secondary/80 transition-colors">
                {currentContent.mediaCenter.viewAllNews}
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
                slidesPerView: 2,
              },
            }}
            className="w-full"
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <ScrollAnimation
                  delay={0.2}
                  direction="right"
                  className="bg-bg-main rounded-lg shadow-sm overflow-hidden h-full"
                >
                  <div className="relative">
                    {blog.coverImage?.length > 0 ? (
                      <Image
                        src={blog.coverImage ? `data:image/png;base64,${blog.coverImage}` : ""}
                        alt={blog.title ? `Photo of ${blog.title}` : "blog image"}
                        width={400}
                        height={230}
                        className="w-full h-56  object-cover rounded-lg rounded-b-none"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gray-100 flex items-center justify-center rounded-lg rounded-b-none text-gray-400 text-sm">
                        {currentContent.mediaCenter.noImageAvailable}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-body mb-3">{formatDateTime(blog.publishedAt)}</p>
                    <h4 className="text-primary text-h3 font-medium mb-4 line-clamp-2">{blog.title}</h4>
                    {blog.content && (
                      <p className="text-generalText text-body mb-4 line-clamp-1" dangerouslySetInnerHTML={{__html: blog.content}} />
                    )}
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="text-secondary font-medium hover:text-secondary/80 transition-colors"
                    >
                      {currentContent.mediaCenter.readMore}
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
