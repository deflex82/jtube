import { recommendedvideos } from '@/lib/datafetching'
import React from 'react'
import Video from "@/components/Video"

const RelatedVideos = async({id}:{id:string}) => {
    const videos = await recommendedvideos(id);
    console.log(videos);

  return (
    <>
      
      {
        videos?.map(video=>
          
          (
            <Video key={video._id} details={video}/>
          )
        )
  
      }
    </>




  )
}

export default RelatedVideos