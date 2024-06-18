import { Loader2Icon } from 'lucide-react';
import React from 'react'

const Loading = () => {
  return (
<div className="lg:max-w-3xl mx-auto flex items-center justify-center w-full border-r border-l border-[rgba(0,0,0,0.19)] dark:border-[rgba(255,255,255,0.123)] p-4 h-screen
">
    <Loader2Icon className='text-pink-600'/>
</div>
  )
}

export default Loading;