/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Check,
    Loader2,
    Send,
    RotateCcw,
    Database,
    CalendarIcon,
    Eye,
    Users,
    UserMinus,
    UserCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import Turnstile, { useTurnstile } from "react-turnstile";
import { useAuth } from "@/app/lib/getAuth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
    zboy: z.string().min(1, {
        message: "หากไม่มีกรุณาใส่ 0",
    }),
    zgirl: z.string().min(1, {
        message: "หากไม่มีกรุณาใส่ 0",
    }),
    zabs: z.string().min(1, {
        message: "หากไม่มีกรุณาใส่ 0",
    }),
    number: z.string().min(1, {
        message: "หากไม่มีกรุณาใส่ -",
    }),
    date: z.date({
        required_error: "ใส่วันที่เช็คชื่อ",
    }),
    user: z.string().min(5, {
        message: "Auth Require",
    }),
    captcha: z
        .string({
            required_error: "กรุณายืนยันว่าคุณไม่ใช่บอท",
        })
        .min(1, {
            message: "กรุณายืนยันว่าคุณไม่ใช่บอท",
        }),
});

export default function FForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responsee, SetResponsee] = useState("");
    const turnstile = useTurnstile();
    const user = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            zboy: "",
            zabs: "",
            zgirl: "",
            number: "",
            date: new Date(),
        },
    });

    const ZBOY = form.watch("zboy") || "0"
    const ZGRIL = form.watch("zgirl") || "0"
    const ZABS = form.watch("zabs") || "0"

    useEffect(() => {
        if (user && user.email) {
            form.setValue("user", user.email);
        }
    }, [user, form.reset, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const res = await axios.post(
                "https://api.smt.siraphop.me/absent",
                values,
                {
                    headers: {
                        Auth: user.uid,
                    },
                },
            );

            SetResponsee(res.data);

            setIsSubmitted(true);
            turnstile.reset();

            toast(
                <h1 className="flex items-center gap-1 font-bold">
                    <Database size={16} /> ระบบฐานข้อมูล
                </h1>,
                {
                    description: <p className="text-black">บันทึกข้อมูลเรียบร้อยแล้ว</p>,
                },
            );
        } catch (error) {
            console.error(error);
            toast(
                <h1 className="flex items-center gap-1 font-bold">
                    <Database size={16} /> ระบบฐานข้อมูล
                </h1>,
                {
                    description: (
                        <p className="text-black">
                            ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง
                        </p>
                    ),
                },
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitted) {
        return (
            <>
                <div className="my-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h1 className="text-lg">เสร็จสิ้น !</h1>
                            </CardTitle>
                            <CardDescription>
                                <p className="text-sm text-black">
                                    เพิ่มข้อมูลไปยังฐานข้อมูลเรียบร้อยแล้ว
                                </p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                            <div className="rounded-full bg-gray-200 p-3">
                                <Check className="h-8 w-8 text-black" />
                            </div>
                            <p className="mt-4 text-center text-black">{responsee}</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full mt-6 cursor-pointer"
                                onClick={() => setIsSubmitted(false)}
                            >
                                <RotateCcw />
                                บักทึกข้อมูลอีกครัง
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="my-4">
                <div className="flex flex-col-reverse gap-6">
                    <Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>วันที่เช็คชื่อ</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
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
                                                                date > new Date() ||
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                            locale={th}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="zabs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>จำนวนนักเรียนที่ไม่มา</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="กรุณาระบุจำนวนนักเรียนที่ไม่มา" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>เลขที่ ที่ไม่มา</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="กรุณาใส่เลขที่ทั้งหมด" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="zboy"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>จำนวนนักเรียนชาย {"(ที่ไม่มา)"}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="กรุณาระบุจำนวน" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="zgirl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>จำนวนนักเรียนหญิง {"(ที่ไม่มา)"}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="กรุณาระบุจำนวน" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
                                                            field.onChange("");
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        type="submit"
                                        className="w-full mt-6  cursor-pointer"
                                        disabled={isSubmitting}
                                    >
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
                    <div className="flex flex-col w-full">
                        <div className="border-2 border-gray-200 rounded-lg p-6">
                            <p className="flex items-center gap-1 text-sm w-full mb-2"><Eye size={22} /> ดูตัวอย่าง</p>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">นักเรียนทั้งหมด</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{36 - Number(ZABS)} คน</div>
                                        <p className="text-xs text-muted-foreground">คิดเป็น {((35 - Number(ZABS)) / 35 * 100).toFixed(2)}% ของนักเรียนทั้งหมด</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">นักเรียนที่ไม่มา</CardTitle>
                                        <UserMinus className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{ZABS} คน</div>
                                        <p className="text-xs text-muted-foreground">คิดเป็น {(Number(ZABS) / 35 * 100).toFixed(2)}% ของนักเรียนทั้งหมด</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">นักเรียนผู้ชายที่มา</CardTitle>
                                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{20 - Number(ZBOY)} คน</div>
                                        <p className="text-xs text-muted-foreground">คิดเป็น {((20 - Number(ZBOY)) / 20 * 100).toFixed(2)}% ของนักเรียนชายทั้งหมด</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">นักเรียนผู้หญิงที่มา</CardTitle>
                                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{15 - Number(ZGRIL)} คน</div>
                                        <p className="text-xs text-muted-foreground">คิดเป็น {((15 - Number(ZGRIL)) / 15 * 100).toFixed(2)}% ของนักเรียนหญิงทั้งหมด</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
