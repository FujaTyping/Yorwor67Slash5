/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Loader2,
  Send,
  RotateCcw,
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

const formSchema = z.object({
  id: z.string().min(1, {
    message: "ระบุไอดี",
  }),
  subj: z.string().min(3, {
    message: "วิชาน้อยต้องมี 3 ตัวอักษร",
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

export type TableDDATA = {
  Time: string
  Subject: string
  Decs: string
  Due: string
  isDue: boolean
}

export default function FForm(data: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responsee, SetResponsee] = useState("");
  const turnstile = useTurnstile();
  const user = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.data.id,
      subj: data.data.Subject,
      decs: data.data.Decs,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const res = await axios.patch(
        "https://api.smt.siraphop.me/assignment",
        values,
        {
          headers: {
            Auth: user.email,
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
          description: <p className="text-black">อัพเดทข้อมูลเรียบร้อยแล้ว</p>,
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
              ไม่สามารถอัพเดทข้อมูลได้ กรุณาลองใหม่อีกครั้ง
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
                แก้ไขข้อมูลไปยังฐานข้อมูลเรียบร้อยแล้ว
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
              แก้ไขข้อมูลอีกครัง
            </Button>
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
    </>
  );
}
