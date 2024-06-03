
import { UserButton, } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Menu, Search, Upload } from 'lucide-react'

import Link from 'next/link'
import React from 'react'
import { RadioTower } from 'lucide-react';
import { ModeToggle } from './Toggle'
import ThemeImage from './ThemeImage'
import { Separator } from './ui/separator'
const Header = async () => {
    const user = await currentUser()

    return (
        <div className='px-5 sticky dark:border-[rgba(255,255,255,0.11)] top-0 shadow-sm  border-b border-[rgba(0,0,0,0.12)] dark:bg-[#090715] bg-zinc-50 p-3 z-10 flex items-center '>
            <div className="lg:flex-[0.2] flex items-center gap-4 flex-1 justify-between lg:justify-normal">
                <Menu />


                <Link href={"/"}>

                    <div className="flex items-center gap-1">
                        <ThemeImage />
                        <h1 className='font-mono font-semibold text-2xl text-pink-600'>Jtube</h1>

                    </div>

                </Link>
            </div>

            <div className="flex-[0.6] items-center justify-center  hidden lg:flex ">
                <form className='border outline-0  w-[50%] flex rounded-l-md border-[rgba(0,0,0,0.22)] dark:border-[rgba(255,255,255,0.231)] rounded-r-lg items-center' >
                    <input type="text" placeholder='Search..' className='border-none outline-none flex-1 bg-transparent p-2 font-semibold' />
                    <button className='bg-pink-600 p-2 border border-pink-600  outline-1 outline-pink-600 rounded-r-lg px-4 hover:bg-pink-600/75 transition'  ><Search className='text-white' /></button>
                </form>
            </div>
            <div className="flex-[0.2] hidden lg:flex items-center gap-8 justify-end cursor-pointer ">
                {user ? <>
                    <div className="flex flex-col gap-1 items-center group">
                        <Upload className='group-hover:font-bold group-hover:text-pink-600 ' />
                        <p className='group-hover:font-semibold group-hover:text-pink-600 text-sm'>upload</p>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center group">
                        <RadioTower className='group-hover:font-bold group-hover:text-pink-600 ' />
                        <p className='group-hover:font-semibold group-hover:text-pink-600 text-sm'>live</p>
                    </div>

                    <UserButton afterSignOutUrl='/' />


                    <ModeToggle />
                </> : <>

                    <div className="flex items-center gap-1">
                        <Link href={"/sign-in"}>


                            <button className='p-2    font-semibold text-sm transition 
                             hover:opacity-75 hover:shadow-sm '>Sign In</button>
                        </Link>
                        <Separator orientation='vertical' className='my-2' />

                        <Link href={"/sign-up"}>
                            <button className='p-2    font-semibold text-sm transition 
                             hover:opacity-75 hover:shadow-sm '>Sign Up</button>

                        </Link>
                        <ModeToggle />

                    </div>

                </>}



            </div>


        </div>
    )
}

export default Header