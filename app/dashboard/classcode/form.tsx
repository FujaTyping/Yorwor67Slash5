"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, Loader2, Send, MessageSquare, RotateCcw, Eye, CopyCheck, Copy } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import axios from "axios"
import Turnstile, { useTurnstile } from "react-turnstile";
import { useAuth } from "@/app/lib/getAuth";

const colors = [
    { label: "สีส้ม", value: "oklch(70.5% 0.213 47.604)" },
    { label: "สีแดง", value: "oklch(63.7% 0.237 25.331)" },
    { label: "สีเหลือง", value: "oklch(79.5% 0.184 86.047)" },
    { label: "สีเขียว", value: "oklch(76.8% 0.233 130.85)" },
    { label: "สีฟ้า", value: "oklch(62.3% 0.214 259.815)" },
    { label: "สีม่วง", value: "oklch(62.7% 0.265 303.9)" },
    { label: "สีชมพู", value: "oklch(65.6% 0.241 354.308)" },
    { label: "สีเทา", value: "oklch(55.1% 0.027 264.364)" },
]

const formSchema = z.object({
    subj: z.string().min(3, {
        message: "ชื่อวิชาอย่างน้อยต้องมี 3 ตัวอักษร",
    }),
    color: z.string({
        required_error: "กรุณาเลือกสีพื้นหลัง",
    }),
    code: z.string().min(6, {
        message: "รหัสห้องเรียนอย่างน้อยต้องมี 6 ตัวอักษร",
    }),
    teac: z.string().min(4, {
        message: "ชื่อคุณครูอย่างน้อยต้องมี 4 ตัวอักษร",
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
    const [open, setOpen] = useState(false)
    const turnstile = useTurnstile();
    const user = useAuth();
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subj: "",
            code: "",
            teac: "",
        },
    })

    const title = form.watch("subj") || "ชื่อวิชา"
    const color = form.watch("color") || "#171717"
    const code = form.watch("code") || "******"
    const teacher = form.watch("teac") || "ชื่อครู"

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

            toast(<h1 className="flex items-center gap-1 font-bold"><MessageSquare size={16} /> ระบบฐานข้อมูล</h1>, {
                description: <p className="text-black">บันทึกข้อมูลเรียบร้อยแล้ว</p>
            })
        } catch (error) {
            console.error(error)
            toast(<h1 className="flex items-center gap-1 font-bold"><MessageSquare size={16} /> ระบบฐานข้อมูล</h1>, {
                description: <p className="text-black">ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => {
            setCopiedCode(null);
        }, 3000);
    };


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
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 lg:gap-4">
                    <Card className="col-span-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="subj"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>วิชา</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="กรุณาชื่อวิชา" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="color"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>สีพื้นหลัง</FormLabel>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn("justify-between", !field.value && "text-muted-foreground")}
                                                                >
                                                                    {field.value
                                                                        ? colors.find((category) => category.value === field.value)?.label
                                                                        : "กรุณาสีพื้นหลัง"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="p-0">
                                                            <Command>
                                                                <CommandInput placeholder="ค้นหาสี" />
                                                                <CommandList>
                                                                    <CommandEmpty>ไม่พบสี</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {colors.map((category) => (
                                                                            <CommandItem
                                                                                value={category.label}
                                                                                key={category.value}
                                                                                onSelect={() => {
                                                                                    form.setValue("color", category.value)
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
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>รหัสห้องเรียน</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="กรุณาใส่รหัสห้องเรียน" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="teac"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ครูผู้สอน</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="กรุณาใส่ชื่อคุณครู" {...field} />
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
                            <div className="overflow-hidden rounded-md border border-gray-200 transition-all duration-150 w-full">
                                <div style={{ backgroundColor: color }} className="text-white p-4 flex items-center justify-between font-bold text-lg">
                                    <span className="break-all">{title}</span>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <span className="text-sm break-all">{teacher}<br />รหัส : {code}</span>
                                    <Button
                                        variant="ghost"
                                        className="hover:cursor-pointer"
                                        onClick={() => handleCopy(code)}
                                    >
                                        {copiedCode === code ? <CopyCheck size={16} /> : <Copy size={16} />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

