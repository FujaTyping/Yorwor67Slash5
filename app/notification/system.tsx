"use client";

import React from 'react'
//import useFcmToken from "@/app/lib/hooks/useFcmToken";
import { /*BellRing, BellOff, RotateCcw,*/ BellPlus, Check, X } from 'lucide-react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import FForm from './modal/dsg';

function System() {
    //const { token, notificationPermissionStatus } = useFcmToken();
    const [openDrawer, SetOpenDrawer] = React.useState(false);

    return (
        <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-4">
                <Card className="flex flex-col border-border">
                    <CardHeader>
                        <CardTitle className="text-xl">ส่งการแจ้งเตือนไปทางไลน์ Offical ของห้อง</CardTitle>
                        <CardDescription>ไม่ต้อง Setup ใดๆทั้งสิ้น</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">Line</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                <span>แจ้งเตือนทันที</span>
                            </li>
                            <li className="flex items-center">
                                <X className="w-5 h-5 mr-2 text-red-500" />
                                <span>จำกัดการแจ้งเตือน 200 คนต่อเดือน</span>
                            </li>
                            <li className="flex items-center">
                                <X className="w-5 h-5 mr-2 text-red-500" />
                                <span>ไม่รองรับการแจ้งเตือนแบบกลุ่ม</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="https://lin.ee/LyuR3qh">แจ้งเตือนไปยังไลน์</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="flex flex-col relative border-primary before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-primary/5">
                    <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        ใช้งานมากที่สุด
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl">ส่งการแจ้งเตือนไปยังดิสคอร์ด Webhooks</CardTitle>
                        <CardDescription>ต้อง Setup เชิฟเวอร์ ดิสคอร์ด</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">Discord</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                <span>รองรับการแจ้งเตือนแบบกลุ่ม</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                <span>แจ้งเตือนได้ไม่จำกัด</span>
                            </li>
                            <li className="flex items-center">
                                <X className="w-5 h-5 mr-2 text-red-500" />
                                <span>การแจ้งเตือนอาจจะมีการ Delay นิดหน่อย</span>
                            </li>
                            <li className="flex items-center">
                                <X className="w-5 h-5 mr-2 text-red-500" />
                                <span>ดิสคอร์ดอาจจะ Rate limit</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => SetOpenDrawer(true)} className="w-full cursor-pointer">
                            แจ้งเตือนไปยังดิสคอร์ด
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="flex flex-col border-border">
                    <CardHeader>
                        <CardTitle className="text-xl">แจ้งเตือนตรงผ่านเว็ปไชต์</CardTitle>
                        <CardDescription>ไม่ต้อง Setup ใดๆทั้งสิ้น</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold">Website</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                <span>แจ้งเตือนทันที</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="w-5 h-5 mr-2 text-green-500" />
                                <span>แจ้งเตือนได้ไม่จำกัด</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full text-black cursor-not-allowed">
                            กำลังพัฒนา
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/*
            {notificationPermissionStatus === "granted" ? (
                <>
                    <div className="py-4 w-full flex flex-col items-center justify-center">
                        <BellRing size={32} />
                        <h1 className="font-bold text-lg">ได้อนุญาตให้รับการแจ้งเตือนแล้ว</h1>
                        <p className="text-sm break-all">ด้วยโทเคน : {token ? (token.length > 20 ? `${token.slice(0, 20)}*****` : token) : "ไม่พบโทเคน"}</p>
                    </div>
                </>
            ) : notificationPermissionStatus !== null ? (
                <>
                    <div className="py-4 w-full flex flex-col items-center justify-center">
                        <BellOff size={32} />
                        <h1 className="font-bold text-lg">คุณไม่ได้ให้สิทธิ์ในการรับการแจ้งเตือน</h1>
                        <p className="text-sm">กรุณาเปิดการแจ้งเตือนในการตั้งค่าเบราว์เซอร์ของคุณ</p>
                    </div>
                </>
            ) :
                <>
                    <div className="my-10 flex flex-col gap-2 items-center justify-center w-full">
                        <div className="loader rounded-full"></div>
                        <p className="text-sm flex items-center gap-1"><RotateCcw size={16} /> หากกดอนุญาติแล้ว กรุณากดรีเฟรชหน้านี้ใหม่</p>
                    </div>
                </>
            }
            */}
            <Drawer open={openDrawer} onOpenChange={SetOpenDrawer}>
                <DrawerContent>
                    <div className='max-w-xl mx-auto'>
                        <DrawerHeader>
                            <DrawerTitle className='flex items-center gap-2'><BellPlus /> รับข้อมูลข่าวสารจากดิสคอร์ด</DrawerTitle>
                            <div className="mt-1">
                                <FForm />
                            </div>
                        </DrawerHeader>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default System