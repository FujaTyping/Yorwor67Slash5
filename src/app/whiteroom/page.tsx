'use client';

import { useState } from "react"
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import TreeImg from "../assets/About/Tree.webp"
import VeinImg from "../assets/About/Vein.webp"

export default function Whiteroom() {
    const [title] = useState("Hatyaiwit - ห้องเรียนสีขาว");
    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <section className="container">
                <div>
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl md:text-4xl mb-2">โครงการ ห้องเรียนสีขาว</h1>
                            <div className="flex">
                                <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
                            </div>
                            <p className="mt-4 text-base md:text-lg">ห้องเรียนสีขาวเป็นห้องเรียนที่มีแหล่งเรียนรู้ ดูแลช่วยเหลือ เอื้อเฟื้อด้วยคุณธรรม สร้างสรรค์ด้วยกิจกรรม โดยมีการจัดองค์กรภายในห้องเรียน ประกอบด้วยโครงสร้างของแกนนำ</p>
                        </div>
                    </div>
                    <img
                        alt="MemberTree"
                        width={1024}
                        height={768}
                        style={{ margin: "auto", marginTop: "10px" }}
                        src={TreeImg.src}
                    />
                </div>
            </section>
            <section className="container">
                <div>
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl md:text-4xl mb-2">ตารางการทำเวร (ทำความสะอาด)</h1>
                            <div className="flex">
                                <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
                            </div>
                            <p className="mt-4 text-base md:text-lg">ห้องเรียนสีขาวเป็นห้องเรียนที่มีแหล่งเรียนรู้ ดูแลช่วยเหลือ เอื้อเฟื้อด้วยคุณธรรม สร้างสรรค์ด้วยกิจกรรม โดยมีการจัดองค์กรภายในห้องเรียน ประกอบด้วยโครงสร้างของแกนนำ</p>
                        </div>
                    </div>
                    <img
                        width={1024}
                        height={768}
                        alt="CleaningVein"
                        style={{ margin: "auto", marginTop: "10px" }}
                        src={VeinImg.src}
                    />
                </div>
            </section>
        </>
    )
}