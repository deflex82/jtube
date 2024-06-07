"use client";
import React, { useState } from 'react'

const VideoZone = () => {
    const [video,setvideo] = useState<File>()
    
  return (
    <div>
    <input
      type="file"
      id="fileInput"
      style={{ display: 'none' }}
      accept="video/*"
      onChange={handleFileChange}
    />
    <button onClick={handleButtonClick}>Select Video</button>
    <span>{fileName}</span>
  </div>
  )
}

export default VideoZone