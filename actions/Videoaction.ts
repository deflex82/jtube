"use server"
import {v2 as cloudinary} from "cloudinary"


import connectiontodb from "@/lib/database";
import extractPublicIdFromUrl from "@/lib/Urlextraction";

import Video from "@/models/Videos";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import User from "@/models/Users";
import Comment from "@/models/Comments";
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
          await User.findOneAndUpdate(
            { clerkId: userId },
            { $inc: { videoCount: -1 } }, // Decrement videoCount by 1
            { new: true } // Return the updated user document
        );
        await Comment.deleteMany({videoId:videoId});
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


        });
        const user = await User.findOneAndUpdate(
          { clerkId: userId },
          { $inc: { noofvideos: 1 } }, // Increment videoCount by 1
          { new: true } // Return the updated user document
      );
        

    }catch(err){
        console.log(err);
    

    }
revalidatePath("/","page");
    redirect("/");


    

        

    }
    


    
    export const likedstatus = async (userId: string, videoId: string) => {
      try {
        const userdata = await User.findOne({ clerkId: userId });
        const videodata = await Video.findOne({ _id: videoId });
        
       
        const video = await JSON.parse(JSON.stringify(videodata));
            
        const user= await JSON.parse(JSON.stringify(userdata));
        if (!user || !videodata) {
          throw new Error('User or Video not found');
        }
    
        if (video?.likes?.includes(user._id)) {
          return "liked";
        } else if (video?.dislikes?.includes(user._id)) {
          return "disliked";
        } else {
          return "clean";
        }
      } catch (err) {
        console.error(err);
        return "error";
      }
    };
    

  

  export {uploadaction};



  export const togglelikeunlike = async (formdata: FormData) => {
    try {
      const userId: any = formdata.get("userId");
      const videoId: any = formdata.get("videoId");
      const user = await User.findOne({ clerkId: userId });
      const videodata = await Video.findOne({ _id: videoId });
  
      if (!user || !videodata) {
        throw new Error('User or Video not found');
      }
  
      const video: any = await JSON.parse(JSON.stringify(videodata));
      const likeStatus = await likedstatus(userId, videoId);
      console.log(likeStatus);
  
      if (likeStatus === "liked") {
        await Video.updateOne(
          { _id: video._id },
          { $pull: { likes: user?._id } }
        );
      } else {
        await Video.updateOne(
          { _id: video._id },
          { $push: { likes: user?._id } }
        );
        if (likeStatus === "disliked") {
          await Video.updateOne(
            { _id: video._id },
            { $pull: { dislikes: user?._id } }
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  
   // Adjust the import based on your project structure

  export const togglecondemn = async (formdata: FormData) => {
    try {
      const userId: any = formdata.get("userId");
      const videoId: any = formdata.get("videoId");
      const user = await User.findOne({ clerkId: userId });
      const videodata = await Video.findOne({ _id: videoId });
  
      if (!user || !videodata) {
        throw new Error('User or Video not found');
      }
  
      const video: any = await JSON.parse(JSON.stringify(videodata));
      const likeStatus = await likedstatus(userId, videoId);
      console.log(likeStatus);
  
      if (likeStatus === "disliked") {
        await Video.updateOne(
          { _id: video._id },
          { $pull: { dislikes: user?._id } }
        );
      } else {
        await Video.updateOne(
          { _id: video._id },
          { $push: { dislikes: user?._id } }
        );
        if (likeStatus === "liked") {
          await Video.updateOne(
            { _id: video._id },
            { $pull: { likes: user?._id } }
          );
        }
      }
    } catch (err) {
      console.error(err);
    }



  }
