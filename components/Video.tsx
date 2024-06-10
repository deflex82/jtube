
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { timeAgo } from "./../lib/formatteddate"
import formatDuration from '@/lib/formatduration';
import { getUser } from '@/lib/datafetching';
import processFullname from '@/lib/processfullname';
const Video = async({details}:any) => {
   const user:any = await getUser(details?.clerkId)
   


  return (
    <Link href={`/video/${details?._id}`}>
       <div className='w-full h-[300px]  p-2 flex flex-col'>
      <div className="relative w-full h-[200px]">
        <Image
          className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
          alt='thumbnail'
          src={details?.Thumbnail}
          layout="fill"
        />
      </div>
      <div className="mt-2 flex-1">
        <h2 className='text-lg font-semibold'>{details?.title}</h2>
        <p className='text-sm text-gray-600'>
          {
           processFullname(user?.fullname)
            
          }
        </p>
        <div className="flex items-center  text-sm text-gray-600 w-full relative">
            {details?.views} views
            ---
        
            <p>{timeAgo(details?.createdAt)}</p>
            <div className="absolute right-0 text-slate-100  px-3 text-sm font-bold bg-pink-600 rounded-sm ">{formatDuration(details?.duration)}</div>
        </div>

      </div>
    </div>

    </Link>
   
  );
};

export default Video;
