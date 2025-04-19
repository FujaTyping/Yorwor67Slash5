"use client"

import React from 'react'
import { Separator } from "@/components/ui/separator";
import axios from "axios"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { logEvent } from "firebase/analytics";
import { analyticsPromise } from '../lib/firebaseAnalytic';

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
            <div className='py-4 flex items-center justify-center w-full gap-3'>
                <p className='text-xs'>© 2567-2568 ทีมพัฒนา ม.5/5</p>
                <div className="h-5">
                    <Separator orientation="vertical" />
                </div>
                <p className="text-xs flex items-center gap-2">เวอร์ชั่น :<Badge className="bg-neutral-800 text-xs">{version} {":(dev)"}</Badge></p>
            </div>
        </>
    )
}

export default Footer