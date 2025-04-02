import { Home, Book, ClipboardList, ClipboardPenLine, PartyPopper, File, Users, ChevronsLeftRightEllipsis, Bell, Bug, Lock } from "lucide-react"
import Link from "next/link"
import Logo from "@/app/assets/Yorwor.svg"

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

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 mx-auto">
                    <img className="w-7" src={Logo.src} alt="Yorwor Logo" />
                    SMT - Yorwor
                </div>
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
                                <Link href="/notify">
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
                <SidebarMenuButton asChild className="cursor-pointer">
                    <div>
                        <Lock />
                        <span>เล็อกอิน</span>
                    </div>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}
