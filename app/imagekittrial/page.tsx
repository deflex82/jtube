import imageKit from '@/lib/FileUpload'
import React from 'react'

const page = () => {
    async function trial(formdata:FormData){
    "use server"

    try{
        const trial = formdata.get("trial") as unknown as File;
        const trial2 = formdata.get("trial2") as unknown as File;
      
     

        
    
        const arraybuffer = await trial.arrayBuffer();
        
        const arraybuffer2 = await trial2.arrayBuffer();
        const trialbuffer =  Buffer.from(arraybuffer);
        const trialbuffer2 =  Buffer.from(arraybuffer2);
      
        const videoresponse:any  = await imageKit.upload({
          file:trialbuffer,
          fileName:trial.name
        })
        const videoresponse2:any  = await imageKit.upload({
            file:trialbuffer2,
            fileName:trial2.name
          })
        console.log({videoresponse,videoresponse2})

    }
    catch(err){
        console.log(err);
    }
 
    
}
  return (
    <div>
        <form action={trial}>
            <input type='file' name='trial'/>
            <input type='file' name='trial2'/>
            <button>try</button>

        </form>
    </div>
  )
}

export default page