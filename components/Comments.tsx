import { getUser } from '@/lib/datafetching'
import { timeAgo } from '@/lib/formatteddate';
import processFullname from '@/lib/processfullname';

import Image from 'next/image'
import React from 'react'

const Comments = async({comment}:any) => {
  const user = await getUser(comment.clerkId);
  return (
    <div className='flex items-center gap-2 w-full my-3'>
        <Image src={user?.ImageUrl} alt='comment-profile' height={50} width={50} className='rounded-[50%]'/>

        <div className="flex flex-col gap-2">
            <div className="flex items-center">
                <h2 className='inline-block font-semibold'>{processFullname(user?.fullname)}</h2>
                <p className='text-gray-600'>---<span>{timeAgo(comment?.createdAt)}</span></p>
            </div>
        <p className='text-gray-800 dark:text-slate-300'>{comment.commentText}</p>
        </div>


    </div>
  )
}

export default Comments