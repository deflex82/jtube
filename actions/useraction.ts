"use server";

import connectiontodb from "@/lib/database";
import User from "@/models/Users";
import { auth } from "@clerk/nextjs/server";
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
    const targetUser = await User.findOne({ clerkId: targetId });
    const currentUser = await User.findOne({ clerkId: userId });

    if (!targetUser || !currentUser) {
      throw new Error('User not found');
    }

    const isFollowing = targetUser.Followers.includes(currentUser._id);

    if (isFollowing) {
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

    return { isFollowing: !isFollowing }; // Return the new follow status
  } catch (err) {
    console.error(err);
    throw new Error('Error handling follow/unfollow');
  }
}
