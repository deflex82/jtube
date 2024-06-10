"use client";
import React, { useState } from 'react'

const Page = () => {
  const [image, setimage] = useState<any>(null);
  const [video, setvideo] = useState<any>(null);

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`

  async function handleSubmit(e: any) {
    e.preventDefault();

    try{
      const imgformdata = new FormData();
      imgformdata.append("file",image);
      imgformdata.append("upload_preset",'qqjwyhbf')
  
      const imageupload = await fetch(url, {
  
        method: 'POST',
        body:imgformdata
      })
      console.log(await imageupload.json())

    }catch(err){
      console.log(err);
    }



  }
  return (


    <div>
      <form onSubmit={handleSubmit}>

        <input onChange={(e: any) => setimage(e.target.files[0])} type='file' name='image' />
    
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default Page