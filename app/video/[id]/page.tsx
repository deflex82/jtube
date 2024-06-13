import Comments from "@/components/Comments";
import FollowUnfollow from "@/components/FollowUnfollow";
import RelatedVideos from "@/components/RelatedVideos";

import Needtosignup from "@/components/needtosignup";

import AddingComments from "@/components/AddingComments";
import { getComments, getUser, getVideo } from "@/lib/datafetching";
import processFullname from "@/lib/processfullname";

import { currentUser } from "@clerk/nextjs/server";
import {   EllipsisVertical, Loader2Icon, Trash2 } from "lucide-react";

import Image from "next/image";
import { Suspense } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeletingVideo from "@/components/DeletingVideo";


const VideoPage = async ({ params }: any) => {
    const id = params.id;
    const curruserdata = await currentUser();
    const Commentdetails: any = await getComments(id)

    const curruser = JSON.parse(JSON.stringify(curruserdata));

    const videodata = await getVideo(id);
    const userdata = await getUser(videodata.clerkId);

    const user = JSON.parse(JSON.stringify(userdata));
    const video = JSON.parse(JSON.stringify(videodata));
 

    const isownerofvideo = () => {
        if (curruser) {
            if (curruser.id == user.clerkId) { return true; }
            else {
                return false;
            }


        } else {
            return false;
        }


    }

    return (
        <div className="lg:max-w-7xl mx-auto flex w-full">
            <div className="flex-1 lg:flex-[0.7] flex flex-col p-2 lg:p-4">
                <video className="w-full rounded-md" src={video?.VideoUrl} controls muted autoPlay />

                <div className="flex flex-col gap-3 w-full">
                    <h1 className="font-semibold p-1 text-2xl flex-wrap">{video?.title}</h1>
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
                                        {user?.Followers?.length} <span className="inline-block">followers</span>
                                    </p>
                                </div>
                            </div>
                            {isownerofvideo() ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Video</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>edit</DropdownMenuItem>
                                       
                               
                                        <DeletingVideo videoId={id} userId={curruser.id} className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-800 gap-2 px-2 py-1  text-red-600 hover: w-full rounded-sm transition  ">
                                        delete     
                                        <Trash2 size={15} />

                                        </DeletingVideo>
                                     
                                      
                                        <DropdownMenuItem>share</DropdownMenuItem>
                                        <DropdownMenuItem>private</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>)

                                : (<>{
                                    curruser ? (
                                        <FollowUnfollow target={user.clerkId} curruser={curruser} />
                                    ) : (
                                        <Needtosignup className="md:px-5 md:py-1 px-2 py-1 text-sm rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90">
                                            Follow
                                        </Needtosignup>
                                    )}</>)}


                        </div>
                    </div>

                    <h1 className="font-bold p-2">Comments</h1>

                    <AddingComments userImage={curruser?.imageUrl} userId={curruser?.id} videoId={id} />


                    {Commentdetails?.map((comment: any) => {

                        return (
                            <Comments key={comment._id} comment={comment} />
                        )
                    })

                    }
                </div>
            </div>
            <div className="flex-[0.3] p-4 hidden lg:block">
                <h2 className="font-bold p-2">Related videos</h2>
                <Suspense fallback={<Loader2Icon />}>
                    <RelatedVideos id={id} />
                </Suspense>
            </div>
        </div>
    );
};

export default VideoPage;
