
"use client";
import { Heart } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'

const LikeUnlike = () => {
    const [liked,setliked] = useState(false);
    const handlelike = ()=>{
        if(liked)setliked(false);
        if(!liked)setliked(true);
    }
  return (
    <div onClick={handlelike} className='cursor-pointer ml-4 absolute right-2 hidden md:flex'>
        {
            !liked ?<>
            <div className="flex flex-col items-center gap-1">
            <Heart className='object-cover'  />
                like
            </div>
   
            </>:<>

            <div className=" flex-col flex items-center gap-1 ">
            <Image className='object-cover' src={"/heart-992.svg"} width={30} height={30} alt='unlike'/>
                unlike
            </div>
      
            </>
        }
      
    </div>
  )
}

export default LikeUnlike