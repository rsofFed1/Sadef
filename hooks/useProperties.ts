"use client"

import { useState, useEffect } from "react"
import { getProperties, type Property } from "@/lib/api"

export function useProperties(pageNumber = 1, pageSize = 20) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getProperties(pageNumber, pageSize)

        if (response.succeeded && response.data) {
          setProperties(response.data.items)
          setTotalCount(response.data.totalCount)
          setTotalPages(response.data.totalPages)
        } else {
          setError(response.message || "Failed to fetch properties")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [pageNumber, pageSize])

  return { properties, loading, error, totalCount, totalPages }
}
