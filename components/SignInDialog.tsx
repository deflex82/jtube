
import {
    Dialog,
    DialogContent,
   
    DialogTrigger,
  } from "@/components/ui/dialog"
import { SignIn } from "@clerk/nextjs";
import { ReactNode } from "react";
const SignInDialog = ({children,className}:{children:ReactNode,className:string})=>{
    return(
<Dialog>
  <DialogTrigger className={className}>{children}</DialogTrigger>
  <DialogContent>
   <SignIn/>
  </DialogContent>
</Dialog>
    )
}

export default SignInDialog;