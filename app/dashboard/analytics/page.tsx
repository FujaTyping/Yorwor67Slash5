import React from 'react'
import Main from './main'
import { ChartCandlestick } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ ข้อมูลเชิงลึก',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <ChartCandlestick />
                        <h1 className='font-bold text-lg'>Firebase Analytics</h1>
                    </div>
                    <p className='text-sm'>ดูข้อมูลเชิงลึกจาก Log events ภายในเว็ปไชต์</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    )
}

export default page