
"use client"

import { FollowStatus, handlefollowunfollow } from "@/actions/useraction";
import { useCallback, useEffect, useState } from "react";

const FollowUnfollow = ({curruser=null,target}:any) => {
  const [following,setfollowing] = useState<any>(null);
 

  const handlefollowstatus=useCallback(async()=>{
    try{
      const newform = new FormData();
      newform.append("userId",curruser.id);
      newform.append("target",target);
      const response:any = await FollowStatus(newform);
      setfollowing(response);
    }
    catch(err){
      setfollowing(false);
    }
   
  },[curruser.id,target])
  useEffect(()=>{
     handlefollowstatus()
    

  })

  const togglefollowing = async()=>{
    try{
      if(following){
        setfollowing(false);
        await handlefollowunfollow(target,curruser.id);

      }else{
        setfollowing(true);
        await handlefollowunfollow(target,curruser.id);
      }
  

    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <button onClick={togglefollowing}    className="bg-pink-600  text-slate-100 px-5 py-2 text-sm md:text-[1rem] hover:opacity-85 transition rounded-md">
      {following?"following":"follow"}
    </button>)
 
  
}

export default FollowUnfollow