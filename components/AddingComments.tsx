"use client";

import { PostComment } from '@/actions/useraction';

import { cn } from '@/lib/utils';
import { LoaderPinwheel } from 'lucide-react';
import Image from 'next/image'
import React, {  useState } from 'react'
import { text } from 'stream/consumers';
import Needtosignup from './needtosignup';

const AddingComments = ({userId,videoId,userImage,curruser}:{userId:string,videoId:string,userImage:string,curruser:any}) => {
   const [Text,setText] = useState("");
   const [Loading,setLoading] = useState(false);
   
  
   

  
   const handlesubmit = async(e:any)=>{

    e.preventDefault();
  
    const newform = new FormData();
    newform.append("commenttext",Text);
    newform.append("userId",userId);
    newform.append("videoId",videoId);
    setLoading(true);
    await PostComment(newform);
    setLoading(false);
    setText("")
   }
    
  
  return (
    <form onSubmit={handlesubmit} className='w-full flex items-center gap-2'>
        <Image src={userImage||"/defaultuser.png"} alt='post comment' height={50} width={50} className='rounded-[50%]'/>

        <div className="flex flex-col flex-1 gap-1 relative">

            <input value={Text} onChange={e=>setText(e.target.value)} type='text' placeholder='Add a comment' className='border-0 border-b w-full outline-none bg-transparent focus:border-b-2 border-[rgba(6,6,6,0.36)] dark:border-[rgba(255,255,255,0.56)]'/>

            <div className="flex justify-end"
            >

              {
                curruser ?(
              
                       <button className={cn(`px-5 py-1 text-slate-100 rounded-md  transition bg-pink-600 hover:bg-pink-600/85  `,`${Text?"block":"hidden"}`)}>{Loading ? <LoaderPinwheel/>:"Post"}</button>)
                       :(
                        <Needtosignup className='md:px-5 md:py-1 px-2 py-1 text-sm rounded-md font-normal bg-slate-800 dark:bg-slate-100 text-slate-200 dark:text-black dark:hover:bg-slate-100/90 hover:bg-slate-800/90'>
                          Post
                        </Needtosignup>
                       )}

            </div>

         

          


        </div>

    </form>
  )
}

export default AddingComments