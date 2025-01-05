"use client";

import { useState, useEffect } from "react";
import { Modal, Label, TextInput, Button } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import smtConfig from "../smt-config.mjs";
import useLocalStorge from "../lib/localstorage-db";
import { IoMdAddCircle } from "react-icons/io";
import { FaFileArchive, FaHistory } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { IoSend } from "react-icons/io5";

interface Classcode {
    Url: string;
    Title: string;
}

export default function Sheet() {
    const [data, setData] = useState<Classcode[]>([
        {
            Url: "กำลังดึงข้อมูล",
            Title: "กำลังดึงข้อมูล",
        },
    ]);
    const [title] = useState("Hatyaiwit - ไฟล์สำหรับการเรียนการสอน");
    const [isStudent, setIsStudent] = useState(false);
    const [popupOP, setPopUpOP] = useState(false);
    const { email, showAlert } = useLocalStorge(false);
    const [titleFile, setTitleFile] = useState("");
    const [links, setLinks] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function submitFile() {
        const id = toast.loading("กำลังส่งข้อมูล...")
        setIsLoading(true);
        axios
            .post(
                `${smtConfig.apiMain}sheet`,
                {
                    title: titleFile,
                    url: links
                },
                {
                    headers: {
                        Auth: email,
                    },
                }
            )
            .then((response) => {
                toast.update(id, { render: `บันทึกข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 5000 });
                setIsLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 8000 });
                setIsLoading(false);
            });
    }

    useEffect(() => {
        axios
            .get(`${smtConfig.apiMain}sheet`)
            .then((response) => {
                setData(response.data.Sheet);
            })
            .catch(() => {
                setData([
                    {
                        Url: "ไม่สามารถ",
                        Title: "ดึงข้อมูลได้",
                    },
                ]);
            });
    }, []);

    useEffect(() => {
        if (email && !showAlert) {
            axios
                .get(`${smtConfig.apiUser}permission`, {
                    headers: {
                        Auth: email,
                    },
                })
                .then(() => {
                    setIsStudent(true);
                })
                .catch(() => {
                    setIsStudent(false);
                });
        }
    }, [email]);

    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <ToastContainer position="bottom-right" newestOnTop draggable hideProgressBar={false} />
            <section className="container">
                <div>
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl md:text-4xl mb-2">ไฟล์สำหรับการเรียนการสอน</h1>
                            <div className="flex">
                                <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
                            </div>
                            <p className="mt-4 text-base md:text-lg">
                                <span
                                    className="flex"
                                    style={{ alignItems: "center" }}
                                >
                                    <FaUpload style={{ marginRight: "6px" }} /> อัพโหลดโดย นักเรียน และ คุณครู ม.4/5
                                </span>
                                <span
                                    className="flex"
                                    style={{ alignItems: "center" }}
                                >
                                    <FaHistory style={{ marginRight: "6px" }} /> ข้อมูลอัพเดททุกๆ 3 นาที
                                </span>
                            </p>
                        </div>
                    </div>
                    <main className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-7">
                        {isStudent ? (<>
                            <div onClick={() => setPopUpOP(true)} className="flex flex-col gap-5 items-center justify-center bg-white p-6 border-2 border-dashed rounded-lg border-black hover:border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer ease-in-out duration-300 h-full">
                                <IoMdAddCircle className="w-8 h-8" />
                                <h2 className="text-lg font-bold">เพิ่มไฟล์</h2>
                            </div>
                        </>) : (<></>)}
                        {data.map((Data, index) => (<>
                            <Link href={Data.Url}>
                                <div key={index} className="flex flex-col gap-5 items-center justify-center bg-white p-6 border-2 border-dashed rounded-lg border-black hover:border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer ease-in-out duration-300 h-full">
                                    <FaFileArchive className="w-8 h-8" />
                                    <h2 className="text-lg font-bold">{Data.Title}</h2>
                                </div>
                            </Link>
                        </>
                        ))}
                    </main>
                </div>
            </section>
            <Modal
                className="animate__animated animate__fadeIn"
                show={popupOP}
                onClose={() => setPopUpOP(false)}
                size="md"
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            แบบฟอร์ม เพิ่มไฟล์การเรียนการสอน
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="text" value="ชื่อไฟล์" />
                            </div>
                            <TextInput
                                onChange={(event) => setTitleFile(event.target.value)}
                                type="text"
                                value={titleFile}
                                placeholder="ไฟล์"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="text" value="ลิ้งค์ไฟล์" />
                            </div>
                            <TextInput
                                onChange={(event) => setLinks(event.target.value)}
                                type="text"
                                value={links}
                                placeholder="Url"
                                required
                            />
                        </div>
                        <div className="w-full">
                            {isLoading ? (
                                <>
                                    <Button
                                        isProcessing
                                        style={{ backgroundColor: "#2d76ff" }}
                                        color="blue"
                                    >
                                        ส่งข้อมูล
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={submitFile}
                                        style={{ backgroundColor: "#2d76ff" }}
                                        color="blue"
                                    >
                                        ส่งข้อมูล
                                        <IoSend className="ml-2 h-5 w-5" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
