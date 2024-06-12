import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    videoId:{
        type:String,
        required:true
    },
    commentText:{
        type:String,
        required:true
    },
    clerkId:{
        type:String,
        required:true
    }

},{
    timestamps:true
})



const Comment = mongoose.models.Comments || mongoose.model("Comments",commentSchema);

export default Comment;