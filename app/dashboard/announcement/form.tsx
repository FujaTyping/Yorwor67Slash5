"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, Send, RotateCcw, Megaphone, Database, Eye } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import Turnstile, { useTurnstile } from "react-turnstile";
import { useAuth } from "@/app/lib/getAuth";
import Marquee from "react-fast-marquee";

const formSchema = z.object({
    msg: z.string().min(5, {
        message: "ข้อความประกาศอย่างน้อยต้องมี 5 ตัวอักษร",
    }),
    user: z.string().min(5, {
        message: "Auth Require",
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
    const turnstile = useTurnstile();
    const user = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            msg: "",
        },
    })

    useEffect(() => {
        if (user && user.email) {
            form.setValue("user", user.email);
        }
    }, [user, form.reset, form]);

    const text = form.watch("msg") || "ตัวอย่างข้อความ"

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        try {
            const res = await axios.patch(
                "https://api.smt.siraphop.me/announcement",
                values,
                {
                    headers: {
                        Auth: user.uid
                    }
                }
            );

            SetResponsee(res.data);

            setIsSubmitted(true)
            turnstile.reset();

            toast(<h1 className="flex items-center gap-1 font-bold"><Database size={16} /> ระบบฐานข้อมูล</h1>, {
                description: <p className="text-black">เปลื่ยนข้อมูลเรียบร้อยแล้ว</p>
            })
        } catch (error) {
            console.error(error)
            toast(<h1 className="flex items-center gap-1 font-bold"><Database size={16} /> ระบบฐานข้อมูล</h1>, {
                description: <p className="text-black">ไม่สามารถเปลื่ยนข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
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
                            <CardDescription><p className="text-sm text-black">เปลี่ยนข้อมูลไปยังฐานข้อมูลเรียบร้อยแล้ว</p></CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                            <div className="rounded-full bg-gray-200 p-3">
                                <Check className="h-8 w-8 text-black" />
                            </div>
                            <p className="mt-4 text-center text-black">
                                เปลื่ยนข้อความ{responsee}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full mt-6 cursor-pointer" onClick={() => setIsSubmitted(false)}>
                                <RotateCcw />
                                เปลื่ยนข้อมูลอีกครัง
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
                <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex flex-col w-full mb-6 lg:mb-0">
                        <p className="flex items-center gap-1 text-sm w-full mb-2"><Eye size={22} /> ดูตัวอย่าง</p>
                        <div className="px-2 py-1.5 border-1 rounded-md flex items-center gap-2">
                            <Megaphone size={18} />
                            <Marquee className="text-sm cursor-default" pauseOnHover={true} gradient={true} gradientWidth={50} gradientColor='white'>
                                {text}
                            </Marquee>
                        </div>
                    </div>
                </div>
                <Card className="col-span-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="msg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ข้อความ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="กรุณาใส่ข้อความประกาศ" {...field} />
                                            </FormControl>
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
                                            กำลังเปลื่ยนข้อมูล
                                        </>
                                    ) : (
                                        <>
                                            <Send />
                                            เปลื่ยนข้อมูล
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

