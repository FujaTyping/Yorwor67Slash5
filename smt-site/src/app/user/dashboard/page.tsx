"use client";

import { useState, useEffect } from "react";
import useLocalStorge from "../../lib/localstorage-db";
import smtConfig from "../../smt-config.mjs"
import axios from "axios";
import { Button, Badge } from "flowbite-react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { signInWithGoogle } from "../../lib/firebase-auth";
import { ToastContainer, toast } from 'react-toastify';
import { MdManageAccounts } from "react-icons/md";

export default function Dashboard() {
    const [title] = useState("Hatyaiwit - หลังบ้าน");
    const { email } = useLocalStorge(true);
    const [permessage, setPerMessage] = useState("Guest");
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (email) {
            setFetching(true);
            axios
                .get(`${smtConfig.apiUser}permission`, {
                    headers: {
                        Auth: email,
                    },
                })
                .then((response) => {
                    setPerMessage(response.data);
                })
                .catch(() => {
                    setFetching(false);
                    setPerMessage("Guest");
                });
        }
    }, [email]);

    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <ToastContainer position="bottom-right" newestOnTop closeOnClick hideProgressBar={false} />
            {permessage == "Admin" ? (
                <>
                    <iframe style={{ width: '100%', height: '100vh', marginTop: '-32px', marginBottom: '-45px' }} src="https://lookerstudio.google.com/embed/reporting/59725f81-99af-4954-a750-2900e8888d82/page/kIV1C" frameBorder="0"></iframe>
                </>
            ) : (
                <>
                    <div className="container">
                        <section className="text-gray-600 body-font">
                            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                    <img style={{ width: "350px" }} className="object-cover object-center rounded" alt="hero" src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-flat-login-icon-with-password-access-and-padlock-concept-vector-png-image_41882582.jpg" />
                                </div>
                                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">คุณไม่มีสิทธ์เข้าถึง</h1>
                                    <p className="mb-4 leading-relaxed text-gray-900">กรุณาใช้แอคเค้าท์ Admin เพื่อดูข้อมูล Dashboard หลังบ้าน</p>
                                    {fetching ? (
                                        <>
                                            <Button
                                                isProcessing
                                                style={{ backgroundColor: "#2d76ff" }}
                                                color="blue"
                                            >
                                                กรุณารอสักครู่
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Badge style={{ backgroundColor: "red", color: 'white' }} className="mt-5" icon={MdManageAccounts}>กำลังใช้งาน : {email} ({permessage})</Badge>
                                            <Button
                                                style={{ backgroundColor: "red" }}
                                                color="blue"
                                                onClick={() => {
                                                    const id = toast.loading("กำลังสลับบัญชี...")
                                                    signInWithGoogle()
                                                        .then(() => {
                                                            toast.update(id, { render: `สลับบัญชีสำเร็จ`, type: "success", isLoading: false, autoClose: 3000 });
                                                            setTimeout(() => {
                                                                window.location.reload();
                                                            }, 1500);
                                                        })
                                                        .catch((error) => {
                                                            toast.update(id, { render: `เกิดข้อผิดผลาด ไม่สามารถสลับบัญชีได้ ${error.message}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
                                                        });
                                                }}
                                            >
                                                <AiOutlineUserSwitch className="mr-2 h-5 w-5" />
                                                สลับบัญชี
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </>
    );
}
