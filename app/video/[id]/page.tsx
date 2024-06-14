import Comments from "@/components/Comments";

import RelatedVideos from "@/components/RelatedVideos";



import AddingComments from "@/components/AddingComments";
import { getComments, getUser, getVideo } from "@/lib/datafetching";


import { currentUser } from "@clerk/nextjs/server";
import {    Loader2Icon,  } from "lucide-react";


import { Suspense } from "react";
import VideoDetails from "@/components/ui/VideoDetails";
import { FollowStatus } from "@/actions/useraction";


const VideoPage = async ({ params }: any) => {
    
    const id = params.id;
    const curruserdata = await currentUser();
    const Commentdetails: any = await getComments(id)

    const curruser = JSON.parse(JSON.stringify(curruserdata));

    const videodata = await getVideo(id);
    const userdata = await getUser(videodata?.clerkId);

    const user = JSON.parse(JSON.stringify(userdata));
    const video = JSON.parse(JSON.stringify(videodata));
      const isFollowing = await FollowStatus(curruser.id,user.clerkId)

    
  

    return (
        <div className="lg:max-w-7xl mx-auto flex w-full">
            <div className="flex-1 lg:flex-[0.7] flex flex-col p-2 lg:p-4">
                <video className="w-full rounded-md" src={video?.VideoUrl} controls muted autoPlay />

                <div className="flex flex-col gap-3 w-full">
                    <h1 className="font-semibold p-1 text-2xl flex-wrap">{video?.title}</h1>
                    <VideoDetails isFollowing={isFollowing} user={user} curruser={curruser} videoid={id}/>
                 

                    <h1 className="font-bold p-2">Comments</h1>

                    <AddingComments curruser={curruser} userImage={curruser?.imageUrl} userId={curruser?.id} videoId={id} />


                    {Commentdetails?.reverse().map((comment: any) => {

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
