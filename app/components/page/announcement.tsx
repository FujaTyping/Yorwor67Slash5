"use client";

import React, { useState, useEffect } from 'react'
import { Megaphone } from "lucide-react";
import Marquee from "react-fast-marquee";
import axios from 'axios';

function Announcement() {
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        axios.get('https://api.smt.siraphop.me/announcement')
            .then((response) => {
                setAnnouncement(response.data.Text)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    if (!announcement) {
        return <div className="my-10 flex items-center justify-center w-full"><div className="loader rounded-full"></div></div>
    }

    return (
        <>
            <div className="px-2 py-1.5 border-1 rounded-md flex items-center gap-2">
                <Megaphone size={18} />
                <Marquee className="text-sm cursor-default" pauseOnHover={true} gradient={true} gradientWidth={50} gradientColor='white'>
                    {announcement}
                </Marquee>
            </div>
        </>
    )
}

export default Announcement