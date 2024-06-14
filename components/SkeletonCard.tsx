import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full lg:w-[300px] rounded-xl bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
      <div className="space-y-2">
        <Skeleton className="h-4 lg:w-[300px] w-full bg-[rgba(90,67,67,0.6)] dark:bg-muted " />
        <Skeleton className="h-4 lg:w-[300px] w-full  bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
      </div>
    </div>
  )
}
