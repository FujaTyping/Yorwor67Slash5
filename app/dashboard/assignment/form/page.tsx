import React from 'react'
import FForm from './form'
import type { Metadata } from "next";
import { Book } from 'lucide-react'

export const metadata: Metadata = {
    title: "โรงเรียนหาดใหญ่วิทยาลัย ╎ ภาระงาน",
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
};

function page() {
    return (
        <>
            <div className="px-6 w-full">
                <div>
                    <div className="flex items-center gap-2">
                        <Book />
                        <h1 className="font-bold text-lg">Assignment Form</h1>
                    </div>
                    <p className="text-sm">
                        บันทึก ข้อมูลภาระงานในแต่ละวัน โดยฝ่ายการเรียน
                    </p>
                </div>
            </div>
            <div className="px-6 w-full">
                <FForm />
            </div>
        </>
    )
}

export default page