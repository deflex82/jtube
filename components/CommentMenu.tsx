import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import React, { ReactNode } from 'react'

const CommentMenu = ({children}:{children:ReactNode}) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Video</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>edit</DropdownMenuItem>
      
      <DropdownMenuItem>share</DropdownMenuItem>
      <DropdownMenuItem>private</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default CommentMenu