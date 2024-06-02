import mongoose from "mongoose";
const uri:any = process.env.MONGODB_URI
const connectiontodb  =async()=>{
    if(mongoose.connections[0].readyState){
        return true;
    }
    try{
        await mongoose.connect(uri);
        console.log("Succesfully connected to database");
        return true;
       

    }
    catch(err){
        console.log(err);
        return false;
    }
}

export default connectiontodb;