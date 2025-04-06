"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, Loader2, Send, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import axios from "axios"

const categories = [
    { label: "รายงานปัญหาทั่วไป", value: "รายงานปัญหาทั่วไป" },
    { label: "รายงานปัญหาเทคนิค", value: "รายงานปัญหาเทคนิค" },
    { label: "ข้อเสนอแนะ", value: "ข้อเสนอแนะ" },
]

const sstatuss = [
    { label: "นักเรียน", value: "นักเรียน" },
    { label: "คุณครู / อาจารย์", value: "คุณครู" },
    { label: "ผู้ปกครอง", value: "ผู้ปกครอง" },
]

const formSchema = z.object({
    name: z.string().min(2, {
        message: "ชื่ออย่างน้อยต้องมี 2 ตัวอักษร",
    }),
    email: z.string().email({
        message: "กรุณาใส่อีเมลที่ถูกต้อง",
    }),
    sstatus: z.string({
        required_error: "กรุณาเลือกสถานภาพ",
    }),
    category: z.string({
        required_error: "กรุณาเลือกประเภท",
    }),
    title: z.string().min(5, {
        message: "หัวข้ออย่างน้อยต้องมี 5 ตัวอักษร",
    }),
    comments: z
        .string()
        .min(10, {
            message: "ช้อความอย่างน้อยต้องมี 10 ตัวอักษร",
        })
        .max(500, {
            message: "ช้อความต้องไม่เกิน 500 ตัวอักษร",
        }),
})

export default function FeedbackForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [open, setOpen] = useState(false)
    const [sopen, setSOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            title: "",
            comments: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        try {
            await axios.post("https://api.smt.siraphop.me/feedback", values)

            setIsSubmitted(true)

            toast(<h1 className="flex items-center gap-1 font-bold"><MessageSquare size={16} /> ระบบความคิดเห็น</h1>, {
                description: <p className="text-black">ส่งคำขอเรียบร้อยแล้ว</p>
            })
        } catch (error) {
            console.error(error)
            toast(<h1 className="flex items-center gap-1 font-bold"><MessageSquare size={16} /> ระบบความคิดเห็น</h1>, {
                description: <p className="text-black">ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    if (isSubmitted) {
        return (
            <>
                <div className="my-4">
                    <Card>
                        <CardHeader>
                            <CardTitle><h1 className="text-lg">ขอบคุณ!</h1></CardTitle>
                            <CardDescription><p className="text-sm text-black">เราขอขอบคุณสำหรับการแสดงความคิดเห็นของคุณ</p></CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                            <div className="rounded-full bg-gray-200 p-3">
                                <Check className="h-8 w-8 text-black" />
                            </div>
                            <p className="mt-4 text-center text-black">
                                เราขอขอบคุณที่คุณสละเวลาแบ่งปันความคิดเห็นของคุณกับเรา ความคิดเห็นของคุณช่วยให้เราปรับปรุงและพัฒนาระบบให้ดียิ่งขึ้น
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="my-4">
                <Card>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ชื่อ-สกุล</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="กรุณาใส่ชื่อ" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>อีเมล</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="กรุณาใส่อีเมล" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="sstatus"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>สถานภาพ</FormLabel>
                                                <Popover open={sopen} onOpenChange={setSOpen}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn("justify-between", !field.value && "text-muted-foreground")}
                                                            >
                                                                {field.value
                                                                    ? sstatuss.find((category) => category.value === field.value)?.label
                                                                    : "กรุณาเลือกสถานภาพ"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="ค้นหาสถานภาพ" />
                                                            <CommandList>
                                                                <CommandEmpty>ไม่พบสถานภาพ</CommandEmpty>
                                                                <CommandGroup>
                                                                    {sstatuss.map((category) => (
                                                                        <CommandItem
                                                                            value={category.label}
                                                                            key={category.value}
                                                                            onSelect={() => {
                                                                                form.setValue("sstatus", category.value)
                                                                                setSOpen(false)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    category.value === field.value ? "opacity-100" : "opacity-0",
                                                                                )}
                                                                            />
                                                                            {category.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>ประเภท</FormLabel>
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn("justify-between", !field.value && "text-muted-foreground")}
                                                            >
                                                                {field.value
                                                                    ? categories.find((category) => category.value === field.value)?.label
                                                                    : "กรุณาเลือกประเภท"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="ค้นหาประเภท" />
                                                            <CommandList>
                                                                <CommandEmpty>ไม่พบประเภท</CommandEmpty>
                                                                <CommandGroup>
                                                                    {categories.map((category) => (
                                                                        <CommandItem
                                                                            value={category.label}
                                                                            key={category.value}
                                                                            onSelect={() => {
                                                                                form.setValue("category", category.value)
                                                                                setOpen(false)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    category.value === field.value ? "opacity-100" : "opacity-0",
                                                                                )}
                                                                            />
                                                                            {category.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>หัวข้อ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="กรุณาใส่หัวข้อ" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="comments"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ข้อความ</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="แบ่งบันความคิดเห็น ข้อเสนอแนะ หรือคำติชม เพื่อให้เราพัฒนาระบบให้ดียิ่งขึ้น"
                                                    className="min-h-[120px] resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>{field.value?.length || 0}/500 ตัวอักษร</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            กำลังส่งคำร้องขอ
                                        </>
                                    ) : (
                                        <>
                                            <Send />
                                            ส่งคำร้องขอ
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    )
}

