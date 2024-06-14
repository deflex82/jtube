

import {
  Sheet,

  SheetContent,

  SheetHeader,

  SheetTrigger,
} from "@/components/ui/sheet"

import { LogIn,  Menu, Settings, Upload, User, Video } from "lucide-react"
import { ModeToggle } from "./Toggle"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import ThemeImage from "./ThemeImage"


export async function SheetDemo() {
  const userdata = await currentUser()
  const user = JSON.parse(JSON.stringify(userdata));
 

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={28} className="hover:opacity-85 " />
      </SheetTrigger>
      <SheetContent side={`left`}>
        <SheetHeader>
          <SheetTrigger asChild>
            <Link href={"/"}>
              <div className="flex items-center gap-1 mb-8 ">

                <div className="flex items-center gap-2">
                  <ThemeImage />
                  <h1 className='font-mono font-semibold text-2xl text-pink-600'>Jtube</h1>




                </div>


              </div>

            </Link>


          </SheetTrigger>

        </SheetHeader>


        <div className="flex flex-col">


          <nav>
            <ul className="flex flex-col gap-4 cursor-pointer text-[1rem]  ">
              {
                !user && (
                  <SheetTrigger asChild>
                    <Link href={"/sign-in"}>
                      <li className="flex items-center gap-4 transition hover:opacity-85 font-semibold p-2"><LogIn /> Sign In</li>

                    </Link>

                  </SheetTrigger>
                )

              }

              <Link href={`/profile/${user?.id}`}>
              {user && (<li className="flex items-center gap-4 transition hover:opacity-85 p-2 font-semibold"><User /> Profile </li>)}
              </Link>

              <li className="flex items-center gap-4 transition hover:opacity-85 p-2 font-semibold"><Settings /> Settings</li>
              {user &&
                <SheetTrigger asChild>
                  <Link href={"/upload"}>
                    <li className="flex items-center gap-4 transition hover:opacity-85 p-2 font-semibold"><Upload /> Upload</li>

                  </Link>

                </SheetTrigger>
              }
              {user &&
                <SheetTrigger asChild>
                  <Link href={"/live"}>
                    <li className="flex items-center gap-4 transition hover:opacity-85 p-2 font-semibold"><Video /> Go live</li>
                  </Link>

                </SheetTrigger>
              } 
                <div className="flex items-center gap-3 fixed bottom-3 transition hover:opacity-85 p-2 font-semibold">
                <SheetTrigger asChild>
                  <div className="
                  ">
                     <ModeToggle />

                  </div>
                 
                  </SheetTrigger>




                  Select Theme
                </div>

              
          



            </ul>
          </nav>


        </div>


      </SheetContent>

    </Sheet>
  )
}
