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
import { format } from "date-fns"

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

  const content = {
    en: {
      backToBlogs: "Back to Blogs",
      shareArticle: "Share Article",
      relatedPosts: "Related Posts",
      loading: "Loading blog...",
      error: "Error loading blog",
      notFound: "Blog not found",
    },
    ar: {
      backToBlogs: "العودة إلى المدونات",
      shareArticle: "مشاركة المقال",
      relatedPosts: "مقالات ذات صلة",
      loading: "جاري تحميل المدونة...",
      error: "خطأ في تحميل المدونة",
      notFound: "المدونة غير موجودة",
    },
  }

  const currentContent = content[language]

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = blog?.title || ""

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Navigation language={language} onLanguageToggle={toggleLanguage} />
        <div className="container mx-auto px-4 py-40">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BDA25A]"></div>
            <span className="ml-4 text-gray-600">{currentContent.loading}</span>
          </div>
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
      <section className="py-20 bg-white pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-[#BDA25A]">
              {language === "ar" ? "المدونات" : "Blogs"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A] truncate">{blog.title}</span>
          </div>

          <Button variant="outline" className="mb-6" asChild>
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentContent.backToBlogs}
            </Link>
          </Button>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Featured Image */}
              {blog.coverImage && (
                <div className="relative h-96 w-full">
                  <Image
                    src={blog.coverImage ? `data:image/png;base64,${blog.coverImage}` : "/images/SAFA 052.jpg"}
                    alt={blog.title}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                  />
                </div>
              )}

              <div className="p-8">
                {/* Meta Information */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{format(new Date(blog.publishedAt), "MMMM dd, yyyy")}</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 mr-2">{currentContent.shareArticle}:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                          "_blank",
                        )
                      }
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
                          "_blank",
                        )
                      }
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                          "_blank",
                        )
                      }
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>

            {/* Navigation */}
            <div className="mt-12 text-center">
              <Button size="lg" className="bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                <Link href="/blogs">{currentContent.backToBlogs}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
