import { recommendedvideos } from '@/lib/datafetching'
import React, { Suspense } from 'react'
import Video from "@/components/Video"

import { SkeletonCard } from './SkeletonCard';

const RelatedVideos = async({id}:{id:any}) => {
    const videos = await recommendedvideos(id);


  return (
    <>
    <Suspense fallback={<SkeletonCard/>}>
    {
        videos?.map(video=>
          
          (
            <Video key={video._id} details={video}/>
          )
        )
  
      }
      
    </Suspense>
      

    </>




  )
}

export default RelatedVideos