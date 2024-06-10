import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Link from "next/link"
import { ReactNode } from "react"
  

const Needtosignup = async({children,className}:{children:ReactNode,className:string}) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger className={className}>{children}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>

        <AlertDialogTitle>Cannot perform this action.</AlertDialogTitle>
        <AlertDialogDescription>
         you need to sign up to perform this task.please make a account to get full access to all the features.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="w-full flex-col md:flex-row">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
     

       <Link className="" href={"/sign-up"}>

     
        <AlertDialogAction    className="bg-pink-600 hover:opacity-80 hover:bg-pink-600 dark:text-slate-100 flex w-full md:w-auto">Sign Up</AlertDialogAction>
            
        </Link>
       
       

       
          
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Needtosignup;