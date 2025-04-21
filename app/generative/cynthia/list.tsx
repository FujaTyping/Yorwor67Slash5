"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Message } from "./ui"
import Cynthia from "@/app/assets/media/PCynthia.svg"
import { useAuth } from "@/app/lib/getAuth";
import Markdown from 'react-markdown'

interface MessageListProps {
    messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null)
    const user = useAuth();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        {message.sender === "other" && (
                            <div className="mr-2">
                                <img src={Cynthia.src} alt="Cynthia" className="w-8 h-8 rounded-lg" />
                            </div>
                        )}
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-lg ${message.sender === "user"
                                ? "bg-neutral-900 text-white rounded-tr-none"
                                : "bg-white rounded-tl-none"
                                }`}
                        >
                            <div className="text-sm md:text-base">
                                <Markdown>{message.content}</Markdown>
                            </div>
                            <div
                                className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"
                                    }`}
                            >
                                {formatMessageTime(message.timestamp)}{message?.model && ` ∘ ${message.model}`}
                            </div>
                        </div>
                        {message.sender === "user" && (
                            <div className="ml-2">
                                <img src={user?.photoURL} alt="Profile" className="w-8 h-8 rounded-lg" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    )
}

function formatMessageTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
}
