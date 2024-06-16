
import RelatedVideos from "@/components/RelatedVideos";



import AddingComments from "@/components/AddingComments";
import { getComments, getUser, getVideo } from "@/lib/datafetching";


import { currentUser } from "@clerk/nextjs/server";


import { Suspense } from "react";

import { FollowStatus } from "@/actions/useraction";
import { SkeletonCard } from "@/components/SkeletonCard";

import dynamic from "next/dynamic";
import { SkeletonDetails } from "@/components/DetailsSkeleton";
import Header from "@/components/Header";
import { likedstatus } from "@/actions/Videoaction";

const VideoDetails = dynamic(() => import('@/components/ui/VideoDetails'), {
    ssr: false,
    loading: () => <SkeletonDetails />, // Use the skeleton component while loading
});
const Comments = dynamic(()=> import('@/components/Comments'),{
    ssr:false,
    loading:()=><SkeletonDetails/>

})

const VideoPage = async ({ params }: any) => {

    const id = params.id;
    const curruserdata = await currentUser();
    const Commentdetails: any = await getComments(id)

    const curruser = JSON.parse(JSON.stringify(curruserdata));

    const videodata = await getVideo(id);
    const userdata = await getUser(videodata?.clerkId);

    const user = JSON.parse(JSON.stringify(userdata));
    const video = JSON.parse(JSON.stringify(videodata));

    const isFollowing = await FollowStatus(curruser?.id, user?.clerkId);
    const relationship = await likedstatus(curruser?.id,video._id);
    console.log(relationship);



    return (
        <>
  
        <div className="lg:max-w-7xl mx-auto flex w-full">
            <div className="flex-1 lg:flex-[0.7] flex flex-col p-2 lg:p-4">
              <video autoPlay controls muted src={video?.VideoUrl}/>

                <div className="flex flex-col gap-3 w-full">
                    <h1 className="font-semibold p-1 text-2xl flex-wrap">{video?.title}</h1>
                
                        <VideoDetails likes={video?.likes?.length} relationship={relationship} isFollowing={isFollowing} user={user} curruser={curruser} videoid={id} />

                    



                    <h1 className="font-bold p-2">Comments</h1>

                    <AddingComments curruser={curruser} userImage={curruser?.imageUrl} userId={curruser?.id} videoId={id} />

                    <Suspense fallback={<SkeletonDetails/>}>
                        {Commentdetails?.reverse().map((comment: any) => {

                            return (
                                <Comments key={comment._id} comment={comment} />
                            )
                        })

                        }

                    </Suspense>



                </div>
            </div>
            <div className="flex-[0.3] p-4 hidden lg:block">
                <h2 className="font-bold p-2">Related videos</h2>
              
                    <RelatedVideos id={id} />
              
            </div>
        </div>
        </>
    );
};

export default VideoPage;