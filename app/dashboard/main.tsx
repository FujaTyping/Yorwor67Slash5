"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/app/lib/getAuth";
import { TriangleAlert, ShieldX, NotebookPen, School, ClipboardPen, Volleyball, PartyPopper, Megaphone } from "lucide-react";
import Link from 'next/link';
import { checkPermission } from '../lib/checkPermission';

function Main() {
    const user = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        if (!user) return;

        async function fetchPermission() {
            const permission = await checkPermission(user.email);
            setHasPermission(permission);
            setLoading(false);
        }

        fetchPermission();

        return () => clearTimeout(timeout);
    }, [user]);

    if (loading) {
        return (
            <div className="my-10 flex items-center justify-center w-full">
                <div className="loader rounded-full"></div>
            </div>
        );
    }

    if (!user?.email && !hasPermission) {
        return (
            <div className="py-4 w-full flex flex-col items-center justify-center">
                <TriangleAlert size={32} />
                <h1 className="font-bold text-lg">กรุณาล็อกอิน</h1>
                <p className="text-sm">เพื่อเข้าหน้าผู้ใช้งาน</p>
            </div>
        );
    }

    if (user?.email && !hasPermission) {
        return (
            <div className="py-4 w-full flex flex-col items-center justify-center">
                <ShieldX size={32} />
                <h1 className="font-bold text-lg">ไม่สามารถเข้าหน้านี้ได้</h1>
                <p className="text-sm">คุณไม่ได้มีสิทธิ์เข้าถึงหน้านี้</p>
            </div>
        );
    }

    return (
        <div className="py-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href={"#"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <Megaphone />
                <h1 className='font-bold mt-1'>แก้ไขประกาศ</h1>
                <p className='text-xs'>ข้อความประกาศของเว็ปไซต์</p>
            </Link>
            <Link href={"#"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <NotebookPen />
                <h1 className='font-bold mt-1'>เพิ่มข้อมูลภาระงาน</h1>
                <p className='text-xs'>ข้อมูลภาระงานในแต่ละวัน โดยฝ่ายการเรียน</p>
            </Link>
            <Link href={"/dashboard/classcode"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <School />
                <h1 className='font-bold mt-1'>เพิ่มข้อมูลรหัสห้องเรียน</h1>
                <p className='text-xs'>ข้อมูลรหัสห้องเรียน จาก ครูแต่ละวิชา โดยฝ่ายการเรียน</p>
            </Link>
            <Link href={"#"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <ClipboardPen />
                <h1 className='font-bold mt-1'>เช็คชื่อนักเรียน</h1>
                <p className='text-xs'>เช็คจำนวนสมาชิกภายในห้อง โดยฝ่ายสารวัตร</p>
            </Link>
            <Link href={"#"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <Volleyball />
                <h1 className='font-bold mt-1'>เพิ่มข้อมูลการแข่งขัน</h1>
                <p className='text-xs'>ข้อมูลการแข่งขันของนักเรียน</p>
            </Link>
            <Link href={"#"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <PartyPopper />
                <h1 className='font-bold mt-1'>เพิ่มข้อมูลกิจกรรม</h1>
                <p className='text-xs'>บันทึกกิจกรรม โดยฝ่ายกิจกรรม</p>
            </Link>
            <Link href={"#"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                <Megaphone />
                <h1 className='font-bold mt-1'>ส่งข้อความประกาศ</h1>
                <p className='text-xs'>ส่งข่าวสาร / ประกาศต่างๆ ไปทาง Line Offical</p>
            </Link>
        </div>
    )
}

export default Main