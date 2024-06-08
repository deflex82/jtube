"use client";
import { Video } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface VideoDropzoneProps {
  video?: File; // Optional initial video file
  setVideo: (file: File) => void;
}

function VideoDropzone({ video, setVideo }: VideoDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setVideo(acceptedFiles[0]);
    }
  }, [setVideo]); // Only include setVideo in dependency array

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "audio/*": [".mp3", ".wav", ".webm", ".flac", ".m4a"], // Simplified audio types
      "video/*": [".mp4", ".mpeg", ".webm"], // Simplified video types
    },
  });

  return (
    <>
      {video ? (
        <div className="p-4 border border-[rgba(69,63,63,0.86)]">
          <p>Uploaded Video:</p>
          <video width="80%" controls>
            <source src={URL.createObjectURL(video)} type={video.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="p-4 border border-[rgba(69,63,63,0.86)]">
          <div {...getRootProps()} className="flex flex-col gap-2 items-center cursor-pointer">
            <input type='file'  name="video" {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the video here ...</p>
            ) : (
              <div className="flex flex-col gap-2 items-center">
                <Video />
                <p>Drag and drop your video here, or click to select video</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VideoDropzone;
