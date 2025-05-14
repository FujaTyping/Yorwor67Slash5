import React from 'react'
import Main from './main'
import { PartyPopper } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ กิจกรรม',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <PartyPopper />
                        <h1 className='font-bold text-lg'>Activities Form</h1>
                    </div>
                    <p className='text-sm'>บันทึกข้อมูลกิจกรรม โดยฝ่ายกิจกรรม</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    )
}

export default page