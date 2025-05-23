"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/app/lib/getAuth";
import { checkPermission } from '@/app/lib/checkPermission';
import { TriangleAlert, ShieldX } from "lucide-react";
import { DataTableDemo } from './cd';
import axios from 'axios';

type TableDDATA = {
    Time: string
    Subject: string
    Decs: string
    Due: string
    isDue: boolean
}

function Main() {
    const user = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [data, setData] = useState<TableDDATA[]>([])

    useEffect(() => {
        axios.get('https://api.smt.siraphop.me/assignment')
            .then((response) => {
                setData(response.data.Homework)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

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
            <div>
                <DataTableDemo data={data} />
            </div>
        </>
    )
}

export default Main