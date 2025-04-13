"use client"

import React from 'react'
import { CalendarDays, Database, Image, NotebookTabs } from 'lucide-react';
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Schedule from "@/app/assets/media/Timetable.webp"
import Exam from "@/app/assets/media/ExamTimetable.webp"

function Infomation() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Dialog>
                    <DialogTrigger>
                        <div className="border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer">
                            <CalendarDays />
                            <h1 className='font-bold mt-1'>ตารางเรียน</h1>
                            <p className='text-xs'>ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='flex items-center gap-2'><CalendarDays /> ตารางเรียน</DialogTitle>
                            <DialogDescription className='text-black  text-left'>
                                ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง ครั้งที่ 2
                                เริ่มใช้ตั้งแต่วันจันทร์ที่ 4 พฤศจิกายน 2567 เป็นต้นไป
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <img src={Schedule.src} alt="Schedule" height={643} width={998} />
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>
                        <div className="border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer">
                            <CalendarDays />
                            <h1 className='font-bold mt-1'>ตารางสอบ</h1>
                            <p className='text-xs'>ตารางสอบ ตารางสอบนี้เป็นฉบับล่าสุด</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='flex items-center gap-2'><CalendarDays /> ตารางสอบ</DialogTitle>
                            <DialogDescription className='text-black text-left'>
                                ตารางสอบ ตารางสอบนี้เป็นฉบับล่าสุด ม.4 เทอม 2 กลางภาค
                                เริ่มใช้ตั้งแต่วันพุธที่ 18 ธันวาคม 2567 - 27 ธันวาคม 2567 เป็นต้นไป
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <img src={Exam.src} alt="Exam" height={1501} width={1077} />
                        </div>
                    </DialogContent>
                </Dialog>
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