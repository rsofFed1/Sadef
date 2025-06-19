import { mockBlogs, mockProperties } from "./mock-data"
import type { ApiResponse, PaginatedResponse, Blog, Property } from "./types"

/* ---------- types stay the same ---------- */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Utility: build the SUCCESS envelope expected by the UI
function success<T>(payload: T): ApiResponse<T> {
  return { succeeded: true, message: "OK", data: payload }
}

/* ---------- BLOGS ---------- */
export async function getBlogs(pageNumber = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Blog>>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/blog?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    const json = (await res.json()) as ApiResponse<PaginatedResponse<Blog>>
    return json
  } catch {
    // Fallback to local mock data
    const start = (pageNumber - 1) * pageSize
    const items = mockBlogs.slice(start, start + pageSize)
    return success({
      items,
      totalCount: mockBlogs.length,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(mockBlogs.length / pageSize),
    })
  }
}

export async function getBlogById(id: number): Promise<ApiResponse<Blog>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/blog/${id}`)
    return (await res.json()) as ApiResponse<Blog>
  } catch {
    const blog = mockBlogs.find((b) => b.id === id)
    if (!blog) return { succeeded: false, message: "Not found", data: {} as Blog }
    return success(blog)
  }
}

/* ---------- PROPERTIES ---------- */
export async function getProperties(pageNumber = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Property>>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/property/get-all?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    const json = (await res.json()) as ApiResponse<PaginatedResponse<Property>>
    return json
  } catch {
    const start = (pageNumber - 1) * pageSize
    const items = mockProperties.slice(start, start + pageSize)
    return success({
      items,
      totalCount: mockProperties.length,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(mockProperties.length / pageSize),
    })
  }
}

export async function getPropertyById(id: number): Promise<ApiResponse<Property>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/property/get-by-id?id=${id}`)
    return (await res.json()) as ApiResponse<Property>
  } catch {
    const property = mockProperties.find((p) => p.id === id)
    if (!property) return { succeeded: false, message: "Not found", data: {} as Property }
    return success(property)
  }
}
