import React, { ReactNode } from 'react'

const Authlayout = ({children}:{children:ReactNode}) => {
  return (  <div className='w-full h-full flex items-center justify-center' >
    {children}

    </div>
  )
}

export default Authlayout;