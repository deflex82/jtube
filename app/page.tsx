
import { SkeletonCard } from "@/components/SkeletonCard";

import { getallVideos } from "@/lib/datafetching";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Video = dynamic(() => import('@/components/Video'), {
  ssr: false,
  loading: () => <SkeletonCard />, // Use the skeleton component while loading
});

export default async function Home() {
  const videos = await getallVideos();


  



  return (
    <div className="flex-1  lg:p-4 ">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 w-full">

        <Suspense fallback = {<SkeletonCard/>}>
        {
          videos?.map(video=>{
            
            return(
              <Video key={video._id} details={video}/>
            )
          })
    
        }

        </Suspense>

    
     

      </div>
    
    


    </div>
 
  );
}
