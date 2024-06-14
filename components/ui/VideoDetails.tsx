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
import { FollowStatus, handlefollowunfollow } from "@/actions/useraction";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const VideoDetails = ({ user, curruser, videoid,isFollowing }: any) => {
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

  const isOwnerOfVideo = () => curruser && curruser.id === user.clerkId;

  const toggleFollowing = async () => {
    try {
      if (following) {
        setFollowing(false);
        setFollowers(followers -1);
        await handlefollowunfollow(user.clerkId, curruser.id);
      } else {
        setFollowing(true);
        setFollowers(followers +1);
        await handlefollowunfollow(user.clerkId, curruser.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-2 items-center w-full justify-between md:justify-normal">
      <div className="flex items-center gap-2 lg:gap-3 justify-between w-full">
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

        {isOwnerOfVideo() ? (
          <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
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
              <button onClick={toggleFollowing} className="bg-pink-600 text-slate-100 px-5 py-2 text-sm md:text-[1rem] hover:opacity-85 transition rounded-md">
                {following ? "following" : "follow"}
              </button>
            ) : (
              <Needtosignup className="md:px-5 md:py-1 px-2 py-1 text-sm rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90">
                Follow
              </Needtosignup>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
