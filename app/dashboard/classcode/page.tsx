import React from 'react'
import Main from './main'
import { School } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ รหัสห้องเรียน',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <School />
                        <h1 className='font-bold text-lg'>Classcode Form</h1>
                    </div>
                    <p className='text-sm'>เพิ่มข้อมูลรหัสห้องเรียน จาก ครูแต่ละวิชา โดยฝ่ายการเรียน</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    )
}

export default page