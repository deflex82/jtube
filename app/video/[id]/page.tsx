
import Comments from "@/components/Comments"
import FollowUnfollow from "@/components/FollowUnfollow"
import RelatedVideos from "@/components/RelatedVideos"
import UserComponent from "@/components/UserComponent"



import AddingComments from "@/components/ui/AddingComments"
import { getUser, getVideo } from "@/lib/datafetching"

import { currentUser } from "@clerk/nextjs/server"
import {  Loader2Icon } from "lucide-react"

import Image from "next/image"
import { Suspense } from "react"

const VideoPage = async ({ params }: any) => {
    const id = await params.id;
    const curruserdata: any = await currentUser();


    const videodata: any = await getVideo(id);
    const userdata: any = await getUser(videodata.clerkId);



    
;
    const user =JSON.parse(JSON.stringify(userdata));
    const video =JSON.parse(JSON.stringify(videodata));
    
    console.log(video);
    
    
    const curruser =JSON.parse(JSON.stringify(curruserdata));
    
    const isOwner = await video.clerkId === curruser.id;


    return (
        <div className="lg:max-w-7xl mx-auto flex w-full ">
            <div className=" flex-1 lg:flex-[0.7] flex flex-col p-2 lg:p-4">

                <video className="w-full rounded-md" src={video?.VideoUrl} controls muted autoPlay />




                <div className="flex flex-col gap-3 w-full">
                    <h1 className="font-semibold p-1 text-2xl flex-wrap">{video?.title}</h1>
                    <UserComponent user={user} curruser={curruser} target={user.clerkId} isOwner={isOwner}/>
                 

                    <h1 className="font-bold p-2">Comments</h1>

                    <AddingComments />
                    <Comments />
                    

                </div>


            </div>
            <div className="flex-[0.3] p-4 hidden lg:block">
                <h2 className="font-bold p-2">Related videos</h2>
                <Suspense fallback={<Loader2Icon />}>
                    <RelatedVideos id={id} />
                </Suspense>
            </div>
        </div>

    )
}


export default VideoPage