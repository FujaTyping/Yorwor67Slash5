"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/app/lib/getAuth";
import axios from 'axios';
import { TriangleAlert, ShieldX, UserCheck } from "lucide-react";

function Main() {
    const user = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        if (!user) return;

        async function checkPermission() {
            if (!user.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("https://api.smt.siraphop.me/permission", {
                    headers: {
                        "Auth": user.email
                    }
                });

                if (response.data === "Admin") {
                    setHasPermission(true);
                } else {
                    setHasPermission(false);
                }
            } catch (error) {
                console.error("บุคคลภายนอก :", error);
                setHasPermission(false);
                setLoading(false);
                return;
            } finally {
                setLoading(false);
            }
        }

        checkPermission();

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
                <p className="text-sm">เพื่อเป็นการยืนยันว่าเป็นนักเรียนห้อง ม.5/5</p>
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
        <div className="py-4 w-full flex flex-col items-center justify-center">
            <UserCheck size={32} />
            <h1 className="font-bold text-lg">คุณมีสิทธิ์เข้าถึงหน้านี้</h1>
            <p className="text-sm">ยินดีต้อนรับ {user.email}</p>
        </div>
    )
}

export default Main