import { UserCog } from "lucide-react";
import Main from "./main";

export default function Page() {
    return (
        <>
            <div className='px-6 w-full'>
                <div>
                    <div className='flex items-center gap-2'>
                        <UserCog />
                        <h1 className='font-bold text-lg'>Dashboard</h1>
                    </div>
                    <p className='text-sm'>หน้านี้ใช้สำหรับอัปเดตและจัดการข้อมูลต่างๆ ภายในเว็บไซต์ เพื่อให้เนื้อหาใหม่และทันสมัยอยู่เสมอ</p>
                </div>
            </div>
            <div className='px-6 w-full'>
                <Main />
            </div>
        </>
    );
}