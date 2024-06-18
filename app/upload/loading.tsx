import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full p-4 inset-0 absolute '>
    <div className="max-w-4xl mx-auto  h-full flex items-center justify-center ">
        <Loader2Icon className='text-pink-600'/>

    </div>
    </div>
  )
}

export default Loading