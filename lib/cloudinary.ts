import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

// Ensure the environment variables are correctly typed
const cloudinaryConfig: ConfigOptions = {
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
  cloud_name: process.env.cloudinary_cloud_name as string,
  secure: true
};

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

interface SignatureResponse {
  timestamp: number;
  signature: string;
}

export async function getSignature(): Promise<SignatureResponse> {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'next' },
    cloudinaryConfig.api_secret as string
  );

  return { timestamp, signature };
}
