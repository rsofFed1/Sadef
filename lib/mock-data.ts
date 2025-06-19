import type { Blog, Property } from "./api"

export const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Welcome to Sadef Real-Estate Blog",
    excerpt: "Latest insights about the Saudi property market.",
    content: "<p>This is a demo blog post served from local mock data.</p>",
    imageUrl: "/images/SAFA 052.jpg",
    publishedDate: new Date().toISOString(),
    author: "Sadef Team",
    tags: ["News", "Market"],
  },
]

export const mockProperties: Property[] = [
  {
    id: 1,
    name: "Al-Rawda Residence",
    description: "Premium apartments in the heart of Jeddah.",
    location: "Jeddah",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "175 m²",
    startingPrice: "SAR 850 000",
    rentalYield: "8 %",
    resaleValue: "SAR 1 050 000",
    imageUrl: "/images/SAFA 01.jpg",
    status: "Available",
    completionDate: "Q4 2025",
    features: ["Pool", "Gym", "Parking"],
    badge: "Featured",
  },
]
