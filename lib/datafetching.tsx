import Video from "@/models/Videos";
import connectiontodb from "./database"
import User from "@/models/Users";
import Comment from "@/models/Comments";


const getallVideos = async()=>{
    try{
        await connectiontodb();
        const posts = await Video.find();
        return posts;
        
        

    }
    catch(err){
        console.log(err);

    }

}

export const getComments = async(videoId:string)=>{
    try{
        await connectiontodb();
        const comments = await Comment.find({videoId:videoId})
        return comments;

    }
    catch(err){
        console.log(err);
    }

}

export const getUserVideos = async(userId:string)=>{
    try{
        await connectiontodb();
        const Videos= await Video.find({clerkId:userId});
        return Videos;

    }
    catch(err){
        console.log(err);
    }
}

export const getUser = async(clerkId:string)=>{
    try{
        await connectiontodb();
        const user = await User.findOne({clerkId:clerkId});
        return user ||null;


    }
    catch(err){
        console.log(err);
    }
}

const getVideo = async (id: any) => {
    try {
        await connectiontodb();

        // If id is supposed to be MongoDB's _id, make sure to convert it to ObjectId
        // Import ObjectId from 'mongodb' or 'mongoose' as needed
    

        const video = await Video.findOneAndUpdate(
            { _id: id },  // Make sure to use _id if it's MongoDB's default
            { $inc: { views: 1 } },
            { new: true }  // This ensures the modified document is returned
        );

        return video || null;
    } catch (err) {
        console.error('Failed to fetch and update video:', err);
        return null;  // Returning null on error to signify failure
    }
};




const recommendedvideos = async(id?:string)=>{
    try{
        await connectiontodb();
        const video = await Video.find({
            _id: { $ne: id }
        })

        return video || null;

    }
    catch(err){
        console.error("Fialed to fetch and update videos",err);
        return null;

    }

}
export {getallVideos,getVideo,recommendedvideos};