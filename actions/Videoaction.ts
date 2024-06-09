"use server"

import imageKit from "@/lib/FileUpload";
import connectiontodb from "@/lib/database";
import Video from "@/models/Videos";
import { auth } from "@clerk/nextjs/server";


export async function createVideo(formData:any){
    console.log("request has arrived");

    try{
        console.log(formData);

    }
    catch(err){
        console.log(err)
    }


}
const uploadaction=async(formdata:FormData)=>{
    "use server";
    try{
        const { userId } = auth();
    
        const video = formdata.get("vid") as unknown as File;
        const image = formdata.get("img") as unknown as File;
        const title = formdata.get("title");
        const tags = formdata.get("tags");
      
     

        
    
        const arraybuffer = await video.arrayBuffer();
        const buffer = Buffer.from(arraybuffer);
    
        const videoresponse:any  = await imageKit.upload({
          file:buffer,
          fileName:video.name
        })

        const imagearrbuffer = await image.arrayBuffer();
        const imgbuffer = Buffer.from(imagearrbuffer);

        const thumbnailresponse  = await imageKit.upload({
            file:imgbuffer,
            fileName:image.name

        })
        console.log({videoresponse,thumbnailresponse})

        await connectiontodb();
        await Video.create({
            clerkId:userId,
            VideoUrl:videoresponse.url,
            Thumbnail:thumbnailresponse.thumbnailUrl,
            title:title,
            tags:tags,
            duration:videoresponse.duration


        })

    }catch(err){
        console.log(err);
    

    }


    

        

    }
    


    


  

  export {uploadaction};