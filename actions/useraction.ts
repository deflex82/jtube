"use server";

import connectiontodb from "@/lib/database";
import Comment from "@/models/Comments";
import User from "@/models/Users";

import { revalidatePath } from "next/cache";

export default async function CreateUser(user:any){
    console.log("about to create mongodb")
    try{
        await connectiontodb();
        const newUser = await User.create(user);
        console.log(newUser);
        return JSON.parse(JSON.stringify(newUser));

    }
    catch(err){
        console.log(err);
    }
}


// Make sure to adjust the import according to your project structure

export async function handlefollowunfollow(targetId:string, userId:string) {
  try {


    if(targetId ==userId){
      return "you cannot follow yourself";
    }
    const targetUser = await User.findOne({ clerkId: targetId });
    const currentUser = await User.findOne({ clerkId: userId });

    if (!targetUser || !currentUser) {
      throw new Error('User not found');
    }

    const isfollowing = targetUser.Followers.includes(currentUser._id);

    if (isfollowing) {
      // If the current user is already following the target user, unfollow
      await User.updateOne(
        { _id: targetUser._id },
        { $pull: { Followers: currentUser._id } }
      );
      await User.updateOne(
        { _id: currentUser._id },
        { $pull: { Following: targetUser._id } }
      );
    } else {
      // If the current user is not following the target user, follow
      await User.updateOne(
        { _id: targetUser._id },
        { $push: { Followers: currentUser._id } }
      );
      await User.updateOne(
        { _id: currentUser._id },
        { $push: { Following: targetUser._id } }
      );
    }
    revalidatePath("/video/[id]","page")

    return { isfollowing: !isfollowing }; // Return the new follow status
  } catch (err) {
    console.error(err);
    throw new Error('Error handling follow/unfollow');
  }
}

export const PostComment = async(formdata:FormData)=>{
  try{
    const commentText = formdata.get("commenttext");
    const userId = formdata.get("userId");
    const videoId = formdata.get("videoId");


    const newcomment = await Comment.create({
      commentText:commentText,
      clerkId:userId,
      videoId:videoId
    })
    revalidatePath("/video/[id]","page");

    return JSON.parse(JSON.stringify(newcomment));

  
  }
  catch(err){
    console.log(err);
  }

}

export const FollowStatus = async(userId:string,targetId:string)=>{
  try{
   
    const targetUser = await User.findOne({ clerkId: targetId });
    const currentUser = await User.findOne({ clerkId: userId });

    if (!targetUser || !currentUser) {
      throw new Error('User not found');
    }
    
    const isfollowing = targetUser.Followers.includes(currentUser._id);
    if(isfollowing){
      
      return true;
    
    }
    else{
   
      return false;
     
    }

  }
  catch(err){
    console.log(err);
  }

}