"use client"

import { useState, useEffect } from "react"
import { getBlogs, type Blog } from "@/lib/api"

export function useBlogs(pageNumber = 1, pageSize = 10) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getBlogs(pageNumber, pageSize)

        if (response.succeeded && response.data) {
          setBlogs(response.data.items)
          setTotalCount(response.data.totalCount)
          setTotalPages(response.data.totalPages)
        } else {
          setError(response.message || "Failed to fetch blogs")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [pageNumber, pageSize])

  return { blogs, loading, error, totalCount, totalPages }
}
