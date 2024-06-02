
import Image from 'next/image';
import React from 'react';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';


const Video = () => {
  return (
    <Link href={"/video/123"}>
       <div className='w-full h-[300px]  p-2 flex flex-col'>
      <div className="relative w-full h-[200px]">
        <Image
          className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
          alt='thumbnail'
          src="/thumbnail.jpg"
          layout="fill"
        />
      </div>
      <div className="mt-2 flex-1">
        <h2 className='text-lg font-semibold'>Man with lion chilling.</h2>
        <p className='text-sm text-gray-600'> Sushant Rimal</p>
        <div className="flex items-center  text-sm text-gray-600 w-full relative">
            200 views
            ---
        
            <p>5 days ago</p>
            <div className="absolute right-0 text-slate-100  px-3 text-sm font-bold bg-pink-600 rounded-sm ">5:25</div>
        </div>

      </div>
    </div>

    </Link>
   
  );
};

export default Video;
