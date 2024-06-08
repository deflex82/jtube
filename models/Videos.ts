import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    VideoUrl:{
        type:String,
        required:true
    },
    Thumbnail:{
        type:String,
        default:""
    },
    tags:{
        type:String,
        default:""
    },
    title:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const Video = mongoose.models.Video || mongoose.model("Video",VideoSchema);


export default Video;