import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='inset-0 absolute flex justify-center items-center'>
        <Loader2Icon className='text-pink-600'/>

    </div>
  )
}

export default Loading