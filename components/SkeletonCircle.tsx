import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCircle() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[8px] w-4  rounded-full bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
     
    </div>
  )
}