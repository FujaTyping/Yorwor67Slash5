'use client';

import { useState } from "react"

export default function Whiteroom() {
    const [title] = useState("Hatyaiwit - ห้องเรียนสีขาว");
    return (
        <>
            <title>{title}</title>
            <div className="container">
                <h1>WhiteClassRoom</h1>
            </div>
        </>
    )
}