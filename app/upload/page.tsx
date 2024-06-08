"use client";
import DropZone from '@/components/DropZone';
import React, { useEffect, useState } from 'react'

import VideoDropzone from '@/components/VideoZone';
import { cn } from '@/lib/utils';
import { createVideo } from '@/actions/Videoaction';

const Upload = () => {
  const [image, setImage] = useState<File | undefined>();
  const [video, setVideo] = useState<File | undefined>();
  const [isready,setready] = useState<Boolean>(false);
  const [tags,setTags]=useState<string>("") ;
  const [title,setTitle] = useState<string>("");
  const [loading,setISloading] = useState<Boolean>(false);
  const [Error,setError] = useState(null);

  useEffect(()=>{

    if(image && video && tags && title){
      setready(true);
    }
    else{
      setready(false);
    }

  },[video,image,tags,title])

    //  const createVideo = (e:any)=>{
    //   e.preventDefault();
    //   if (!image || !video || !tags || !title) return;
    


    //    let formData = new FormData();
    //    formData.append("video", video);
    //    formData.append("image", image);
    //    formData.append("tags", tags);
    //    formData.append("title", title);
   
    //    setISloading(true);
    //    setError(null);
    //    createVideo(formData);
       

    //   setISloading(true);

    //  }

  return (
    <div className='w-full p-4 '>
      <div className="max-w-5xl mx-auto  h-full">
        <form  action={createVideo} >

    
        <h2 className='text-xl font-semibold my-3'>Upload Video</h2>

      
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <h3>Source</h3>
              <VideoDropzone video={video} setVideo={setVideo} />


            </div>
            <div className="flex flex-col gap-2">
              <h3>Thumbnail</h3>
              <DropZone image={image} setImage ={setImage} />

            </div>
            <div className="flex flex-col gap-2">
              <h3>Title</h3>
              <input name='title' value={title} onChange={e=>setTitle(e.target.value)} className='bg-transparent w-full p-2 border outline-none font-semibold  border-[rgba(69,63,63,0.86)]' type='text' />

            </div>
            <div className="flex flex-col gap-2">
            <h3>Tags(*seperate each tags with comma)</h3>
            <input name="tags" value={tags} onChange={e=>setTags(e.target.value)} placeholder='example:Funny,Educational' type='text'  className='bg-transparent w-full p-2 border outline-none font-semibold  border-[rgba(69,63,63,0.86)]'/>
          </div>


          </div>

      

                   <div className="flex items-center gap-2">
                   <button className={cn('bg-pink-600 text-slate-100 px-3 py-2 rounded-sm hover:opacity-90 text-sm mt-4 transition cursor-pointer',`${isready?"":"pointer-events-none bg-gray-600"}`)}>Upload</button>
                   <p className='inline-block text-red-600 font-semibold text-sm'>*You need to complete above input fields to upload a video</p>

                   </div>
        
          </form>

   
     






      </div>

    </div>
  )
}

export default Upload;