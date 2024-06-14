import { FollowStatus } from "@/actions/useraction";
import FollowProfileButton from "@/components/FollowProfileButton";
import convertToMonthYear from "@/lib/ConvertMonth";
import { getUser } from "@/lib/datafetching";
import processFullname from "@/lib/processfullname";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft, Calendar, VerifiedIcon } from "lucide-react";
import Image from "next/image";





const Profile = async ({ params }: any) => {
    const id = params.id;
    const userdata = await getUser(id);
    const user = JSON.parse(JSON.stringify(userdata));
    const curruserdata = await currentUser();
    const curruser = JSON.parse(JSON.stringify(curruserdata));
    const isFollowing = await FollowStatus(curruser?.id, user?.clerkId);
    console.log(user);
    console.log(curruser)
    const self = () => {
        if (curruser?.id == user.clerkId) {
            return true;
        }
        else {
            return false;
        }
        
    }

    return (
        <div className="lg:max-w-3xl mx-auto flex w-full border-r border-l border-[rgba(0,0,0,0.19)] dark:border-[rgba(255,255,255,0.123)] p-4 h-screen">
            <div className="w-full flex flex-col ">
                <div className="flex items-center gap-8">
                    <ArrowLeft />
                    <div className="flex items-center flex-col ">
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
                        <h1 className="font-semibold text-2xl p-2 flex items-center gap-1 ">
                            {processFullname(user?.fullname)}
                            {user?.verified && (<VerifiedIcon fill="#ff00ff" className="text-slate-50" />)}


                        </h1>
                        <div className="flex w-full items-center gap-4">
                            <div className="flex items-center gap-1 font-mono">
                                <span className=" text-xl font-bold">{user?.Followers?.length}</span>
                                <p className="text-gray-400">Followers</p>
                            </div>
                            <div className="flex items-center gap-1 font-mono">
                                <span className=" text-xl font-bold">{user?.Following?.length}</span>
                                <p className="text-gray-400">Following</p>
                            </div>
                            <div className="flex items-center gap-1 font-mono">
                                <Calendar/>
                                <p className="text-gray-400">Joined {convertToMonthYear(user?.createdAt)}</p>
                            </div>
                        </div>

                    </div>

                    <h1 className="text-xl font-semibold">Your videos</h1>

                </div>
            </div>
        </div>

    )
}

export default Profile;