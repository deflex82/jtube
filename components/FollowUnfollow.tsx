"use client"

import { FollowStatus, handlefollowunfollow } from "@/actions/useraction";

import { useEffect, useState } from "react"

const FollowUnfollow = ({target,userId,setFollowers}:{target:string,userId:string,setFollowers:any}) => {
  
    const [Following,setFollowing] = useState<any>(null);

    const fetchfollowstatus = async()=>{
      const formdata = new FormData();
      formdata.append("target",target);
      formdata.append("userId",userId);
      const response  = await FollowStatus(formdata);
      console.log(response);
      setFollowing(response);
      
    }

    useEffect(()=>{
      fetchfollowstatus();
    },[])



      
    const handlefollow = async(target:string,userId:string)=>{
     
      try{
        if(Following){
          setFollowing(!Following)
          setFollowers((prev:any)=>prev -1)
        }
        else{
          setFollowing(!Following);
          setFollowers((prev:any)=>prev +1);
        }
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