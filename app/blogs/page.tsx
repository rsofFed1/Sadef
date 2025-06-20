"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar } from "lucide-react"
import { useBlogs } from "@/hooks/useBlogs"
import { format } from "date-fns"

export default function BlogsPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  const { blogs, loading, error, totalPages } = useBlogs(currentPage, pageSize)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const isRTL = language === "ar"

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const content = {
    en: {
      title: "Latest News & Blogs",
      subtitle: "Stay updated with the latest news and insights from Sadef Real Estate",
      searchPlaceholder: "Search blogs...",
      readMore: "Read More",
      loading: "Loading blogs...",
      error: "Error loading blogs",
      noBlogs: "No blogs found",
      previousPage: "Previous",
      nextPage: "Next",
    },
    ar: {
      title: "آخر الأخبار والمدونات",
      subtitle: "ابق على اطلاع بآخر الأخبار والرؤى من سديف العقارية",
      searchPlaceholder: "البحث في المدونات...",
      readMore: "اقرأ المزيد",
      loading: "جاري تحميل المدونات...",
      error: "خطأ في تحميل المدونات",
      noBlogs: "لم يتم العثور على مدونات",
      previousPage: "السابق",
      nextPage: "التالي",
    },
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#BDA25A]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-[#BDA25A]">{language === "ar" ? "المدونات" : "Blogs"}</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{currentContent.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{currentContent.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="border-b bg-gray-900 py-2">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={currentContent.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BDA25A]"></div>
              <span className="ml-4 text-gray-600">{currentContent.loading}</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">
                {currentContent.error}: {error}
              </p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{currentContent.noBlogs}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border border-gray-200 rounded-lg">
                    <div className="relative overflow-hidden">
                      <Image
                        src={blog.coverImage ? `data:image/png;base64,${blog.coverImage}` : "/images/SAFA 052.jpg"}
                        alt={blog.title}
                        width={400}
                        height={250}
                        className="w-full h-52 object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{format(new Date(blog.publishedAt), "MMM dd, yyyy")}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{blog.title}</h3>

                        {blog.excerpt && <p className="text-gray-600 line-clamp-3">{blog.excerpt}</p>}

                        <Button className="w-full bg-[#BDA25A] hover:bg-[#A8935A] text-white" asChild>
                          <Link href={`/blogs/${blog.id}`}>{currentContent.readMore}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    {currentContent.previousPage}
                  </Button>

                  <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    {currentContent.nextPage}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}
