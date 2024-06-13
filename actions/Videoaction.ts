"use server"
import {v2 as cloudinary} from "cloudinary"


import connectiontodb from "@/lib/database";
import extractPublicIdFromUrl from "@/lib/Urlextraction";

import Video from "@/models/Videos";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});




export async function deleteVideo(formdata: FormData) {
    try {
      const userId = formdata.get("currentUserId");
      const videoId = formdata.get("videoId");
  
      const concernedVideo = await Video.findOne({ _id: videoId });
      console.log(concernedVideo);
  
      if (concernedVideo.clerkId == userId) {
        // Delete video from Cloudinary
        const cloudinaryResponsedeletion = await cloudinary.uploader.destroy(`${extractPublicIdFromUrl(concernedVideo.VideoUrl)}`, { resource_type: 'video' });
      
        const cloudinarythumbnaildeletion = await cloudinary.uploader.destroy(`${extractPublicIdFromUrl(concernedVideo.Thumbnail)}`,{resource_type:"image"});
        console.log(cloudinaryResponsedeletion.result);
        console.log(cloudinarythumbnaildeletion.result);
  
  
        // If Cloudinary deletion was successful
        if (cloudinaryResponsedeletion.result === 'ok' && cloudinarythumbnaildeletion.result==="ok") {
          // Delete video from your database
          await Video.deleteOne({ _id: videoId });
        } else {
          console.log('Failed to delete video from Cloudinary');
        }
      } else {
        console.log("You can only delete your video");
      }
    } catch (err) {
      console.error(err);
      return err;
    }
    redirect("/");
  }

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

    redirect("/");


    

        

    }
    


    


  

  export {uploadaction};