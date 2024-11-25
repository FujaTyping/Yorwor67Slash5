"use client";

import { useEffect, useState } from "react";
import SMT from "../assets/SMT.png"
import { FaArrowRight } from "react-icons/fa";

export default function Search() {
    const [title] = useState("Hatyaiwit - ค้นหา");
    const [q, setQ] = useState("")

    useEffect(() => {
        const footbarElement = document.getElementById("Footbar");
        const navbarElement = document.getElementById("TopBarNav");

        if (footbarElement) footbarElement.style.display = "none";
        if (navbarElement) navbarElement.style.display = "none";

        return () => {
            if (footbarElement) footbarElement.style.display = "";
            if (navbarElement) navbarElement.style.display = "";
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            window.location.href = `https://www.google.com/search?q=${q}`
        }
    };

    function searchG() {
        window.location.href = `https://www.google.com/search?q=${q}`
    }

    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <div className="flex h-screen flex-col items-center justify-center bg-white">
                <div>
                    <img width={300} src={SMT.src} alt="SMT Logo" />
                </div>
                <div className="md:w-[584px] mx-auto mt-7 flex w-[92%] items-center rounded-full border hover:shadow-md">
                    <div className="pl-5">
                        <img className="h-6 w-7" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google logo" />
                    </div>
                    <input onKeyDown={handleKeyDown} onChange={(q) => { setQ(q.target.value) }} placeholder="ค้นหาด้วย Google" type="text" className="w-full bg-transparent rounded-full py-[14px] pl-4 outline-none" />
                    <FaArrowRight onClick={searchG} style={{ color: 'gray', cursor: 'pointer' }} className="h-4 w-4 mr-5" />
                </div>
                <div className="flex mt-10 items-center gap-10">
                    <div onClick={() => { window.location.href = `https://classroom.google.com/` }} style={{ cursor: 'pointer' }} className="flex flex-col items-center gap-2 hover:drop-shadow-2xl">
                        <img className="w-14 h-12" src="https://th.bing.com/th/id/R.d0c3f5e1f3abd729190c29cd67982b17?rik=rBXAcV9kfKXVeA&pid=ImgRaw&r=0" alt="Classroom Logo" />
                        <h1 style={{ fontSize: '13px' }}>Classroom</h1>
                    </div>
                    <div onClick={() => { window.location.href = `https://youtube.com/` }} style={{ cursor: 'pointer' }} className="flex flex-col items-center gap-2 hover:drop-shadow-2xl">
                        <img className="w-12 h-12" src="https://lh3.googleusercontent.com/3_OFn2skqHXk-UQ-9RUdNrDl_HQJrMCxks5teQcUrF_bOSeDG1hD8j83FeD31W8hASZCvubzsGfumuJq8kvvSAq03wY87RZ7Otx_DF4" alt="Youtube Logo" />
                        <h1 style={{ fontSize: '13px' }}>Youtube</h1>
                    </div>
                    <div onClick={() => { window.location.href = `https://mail.google.com/` }} style={{ cursor: 'pointer' }} className="flex flex-col items-center gap-2 hover:drop-shadow-2xl">
                        <img className="w-12 h-12" src="https://lh3.googleusercontent.com/0rpHlrX8IG77awQMuUZpQ0zGWT7HRYtpncsuRnFo6V3c8Lh2hPjXnEuhDDd-OsLz1vua4ld2rlUYFAaBYk-rZCODmi2eJlwUEVsZgg" alt="Mail Logo" />
                        <h1 style={{ fontSize: '13px' }}>Mail</h1>
                    </div>
                    <div onClick={() => { window.location.href = `https://smt.siraphop.me/` }} style={{ cursor: 'pointer' }} className="flex flex-col items-center gap-2 hover:drop-shadow-2xl">
                        <img className="w-10 h-12" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3.png" alt="Yw Logo" />
                        <h1 style={{ fontSize: '13px' }}>ม.4/5</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
