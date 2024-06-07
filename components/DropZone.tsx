"use client";
import { Upload, Video } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

function MyDropzone({type}:{
  type:string
}) {
  const [image, setImage] = useState<File | undefined>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    setImage(acceptedFiles[0]);
    // Do something with the files
  }, []);

  const {getRootProps, getInputProps, isDragActive}: { getRootProps: () => DropzoneRootProps, getInputProps: () => DropzoneInputProps, isDragActive: boolean } = useDropzone({ onDrop, maxFiles: 1,
 });

  return (
    <>
      {image  ? (
        <div className='w-full'>
          <Image width={400} height={400} className='object-cover' src={URL.createObjectURL(image)} alt="Uploaded" />
          <button className='text-gray-400 p-2' onClick={() => setImage(undefined)}>Remove Image</button>
        </div>
      ) : (
        <form className='p-4 border  border-[rgba(69,63,63,0.86)]'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ?
              <p>Drop the files here ...</p> :
              <div className='flex flex-col gap-2 items-center'>
                {type=="video"?<>
                <Video/>
                </>
                :<>
                  <Upload />
                </>}
              
                <p>Drag and drop {`${type=="video"?"video":"thumbnail"}`} here, or click to select files</p>
              </div>
            }
          </div>
        </form>
      )}
    </>
  );
}

export default MyDropzone;
