import React from 'react'
import { BellDot } from 'lucide-react';
import System from './system';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ การแจ้งเตือน',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function Page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <BellDot />
                        <h1 className='font-bold text-lg'>Notification</h1>
                    </div>
                    <p className='text-sm'>หน้านี้ใช้สำหรับเปิดใช้งานระบบแจ้งเตือน เพื่อรับข้อมูลข่าวสารและอัปเดตต่างๆ แบบเรียลไทม์</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <System />
            </div>
        </>
    )
}

export default Page