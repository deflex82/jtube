
import Video from "@/components/Video";
import { getallVideos } from "@/lib/datafetching";


export default async function Home() {
  const videos = await getallVideos();


  



  return (
    <div className="flex-1  lg:p-4 ">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 w-full">

        {
          videos?.map(video=>{
            
            return(
              <Video key={video._id} details={video}/>
            )
          })
    
        }
     

      </div>
    
    


    </div>
 
  );
}
