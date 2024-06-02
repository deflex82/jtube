"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeImage = ()=>{
    const {theme} = useTheme();

    return(
        <div>
            {theme=="dark" ?<>
            <Image src={"/whitel.png"} alt="white logo" width={40} height={100} className="object-cover"/>
            </>:<>
            <Image src={"/blackl.png"} alt="dark logo" width={40} height={100} className="object-cover"/>

            </>}


        </div>
    )
}

export default ThemeImage;