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
    console.log(formdata);
    try{
        const { userId } = auth();
    
        const video:any = formdata.get("vid") 
        const image = formdata.get("img") ;
        const title = formdata.get("title");
        const tags = formdata.get("tags");
        const duration = formdata.get("duration")
      
     

        
    
      

        await connectiontodb();
        await Video.create({
            clerkId:userId,
            VideoUrl:video,
            Thumbnail:image,
            title:title,
            tags:tags,
            duration:duration


        })

    }catch(err){
        console.log(err);
    

    }


    

        

    }
    


    


  

  export {uploadaction};