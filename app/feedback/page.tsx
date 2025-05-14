import React from 'react'
import { MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'
import FeedbackForm from './main/form'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ ความคิดเห็น',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <MessageSquare />
                        <h1 className='font-bold text-lg'>Feedback</h1>
                    </div>
                    <p className='text-sm'>หน้านี้เปิดให้ผู้ใช้งานส่งความคิดเห็น ข้อเสนอแนะ และคำติชม เพื่อใช้ในการพัฒนาระบบให้ดียิ่งขึ้น</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <FeedbackForm />
            </div>
        </>
    )
}

export default page