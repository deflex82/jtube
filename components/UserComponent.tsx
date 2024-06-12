"use client";

import processFullname from '@/lib/processfullname';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import FollowUnfollow from './FollowUnfollow';
import Needtosignup from './needtosignup';

const UserComponent = ({target,user,isOwner,curruser}:{target:string,user:any,isOwner:Boolean,curruser:any}) => {
    const [Followers,setFollowers]=useState<any>(null);
    useEffect(() => {
        setFollowers(user?.Followers?.length);
    }, [user?.Followers]);
    

  return (
    <>
        <div className="flex gap-2 items-center  w-full justify-between md:justify-normal">
                        <div className="flex items-center gap-2 lg:gap-3 justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Image alt="channel logo" src={user?.ImageUrl} height={50} width={50} className="object-cover rounded-[50%]" />
                                <div className="flex flex-col">
                                    <h2 className="font-medium md:text-xl ">{processFullname(user?.fullname)}</h2>

                                    <p className="text-gray-500 text-sm">{Followers} <span className="inline-block"> followers</span></p>


                                </div>

                            </div>

                            {isOwner ? (
                                
                                < EllipsisVertical />
                                
                            ) : (
                                curruser ? (
                                    <FollowUnfollow setFollowers={setFollowers} userId={curruser.id}  target={target} />
                                ) : (
                                    <Needtosignup className="md:px-5 md:py-1 px-2 py-1 text-sm rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90">
                                        Follow
                                    </Needtosignup>
                                )
                            )}


                        </div>





                    </div>
          


    </>
  )
}

export default UserComponent