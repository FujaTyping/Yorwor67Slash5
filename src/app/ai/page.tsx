'use client';

import { useState, useEffect } from "react"
import { List, Accordion, Modal, Button, Checkbox, Label } from "flowbite-react";
import Cynthia from '../assets/chat/Cynthia.jpg'
import { useRouter } from "next/navigation";
import Aether from '../assets/chat/Aether.jpg'
import { AiFillExperiment } from "react-icons/ai";
import useLocalStorge from "../lib/localstorage-db";
import useSound from 'use-sound';
import { FaCheckSquare, FaUserLock } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { FaBoltLightning } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";

export default function smtAI() {
    const [title] = useState("Hatyaiwit - AI");
    const [CynthiaV] = useSound("/assets/Sound/Cynthia.wav");
    const router = useRouter();
    const { isLogin } = useLocalStorge(false);
    const [stTOS, setStTOS] = useState(false);
    const [checkTOS, setCheckTOS] = useState(false);

    function acceptTOS() {
        if (checkTOS) {
            setStTOS(false);
            try {
                localStorage.setItem("aiTOS", "true");
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        }
    }

    useEffect(() => {
        try {
            const storedSTOS = localStorage.getItem("aiTOS");
            if (storedSTOS == "true") {
                setCheckTOS(true);
            }
        } catch (error) {
            console.error("Error reading data from localStorage:", error);
        }
    }, []);

    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <main style={{ marginBottom: '-1rem' }} className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 container">
                <div className="mb-8 flex justify-center">
                    <div style={{ background: 'linear-gradient(to right, hsl(219, 100%, 71%), #ff6767)' }}
                        className="relative rounded-full text-white px-4 py-1.5 text-sm leading-6 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20 flex gap-3 items-center">
                        <SiGooglegemini />
                        <span>ขับเคลื่อนโดย : Gemini</span>
                    </div>
                </div>
                <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-normal md:text-5xl">การศึกษาไร้ขีดจำกัด : <span className="whitespace-nowrap bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text">AI</span> ที่พร้อมพาคุณสู่
                    <span className="inline-block">
                        <span className="relative whitespace-nowrap">
                            <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
                            <span className="relative">ความสำเร็จ</span></span>
                    </span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg lg:mx-auto">ในยุคที่เทคโนโลยีและการเรียนรู้เชื่อมโยงกันอย่างไร้ขีดจำกัด, AI ของเราเป็นผู้ช่วยที่คุณสามารถพึ่งพาได้ในทุกๆ ด้าน ทั้งการแก้ปัญหาทางคณิตศาสตร์, วิทยาศาสตร์, และการวางกลยุทธ์การเรียนรู้ เพื่อให้คุณก้าวข้ามอุปสรรคในการศึกษาได้อย่างง่ายดาย</p>
                <div className="container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between">
                    <div className="grid gap-4 justify-items-center text-center md:flex-1">
                        <div style={{ borderWidth: '5px' }} className="rounded-full border-blue-600 p-4 ">
                            <BiSolidCustomize className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">การปรับแต่งให้เข้ากับผู้ใช้งาน</h3>
                        <p>เราเข้าใจว่าแต่ละคนมีวิธีการเรียนรู้ที่ไม่เหมือนกัน โมเดลนี้จึงสามารถปรับตัวเพื่อให้คำแนะนำที่เหมาะสมกับผู้ใช้งานแต่ละคน</p>
                    </div>
                    <div className="grid gap-4 justify-items-center text-center md:flex-1">
                        <div style={{ borderWidth: '5px' }} className="rounded-full border-blue-600 p-4 ">
                            <FaBoltLightning className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">ใช้งานง่ายและรวดเร็ว</h3>
                        <p>ด้วยระบบประมวลผลที่รวดเร็วและอินเทอร์เฟซที่ใช้งานง่าย คุณสามารถถามคำถามและได้รับคำตอบทันที</p>
                    </div>
                    <div className="grid gap-4 justify-items-center text-center md:flex-1">
                        <div style={{ borderWidth: '5px' }} className="rounded-full border-blue-600 p-4 ">
                            <FaUserLock className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">ความปลอดภัยและความเป็นส่วนตัว</h3>
                        <p>ออกแบบให้ปกป้องข้อมูลของผู้ใช้งานอย่างเข้มงวด</p>
                    </div>
                </div>
                <div style={{ marginTop: '-1rem' }} className="text-center p-10">
                    <h1 className="font-bold text-3xl mb-4">โมเดล AI ที่พร้อมให้บริการ</h1>
                    <p className="mt-4 max-w-2xl text-lg text-gray-800 lg:mx-auto">ในขณะนี้ เรามีโมเดล AI หลากหลายที่ตอบโจทย์ทุกความต้องการ ตั้งแต่การแก้ปัญหาง่าย ๆ ไปจนถึงการจัดการข้อมูลซับซ้อน เพื่อสนับสนุนการเรียนรู้และพัฒนาทุกด้านของคุณ</p>
                </div>
                <section id="Projects" style={{ marginTop: '-10px' }}
                    className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-12 mb-5">
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                        <div onClick={() => { if (checkTOS) { if (isLogin) { CynthiaV(); } router.push("/chat/cynthia"); } else { setStTOS(true); } }} >
                            <img src={Cynthia.src}
                                alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                            <div className="px-4 py-3 w-72">
                                <span className="text-gray-400 uppercase text-xs">AI Assistant</span>
                                <p className="text-lg font-bold text-black truncate block capitalize">Cynthia</p>
                                <div className="flex items-center">
                                    <p className="text-lg text-black cursor-auto my-3">ที่ปรึกษาส่วนตัว AI อบอุ่น ใส่ใจ พร้อมช่วยทุกปัญหาการเรียน</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                        <div onClick={() => { if (checkTOS) { router.push("/chat/aether"); } else { setStTOS(true); } }}>
                            <img src={Aether.src}
                                alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                            <div className="px-4 py-3 w-72">
                                <span className="text-gray-400 uppercase text-xs">AI Assistant</span>
                                <p className="text-lg font-bold text-black truncate block capitalize flex items-center justify-center">Aether <AiFillExperiment className="ml-1" /></p>
                                <div className="flex items-center">
                                    <p className="text-lg text-black cursor-auto my-3">ที่ปรึกษา AI อัจฉริยะ ผู้เชี่ยวชาญคณิต-วิทย์ และ ล้ำสมัย</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="py-4 max-w-4xl w-full mt-2">
                    <div className="mb-6">
                        <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                            FAQ
                        </p>
                        <h1 className="font-bold text-3xl mb-4">
                            คำถามที่พบบ่อย <span className="whitespace-nowrap bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text">เกี่ยวกับ AI</span>
                        </h1>
                    </div>
                    <Accordion className="text-center md:text-left" id="AIACC">
                        <Accordion.Panel>
                            <Accordion.Title>AI สามารถทำอะไรได้บ้าง?</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    AI สามารถช่วยในการเรียนรู้ แก้ปัญหาทางคณิตศาสตร์และวิทยาศาสตร์ ตอบคำถามทั่วไป ให้คำแนะนำเกี่ยวกับการเรียนอย่างมีประสิทธิภาพ และมอบคำปรึกษาที่สร้างแรงบันดาลใจ รวมถึงวิธีแก้ปัญหาแบบสร้างสรรค์
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>AI มีความแม่นยำเสมอหรือไม่?</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    แม้ AI จะถูกออกแบบมาให้ให้ข้อมูลที่แม่นยำ แต่บางครั้งอาจเกิดข้อผิดพลาดหรือให้คำตอบที่ไม่สมบูรณ์ แนะนำให้ตรวจสอบข้อมูลสำคัญจากแหล่งข้อมูลอื่นเพิ่มเติม
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>ข้อมูลส่วนตัวของฉันปลอดภัยหรือไม่?</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    ข้อมูลของคุณจะถูกเก็บรักษาเป็นความลับสูงสุด และใช้เพื่อพัฒนาประสิทธิภาพของ AI เท่านั้น โดยไม่มีการแชร์ข้อมูลให้กับบุคคลภายนอก
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>AI รองรับภาษาอื่นนอกจากภาษาไทยหรือไม่?</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    AI รองรับการใช้งานภาษาไทยและภาษาอังกฤษเป็นหลัก โดยสามารถตอบกลับตามภาษาที่ผู้ใช้เลือกใช้งานได้
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>AI ใช้งานฟรีหรือไม่?</Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    ในปัจจุบัน AI เปิดให้ใช้งานฟรีในช่วงทดลอง อาจมีการเพิ่มฟีเจอร์พิเศษหรือบริการแบบเสียค่าใช้จ่ายในอนาคต
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </main>
            <Modal
                className="animate__animated animate__fadeIn"
                show={stTOS}
                onClose={() => setStTOS(false)}
                size="md"
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            ข้อตกลงและเงื่อนไขการใช้บริการ (Terms of Service)
                        </h3>
                        <div style={{ maxHeight: '250px', overflowX: "auto" }}>
                            <h2 style={{ fontSize: "15px" }}>
                                ยินดีต้อนรับสู่การใช้งานระบบ AI ผู้ช่วยอัจฉริยะของเรา! เรามุ่งมั่นที่จะมอบประสบการณ์การใช้งานที่ดีที่สุดให้กับคุณ
                                กรุณาอ่านและทำความเข้าใจข้อตกลงและเงื่อนไขการใช้งานนี้อย่างละเอียดก่อนเริ่มใช้งาน เพื่อป้องกันความเข้าใจผิดและสร้างความมั่นใจว่าคุณได้รับประโยชน์สูงสุดจากบริการของเรา
                                หากคุณมีข้อสงสัยหรือคำถามใด ๆ อย่าลังเลที่จะติดต่อเรา
                            </h2>
                            <List style={{ marginTop: "20px", fontSize: "15px" }}>
                                <List.Item style={{ color: "black" }}>
                                    📜 <strong>การยอมรับเงื่อนไข : </strong>
                                    การใช้บริการนี้แสดงว่าคุณยอมรับข้อกำหนดและเงื่อนไขทั้งหมดของเรา โดยการดำเนินการใด ๆ
                                    ผ่านระบบถือเป็นการแสดงออกถึงความยินยอมของคุณในทุกประการ
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    💡 <strong>ขอบเขตการให้บริการ : </strong>
                                    AI ของเราได้รับการออกแบบมาเพื่อช่วยตอบคำถาม แนะนำวิธีการแก้ปัญหา และสนับสนุนการเรียนรู้ในหลากหลายด้าน
                                    เช่น คณิตศาสตร์ วิทยาศาสตร์ และการวางแผนการเรียน อย่างไรก็ตาม โปรดทราบว่าข้อมูลที่ได้รับอาจไม่ถูกต้อง
                                    หรือครบถ้วนเสมอ คุณควรตรวจสอบข้อมูลเพิ่มเติมจากแหล่งที่เชื่อถือได้
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    ⚙️ <strong>การใช้งานที่เหมาะสม : </strong>
                                    กรุณาใช้ระบบนี้อย่างมีจริยธรรม ห้ามใช้เพื่อวัตถุประสงค์ที่ผิดกฎหมาย เช่น การสร้างเนื้อหาที่ไม่เหมาะสม
                                    หรือเผยแพร่ข้อมูลที่บิดเบือนเพื่อก่อให้เกิดความเสียหายต่อผู้อื่น
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    🔒 <strong>ความเป็นส่วนตัว : </strong>
                                    เราให้ความสำคัญกับข้อมูลส่วนบุคคลของคุณ ข้อมูลที่คุณให้กับ AI จะถูกเก็บรักษาเป็นความลับ
                                    และใช้เพื่อปรับปรุงการให้บริการเท่านั้น โดยไม่มีการนำไปเผยแพร่หรือส่งต่อให้บุคคลภายนอก
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    🚀 <strong>การพัฒนา : </strong>
                                    บริการ AI นี้ยังอยู่ในช่วงการพัฒนา ซึ่งหมายความว่าอาจมีข้อผิดพลาดหรือข้อจำกัด
                                    และเราสงวนสิทธิ์ในการปรับปรุงหรือเปลี่ยนแปลงฟีเจอร์โดยไม่แจ้งให้ทราบล่วงหน้า
                                </List.Item>
                                <List.Item style={{ color: "black" }}>
                                    📩 <strong>การติดต่อ : </strong>
                                    หากคุณมีข้อสงสัย ข้อแนะนำ หรือคำถามใด ๆ สามารถติดต่อเราได้ที่อีเมล yorwor@siraphop.me
                                </List.Item>
                            </List>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox onChange={(e) => setCheckTOS(e.target.checked)} style={{ color: '#2d76ff' }} id="accept" />
                            <Label htmlFor="accept" className="flex">
                                ฉันยอมรับข้อตกลงและเงื่อนไขการใช้บริการ
                            </Label>
                        </div>
                        <div style={{ marginTop: '5px' }} className="w-full">
                            <Button
                                onClick={acceptTOS}
                                style={{ backgroundColor: "#2d76ff" }}
                                color="blue"
                            >
                                <FaCheckSquare className="mr-2 h-5 w-5" />
                                ตกลง
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}