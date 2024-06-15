import { FollowStatus } from "@/actions/useraction";
import FollowProfileButton from "@/components/FollowProfileButton";
import { SkeletonCard } from "@/components/SkeletonCard";
import convertToMonthYear from "@/lib/ConvertMonth";
import { getUser, getUserVideos } from "@/lib/datafetching";
import processFullname from "@/lib/processfullname";
import { CloudUpload } from 'lucide-react';
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft, Calendar, VerifiedIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";




const Video = dynamic(() => import('@/components/Video'), {
    ssr: false,
    loading: () => <SkeletonCard />, // Use the skeleton component while loading
  });
  
const Profile = async ({ params }: any) => {
    const id = params.id;
    const userdata = await getUser(id);
    const user = JSON.parse(JSON.stringify(userdata));
    const curruserdata = await currentUser();
    const curruser = JSON.parse(JSON.stringify(curruserdata));
    const isFollowing = await FollowStatus(curruser?.id, user?.clerkId);
   
    const self = () => {
        if (curruser?.id == user.clerkId) {
            return true;
        }
        else {
            return false;
        }
        
    }
    const Videos = await getUserVideos(user.clerkId);
    

    return (
        <div className="lg:max-w-3xl mx-auto flex w-full border-r border-l border-[rgba(0,0,0,0.19)] dark:border-[rgba(255,255,255,0.123)] p-4 h-screen">
            <div className="w-full flex flex-col ">
                <div className="flex items-center gap-8">
                    <Link href={"/"}>
                    <ArrowLeft />
                    </Link>
                   
                    <div className="flex  flex-col ">
                        <h2 className="font-bold">{processFullname(user?.fullname)}</h2>
                        <p className="text-gray-400">{"5"} videos</p>
                    </div>

                </div>
                <div className="flex w-full justify-between mt-4">



                    <Image alt="profile image" src={user?.ImageUrl} height={120} width={120} className="object-cover rounded-full  " />
                    {!self() &&
                        (<FollowProfileButton isFollowing={isFollowing} curruser={curruser} user={user} />)}







                </div>
                <div className="w-full flex flex-col gap-4 ">
                    <div className="flex flex-col gap-">
                        <h1 className="font-semibold text-2xl py-2 flex items-center gap-1 ">
                            {processFullname(user?.fullname)}
                            {user?.verified && (<VerifiedIcon fill="#ff00ff" className="text-slate-50" />)}


                        </h1>
                        <div className="flex w-full items-center gap-8">
                            <div className="flex items-center gap-1 font-mono">
                                <span className=" text-xl font-bold">{user?.Followers?.length}</span>
                                <p className="text-gray-400">Followers</p>
                            </div>
                            <div className="flex items-center gap-1 font-mono">
                                <span className=" text-xl font-bold">{user?.Following?.length}</span>
                                <p className="text-gray-400">Following</p>
                            </div>
                            <div className=" items-center gap-1 font-mono hidden md:flex">
                                <Calendar/>
                                <p className="text-gray-400">Joined {convertToMonthYear(user?.createdAt)}</p>
                            </div>
                        </div>

                        <div className=" items-center gap-1 py-2 font-mono  flex md:hidden">
                                <Calendar/>
                                <p className="text-gray-400">Joined {convertToMonthYear(user?.createdAt)}</p>
                            </div>

                    </div>

                    <h1 className="text-xl font-semibold"> videos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-y-2 w-full">

                    <Suspense fallback = {<SkeletonCard />}>
        {
          Videos?.map(video=>{
            
            return(
              <Video key={video._id} details={video}/>
            )
          })
    
        }
          </Suspense>

        </div>
        {
            Videos?.length==0 && (<div className="w-full flex items-center justify-center flex-col">
                <CloudUpload className="text-pink-600" size={100}/>
                <h1 className="font-bold text-xl">You havenot uploaded any video yet;</h1>


            </div>)
        }


      


                    

                </div>
            </div>
        </div>

    )
}

export default Profile;