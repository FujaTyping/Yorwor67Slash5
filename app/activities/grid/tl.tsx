"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { CalendarDays } from "lucide-react"

interface TimelineItemProps {
    title: string
    date: string
    description: string
    image: string
    imageAlt: string
    isLast?: boolean
}

interface APIActivity {
    title: string
    date: string
    decs: string
    url?: string
    timestamp: {
        seconds: number
        nanoseconds: number
    }
}

function TimelineItem({ title, date, description, image, imageAlt, isLast = false }: TimelineItemProps) {
    return (
        <div className="relative flex gap-6">
            <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white z-10">
                    <div className="h-2 w-2 rounded-full bg-gray-800" />
                </div>
                {!isLast && <div className="h-full w-[1px] bg-gray-300" />}
            </div>

            <div className={`flex-1 bg-white rounded-md border-1 overflow-hidden ${!isLast ? "mb-12" : ""}`}>
                <img
                    src={image || "/placeholder.svg"}
                    alt={imageAlt}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="flex items-center gap-2 text-sm text-gray-500"><CalendarDays size={14} /> {date}</p>
                    <p className="mt-2 text-gray-700">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default function ActivitiesTimeline({ className }: { className?: string }) {
    const [items, setItems] = useState<TimelineItemProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("https://api.smt.siraphop.me/activities")
                const data: { Activities: APIActivity[] } = await res.json()

                const formatted = data.Activities.map((item): TimelineItemProps => ({
                    title: item.title,
                    date: item.date,
                    description: item.decs,
                    image: item.url || "/placeholder.svg",
                    imageAlt: item.title,
                }))

                setItems(formatted)
            } catch (error) {
                console.error("Failed to fetch activities:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchActivities()
    }, [])

    if (loading) {
        return <div className="my-10 flex items-center justify-center w-full"><div className="loader rounded-full"></div></div>;
    }

    return (
        <div className={cn("py-4", className)}>
            {items.map((item, index) => (
                <TimelineItem key={index} {...item} isLast={index === items.length - 1} />
            ))}
        </div>
    )
}
