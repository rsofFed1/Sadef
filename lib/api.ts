import { CloudCog } from "lucide-react"
import type { ApiResponse, PaginatedResponse, Blog, Property, CreateLeadPayload, LeadResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Utility: build the SUCCESS envelope expected by the UI
function success<T>(payload: T): ApiResponse<T> {
  return { succeeded: true, message: "OK", data: payload }
}

/* ---------- BLOGS ---------- */
export async function getBlogs(pageNumber = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Blog>>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/blog?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }

    const json = (await res.json()) as ApiResponse<PaginatedResponse<Blog>>
    return json
  } catch (error) {
    console.warn("API call failed:", error)

    return success({
      items:[],
      totalCount: 0,
      pageNumber:1,
      pageSize:0,
      totalPages: 0,
    })
  }
}

export async function getBlogById(id: number): Promise<ApiResponse<Blog>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/blog/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }

    return (await res.json()) as ApiResponse<Blog>
  } catch (error) {
    console.warn("API call failed:", error)
    return { succeeded: false, message: "Not found", data: {} as Blog }
  }
}

/* ---------- PROPERTIES ---------- */
export async function getProperties(pageNumber = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Property>>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/property/get-all?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }

    const json = (await res.json()) as ApiResponse<PaginatedResponse<Property>>
    return json
  } catch (error) {
    console.warn("API call failed:", error)
    return success({
      items:[],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 0,
      totalPages: 1,
    })
  }
}

export async function getPropertyById(id: number): Promise<ApiResponse<Property>> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/property/get-by-id?id=${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }

    return (await res.json()) as ApiResponse<Property>
  } catch (error) {
    console.warn("API call failed:", error)
    return { succeeded: false, message: "Not found", data: {} as Property }
  }
}

/* ---------- LEADS ---------- */

export async function createLead(payload: CreateLeadPayload): Promise<LeadResponse> {
  try {
    if (!API_BASE_URL || API_BASE_URL.includes("your-api-domain.com")) throw new Error("No real API configured")

    const res = await fetch(`${API_BASE_URL}/api/v1/lead/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }

    return (await res.json()) as LeadResponse
  } catch (error) {
    console.warn("API call failed for createLead:", error)
    return {
      succeeded: false,
      message: (error as Error).message,
      validationResultModel: null,
      data: {
        id: 0,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        propertyId: payload.propertyId,
        status: 0,
      },
    }
  }
}


// Export types for use in other files
export type { Blog, Property, ApiResponse, PaginatedResponse }
