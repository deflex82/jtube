import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDetails() {
  return (
    <div className="flex items-center space-x-4 w-full justify-between">
      <div className="flex items-center gap-2">
      <Skeleton className="h-12 w-12 rounded-full bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
        <Skeleton className="h-4 w-[200px] bg-[rgba(90,67,67,0.6)] dark:bg-muted" />
      </div>

      </div>
      <div className=" gap-2 hidden md:flex">
        
      <div className="h-4 w-[100px]  bg-[rgba(90,67,67,0.6)]  dark:bg-muted rounded-md p-3"></div>
      <div className="h-4 w-[100px]  bg-[rgba(90,67,67,0.6)]  dark:bg-muted rounded-md p-3"></div>

      </div>

    
  
    </div>
  )
}
