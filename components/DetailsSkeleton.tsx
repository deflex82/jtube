import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDetails() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
        <Skeleton className="h-4 w-[200px] bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
      </div>
    </div>
  )
}
