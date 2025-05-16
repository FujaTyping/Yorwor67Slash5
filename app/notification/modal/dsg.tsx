/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Check,
    Loader2,
    Send,
    Database,
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

const formSchema = z.object({
    hooks: z
        .string({
            required_error: "ระบุลิงค์",
        })
        .min(33, {
            message: "ลิงค์อย่างต่ำต้องมี 33 ตัวอักษร",
        }),
    captcha: z
        .string({
            required_error: "กรุณายืนยันว่าคุณไม่ใช่บอท",
        })
        .min(1, {
            message: "กรุณายืนยันว่าคุณไม่ใช่บอท",
        }),
});

export default function FForm(data: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responsee, SetResponsee] = useState("");
    const turnstile = useTurnstile();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hooks: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const res = await axios.post(
                "https://api.smt.siraphop.me/discord/new",
                values,
            );

            SetResponsee(res.data);

            setIsSubmitted(true);
            turnstile.reset();

            toast(
                <h1 className="flex items-center gap-1 font-bold">
                    <Database size={16} /> ระบบฐานข้อมูล
                </h1>,
                {
                    description: <p className="text-black">เพิ่มข้อมูลเรียบร้อยแล้ว</p>,
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
                            ไม่สามารถเพิ่มข้อมูลได้ กรุณาลองใหม่อีกครั้ง
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
                    </CardFooter>
                </Card>
            </>
        );
    }

    return (
        <>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="hooks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ลิงค์ดิสคอร์ด Webhooks</FormLabel>
                                        <FormControl>
                                            <Input placeholder="กรุณาใส่ลิงค์" {...field} />
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
        </>
    );
}
