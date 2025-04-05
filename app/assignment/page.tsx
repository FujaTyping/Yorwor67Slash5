import React from 'react'
import { PencilLine } from "lucide-react"

import { DataTableDemo } from './datatable/cd'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ ภาระงาน',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

async function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <PencilLine />
                        <h1 className='font-bold text-lg'>Assignment</h1>
                    </div>
                    <p className='text-sm'>หน้านี้รวบรวมงาน การบ้าน และสิ่งที่ต้องทำทั้งหมด พร้อมระบบแจ้งเตือน กรอง และค้นหา เพื่อให้ติดตามและจัดการงานได้ง่ายขึ้น</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <DataTableDemo />
            </div>
        </>
    )
}

export default page