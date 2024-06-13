"use client";
import React, { useState } from 'react'
import { AlertDialogAction } from './ui/alert-dialog'
import { deleteVideo } from '@/actions/Videoaction';
import { LoaderIcon } from 'lucide-react';

import { useToast } from './ui/use-toast';


const DeleteVideoButton = ({videoId,userId}:{videoId:string,userId:string}) => {
    const [Loading,setLoading] = useState<Boolean>(false);
    
const { toast } = useToast()
    const handlesubmit = async(e:any)=>{
      
        const newform = new FormData();
        newform.append("videoId",videoId);
        newform.append("currentUserId",userId);
        setLoading(true);
        await deleteVideo(newform);
        setLoading(false);
        toast(  { title: "Your video has been deleted",
        description: <p className='text-red-600  font-medium' >You will be redirected to home page shortly.</p>
      })
        
        
    }

  return (
    <button onClick={handlesubmit}     className="bg-red-600 hover:bg-red-600/75 dark:text-slate-100 flex w-full md:w-auto px-5 py-2 md:py-1 text-slate-50 rounded-sm hover:opacity-85  items-center justify-center">
        {Loading?(<LoaderIcon/>):"Delete"}
    </button>
   
  )
}

export default DeleteVideoButton