export interface ApiResponse<T> {
  succeeded: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export interface Blog {
  id: number
  title: string
  excerpt?: string
  content: string
  imageUrl?: string
  publishedDate: string
  author?: string
  tags?: string[]
}

export interface Property {
  id: number
  name: string
  description?: string
  location: string
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  area: string
  startingPrice: string
  rentalYield?: string
  resaleValue?: string
  annualReturn?: string
  imageUrl?: string
  images?: string[]
  status: string
  completionDate?: string
  features?: string[]
  badge?: string
}
