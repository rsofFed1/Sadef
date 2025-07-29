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
  content: string
  coverImage: string
  publishedAt: string
  isPublished: boolean
  excerpt?: string // Optional, for UI convenience
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  unitCategory: string | number;
  city: string;
  location: string;
  areaSize: number;
  bedrooms: number;
  bathrooms: number;
  parking?: number; // Added for UI
  code?: string; // Added for UI
  imageBase64Strings: string[];
  status: number;
  expiryDate?: string | null;
  isExpired: boolean;
  videoUrls?: string[];
  unitName?: string | number;
  projectedResaleValue?: number | null;
  expectedAnnualRent?: number | null;
  warrantyInfo?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  whatsAppNumber?: string | null;
  expectedDeliveryDate?: string | null;
  isInvestorOnly: boolean;
  features: string[];
  area?: string;
  totalFloors: number;
}

export interface CreateLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  propertyId: number;
}

export interface LeadResponse {
  succeeded: boolean;
  message: string;
  validationResultModel: any;
  data: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    propertyId: number;
    status: number;
  };
}
