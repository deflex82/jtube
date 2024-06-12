"use client"

import { handlefollowunfollow } from "@/actions/useraction";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react"

const FollowUnfollow = ({target,isFollowing,userId}:{target:string,isFollowing:any,userId:string}) => {
    const [Following,setFollowing] = useState(false);

    useEffect(()=>{
      if(isFollowing){
        setFollowing(true);
      }else{
        setFollowing(false)
      }
    },[isFollowing]);
      
    const handlefollow = async(target:string,userId:string)=>{
      setFollowing(!Following)
      try{
        await handlefollowunfollow(target,userId);

      }
      catch(err){
        console.log(err);
      }
    }



  return (
    <button onClick={()=>{handlefollow(target,userId)}}   className="bg-pink-600 text-slate-100 px-3 py-1 text-sm hover:opacity-85 transition rounded-md">
      {Following?"following":"follow"}
    </button>)
 
  
}

export default FollowUnfollow