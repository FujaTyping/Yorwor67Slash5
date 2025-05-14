"use client";

import React from 'react'
import useFcmToken from "@/app/lib/hooks/useFcmToken";
import { BellRing, BellOff, RotateCcw } from 'lucide-react';

function System() {
    const { token, notificationPermissionStatus } = useFcmToken();

    return (
        <>
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
        </>
    )
}

export default System