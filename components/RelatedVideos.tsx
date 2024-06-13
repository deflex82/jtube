import { recommendedvideos } from '@/lib/datafetching'
import React from 'react'
import Video from "@/components/Video"

const RelatedVideos = async({id}:{id:any}) => {
    const videos = await recommendedvideos(id);


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