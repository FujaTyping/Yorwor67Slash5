"use client"

import { useState } from "react"
import { Loader2, Send, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessageList from "./list"
import Cynthia from "@/app/assets/media/PCynthia.svg"
import axios from "axios"
import { useAuth } from "@/app/lib/getAuth";
import { Badge } from "@/components/ui/badge"

export type Message = {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: Date
    model?: string
}

export default function ChatInterface() {
    const [currentMessage, setCurrentMessage] = useState("")
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "สวัสดี Cynthia คุณช่วยฉันหน่อยได้ไหม?",
            sender: "user",
            timestamp: new Date(Date.now()),
        },
        {
            id: "2",
            content: "ฉันยินดีที่จะช่วยนะคะ บอกมาเลยว่าคุณต้องการอะไร?",
            sender: "other",
            timestamp: new Date(Date.now()),
        }
    ])
    const user = useAuth();

    const handleSendMessage = async (messageToSend?: string) => {
        const content = messageToSend ?? currentMessage;

        if (content.trim() === "") return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content: content,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setCurrentMessage("");
        setLoading(true);

        try {
            const res = await axios.post(
                "https://api.smt.siraphop.me/generative/cynthia",
                { prompt: content }
            );

            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: res.data.response,
                model: res.data.model,
                sender: "other",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, responseMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "ฉันไม่สามารถตอบคำถามของคุณได้ในขณะนี้",
                sender: "other",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };


    if (!user) {
        return (
            <div className="py-4 w-full flex flex-col items-center justify-center">
                <TriangleAlert size={32} />
                <h1 className="font-bold text-lg">กรุณาล็อกอิน</h1>
                <p className="text-sm">เพื่อใช้งานแชทบอท</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center py-4 pt-0 border-b bg-white px-6">
                <div className="flex items-center">
                    <div className="relative">
                        <img src={Cynthia.src} alt="Cynthia" className="w-10 h-10 rounded-lg" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-lg dark:border-gray-800"></span>
                    </div>
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">Cynthia Ravenhert</h2>
                        <p className="text-xs">ออนไลน์</p>
                    </div>
                </div>
            </div>

            <div className="px-2 md:px-6 py-4">
                <MessageList messages={messages} />
            </div>

            <div className="py-4 border-t bg-white dark:bg-gray-800">
                <div className="px-6 mb-2 flex items-center gap-2">
                    <Badge className="cursor-pointer" variant="outline" onClick={() => { handleSendMessage("พรุ่งนี้มีงานที่ต้องส่งไหม"); }}>พรุ่งนี้มีงานที่ต้องส่งไหม</Badge>
                    <Badge className="cursor-pointer" variant="outline" onClick={() => { setCurrentMessage("ขอรหัสห้องเรียนวิชา <ชื่อวิชา>"); }}>ขอรหัสห้องเรียนวิชา</Badge>
                </div>
                <div className="flex items-center gap-3 px-6">
                    <Input
                        disabled={loading}
                        placeholder="พิมพ์ข้อความ"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                        className="flex-1"
                    />
                    <Button disabled={loading} onClick={() => { handleSendMessage(); }} size="icon">
                        {loading ? <><Loader2 className="h-5 w-5 animate-spin" /></> : <><Send className="h-5 w-5" /></>}
                    </Button>
                </div>
                <div className="px-6 mt-2">
                    <p className="text-xs">Cynthia อาจให้ข้อมูลที่คลาดเคลื่อนหรือไม่สมบูรณ์ได้ในบางกรณี กรุณาตรวจสอบข้อมูลจากแหล่งอื่นประกอบก่อนนำไปใช้งานจริง</p>
                </div>
            </div>
        </div>
    )
}
