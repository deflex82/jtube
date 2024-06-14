import { Skeleton } from "./ui/skeleton";

export function VideoSkeleton() {
    return (
      <div className="flex flex-col space-y-3 w-full ">
        <Skeleton className="w-full h-[500px] rounded-xl" />
     
      </div>
    )
}