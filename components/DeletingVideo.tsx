"use client"

import React, { ReactNode } from 'react'
import {
    AlertDialog,
  
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils'
import DeleteVideoButton from './DeleteVideoButton'
const DeletingVideo = ({children,className,videoId,userId}:{children:ReactNode,className:string,videoId:string,userId:string}) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger className={cn(className,"hover:bg-opacity-75 transition")} >{children}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>

        <AlertDialogTitle>This action is irreversible</AlertDialogTitle>
        <AlertDialogDescription>
         Are you sure you want to delete this video?.please be clear that once you delete this video,you cannnot reverse your action
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="w-full flex-col md:flex-row">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <DeleteVideoButton videoId={videoId} userId={userId}/>
     


     
       
            
        
       

       
          
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeletingVideo;