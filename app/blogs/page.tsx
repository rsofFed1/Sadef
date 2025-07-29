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
import { BlogCardSkeleton } from "@/components/PropertyCardSkeleton"
import { formatDateTime } from "../utils/dateUtils"
import { content } from "@/components/language/blog"

export default function BlogsPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [displayCount, setDisplayCount] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 50 // Fetch more blogs to support load more

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

  const displayedBlogs = filteredBlogs.slice(0, displayCount)
  const hasMoreBlogs = displayedBlogs.length < filteredBlogs.length

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6)
  }

  const currentContent = content[language]

  return (
    <div className={`min-h-screen bg-bg-light text-generalText ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-bg-light to-bg-main pt-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-helper mb-6">
            <Link href="/" className="hover:text-secondary">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-secondary">{language === "ar" ? "المدونات" : "Blogs"}</span>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-h2 font-bold text-primary">{currentContent.title}</h2>
            <p className="text-primaryText text-secondary mt-4">{currentContent.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="container mt-4">
        <div className="flex items-center justify-between">
          <p className="text-helper">
            {currentContent.showing} {filteredBlogs.length}{" "}
            {currentContent.blogs}
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-helper" />
            <Input
              placeholder={currentContent.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-bg-main text-primary"
            />
          </div>
        </div>
      </section>
      {/* Blogs Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">
                {currentContent.error}: {error}
              </p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-helper">{currentContent.noBlogs}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBlogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 group bg-bg-main border border-bg-light rounded-lg"
                  >
                  <div className="relative overflow-hidden">
                    {blog.coverImage?.length > 0 ? (
                      <Image
                        src={`data:image/png;base64,${blog.coverImage}`}
                        alt={blog.title ? `Photo of ${blog.title}` : "blog image"}
                        width={400}
                        height={220}
                        className="w-full h-56 object-cover rounded-lg rounded-b-none"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gray-100 flex items-center justify-center rounded-lg rounded-b-none text-gray-400 text-sm">
                        {currentContent.noImageAvailable}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center text-sm text-helper space-x-4 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-body">{formatDateTime(blog.publishedAt)}</span>
                      </div>
                      <h3 className="text-h3 font-bold text-primary line-clamp-2">{blog.title}</h3>
                      {blog.content && (
                        <div
                          className="text-generalText text-secondaryText mt-2 mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                      )}
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary-hover text-bg-main mt-auto" asChild>
                      <Link href={`/blogs/${blog.id}`}>{currentContent.readMore}</Link>
                    </Button>
                  </CardContent>
                </Card>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreBlogs && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    className="bg-primary hover:bg-primary-hover text-bg-main px-8 py-3"
                  >
                    {currentContent.loadMore || "Load More"}
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
