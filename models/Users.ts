import mongoose from "mongoose";

// Define your schema
const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    ImageUrl:{
        type:String,
        default:""
    },
    Followers: {
        type:Array,
        default:[]
    },
    Following:{
        type:Array,
        default:[]

    },
    liked: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Check if the model already exists, if not, create it
const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;
