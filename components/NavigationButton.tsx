"use client"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavigationButton = () => {
    const router = useRouter();
  return (
    <ArrowLeft onClick={()=>router.back()}  />
  
  )
}

export default NavigationButton