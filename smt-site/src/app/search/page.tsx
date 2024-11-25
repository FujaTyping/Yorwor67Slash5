"use client";

import { useEffect, useState } from "react";
import SMT from "../assets/SMT.png"

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
                </div>
            </div>
        </>
    );
}
