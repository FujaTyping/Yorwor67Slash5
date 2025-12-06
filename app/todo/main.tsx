/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "@/app/lib/getAuth";
import ACynthia from "@/app/assets/media/CynthiaWarning.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { Check, Grid2x2X, Loader, SquareCheckBig, Trash, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';

interface TodoList {
    Decs: string;
    status: string;
    id: string;
    Due: string;
}

function Main() {
    const user = useAuth();
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [data, setData] = useState<TodoList[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [openDrawer, SetOpenDrawer] = useState<boolean>(false);
    const [decsI, setDecsI] = useState("");
    const [idI, setIdI] = useState("");
    const [delLoad, setDelLoad] = useState(false);

    const parseThaiDate = (thaiDate: string): Date => {
        const monthsInThai: { [key: string]: number } = {
            'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3, 'พฤษภาคม': 4, 'มิถุนายน': 5,
            'กรกฎาคม': 6, 'สิงหาคม': 7, 'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
        };

        const dateParts = thaiDate.split(' ');
        if (dateParts.length !== 3) {
            return new Date();
        }
        const day = parseInt(dateParts[0], 10);
        const month = monthsInThai[dateParts[1]];
        const year = parseInt(dateParts[2], 10) - 543;

        if (isNaN(day) || month === undefined || isNaN(year)) {
            return new Date();
        }

        return new Date(year, month, day);
    };

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
            toast(<h1 className="flex items-center gap-2 font-bold"><SquareCheckBig /> อัพเดทข้อมูลเรียบร้อย</h1>);
            getDatt();
        } catch {
            toast.error(<h1 className="flex items-center gap-1 font-bold">ไม่สามารถอัพเดทข้อมูลได้</h1>, {
                description: <p className="text-black">กรุณาลองใหม่อีกครั้ง</p>
            })
        }
    }

    async function deleteItem() {
        setDelLoad(true);
        try {
            await axios.delete("https://api.smt.siraphop.me/todo/remove", {
                data: {
                    user: user.email,
                    id: idI
                }
            });
            SetOpenDrawer(false);
            toast(<h1 className="flex items-center gap-2 font-bold"><Trash /> นำข้อมูลออกเรียบร้อย</h1>);
            getDatt();
            setDelLoad(false);
        } catch {
            toast.error(<h1 className="flex items-center gap-1 font-bold">ไม่สามารถลบข้อมูลได้</h1>, {
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
            <>
                <div className='py-4 flex flex-col gap-3'>
                    {data && data?.length > 0 ? <>
                        {data.map((item: any, index: number) => <div className='relative border-2 p-3 px-4 rounded-md flex items-start gap-3' key={index}>
                            <Checkbox onClick={() => toggleTodolist(item.id)} checked={item.status == "DONE"} className='cursor-pointer w-5 h-5 border-2' />
                            <div>
                                <h1 className={`${item.status == "DONE" && 'line-through'} pr-5 md:pr-0`}>{item.Decs}</h1>
                                <p className='text-sm'>ครบกำหนด : {formatDistanceToNow(parseThaiDate(item.Due), { addSuffix: true, locale: th })} {`(${item.Due})`}</p>
                            </div>
                            <Trash onClick={() => { setDecsI(item.Decs); setIdI(item.id); SetOpenDrawer(true) }} size={18} className='absolute top-3 right-3 cursor-pointer' />
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
                <Drawer open={openDrawer} onOpenChange={SetOpenDrawer}>
                    <DrawerContent>
                        <div className='max-w-xl mx-auto'>
                            <DrawerHeader>
                                <DrawerTitle className='flex items-center gap-2'><Trash2 size={18} /> ยืนยันการลบรายการ</DrawerTitle>
                                <p>คุณแน่ใจที่จะลบรายการนี้หรือไม่</p>
                                <p>{decsI}</p>
                                <Button onClick={deleteItem} className='mt-2 cursor-pointer'>
                                    {delLoad ? <Loader className='animate-spin' /> : <Check />}
                                    ยืนยันการลบ</Button>
                            </DrawerHeader>
                        </div>
                    </DrawerContent>
                </Drawer>
            </>
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