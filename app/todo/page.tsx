import React from 'react'
import { ListTodo } from "lucide-react"
import Main from './main'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ งานที่ต้องทำ',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <ListTodo />
                        <h1 className='font-bold text-lg'>To Do List</h1>
                    </div>
                    <p className='text-sm'>ส่วนนี้แสดงรายการงานที่ต้องทำทั้งหมดของคุณ สามารถดูรายละเอียดและจัดการงานต่างๆ ได้ที่นี่</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    )
}

export default page