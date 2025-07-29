"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Facebook, Twitter, Linkedin } from "lucide-react"
import { getBlogById, type Blog } from "@/lib/api"
import { BlogDetailSkeleton } from "@/components/PropertyCardSkeleton"
import { formatDateTime } from "@/app/utils/dateUtils"
import { contentBlogDetail } from "@/components/language/blog"

export default function BlogDetailPage() {
  const params = useParams()
  const blogId = Number.parseInt(params.id as string)

  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getBlogById(blogId)

        if (response.succeeded && response.data) {
          setBlog(response.data)
        } else {
          setError(response.message || "Blog not found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const currentContent = contentBlogDetail[language]

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />
      <div className="container mx-auto px-4 py-40">
        <BlogDetailSkeleton />
      </div>
      <Footer language={language} />
    </div>
    )
  }

  if (error || !blog) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Navigation language={language} onLanguageToggle={toggleLanguage} />
        <div className="container mx-auto px-4 py-40">
          <div className="text-center py-12">
            <p className="text-red-600">{error || currentContent.notFound}</p>
            <Button className="mt-4" asChild>
              <Link href="/blogs">{currentContent.backToBlogs}</Link>
            </Button>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 pt-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-start space-x-2 text-sm text-helper">
              <Link href="/" className="hover:text-primary">
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-primary">
                {language === "ar" ? "المدونات" : "Blogs"}
              </Link>
              <span>/</span>
              <span className="text-primary text-center">{blog.title}</span>
            </div>
            <Button className="w-full lg:w-auto mt-4 lg:mt-0" variant="outline" asChild>
              <Link href="/blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentContent.backToBlogs}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 pt-5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-8">
              {/* Featured Image */}
              <div className="relative overflow-hidden mb-4">
                {blog.coverImage?.length > 0 ? (
                  <Image
                    src={blog.coverImage ? `data:image/png;base64,${blog.coverImage}` : ""}
                    alt={blog.title ? `Photo of ${blog.title}` : "blog image"}
                    width={400}
                    height={220}
                    className="w-full h-72 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 text-sm">
                    {currentContent.noImageAvailable}
                  </div>
                )}
              </div>
                {/* Meta Information */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-body">{formatDateTime(blog.publishedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-h2 font-bold text-primary mb-6 leading-tight">{blog.title}</h2>

                {/* Content */}
                <div
                  className="text-helper"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
