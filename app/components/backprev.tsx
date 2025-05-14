"use client"

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Backprev() {
    const router = useRouter()
    return (
        <Button className='text-xs hover:cursor-pointer' onClick={() => router.back()}>
            <ArrowLeft />
            กลับไปยังหน้าก่อนหน้านี้
        </Button>
    )
}

export default Backprev