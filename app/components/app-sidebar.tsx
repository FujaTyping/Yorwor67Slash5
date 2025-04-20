/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    Home, Book, ClipboardList, ClipboardPenLine, PartyPopper, File, Users, ChevronsLeftRightEllipsis, Bell, Bug, Lock, ShieldUser, UserRoundCog, LogOut, EllipsisVertical,
    BotMessageSquare
} from "lucide-react"
import Link from "next/link"
import Logo from "@/app/assets/SMT.svg"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Separator } from "@/components/ui/separator"

import { signInWithGoogle } from "@/app/lib/firesbaseAuth";
import { useAuth } from "@/app/lib/getAuth";
import { getAuth, signOut } from "firebase/auth";

export function AppSidebar() {

    const user = useAuth();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <img src={Logo.src} alt="Logo" width={600} height={600} />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">ม.5/5</span>
                                    <span className="text-xs">โรงเรียนหาดใหญ่วิทยาลัย</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Home />
                                        <span>หน้าหลัก</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer">
                                            <Book />
                                            <span>ฝ่ายการเรียน</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href="/assignment">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        ภาระงาน
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <Link href="/classcode">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        รหัสห้องเรียน
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                        <SidebarMenu>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer">
                                            <ClipboardList />
                                            <span>ฝ่ายการงาน</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href="#">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        รายงานบันทึกคะแนน
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                        <SidebarMenu>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer">
                                            <ClipboardPenLine />
                                            <span>ฝ่ายสารวัตร</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href="/absent">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        เช็คชื่อ
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                        <SidebarMenu>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer">
                                            <PartyPopper />
                                            <span>ฝ่ายกิจกรรม</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href="/activities">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        กิจกรรม
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                        <SidebarMenu>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer">
                                            <File />
                                            <span>เอกสาร</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href="/whiteroom">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        ห้องเรียนสีขาว
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                        <SidebarMenu>
                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer">
                                            <BotMessageSquare />
                                            <span>แชทบอท</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <Link href="/generative/cynthia">
                                                    <SidebarMenuButton className="cursor-pointer">
                                                        ซินเทีย เรเวนเฮิร์ต
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                        <Separator className="my-2" />
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/about">
                                        <Users />
                                        <span>เกี่ยวกับห้องเรา</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Link href="/about/web">
                                    <ChevronsLeftRightEllipsis />
                                    <span>เกี่ยวกับเว็ปไชต์</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Link href="/notification">
                                    <Bell />
                                    <span>การแจ้งเตือน</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Link href="/feedback">
                                    <Bug />
                                    <span>ความคิดเห็น</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Separator />
                {user ? <>
                    <SidebarMenuButton asChild className="my-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                                        <AvatarFallback className="rounded-lg">{user.displayName}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left text-sm">
                                        <span>{user.displayName}</span>
                                        <span className="text-xs font-semibold">{user.email}</span>
                                    </div>
                                    <EllipsisVertical size={30} className="ml-auto" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="right"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup asChild>
                                    <DropdownMenuItem>
                                        <Link href={`/dashboard`} className="flex items-center gap-2">
                                            <UserRoundCog className="text-black" />
                                            ไปยังหน้าผู้ใช้
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                    toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                        description: <p className="text-black">กำลังสลับบัญชี</p>
                                    })
                                    signInWithGoogle()
                                        .then((userData) => {
                                            console.log(userData);
                                            toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                                description: <p className="text-black">สลับบัญชีสำเร็จ</p>
                                            })
                                        })
                                        .catch(() => {
                                            toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                                description: <p className="text-black">ไม่สามารถสลับบัญชีได้ กรุณาลองใหม่อีกครั้ง</p>
                                            })
                                        });
                                }}>
                                    <Users className="text-black" />
                                    สลับบัญชี
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                    toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                        description: <p className="text-black">กำลังออกจากระบบ</p>
                                    })
                                    const auth = getAuth();
                                    signOut(auth).then(() => {
                                        toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                            description: <p className="text-black">ออกจากระบบสำเร็จ</p>
                                        })
                                    }).catch(() => {
                                        toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                            description: <p className="text-black">ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง</p>
                                        })
                                    });
                                }}>
                                    <LogOut className="text-black" />
                                    ออกจากระบบ
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuButton>
                </> : <>
                    <SidebarMenuButton asChild className="cursor-pointer">
                        <div onClick={() => {
                            toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                description: <p className="text-black">กำลังล็อกอิน</p>
                            })
                            signInWithGoogle()
                                .then((userData) => {
                                    console.log(userData);
                                    toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                        description: <p className="text-black">ล็อกอินสำเร็จ</p>
                                    })
                                })
                                .catch(() => {
                                    toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                                        description: <p className="text-black">ไม่สามารถล็อกอินได้ กรุณาลองใหม่อีกครั้ง</p>
                                    })
                                });
                        }}>
                            <Lock />
                            <span>ล็อกอิน</span>
                        </div>
                    </SidebarMenuButton>
                </>}
            </SidebarFooter>
        </Sidebar>
    )
}
