import React from 'react'
import { Component } from 'lucide-react'
import ActivitiesTimeline from './grid/tl'
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
                        <Component />
                        <h1 className='font-bold text-lg'>Activities</h1>
                    </div>
                    <p className='text-sm'>หน้านี้รวบรวมกิจกรรมต่างๆ ที่เคยเกิดขึ้น ทั้งในและนอกห้องเรียน เพื่อใช้เป็นบันทึกและย้อนดูความทรงจำที่ผ่านมา</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <ActivitiesTimeline />
            </div>
        </>
    )
}

export default page