/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "@/app/lib/getAuth";
import ACynthia from "@/app/assets/media/CynthiaWarning.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { Grid2x2X, Loader } from 'lucide-react';

interface TodoList {
    Decs: string;
    status: string;
    id: string;
}

function Main() {
    const user = useAuth();
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [data, setData] = useState<TodoList[]>();
    const [loading, setLoading] = useState<boolean>(true);

    async function getDatt() {
        const res = await axios.get("https://api.smt.siraphop.me/todo", {
            headers: {
                "Auth": user.email
            }
        })
        setData(res.data);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        if (!user) return;

        async function fetchPermission() {
            const response = await axios.get("https://api.smt.siraphop.me/permission", {
                headers: {
                    "Auth": user.email
                }
            });
            if (response.data == "Student") {
                getDatt()
            }
            setHasPermission(response.data == "Student");
        }

        fetchPermission();

        return () => clearTimeout(timeout);
    }, [user]);


    async function toggleTodolist(id: string) {
        toast(<h1 className="flex items-center gap-1 font-bold"><Loader className='animate-spin' /> กำลังอัพเดทข้อมูล</h1>, {
            description: <p className="text-black">อาจจะใช้เวลาสักครู่</p>
        });
        try {
            await axios.patch("https://api.smt.siraphop.me/todo/update", {
                user: user.email,
                id
            })
            toast.success(<h1 className="flex items-center gap-1 font-bold">อัพเดทข้อมูลเรียบร้อย</h1>);
            getDatt();
        } catch {
            toast.error(<h1 className="flex items-center gap-1 font-bold">ไม่สามารถอัพเดทข้อมูลได้</h1>, {
                description: <p className="text-black">กรุณาลองใหม่อีกครั้ง</p>
            })
        }
    }

    if (!user) {
        return (
            <div className="py-4 w-full flex flex-col items-center justify-center">
                <img src={ACynthia.src} alt="Cynthia" className='max-w-[120px]' />
                <h1 className="font-bold text-xl mb-1 mt-3">กรุณาล็อกอิน</h1>
                <p className="text-xs">เพื่อใช้ระบบนี้</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="my-10 flex items-center justify-center w-full">
                <div className="loader rounded-full"></div>
            </div>
        );
    }

    if (hasPermission) {
        return (
            <div className='py-4 flex flex-col gap-3'>
                {data && data?.length > 0 ? <>
                    {data.map((item: any, index: number) => <div className='border-2 p-3 px-4 rounded-md flex items-start gap-3' key={index}>
                        <Checkbox onClick={() => toggleTodolist(item.id)} checked={item.status == "DONE"} className='cursor-pointer w-5 h-5' />
                        <h1 className={`${item.status == "DONE" && 'line-through'}`}>{item.Decs}</h1>
                    </div>)}
                </> : <>
                    <div className='flex items-center justify-center py-8 flex-col gap-2'>
                        <Grid2x2X size={30} />
                        <div className='flex items-center justify-center flex-col'>
                            <h1 className='font-semibold'>ไม่พบข้อมูล</h1>
                            <p className='text-sm'>ลองเพิ่มงานที่ต้องทำดูสิ</p>
                        </div>
                    </div>
                </>}
            </div>
        )
    } else {
        return (
            <div className="py-4 w-full flex flex-col items-center justify-center">
                <img src={ACynthia.src} alt="Cynthia" className='max-w-[120px]' />
                <h1 className="font-bold text-xl mb-1 mt-3">ไม่สามารถเข้าหน้านี้ได้</h1>
                <p className="text-xs">คุณไม่ได้มีสิทธิ์เข้าถึงหน้านี้</p>
            </div>
        )
    }
}

export default Main