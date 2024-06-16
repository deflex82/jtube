import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isProtectedRoute = createRouteMatcher([
  '/upload(.*)',
  '/forum(.*)',
  '/profile(.*)'
  
]);

export default clerkMiddleware(
  (auth,req)=>{
    
  }


);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};