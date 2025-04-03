"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type ClassData = {
    title: string;
    teacher: string;
    color: string;
    code: string;
};

export default function ClassroomCards() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await axios.get("https://api.smt.siraphop.me/classcode");
                const fetchedClasses = response.data.Classcode.map((cls: any) => ({
                    title: cls.Subject,
                    teacher: cls.Teacher,
                    color: "bg-blue-500",
                    code: cls.Code
                }));
                setClasses(fetchedClasses);
            } catch (error) {
                console.error("Failed to fetch class data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchClasses();
    }, []);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => {
            setCopiedCode(null);
        }, 3000);
    };

    if (loading) {
        return <div className="py-4"><div className="loader rounded-full"></div></div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {classes.map((cls, index) => (
                <div key={index} className="overflow-hidden hover:shadow-lg rounded-md border border-gray-200 transition-all duration-150">
                    <div className={`${cls.color} text-white p-4 flex items-center justify-between font-bold text-lg`}>
                        <span>{cls.title}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                        <span className="text-sm">{cls.teacher}</span>
                        <Button
                            variant="ghost"
                            className="hover:cursor-pointer"
                            onClick={() => handleCopy(cls.code)}
                        >
                            {copiedCode === cls.code ? <CopyCheck size={16} /> : <Copy size={16} />}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
