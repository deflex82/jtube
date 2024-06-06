import mongoose, { Mongoose } from "mongoose";



interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

 const connectiontodb = async () => {
  
const MONGODB_URL:any = process.env.MONGODB_URL;
  console.log(MONGODB_URL);
  try{  if (cached.conn) return cached.conn;

    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "jtube",
        bufferCommands: false,
        connectTimeoutMS: 30000,
      });
  
    cached.conn = await cached.promise;
  
    return cached.conn;

  }
  catch(err){
    console.log(err);
  }

}

export default connectiontodb;