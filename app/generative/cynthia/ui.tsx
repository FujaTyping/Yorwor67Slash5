"use client"

import { useState } from "react"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessageList from "./list"
import Cynthia from "@/app/assets/media/PCynthia.svg"
import axios from "axios"
import { useAuth } from "@/app/lib/getAuth";

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

    const handleSendMessage = async () => {
        if (currentMessage.trim() === "") return

        const newMessage: Message = {
            id: Date.now().toString(),
            content: currentMessage,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages([...messages, newMessage])

        setLoading(true);
        const res = await axios.post(
            "https://api.smt.siraphop.me/generative/cynthia",
            { prompt: currentMessage }
        );
        setCurrentMessage("")

        const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: res.data.response,
            model: res.data.model,
            sender: "other",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, responseMessage])
        setLoading(false);
    }

    if (!user) {
        return (
            <div className="my-10 flex items-center justify-center w-full">
                <div className="loader rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center py-4 pt-0 border-b bg-white px-6">
                <div className="flex items-center">
                    <div className="relative">
                        <img src={Cynthia.src} alt="Cynthia" className="w-10 h-10 rounded-full" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-800"></span>
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
                <div className="flex items-center space-x-2 px-6">
                    <Input
                        disabled={loading}
                        placeholder="Type a message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage()
                            }
                        }}
                        className="flex-1"
                    />
                    <Button disabled={loading} onClick={handleSendMessage} size="icon">
                        {loading ? <><Loader2 className="h-5 w-5 animate-spin" /></> : <><Send className="h-5 w-5" /></>}
                    </Button>
                </div>
            </div>
        </div>
    )
}
