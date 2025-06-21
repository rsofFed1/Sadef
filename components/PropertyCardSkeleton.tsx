import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <Card className="p-6 bg-white border border-white shadow-lg space-y-6">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-2" />
      <Skeleton className="h-4 w-full mb-6" />
      <div className="grid grid-cols-2 gap-4 mb-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="flex space-x-4 mt-6">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-12 w-1/2" />
      </div>
    </Card>
  );
}

export function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white border border-gray-200 rounded-lg">
      <Skeleton className="w-full h-52 object-cover rounded-t-lg" />
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full rounded" />
      </CardContent>
    </Card>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Skeleton className="w-full h-96 object-cover rounded-lg mb-8" />
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <Skeleton className="h-4 w-1/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-2/3 mb-6" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-4" />
        </CardContent>
      </Card>
      <div className="mt-12 text-center">
        <Skeleton className="h-12 w-48 mx-auto rounded" />
      </div>
    </div>
  );
}


export function MediaCenterSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-normal text-center">
          <span className="text-[#BDA25A]">Media</span>
          <span className="text-[#243242]"> Center</span>
        </h2>
        <div className="flex flex-col md:flex-row space-y-8 gap-8">
          <div className="flex md:flex-col gap-4 w-100 md:w-[450px]">
            <div className="h-8 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
                <div className="relative h-52 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-3 animate-pulse" />
                  <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-4 animate-pulse" />
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
