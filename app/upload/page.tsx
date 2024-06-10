"use client";

import React, { useEffect, useState } from 'react'


import { cn } from '@/lib/utils';
import { uploadaction } from '@/actions/Videoaction';

import { Button } from '@/components/FormButton';
import { UploadCloudIcon, Video } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';



const Upload = () => {
  
  const [video, setVideo] = useState<any>(null);
  const [isready, setready] = useState<Boolean>(false);
  const [tags, setTags] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [loading,setloading] = useState<Boolean>(false);
  const [img,setImage] = useState<any>(null);





  useEffect(() => {

    if ( video && tags && title && img) {
      setready(true);
    }
    else {
      setready(false);
    }

  }, [video,  tags, title,img])

  

const handleSubmit = async (e: any) => {
  e.preventDefault();


  const imgformdata = new FormData();
  imgformdata.append("upload_preset","qqjwyhbf")
  imgformdata.append("file",img);

  const vidformdata = new FormData();
  vidformdata.append("upload_preset","qqjwyhbf");
  vidformdata.append("file",video);
  

  try {
   
    setloading(true);
    const imageuploadurl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const videouploadurl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;

    
    const imageupload = await fetch(imageuploadurl, {
  
      method: 'POST',
      body:imgformdata
      
    })

    const videoupload  = await fetch(videouploadurl,{
      method:"POST",
      body:vidformdata
    })
    const imgresponse = await imageupload.json();
    const vidresponse =await videoupload.json();
    console.log({imgresponse,vidresponse})



    const formData = new FormData();
    formData.append("vid",vidresponse.secure_url);
    formData.append("img",imgresponse.secure_url);
    formData.append("title",title);
    formData.append("tags",tags);





    await uploadaction(formData); // Make sure uploadaction handles FormData
    setloading(false);
    toast({
      title:"Your video has been uploaded succesfully",
      description:"please visit your profile tag to see uploaded videos."
    })
  } catch (error:any) {
    alert('Upload failed');
    setloading(false);
    toast({
      title: "Some error occurred",
      description: `${error.message || error}`
    });
  
  }
};



const { toast } = useToast()

return (
  <div className='w-full p-4 '>
    <div className="max-w-4xl mx-auto  h-full">
      <form method='post' onSubmit={handleSubmit} >
       
        
        




        <h2 className='text-xl font-semibold my-3'>Upload Video</h2>


        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <h3>Source</h3>


            {
              !video ? <>
              
                <label  className='flex items-center flex-col gap-2 p-4 border border-neutral-200' htmlFor="fileId">
                  <Video />
                  <p>upload your video</p>

                  <input onChange={(e:any)=>setVideo(e.target.files[0])} accept='video/*' name='vid' className='hidden'  type="file" id="fileId" />

                </label>
              </> : <>
              <div className='w-full' >
              <video width={400} muted controls>
            <source src={URL.createObjectURL(video)}   />
            Your browser does not support HTML video.
          </video>
          <button  className='text-gray-600 p-2' onClick={()=>{setVideo(undefined)}}>Remove Video</button>


              </div>
           
              </>
            }




          </div>
          <div className="flex flex-col gap-2">
            <h3>Thumbnail</h3>


            {
              !img ? <>
              
                <label  className='flex items-center flex-col gap-2 p-4 border border-neutral-200' htmlFor="imgId">
                  <UploadCloudIcon />
                  <p>upload your Thumbnail</p>

                  <input onChange={(e:any)=>setImage(e.target.files[0])} accept='image/*' name='img' className='hidden'  type="file" id="imgId" />

                </label>
              </> : <>
              <div className='w-full' >
              
                <Image alt='thumbnail' height={400} width={400} src={URL.createObjectURL(img)}/>
       
          <button  className='text-gray-600 p-2' onClick={()=>{setImage(undefined)}}>Remove Image</button>


              </div>
           
              </>
            }




          </div>
       
          <div className="flex flex-col gap-2">
            <h3>Title</h3>
            <input name='title' value={title} onChange={e => setTitle(e.target.value)} className='bg-transparent w-full p-2 border outline-none font-semibold  border-[rgba(69,63,63,0.86)]' type='text' />

          </div>
          <div className="flex flex-col gap-2">
            <h3>Tags(*seperate each tags with comma)</h3>
            <input name="tags" value={tags} onChange={e => setTags(e.target.value)} placeholder='example:Funny,Educational' type='text' className='bg-transparent w-full p-2 border outline-none font-semibold  border-[rgba(69,63,63,0.86)]' />
          </div>


        </div>



        <div className="flex items-center gap-2">
          <Button isready={isready}>
            {loading ?"uploading......":"upload"}
          </Button>

          <p className={cn('inline-block text-red-600 font-semibold text-sm ', `${isready ? "hidden" : ""}`)}>*You need to complete above input fields to upload a video</p>
          <p className={cn('inline-block text-red-600 font-semibold text-sm ', `${loading ? "" : "hidden"}`)}>*please wait,your video is uploading ,this might take few minutes.</p>


        </div>

      </form>









    </div>

  </div>
)
}

export default Upload;