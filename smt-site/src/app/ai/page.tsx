'use client';

import { useState } from "react"
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import Cynthia from '../assets/chat/Cynthia.jpg'
import Aether from '../assets/chat/Aether.jpg'
import { AiFillExperiment } from "react-icons/ai";
import useLocalStorge from "../lib/localstorage-db";
import useSound from 'use-sound';

export default function smtAI() {
    const [title] = useState("Hatyaiwit - AI");
    const [CynthiaV] = useSound("/assets/Sound/Cynthia.wav");
    const { isLogin } = useLocalStorge(false);
    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <Alert style={{ width: '80%', margin: 'auto', marginTop: '20px' }} color="failure" icon={HiInformationCircle}>
                <span className="font-medium">แจ้งเตือน !</span> AI ทั้งหมดนี้กำลังอยู่ในช่วงการพัฒนา คำตอบหรือคำแนะนำที่ให้มานั้นอาจไม่ถูกต้องหรือครอบคลุมทุกกรณี ขอแนะนำให้ใช้อย่างระมัดระวังและตรวจสอบข้อมูลเพิ่มเติมเมื่อจำเป็น
            </Alert>
            <div className="container">
                <h1 style={{ marginBottom: "15px" }} className="border-b">
                    🤖 เลือกผู้ช่วยที่ใช่สำหรับคุณ
                </h1>
                <h2 style={{ fontSize: '18px' }}>ผู้ช่วย AI อัจฉริยะที่พร้อมตอบคำถาม ช่วยแก้ปัญหาการเรียน และให้คำแนะนำ ไม่ว่าจะเป็นด้านคณิตศาสตร์ วิทยาศาสตร์ หรือกลยุทธ์การเรียนรู้ ทุกอย่างเพื่อช่วยให้คุณก้าวสู่เป้าหมายได้ง่ายขึ้น</h2>
                <div className="flex flex-col md:flex-row justify-center items-center rounded-lg mt-10 gap-10">
                    <Link onClick={() => { if (isLogin) { CynthiaV(); } }} href="/chat/cynthia" style={{ maxWidth: '20rem', height: '27rem' }} className="rounded-lg group relative block bg-black">
                        <img
                            alt="Cythia"
                            src={Cynthia.src}
                            className="rounded-lg absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8 rounded-lg">
                            <p className="text-white text-sm font-medium uppercase tracking-widest">AI Assistant</p>
                            <p className="text-xl font-bold text-white sm:text-2xl">Cynthia</p>
                            <div style={{ marginTop: '17.5rem' }}>
                                <div
                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white">
                                        ที่ปรึกษาส่วนตัว AI อบอุ่น ใส่ใจ พร้อมช่วยทุกปัญหาการเรียน
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/chat/aether" style={{ maxWidth: '20rem', height: '27rem' }} className="rounded-lg group relative block bg-black">
                        <img
                            alt="Aether"
                            src={Aether.src}
                            className="rounded-lg absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                        />
                        <div className="relative p-4 sm:p-6 lg:p-8 rounded-lg">
                            <p className="text-white text-sm font-medium uppercase tracking-widest">AI Assistant</p>
                            <p className="text-xl font-bold text-white sm:text-2xl flex items-center">Aether <AiFillExperiment className="ml-1" /></p>
                            <div style={{ marginTop: '17.5rem' }}>
                                <div
                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    <p className="text-sm text-white">
                                        ที่ปรึกษา AI อัจฉริยะ ผู้เชี่ยวชาญคณิต-วิทย์ คม เฉียบ และล้ำสมัย
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}