import React from 'react'
import { CalendarArrowUp } from 'lucide-react'
import Main from './datatable/main'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ สถิตินักเรียน',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <CalendarArrowUp />
                        <h1 className='font-bold text-lg'>Check-In</h1>
                    </div>
                    <p className='text-sm'>หน้านี้รวบรวมข้อมูลการเช็กชื่อในแต่ละวัน พร้อมสรุปสถิติจำนวนนักเรียนที่มาและขาด เรียกดูย้อนหลังได้อย่างสะดวก</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    )
}

export default page