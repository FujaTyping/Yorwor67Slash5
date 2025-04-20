import React from 'react'
import ChatInterface from './ui'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'โรงเรียนหาดใหญ่วิทยาลัย ╎ แชทบอท',
    description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
}

function page() {
    return (
        <>
            <ChatInterface />
        </>
    )
}

export default page