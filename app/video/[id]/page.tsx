import Comments from "@/components/Comments"
import LikeUnlike from "@/components/LikeUnlike"
import Video from "@/components/Video"
import AddingComments from "@/components/ui/AddingComments"
import { getUser, getVideo } from "@/lib/datafetching"
import { Suspense } from "react"
import Image from "next/image"

const VideoPage = async({params}:any) => {
    const id = params.id;

    const video:any = await getVideo(id);
    const user:any = await getUser(video.clerkId);
    
   
    return (
        <div className="lg:max-w-7xl mx-auto flex w-full ">
            <div className=" flex-1 lg:flex-[0.7] flex flex-col p-2 lg:p-4">

                <video className="w-full rounded-md" src={video?.VideoUrl} controls muted autoPlay />
                <div className="flex flex-col gap-3 w-full">
                    <h1 className="font-semibold p-1 text-2xl flex-wrap">{video?.title}</h1>
                    <div className="flex gap-2 items-center  w-full justify-between md:justify-normal">
                        <div className="flex items-center gap-2 lg:gap-3 justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Image alt="channel logo" src={user?.ImageUrl} height={50} width={50} className="object-cover rounded-[50%]" />
                                <div className="flex flex-col">
                                    <h2 className="font-medium md:text-xl ">{user.fullname}</h2>
                                    <p className="text-gray-500 text-sm">{user?.Followers?.length} <span className="inline-block"> followers</span></p>


                                </div>


                            </div>

                            <button className="md:px-5 md:py-1 px-2 py-1 text-sm rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90">Follow</button>

                        </div>





                        <LikeUnlike />
                    </div>

                    <h1 className="font-bold p-2">Comments</h1>

                    <AddingComments />
                    <Comments />
                    <Comments />
                    <Comments />
                    <Comments />
                    <Comments />
                    <Comments />
                    <Comments />
                    <Comments />

                </div>


            </div>
            <div className="flex-[0.3] p-4 hidden lg:block">
                <h2 className="font-bold p-2">Related videos</h2>
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
            </div>
        </div>

    )
}


export default VideoPage