import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    MapPin,
    Users,
    Microscope,
    Calculator,
    Laptop,
} from "lucide-react"
import Slide from './slide'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ เกี่ยวกับห้องเรียน',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <section className="py-4 px-6 w-full">
                <div className="grid gap-8 md:grid-cols-2 items-center w-full">
                    <div className="space-y-4 w-full">
                        <h2 className="text-3xl font-bold tracking-tight">เกี่ยวกับห้อง ม.5/5</h2>
                        <p>
                            ห้อง ม.5/5 เป็นห้องเรียนเฉพาะทางด้านวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 5 ซึ่งเน้นหลักสูตรขั้นสูงเพื่อเตรียมความพร้อมให้นักเรียนประสบความสำเร็จทางวิชาการในสาขา STEM ในอนาคต
                        </p>
                        <p>
                            โดยมีนักเรียน 35 คน ห้องเรียน ม.5/5 มอบสภาพแวดล้อมการเรียนรู้แบบร่วมมือกัน ที่นักเรียนมีส่วนร่วมในกระบวนการเรียนรู้แบบใช้โครงงานเป็นฐาน การสืบค้นทางวิทยาศาสตร์ และนวัตกรรมทางเทคโนโลยี
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Users className="h-3 w-3" /> นักเรียน 35 คน
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> 468 ถ.เพชรเกษม ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110
                            </Badge>
                        </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden w-full">
                        <Slide />
                    </div>
                </div>
            </section>
            <section className="py-4 px-6">
                <div>
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold tracking-tight">จุดเน้นห้องเรียน SMT</h2>
                        <p className="mt-2 max-w-2xl mx-auto">
                            ม.5/5 มุ่งเน้นการศึกษาพิเศษในสามด้านหลักของ STEM
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="bg-background">
                            <CardHeader className="text-center">
                                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Microscope className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className='text-xl'>S - วิทยาศาสตร์</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>ชีววิทยาขั้นสูงและระบบนิเวศ</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>พื้นฐานเคมี</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>หลักการฟิสิกส์และวิศวกรรม</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>กระบวนการวิทยาศาสตร์และการวิจัย</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-background">
                            <CardHeader className="text-center">
                                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Calculator className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className='text-xl'>M - คณิตศาสตร์</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>เลขคณิตและพีชคณิตขั้นสูง</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>เรขาคณิตและการให้เหตุผลเชิงพื้นที่</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>การวิเคราะห์ข้อมูลและสถิติ</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>การแก้ปัญหาทางคณิตศาสตร์</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-background">
                            <CardHeader className="text-center">
                                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Laptop className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className='text-xl'>T - เทคโนโลยี</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>พื้นฐานวิทยาการคอมพิวเตอร์</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>หุ่นยนต์และการเขียนโปรแกรม</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>สื่อดิจิทัลและการออกแบบ</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        </div>
                                        <span>จริยธรรมและความปลอดภัยด้านเทคโนโลยี</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page