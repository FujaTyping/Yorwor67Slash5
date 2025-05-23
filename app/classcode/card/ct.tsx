/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Copy, CopyCheck, TriangleAlert, ShieldX, DatabaseBackup, PanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/lib/getAuth";
import Link from "next/link";

type ClassData = {
    title: string;
    teacher: string;
    color: string;
    code: string;
    cid?: string;
};

export default function ClassroomCards() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const user = useAuth();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        if (!user) return;

        async function checkPermissionAndFetchClasses() {
            if (!user.email) {
                setLoading(false);
                return;
            }

            try {
                await axios.get("https://api.smt.siraphop.me/permission", {
                    headers: {
                        "Auth": user.email
                    }
                });
                setHasPermission(true);
            } catch (error) {
                console.error("บุคคลภายนอก :", error);
                setHasPermission(false);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("https://api.smt.siraphop.me/classcode");
                const fetchedClasses = response.data.Classcode.map((cls: any) => ({
                    title: cls.Subject,
                    teacher: cls.Teacher,
                    color: cls.Color || "oklch(62.3% 0.214 259.815)",
                    code: cls.Code,
                    cid: cls.Cid
                }));
                setClasses(fetchedClasses);
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        }

        checkPermissionAndFetchClasses();

        return () => clearTimeout(timeout);
    }, [user]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => {
            setCopiedCode(null);
        }, 3000);
    };

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
                <h1 className="font-bold text-lg">ไม่สามารถเข้าถึงข้อมูลได้</h1>
                <p className="text-sm">คุณไม่ได้อยู่ในห้อง ม.5/5</p>
            </div>
        );
    }

    return (
        <>
            {classes.length == 0 ?
                <>
                    <div className="py-4 w-full flex flex-col items-center justify-center">
                        <DatabaseBackup size={32} />
                        <h1 className="font-bold text-lg">ไม่พบข้อมูล</h1>
                        <p className="text-sm">ตอนนี้ยังไม่มีข้อมูลรหัสห้องเรียน</p>
                    </div>
                </>
                :
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 w-full">
                        {classes.map((cls, index) => (
                            <div key={index} className="overflow-hidden rounded-md border border-gray-200 transition-all duration-150 w-full">
                                <div style={{ backgroundColor: cls.color }} className="text-white p-4 flex items-center justify-between font-bold text-lg">
                                    <span>{cls.title}</span>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <span className="text-sm">{cls.teacher}<br />รหัส : {cls.code}</span>
                                    <div>
                                        <Button
                                            variant="ghost"
                                            className="hover:cursor-pointer"
                                            onClick={() => handleCopy(cls.code)}
                                        >
                                            {copiedCode === cls.code ? <CopyCheck size={16} /> : <Copy size={16} />}
                                        </Button>
                                        {cls.cid != "" && (<>
                                            <Link href={`${cls.cid}`}>
                                                <Button
                                                    variant="ghost"
                                                    className="hover:cursor-pointer"
                                                >
                                                    <PanelTop size={16} />
                                                </Button>
                                            </Link>
                                        </>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}
