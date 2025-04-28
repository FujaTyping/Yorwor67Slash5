"use client"

import React from 'react'
import { Separator } from "@/components/ui/separator";
import axios from "axios"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { logEvent } from "firebase/analytics";
import { analyticsPromise } from '../lib/firebaseAnalytic';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Info } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

function Footer() {
    const [openDrawer, SetOpenDrawer] = useState(true);
    const [version, setVersion] = useState("0");

    useEffect(() => {
        analyticsPromise.then((analytics) => {
            if (analytics) {
                logEvent(analytics, "page_view");
            }
        });
    }, []);

    useEffect(() => {
        axios.get("https://api.smt.siraphop.me/github/version")
            .then((response) => {
                if (response.data) {
                    setVersion(response.data.version);
                }
            })
            .catch((error) => {
                console.error("Error fetching version:", error);
            });
    }, []);

    return (
        <>
            <Separator />
            <div className='py-4 flex items-center justify-center w-full gap-3'>
                <p className='text-xs'>© 2567-2568 ทีมพัฒนา ม.5/5</p>
                <div className="h-5">
                    <Separator orientation="vertical" />
                </div>
                <p className="text-xs flex items-center gap-2">เวอร์ชั่น :<Badge className="bg-neutral-800 text-xs">{version} {":(dev)"}</Badge></p>
            </div>
            <Drawer open={openDrawer} onOpenChange={SetOpenDrawer}>
                <DrawerContent>
                    <div className='max-w-xl mx-auto'>
                        <DrawerHeader>
                            <DrawerTitle className='flex items-center gap-2'><Info size={18} />แจ้งเตือน</DrawerTitle>
                            <div className='flex flex-col gap-3'>
                                <p>เราได้มีการปรับปรุงและเปลี่ยนแปลงหลายอย่าง อยากรู้ว่าทุกคนรู้สึกยังไงบ้าง รู้สึกมีอะไรใหม่ ๆ ไหม? ช่วยคอมเมนต์หรือแสดงความคิดเห็นได้เลยน้าาา</p>
                                <Link href={"/feedback"}><Button variant="outline" className='w-full cursor-pointer'>แสงความคิดเห็น</Button></Link>
                            </div>
                        </DrawerHeader>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Footer