import DropZone from '@/components/DropZone';
import React from 'react'

const Upload = () => {
  return (
    <div className='w-full p-4'>
      <div className="max-w-5xl mx-auto  h-full">
        <h2 className='text-xl font-semibold my-3'>Upload Video</h2>
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <h3>Video</h3>
            <DropZone type='video'/>
            
          
          </div>
          <div className="flex flex-col gap-2">
            <h3>Thumbnail</h3>
            <DropZone type='image' />

          </div>
          <div className="flex flex-col gap-2">
            <h3>Title</h3>
            <input className='bg-transparent w-full p-2 border outline-none font-semibold  border-[rgba(69,63,63,0.86)]' type='text' />

          </div>
        </div>






      </div>

    </div>
  )
}

export default Upload;