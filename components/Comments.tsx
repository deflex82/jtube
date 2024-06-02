import Image from 'next/image'
import React from 'react'

const Comments = () => {
  return (
    <div className='flex items-center gap-2 w-full my-3'>
        <Image src={"/random.jpg"} alt='comment-profile' height={50} width={50} className='rounded-[50%]'/>

        <div className="flex flex-col gap-2">
            <div className="flex items-center">
                <h2 className='inline-block font-semibold'>@susant_77</h2>
                <p className='text-gray-600'>---<span>6 months ago</span></p>
            </div>
            <p className='text-gray-800 dark:text-slate-300'>This is the best video i have ever seen.</p>
        </div>


    </div>
  )
}

export default Comments