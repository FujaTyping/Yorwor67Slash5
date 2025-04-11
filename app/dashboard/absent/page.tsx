import React from 'react'
import Main from './main'
import { School } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ เช็คชื่อ',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <School />
                        <h1 className='font-bold text-lg'>Check-In Form</h1>
                    </div>
                    <p className='text-sm'>เช็คจำนวนสมาชิกภายในห้อง โดยฝ่ายสารวัตร</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    )
}

export default page