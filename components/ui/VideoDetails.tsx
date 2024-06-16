"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletingVideo from "@/components/DeletingVideo";

import Needtosignup from "@/components/needtosignup";
import processFullname from "@/lib/processfullname";
import Image from "next/image";
import { handlefollowunfollow } from "@/actions/useraction";
import { EllipsisIcon, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { togglecondemn, togglelikeunlike } from "@/actions/Videoaction";

const VideoDetails = ({ user, curruser, videoid, isFollowing, relationship,likes }: any) => {
  const [followers, setFollowers] = useState<any>(null);
  const [following, setFollowing] = useState<any>(null);
  const [relation,setrelationship] = useState("");
  const [videolikes,setliked] = useState<any>(null);

  const handlefollowing = useCallback(() => {
    setFollowing(isFollowing)
  }, [isFollowing])


  const handlerelationship = useCallback(()=>{
    setrelationship(relationship);

  },[relationship])

  const handleFollowers = useCallback(() => {
    setFollowers(user?.Followers?.length);
    setliked(likes)
  }, [user.Followers,likes]);

  useEffect(() => {
    handleFollowers();
    handlefollowing();
    handlerelationship();
  }, [handleFollowers, handlefollowing,handlerelationship]);

  const isOwnerOfVideo = () => curruser && curruser.id === user.clerkId;

  const toggleFollowing = async (e: any) => {
    e.preventDefault();
    try {
      if (following) {
        setFollowing(false);
        setFollowers(followers - 1);
        const formdata = new FormData();
        formdata.append("targetId", user.clerkId);
        formdata.append("userId", curruser.id);
        await handlefollowunfollow(formdata);
      } else {
        setFollowing(true);
        setFollowers(followers + 1);
        const formdata = new FormData();
        formdata.append("targetId", user.clerkId);
        formdata.append("userId", curruser.id);
        await handlefollowunfollow(formdata);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const togglelike = async (e:any)=>{
  
    try{
      if(relation=="liked"){
        setliked(videolikes -1);
        setrelationship("clean");
        const formdata  = new FormData();
        formdata.append("userId",curruser?.id);
        formdata.append("videoId",videoid);
        await togglelikeunlike(formdata);
      }
      else if(relation=="clean"){
        setliked(videolikes +1);
        setrelationship("liked");
        const formdata  = new FormData();
        formdata.append("userId",curruser?.id);
        formdata.append("videoId",videoid);
        await togglelikeunlike(formdata);
      }
      else{
        setliked(videolikes +1);
        setrelationship("liked");
        const formdata  = new FormData();
        formdata.append("userId",curruser?.id);
        formdata.append("videoId",videoid);
        await togglelikeunlike(formdata);
      }

    }
    catch(err){
      alert(err);

    }
  }

  const toggledislike = async (e:any)=>{
 
    try{
      if(relation=="disliked"){
        setrelationship("clean");
        const formdata  = new FormData();
        formdata.append("userId",curruser?.id);
        formdata.append("videoId",videoid);
        await togglecondemn(formdata);
      }
      else if(relation=="clean"){
        setrelationship("disliked");
        const formdata  = new FormData();
        formdata.append("userId",curruser?.id);
        formdata.append("videoId",videoid);
        await togglecondemn(formdata);

      }
     else{
      setliked(videolikes -1);
      setrelationship("disliked");
      const formdata  = new FormData();
        formdata.append("userId",curruser?.id);
        formdata.append("videoId",videoid);
        await togglecondemn(formdata);
     }

    }
    catch(err){
         alert(err);
    }
  }
  return (
    <>
    <div className=" md:hidden flex items-center rounded-[30px]  ">
      {
        curruser ? (   <div className=" items-center rounded-[30px] dark:bg-gray-900 border cursor-pointer flex border-[rgba(23,23,22,0.71)] dark:border-[rgba(255,255,255,0.234)]">
            
        <div   onClick={togglelike} className="flex rounded-l-[30px] fade-in-5   items-center gap-2 p-3 
        hover:bg-gray-200 dark:hover:bg-gray-800 transition  px-4 ">
          <ThumbsUp  className=" bg-transparent"
            fill={relation === "liked" ?"#db2777":"none" }
            
            
            
            
          />
          <p className="font-medium tracking-tight text-sm">{videolikes}</p>

        </div>
        <div className="border    h-8 border-gray-700 dark:border-slate-500  " ></div>
        <div  onClick={toggledislike} className="flex rounded-r-[30px] fade-in-5 hover:bg-gray-200/85   items-center gap-2 p-3 dark:hover:bg-gray-800 transition  px-4 ">
          <ThumbsDown className="!border-0 !outline-0"
             fill={relation === "disliked" ? "#db2777" : "none"}
             
         
          />


        </div>

      </div>):(
         <Needtosignup className="rounded-[30px]">

           
         <div className=" items-center rounded-[30px] dark:bg-gray-900 border cursor-pointer flex  dark:border-slate-500 border-gray-700">
        
         <div    className="flex rounded-l-[30px] fade-in-5   items-center gap-2 p-3 
         hover:bg-gray-200 dark:hover:bg-gray-800 transition flex-1 px-4 ">
           <ThumbsUp  className=" bg-transparent"
           
             
             
             
             
           />
           

         </div>
         <div className="border    h-8 dark:border-slate-500  " ></div>
         <div   className="flex rounded-r-[30px] fade-in-5 hover:bg-gray-200/85   items-center gap-2 p-3 dark:hover:bg-gray-800 transition flex-1 px-4 ">
           <ThumbsDown className="!border-0 !outline-0"
              fill={relation === "disliked" ? "rgb(235, 0, 129)" : "none"}
              
          
           />


         </div>

       </div>
       </Needtosignup>


        )
      }
 

    </div>
    

    <div className="flex gap-2 items-center w-full justify-between md:justify-normal">
      <div className="flex items-center gap-2 lg:gap-3 justify-between w-full">
      <Link href={`/profile/${user.clerkId}`}>
        <div className="flex items-center gap-2">
       
            <Image
              alt="channel logo"
              src={user?.ImageUrl}
              height={50}
              width={50}
              className="object-cover rounded-full"
            />

         

          <div className="flex flex-col">

            <h2 className="font-medium md:text-xl">{processFullname(user?.fullname)}</h2>
            <p className="text-gray-500 text-sm">
              {followers} <span className="inline-block">followers</span>
            </p>
          </div>
    

        </div>
        </Link>
        <div className="flex items-center gap-3 rounded-[30px]">
          {curruser ? ( <div className=" items-center rounded-[30px] border-[rgba(23,23,22,0.71)] dark:bg-gray-900 dark:border-[rgba(255,255,255,0.231)] border cursor-pointer hidden md:flex ">
            
            <div   onClick={togglelike} className="flex rounded-l-[30px] fade-in-5   items-center gap-2 p-3 
            hover:bg-gray-200 dark:hover:bg-gray-800 transition flex-1 px-4 ">
              <ThumbsUp  className=" bg-transparent"
                fill={relation === "liked" ?"#db2777":"none" }
                
                
                
                
              />
              <p className="font-medium tracking-tight text-sm">{videolikes}</p>

            </div>
            <div className="border    h-8 dark:border-slate-500 border-[rgba(23,23,22,0.71)]   " ></div>
            <div  onClick={toggledislike} className="flex rounded-r-[30px] fade-in-5 hover:bg-gray-200/85   items-center gap-2 p-3 dark:hover:bg-gray-800 transition flex-1 px-4 ">
              <ThumbsDown className="!border-0 !outline-0"
                 fill={relation === "disliked" ? "#db2777" : "none"}
                 
             
              />


            </div>

          </div>):(
            <Needtosignup className="rounded-[30px]">

           
             <div className="border-[rgba(23,23,22,0.71)] dark:border-slate- items-center rounded-[30px] dark:bg-gray-900 dark-border-[rgba(255,255,255,0.231)] border cursor-pointer hidden md:flex ">
            
             <div    className="flex rounded-l-[30px] fade-in-5   items-center gap-2 p-3 
             hover:bg-gray-200 dark:hover:bg-gray-800 transition flex-1 px-4 ">
               <ThumbsUp  className=" bg-transparent"
               
                 
                 
                 
                 
               />
               
 
             </div>
             <div className="border    h-8 dark:border-slate-500  " ></div>
             <div   className="flex rounded-r-[30px] fade-in-5 hover:bg-gray-200/85   items-center gap-2 p-3 dark:hover:bg-gray-800 transition flex-1 px-4 ">
               <ThumbsDown className="!border-0 !outline-0"
                  fill={relation === "disliked" ? "#db2777" : "none"}
                  
              
               />
 
 
             </div>
 
           </div>
           </Needtosignup>

          )}
         

          {isOwnerOfVideo() ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-4 mr-4"><EllipsisIcon /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Video</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>edit</DropdownMenuItem>
                <DeletingVideo videoId={videoid} userId={curruser.id} className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-800 gap-2 px-2 py-1 text-red-600 hover:w-full rounded-sm transition">
                  delete
                  <Trash2 size={15} />
                </DeletingVideo>
                <DropdownMenuItem>share</DropdownMenuItem>
                <DropdownMenuItem>private</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {curruser ? (
                <form onSubmit={toggleFollowing}>


                  <button className="bg-pink-600 text-slate-100 px-5 py-2 text-sm md:text-[1rem] hover:opacity-85 transition rounded-md">
                    {following ? "following" : "follow"}
                  </button>
                </form>
              ) : (

                <Needtosignup className="md:px-5 md:py-1 px-2 py-1 text-sm rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90">
                  Follow
                </Needtosignup>
              )}
            </>
          )}

        </div>
     

      </div>
    </div>

   
  

    </>
  );
};

export default VideoDetails;