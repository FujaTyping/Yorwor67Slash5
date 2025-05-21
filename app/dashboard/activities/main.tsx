"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/app/lib/getAuth";
import { checkPermission } from '@/app/lib/checkPermission';
import { ShieldX } from "lucide-react";
import Cynthia from "@/app/assets/media/CynthiaWarning.svg";
import FForm from './form';

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
            const permission = await checkPermission(user.uid);
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
                <img src={Cynthia.src} alt="Cynthia" className='max-w-[120px]' />
                <h1 className="font-bold text-xl mb-1 mt-3">กรุณาล็อกอิน</h1>
                <p className="text-xs">เพื่อเข้าหน้าผู้ใช้งาน</p>
            </div>
        );
    }

    if (user?.email && !hasPermission) {
        return (
            <div className="py-4 w-full flex flex-col items-center justify-center">
                <img src={Cynthia.src} alt="Cynthia" className='max-w-[120px]' />
                <h1 className="font-bold text-xl mb-1 mt-3">ไม่สามารถเข้าหน้านี้ได้</h1>
                <p className="text-xs">คุณไม่ได้มีสิทธิ์เข้าถึงหน้านี้</p>
            </div>
        );
    }

    return (
        <>
            <div>
                <FForm />
            </div>
        </>
    )
}

export default Main