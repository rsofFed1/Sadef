import { getBlogById, type Blog } from "@/lib/api"
import { notFound } from "next/navigation"
import BlogDetailClient from "./blogDetail"

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blogId = Number.parseInt(params.id)

  if (isNaN(blogId)) {
    notFound()
  }

  const response = await getBlogById(blogId)

  if (!response.succeeded || !response.data) {
    notFound()
  }

  const blog: Blog = response.data

  return <BlogDetailClient blog={blog} />
}
