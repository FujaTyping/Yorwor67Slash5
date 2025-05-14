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
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
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
  subj: z.string().min(3, {
    message: "วิชาน้อยต้องมี 3 ตัวอักษร",
  }),
  time: z.date({
    required_error: "วันที่สั่งานต้องใส่",
  }),
  due: z.date({
    required_error: "วันที่ส่งงานต้องใส่",
  }),
  user: z.string().min(5, {
    message: "Auth Require",
  }),
  decs: z
    .string()
    .min(10, {
      message: "คำอธิบายงานอย่างน้อยต้องมี 10 ตัวอักษร",
    })
    .max(500, {
      message: "คำอธิบายงานต้องไม่เกิน 200 ตัวอักษร",
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
      subj: "",
      decs: "",
      time: new Date(),
      due: new Date(),
    },
  });

  useEffect(() => {
    if (user && user.email) {
      form.setValue("user", user.email);
    }
  }, [user, form.reset, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://api.smt.siraphop.me/assignment",
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
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>วันที่สั่งงาน</FormLabel>
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
                    name="due"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>วันที่ส่งงาน</FormLabel>
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
                </div>
                <FormField
                  control={form.control}
                  name="subj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>วิชา</FormLabel>
                      <FormControl>
                        <Input placeholder="กรุณาใส่วืชา" {...field} />
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
                      <FormLabel>คำอธิบายภาระงาน</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="เขียนอธิบายฃงานนี้"
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/200 ตัวอักษร
                      </FormDescription>
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
      </div>
    </>
  );
}
