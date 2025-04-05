import React from 'react'
import { SquareAsterisk } from 'lucide-react';
import ClassroomGrid from './card/ct';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ รหัสเข้าห้องเรียน',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <SquareAsterisk />
                        <h1 className='font-bold text-lg'>Classroom Code</h1>
                    </div>
                    <p className='text-sm'>หน้านี้รวบรวมรหัสเข้าห้องเรียน Google Classroom ของแต่ละวิชา เพื่อให้สามารถเข้าถึงและติดตามการเรียนได้สะดวก </p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <ClassroomGrid />
            </div>
        </>
    )
}

export default page