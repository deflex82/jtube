"use client";

import { redirect } from "next/navigation";
import { AlertDialogAction } from "./ui/alert-dialog";

const AlertAction = () => {
    
  return (
    <>
    <AlertDialogAction   className="bg-pink-600 hover:opacity-80 hover:bg-pink-600 dark:text-slate-100">Sign Up</AlertDialogAction>
            
    </>
  )
}

export default AlertAction