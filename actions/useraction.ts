"use server";

import connectiontodb from "@/lib/database";
import User from "@/models/Users";

export default async function CreateUser(user:any){
    console.log("about to create mongodb")
    try{
        await connectiontodb();
        const newUser = User.create(user);
        console.log(newUser);
        return JSON.parse(JSON.stringify(newUser));

    }
    catch(err){
        console.log(err);
    }
}

