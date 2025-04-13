import React from 'react'
import type { Metadata } from 'next';
import { SparklesIcon, EraserIcon } from 'lucide-react';
import Tree from "@/app/assets/media/WhiteTree.webp"
import SS from "@/app/assets/media/ShiftSchedule.webp"

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ ห้องเรียนสีขาว',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <SparklesIcon />
                        <h1 className='font-bold text-lg'>White Classroom</h1>
                    </div>
                    <p className='text-sm'>ห้องเรียนสีขาวเป็นห้องเรียนที่มีแหล่งเรียนรู้ ดูแลช่วยเหลือ เอื้อเฟื้อด้วยคุณธรรม สร้างสรรค์ด้วยกิจกรรม โดยมีการจัดองค์กรภายในห้องเรียน ประกอบด้วยโครงสร้างของแกนนำ</p>
                </div>
            </div>
            <div className='px-6 w-full py-4'>
                <img src={Tree.src} alt="Student Tree" className="w-full object-cover max-w-[1100px] mx-auto" height={960} width={1280} />
            </div>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <EraserIcon />
                        <h1 className='font-bold text-lg'>Shift Schedule</h1>
                    </div>
                    <p className='text-sm'>ส่วนนี้แสดงตารางเวรทำความสะอาดประจำวัน เพื่อให้แต่ละคนรู้หน้าที่และช่วยกันดูแลความเรียบร้อยของห้องเรียน</p>
                </div>
            </div>
            <div className='px-6 w-full py-4'>
                <img src={SS.src} alt="Schedule" className="w-full object-cover max-w-[1100px] mx-auto" height={960} width={1280} />
            </div>
        </>
    )
}

export default page