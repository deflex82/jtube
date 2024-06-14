"use client";

import { handlefollowunfollow } from "@/actions/useraction";
import { useCallback, useEffect, useState } from "react";

const FollowProfileButton = ({user,curruser,isFollowing}:any) => {
    const [followers, setFollowers] = useState<any>(null);
    const [following, setFollowing] = useState<any>(null);
  
    const handlefollowing  = useCallback(()=>{
      setFollowing(isFollowing)
    },[isFollowing])
  
    
    const handleFollowers = useCallback(() => {
      setFollowers(user?.Followers?.length);
    }, [user.Followers]);
  
    useEffect(() => {
      handleFollowers();
      handlefollowing();
    }, [handleFollowers,handlefollowing]);
    const toggleFollowing = async (e:any) => {
        e.preventDefault();
        try {
          if (following) {
            setFollowing(false);
            setFollowers(followers -1);
            const formdata  = new FormData();
            formdata.append("targetId",user.clerkId);
            formdata.append("userId",curruser.id);
            await handlefollowunfollow(formdata);
          } else {
            setFollowing(true);
            setFollowers(followers +1);
            const formdata  = new FormData();
            formdata.append("targetId",user.clerkId);
            formdata.append("userId",curruser.id);
            await handlefollowunfollow(formdata);
          }
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <form onSubmit={toggleFollowing}>

               
    <button  className="bg-pink-600 text-slate-100 px-5 py-2 text-sm md:text-[1rem] hover:opacity-85 transition rounded-md">
      {following ? "following" : "follow"}
    </button>
    </form>
  )
}

export default FollowProfileButton