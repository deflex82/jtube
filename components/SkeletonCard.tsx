import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full lg:w-[300px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 lg:w-[300px] w-full " />
        <Skeleton className="h-4 lg:w-[300px] w-full" />
      </div>
    </div>
  )
}
