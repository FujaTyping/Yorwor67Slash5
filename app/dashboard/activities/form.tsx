"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, Send, RotateCcw, Eye, Database, CalendarIcon, Upload, CalendarDays } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import Turnstile, { useTurnstile } from "react-turnstile";
import { useAuth } from "@/app/lib/getAuth";
import { Textarea } from "@/components/ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { th } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "ชื่อกิจกรรมน้อยต้องมี 5 ตัวอักษร",
    }),
    date: z.date({
        required_error: "วันที่กิจกรรมต้องใส่",
    }),
    image: z
        .custom<File>((file) => file instanceof File, {
            message: "กรุณาเลือกไฟล์ที่ถูกต้อง",
        })
        .refine((file) => file.size < 5 * 1024 * 1024, {
            message: "ขนาดไฟล์ต้องไม่เกิน 5MB",
        })
        .nullable(),
    decs: z
        .string()
        .min(10, {
            message: "คำอธิบายกิจกรรมอย่างน้อยต้องมี 10 ตัวอักษร",
        })
        .max(500, {
            message: "คำอธิบายกิจกรรมต้องไม่เกิน 200 ตัวอักษร",
        }),
    captcha: z.string({
        required_error: "กรุณายืนยันว่าคุณไม่ใช่บอท",
    }).min(1, {
        message: "กรุณายืนยันว่าคุณไม่ใช่บอท",
    }),
})

export default function FForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [responsee, SetResponsee] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const turnstile = useTurnstile();
    const user = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            decs: "",
            date: new Date(),
        },
    })

    const title = form.watch("title") || "ชื่อกิจกรรม"
    const decs = form.watch("decs") || "คำอธิบายกิจกรรม"
    const ddates = form.watch("date") || "วันที่กิจกรรม"

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        try {
            const res = await axios.post(
                "https://api.smt.siraphop.me/classcode",
                values,
                {
                    headers: {
                        Auth: user.email
                    }
                }
            );

            SetResponsee(res.data);

            setIsSubmitted(true)
            turnstile.reset();

            toast(<h1 className="flex items-center gap-1 font-bold"><Database size={16} /> ระบบฐานข้อมูล</h1>, {
                description: <p className="text-black">บันทึกข้อมูลเรียบร้อยแล้ว</p>
            })
        } catch (error) {
            console.error(error)
            toast(<h1 className="flex items-center gap-1 font-bold"><Database size={16} /> ระบบฐานข้อมูล</h1>, {
                description: <p className="text-black">ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
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
                            <CardTitle><h1 className="text-lg">เสร็จสิ้น !</h1></CardTitle>
                            <CardDescription><p className="text-sm text-black">เพิ่มข้อมูลไปยังฐานข้อมูลเรียบร้อยแล้ว</p></CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                            <div className="rounded-full bg-gray-200 p-3">
                                <Check className="h-8 w-8 text-black" />
                            </div>
                            <p className="mt-4 text-center text-black">
                                {responsee}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full mt-6 cursor-pointer" onClick={() => setIsSubmitted(false)}>
                                <RotateCcw />
                                บักทึกข้อมูลอีกครัง
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="my-4">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-4">
                    <Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ชื่อกิจกรรม</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="กรุณาชื่อกิจกรรม" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>วันที่กิจกรรม</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP", { locale: th })
                                                                    ) : (
                                                                        <span>เลือกวันที่</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>อัปโหลดรูปกิจกรรม</FormLabel>
                                                <FormControl>
                                                    <div>
                                                        <label
                                                            htmlFor="image-upload"
                                                            className={cn(
                                                                "flex flex-col items-center justify-center w-full border-2 rounded-lg cursor-pointer"
                                                            )}
                                                        >
                                                            <div className="flex flex-col items-center justify-center p-6">
                                                                {!preview ? (
                                                                    <>
                                                                        <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                            คลิกเพื่ออัปโหลด
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                    <img
                                                                        src={preview}
                                                                        alt="Preview"
                                                                        className="object-cover rounded-md"
                                                                    />
                                                                )}
                                                            </div>
                                                            <Input
                                                                id="image-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        field.onChange(file);
                                                                        setPreview(URL.createObjectURL(file));
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="decs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>คำอธิบายกิจกรรม</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="เขียนอธิบายกิจกรรมนี้"
                                                        className="min-h-[120px] resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>{field.value?.length || 0}/200 ตัวอักษร</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="captcha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ยืนยันตัวตน</FormLabel>
                                                <FormControl>
                                                    <Turnstile
                                                        sitekey="0x4AAAAAAAwmJyPRGMPSMEvC"
                                                        onVerify={(token) => {
                                                            field.onChange(token);
                                                        }}
                                                        onExpire={() => {
                                                            field.onChange('');
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full mt-6  cursor-pointer" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                กำลังบันทึกข้อมูล
                                            </>
                                        ) : (
                                            <>
                                                <Send />
                                                บันทึกข้อมูล
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                    <div className="flex flex-col w-full mb-6 lg:mb-0">
                        <div className="border-2 border-gray-200 rounded-lg p-6">
                            <p className="flex items-center gap-1 text-sm w-full mb-2"><Eye size={22} /> ดูตัวอย่าง</p>
                            <div className="relative flex gap-6">
                                <div className={`flex-1 bg-white rounded-md border-1 overflow-hidden`}>
                                    <img
                                        src={preview || "https://picsum.photos/500/300?grayscale"}
                                        alt={title}
                                        className="w-full object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{title}</h3>
                                        <p className="flex items-center gap-2 text-sm text-gray-500"><CalendarDays size={14} />{format(ddates, "PPP", { locale: th })}</p>
                                        <p className="mt-2">{decs}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

