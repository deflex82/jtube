import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    ChannelId:{
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
    }
},{
    timestamps:true
})


const Video = mongoose.models.Video || mongoose.model("Video",VideoSchema);


export default Video;