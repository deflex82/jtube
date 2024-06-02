import Comments from "@/components/Comments"
import LikeUnlike from "@/components/LikeUnlike"
import Video from "@/components/Video"
import AddingComments from "@/components/ui/AddingComments"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const VideoPage = () => {
    return (
        <div className="lg:max-w-7xl mx-auto flex w-full ">
            <div className=" flex-1 lg:flex-[0.7] flex flex-col p-4">

                <video  className="w-full rounded-md" src="/lion.mp4" controls muted autoPlay />
                <div className="flex flex-col gap-3">
                <h1 className="font-semibold p-1 text-2xl">Lion chilling with fellow human and roaring like king.</h1>
                <div className="flex gap-2 items-center relative w-full justify-between md:justify-normal">
                    <div className="flex items-center gap-2">
                    <Image alt="channel logo" src={"/random.jpg"} height={50} width={50} className="object-cover rounded-[50%]"/>
                    <div className="flex flex-col">
                        <h2 className="font-medium text-xl">The Lion King</h2>
                        <p className="text-gray-500">400 <span> followers</span></p>

                
                    </div>

                    </div>
                

                    <div className="ml-9 ">
                        <button className="px-5 py-1 rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90">Follow</button>
                        
                    </div>
                   <LikeUnlike/>
                </div>

                <h1 className="font-bold p-2">Comments</h1>

                <AddingComments/>
                <Comments/>
                <Comments/>
                <Comments/>
                <Comments/>
                <Comments/>
                <Comments/>
                <Comments/>
                <Comments/>

                </div>
              

            </div>
            <div className="flex-[0.3] p-4 hidden lg:block">
                <h2 className="font-bold p-2">Related videos</h2>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
                <Video/>
            </div>
        </div>

    )
}


export default VideoPage