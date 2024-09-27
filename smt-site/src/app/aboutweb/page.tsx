'use client';

import { useState } from "react"
import { Button } from "flowbite-react";
import GitHubI from "../assets/github.png";
import Link from 'next/link'

export default function AboutWeb() {
    const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บของเรา");
    return (
        <>
            <title>{title}</title>
            <div className="container space-y-4">
                <div className="flex justify-center items-center">
                    <img className="w-20 h-20" src={GitHubI.src} alt="GitHub Logo" />
                </div>
                <h2 className="flex justify-center items-center font-bold" style={{ fontSize: '35px' }} >Project Name : Yorwor67Slash5</h2>
                <h3 className="flex justify-center items-center font-bold">
                    Our project is an open-source class website aimed at improving the student experience by providing essential tools such as attendance tracking and homework management. The website allows students to easily check if they've been marked absent for the day and view current homework assignments. In this project we designed not only to assist students but also to enhance our skills in web development. We aim to continuously improve and expand its functionality, making it a practical tool for students while sharpening our coding expertise.
                </h3>
                <div className="flex justify-center items-center">
                    <Button 
                        className="text-sm"
                        style={{backgroundColor: "#ff1616"}}
                        as={Link}
                        href="https://github.com/FujaTyping/Yorwor67Slash5"
                        pill
                    >
                        View on GitHub
                    </Button>
                </div>
            </div>
        </>
    )
}