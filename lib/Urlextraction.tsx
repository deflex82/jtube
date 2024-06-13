
function extractPublicIdFromUrl(url:string) {
    // Assuming the URL is something like: 
    // https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/public_id.extension
  
    const regex = /\/upload\/v\d+\/([^\/]+)\.[a-z0-9]+$/i;
  const match = url.match(regex);
  return match ? match[1] : null;
  }


  export default extractPublicIdFromUrl;