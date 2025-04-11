"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/app/lib/getAuth";
import { TriangleAlert, ShieldX, NotebookPen, School, ClipboardPen, Volleyball, PartyPopper, Megaphone, EthernetPort, Circle, CircleDashed, Database } from "lucide-react";
import Link from 'next/link';
import { checkPermission } from '../lib/checkPermission';
import axios from 'axios';
import { toast } from "sonner"

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

    const [statusMain, setStatusMain] = useState<'loading' | 'online' | 'offline'>('loading');
    const [statusBackup, setStatusBackup] = useState<'loading' | 'online' | 'offline'>('loading');

    useEffect(() => {
        const checkApi = async (url: string, setStatus: (status: 'online' | 'offline') => void) => {
            try {
                await axios.get(url);
                setStatus('online');
            } catch (error) {
                console.log(`Failed to ping the server : ${error}`)
                setStatus('offline');
            }
        };

        checkApi('https://api.smt.siraphop.me/ping', setStatusMain);
        checkApi('https://api3.smt.siraphop.me/ping', setStatusBackup);
    }, []);

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
        <>
            <div className="py-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Link href={"/dashboard/announcement"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <Megaphone />
                    <h1 className='font-bold mt-1'>แก้ไขประกาศ</h1>
                    <p className='text-xs'>ข้อความประกาศของเว็ปไซต์</p>
                </Link>
                <Link href={"/dashboard/assignment"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <NotebookPen />
                    <h1 className='font-bold mt-1'>เพิ่มข้อมูลภาระงาน</h1>
                    <p className='text-xs'>ข้อมูลภาระงานในแต่ละวัน โดยฝ่ายการเรียน</p>
                </Link>
                <Link href={"/dashboard/classcode"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <School />
                    <h1 className='font-bold mt-1'>เพิ่มข้อมูลรหัสห้องเรียน</h1>
                    <p className='text-xs'>ข้อมูลรหัสห้องเรียน จาก ครูแต่ละวิชา โดยฝ่ายการเรียน</p>
                </Link>
                <Link href={"/dashboard/absent"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <ClipboardPen />
                    <h1 className='font-bold mt-1'>เช็คชื่อนักเรียน</h1>
                    <p className='text-xs'>เช็คจำนวนสมาชิกภายในห้อง โดยฝ่ายสารวัตร</p>
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
                }} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <Volleyball />
                    <h1 className='font-bold mt-1'>เพิ่มข้อมูลการแข่งขัน</h1>
                    <p className='text-xs'>ข้อมูลการแข่งขันของนักเรียน</p>
                </div>
                <Link href={"/dashboard/activities"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <PartyPopper />
                    <h1 className='font-bold mt-1'>เพิ่มข้อมูลกิจกรรม</h1>
                    <p className='text-xs'>บันทึกกิจกรรม โดยฝ่ายกิจกรรม</p>
                </Link>
                <Link href={"/dashboard/line"} className='border-1 w-full border-gray-300 rounded-md p-4 py-6 flex flex-col items-center justify-center cursor-pointer'>
                    <Megaphone />
                    <h1 className='font-bold mt-1'>ส่งข้อความประกาศ</h1>
                    <p className='text-xs'>ส่งข่าวสาร / ประกาศต่างๆ ไปทาง Line Offical</p>
                </Link>
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <EthernetPort />
                    <h1 className='font-bold text-lg'>API Status</h1>
                </div>
                <p className='text-sm'>หน้านี้แสดงสถานะการทำงานของเซิร์ฟเวอร์ API เพื่อให้ตรวจสอบความพร้อมใช้งานและการเชื่อมต่อได้อย่างง่ายดาย</p>
            </div>
            <div className='py-4 w-full flex flex-col gap-4'>
                <div className="w-full overflow-hidden rounded-md border bg-white">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center p-4 bg-gray-100 rounded-full">
                                {statusMain == "online" ? <><Circle size={14} className='animate-ping' /></> : <><CircleDashed size={24} /></>}
                            </div>
                            <div className="flex-1 px-4">
                                <h3 className="font-medium text-base">API SMT</h3>
                                <p className="text-xs truncate">https://api.smt.siraphop.me/</p>
                            </div>
                            <div className="p-4 text-xs whitespace-nowrap hidden md:block">
                                เช็คล่าสุด : ตอนนี้
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-hidden rounded-md border bg-white">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center p-4 bg-gray-100 rounded-full">
                                {statusBackup == "online" ? <><Circle size={14} className='animate-ping' /></> : <><CircleDashed size={24} /></>}
                            </div>
                            <div className="flex-1 px-4">
                                <h3 className="font-medium text-base">API SMT {"(สำรอง)"}</h3>
                                <p className="text-xs truncate">https://api3.smt.siraphop.me/</p>
                            </div>
                            <div className="p-4 text-xs whitespace-nowrap hidden md:block">
                                เช็คล่าสุด : ตอนนี้
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main