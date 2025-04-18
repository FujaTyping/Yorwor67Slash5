'use client'

import React from 'react'
import { CalendarDays, Database, Image, NotebookTabs } from 'lucide-react';
import Link from "next/link";
import { toast } from "sonner"
import Schedule from "@/app/assets/media/Timetable.webp"
import Exam from "@/app/assets/media/ExamTimetable.webp"
import { PhotoProvider, PhotoView } from 'react-photo-view';

function Infomation() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <PhotoProvider maskOpacity={0.5}>
                    <PhotoView src={Schedule.src}>
                        <div className="border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer">
                            <CalendarDays />
                            <h1 className='font-bold mt-1'>ตารางเรียน</h1>
                            <p className='text-xs'>ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง</p>
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <PhotoProvider maskOpacity={0.5}>
                    <PhotoView src={Exam.src}>
                        <div className="border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer">
                            <CalendarDays />
                            <h1 className='font-bold mt-1'>ตารางสอบ</h1>
                            <p className='text-xs'>ตารางสอบ ตารางสอบนี้เป็นฉบับล่าสุด</p>
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <Link href={"http://202.129.48.202/"} className="border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer">
                    <NotebookTabs />
                    <h1 className='font-bold mt-1'>ระเบียนผลการเรียน</h1>
                    <p className='text-xs'>ดูผลการเรียนออนไลน์</p>
                </Link>
                <div onClick={() => {
                    toast(
                        <h1 className="flex items-center gap-1 font-bold">
                            <Database size={16} /> ระบบฐานข้อมูล
                        </h1>,
                        {
                            description: (
                                <p className="text-black">
                                    หน้านี้ปิดใช้งานชั่วคราว
                                </p>
                            ),
                        },
                    );
                }} className="border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer">
                    <Image />
                    <h1 className='font-bold mt-1'>แฟ้มรูปภาพ</h1>
                    <p className='text-xs'>รวบรวมรูปภาพการทำกิจกรรมต่างๆ</p>
                </div>
            </div>
        </>
    )
}

export default Infomation
