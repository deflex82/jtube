import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='lg:max-w-7xl mx-auto flex w-full items-center justify-center h-screen'>
        <Loader2Icon className='text-pink-600'/>
    </div>
  )
}

export default Loading