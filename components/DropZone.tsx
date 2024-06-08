"use client";
import { Upload} from 'lucide-react';
import Image from 'next/image';
import React, { useCallback} from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

function MyDropzone({image,setImage}:any) {


  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    setImage(acceptedFiles[0]);
    // Do something with the files
  }, []);

  const {getRootProps, getInputProps, isDragActive}: { getRootProps: () => DropzoneRootProps, getInputProps: () => DropzoneInputProps, isDragActive: boolean } = useDropzone({ onDrop, maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/heic': [],
      'image/jfif': [],
   },
 });

  return (
    <>
      {image  ? (
        <div className='w-full'>
          <Image width={400} height={400} className='object-cover' src={URL.createObjectURL(image)} alt="Uploaded" />
          <button className='text-gray-400 p-2' onClick={() => setImage(undefined)}>Remove Image</button>
        </div>
      ) : (
        <div className='p-4 border  border-[rgba(69,63,63,0.86)]'>
          <div {...getRootProps()}>
            <input name='image' {...getInputProps()} />
            {isDragActive ?
              <p>Drop the files here ...</p> :
              <div className='flex flex-col gap-2 items-center'>
               
                  <Upload />
            
              
                <p>Drag and drop thumbnail here, or click to select thumbnail</p>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}

export default MyDropzone;
