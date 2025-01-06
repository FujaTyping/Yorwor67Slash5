'use client';

import { useState } from "react"
import { Alert } from "flowbite-react";
import { IoIosMail } from "react-icons/io";
import { TiWarning } from "react-icons/ti";
import { MdMiscellaneousServices } from "react-icons/md";

export default function Terms() {
    const [title] = useState("Hatyaiwit - ข้อตกลงและเงื่อนไขการใช้บริการ");
    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <div style={{ marginTop: '-1.5rem', marginBottom: '-0.5rem' }} className="container">
                <div className="mx-auto">
                    <div className="bg-white rounded-2xl md:shadow-xl md:p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center"><MdMiscellaneousServices className="mr-3" /> ข้อตกลงและเงื่อนไขการใช้บริการ</h1>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. การยอมรับข้อกำหนด</h2>
                            <div>
                                <p>
                                    โดยการใช้งาน Yorwor67Slash5 คุณยืนยันว่าคุณได้อ่าน เข้าใจ และตกลงตามข้อกำหนดที่ระบุไว้ในเอกสารนี้ ข้อกำหนดเหล่านี้จะใช้กับการใช้งานเว็บไซต์และบริการใดๆ ที่มีการให้บริการผ่านเว็บไซต์นี้ เราขอสงวนสิทธิ์ในการแก้ไขหรือปรับปรุงข้อกำหนดเหล่านี้ได้ตลอดเวลา การใช้งานเว็บไซต์ต่อไปหลังจากการแก้ไขหรือปรับปรุงข้อกำหนดถือเป็นการยอมรับข้อกำหนดที่มีการอัปเดต
                                </p>
                            </div>
                        </section>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. การปฏิเสธความรับผิด</h2>
                            <div>
                                <p>
                                    Yorwor67Slash5 ถูกออกแบบมาเพื่อช่วยนักเรียนในการติดตามการเข้าเรียนและการจัดการการบ้าน อย่างไรก็ตาม ความถูกต้องของข้อมูลขึ้นอยู่กับข้อมูลที่ได้รับจากทั้งนักเรียนและบุคลากรของโรงเรียน เราไม่สามารถรับประกันความถูกต้องหรือความแม่นยำของข้อมูลที่ให้มา และจะไม่รับผิดชอบต่อข้อผิดพลาดหรือความคลาดเคลื่อนใดๆ ที่เกิดขึ้นจากการใช้งานเว็บไซต์
                                </p>
                            </div>
                        </section>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. การแก้ไข</h2>
                            <Alert color="warning" icon={TiWarning}>
                                เราอาจมีการปรับปรุงหรือเปลี่ยนแปลงเว็บไซต์หรือบริการใดๆ บนเว็บไซต์นี้ได้ตลอดเวลาโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ข้อกำหนดนี้อาจได้รับการปรับปรุง และการปรับปรุงเหล่านี้จะถูกโพสต์ในหน้านี้ คุณมีหน้าที่ในการตรวจสอบหน้านี้เป็นระยะๆ เพื่อให้แน่ใจว่าคุณได้ทราบถึงการเปลี่ยนแปลง หากคุณยังคงใช้งานเว็บไซต์หลังจากมีการปรับปรุงข้อกำหนดนี้ ถือว่าคุณยอมรับข้อกำหนดที่ได้อัปเดตแล้ว
                            </Alert>
                        </section>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. ความเป็นส่วนตัวและการใช้ข้อมูล</h2>
                            <div>
                                <p>
                                    ความเป็นส่วนตัวของคุณมีความสำคัญกับเรา ข้อมูลส่วนบุคคลใดๆ ที่ถูกเก็บรวบรวมผ่านเว็บไซต์จะถูกใช้งานเฉพาะเพื่อวัตถุประสงค์ที่ตั้งไว้ เช่น การติดตามการเข้าเรียนและการจัดการการบ้าน ข้อมูลส่วนบุคคลของคุณจะไม่ถูกแบ่งปันกับบุคคลภายนอก
                                </p>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. ข้อมูลติดต่อ</h2>
                            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                                <p>หากคุณมีคำถาม ข้อกังวล หรือข้อเสนอแนะเกี่ยวกับข้อกำหนดนี้หรือเว็บไซต์ กรุณาติดต่อเราที่</p>
                                <a href="mailto:yorwor@siraphop.me" className="inline-flex items-center text-blue-600 hover:text-blue-500">
                                    <IoIosMail className="w-5 h-5 mr-2" />
                                    อีเมล
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}