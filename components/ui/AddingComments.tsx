"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { useState } from 'react'

const AddingComments = () => {
   const [Text,setText] = useState("");
  return (
    <div className='w-full flex items-center gap-2'>
        <Image src={"/random.jpg"} alt='post comment' height={50} width={50} className='rounded-[50%]'/>

        <div className="flex flex-col flex-1 gap-1 relative">

            <input onChange={e=>setText(e.target.value)} type='text' placeholder='Add a comment' className='border-0 border-b w-full outline-none bg-transparent focus:border-b-2 border-[rgba(6,6,6,0.36)] dark:border-[rgba(255,255,255,0.56)]'/>

            <div className="flex justify-end"
            >
                       <button className={cn(`px-5 py-1 bg-black font-bold  text-slate-100 rounded-md hover:bg-black/80 transition dark:bg-pink-600 dark:hover:bg-pink-600/85  `,`${Text?"block":"hidden"}`)}>Post</button>

            </div>

         

          


        </div>

    </div>
  )
}

export default AddingComments