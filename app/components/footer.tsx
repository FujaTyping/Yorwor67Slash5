"use client"

import React from 'react'
import { Separator } from "@/components/ui/separator";
import axios from "axios"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { logEvent } from "firebase/analytics";
import { analyticsPromise } from '../lib/firebaseAnalytic';
import Script from 'next/script';

function Footer() {
    const [version, setVersion] = useState("0");

    useEffect(() => {
        analyticsPromise.then((analytics) => {
            if (analytics) {
                logEvent(analytics, "page_view");
            }
        });
    }, []);

    useEffect(() => {
        axios.get("https://api.smt.siraphop.me/github/version")
            .then((response) => {
                if (response.data) {
                    setVersion(response.data.version);
                }
            })
            .catch((error) => {
                console.error("Error fetching version:", error);
            });
    }, []);

    return (
        <>
            <Separator />
            <div className='py-4 flex flex-col items-center text-center md:flex-row md:justify-center md:text-left w-full gap-2 md:gap-4 px-4'>
                <div className='flex items-center gap-2 md:gap-4'>
                    <a href="//www.dmca.com/Protection/Status.aspx?ID=840d3032-64f8-4843-9b11-3ebe6b2c100a" title="DMCA.com Protection Status" className="dmca-badge"> <img src="https://images.dmca.com/Badges/dmca_protected_sml_120t.png?ID=840d3032-64f8-4843-9b11-3ebe6b2c100a" alt="DMCA.com Protection Status" /></a>
                    <div className="h-5">
                        <Separator orientation="vertical" />
                    </div>
                    <p className='text-xs'>© 2567-2568 ทีมพัฒนา ม.5/5</p>
                </div>
                <div className="h-5 hidden md:block">
                    <Separator orientation="vertical" />
                </div>
                <p className="text-xs flex items-center gap-2">เวอร์ชั่น :<Badge className="bg-neutral-800 text-xs">{version} {":(dev)"}</Badge></p>
                <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" />
            </div>
        </>
    )
}

export default Footer