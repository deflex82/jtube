"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { useFormStatus } from "react-dom"


export const Button = ({ children,isready }:{children:ReactNode,isready:Boolean}) => {
  const { pending } = useFormStatus()

  return (
    <button className={cn('bg-pink-600 text-slate-100 px-3 py-2 rounded-sm hover:opacity-90 text-sm mt-4 transition cursor-pointer',`${!isready?"pointer-events-none  bg-gray-600 ":""}`)} type="submit" disabled={pending}>
       {pending && "loading...."}
       {!pending && children}
    </button>
  )
}