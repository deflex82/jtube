import imageKit from '@/lib/FileUpload'
import React from 'react'

const page = () => {
    async function trial(formdata:FormData){
    "use server"

    try{
        const trial = formdata.get("trial") as unknown as File;
      
     

        
    
        const arraybuffer = await trial.arrayBuffer();
        const trialbuffer =  Buffer.from(arraybuffer);
      
        const videoresponse:any  = await imageKit.upload({
          file:trialbuffer,
          fileName:trial.name
        })
        console.log(videoresponse)

    }
    catch(err){
        console.log(err);
    }
 
    
}
  return (
    <div>
        <form action={trial}>
            <input type='file' name='trial'/>
            <button>try</button>

        </form>
    </div>
  )
}

export default page