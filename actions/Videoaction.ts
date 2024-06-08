"use server"

export async function createVideo(formData:any){
    console.log("request has arrived");

    try{
        console.log(formData);

    }
    catch(err){
        console.log(err)
    }


}