"use client"

import type * as React from "react"
import { Home, BookMarked, School, User, ClipboardList, LogIn, ShieldUser, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signInWithGoogle } from "@/app/lib/firesbaseAuth";
import { useAuth } from "@/app/lib/getAuth";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    href: string
    onClick?: () => void;
}

const navItems: NavItem[] = [
    {
        id: "home",
        label: "หน้าหลัก",
        icon: Home,
        href: "/",
    },
    {
        id: "assignment",
        label: "ภาระงาน",
        icon: BookMarked,
        href: "/assignment",
    },
    {
        id: "classcode",
        label: "รหัสห้องเรียน",
        icon: School,
        href: "/classcode",
    },
    {
        id: "absent",
        label: "เช็คชื่อ",
        icon: ClipboardList,
        href: "/absent",
    },
    {
        id: "dashboard",
        label: "แดชบอร์ด",
        icon: User,
        href: "/dashboard",
    },
]

export function MobileBottomNav() {
    const user = useAuth();
    const pathname = usePathname()
    const isLoggedIn = !!user;

    const handleLogout = () => {
        toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
            description: <p className="text-black">กำลังออกจากระบบ</p>
        })
        const auth = getAuth();
        signOut(auth).then(() => {
            toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                description: <p className="text-black">ออกจากระบบสำเร็จ</p>
            })
        }).catch((error) => {
            console.error("Logout failed:", error);
            toast(<h1 className="flex items-center gap-1 font-bold"><ShieldUser size={16} /> ระบบล็อกอิน</h1>, {
                description: <p className="text-black">ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง</p>
            })
        });
    };


    const finalNavItems = navItems.map(item => {
        if (item.id === "dashboard") {
            if (isLoggedIn) {
                return {
                    ...item,
                    label: "แดชบอร์ด",
                };
            } else {
                return {
                    id: "login",
                    label: "ล็อกอิน",
                    icon: LogIn,
                    href: "#",
                    onClick: () => {
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
                    },
                };
            }
        }
        return item;
    });
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
            <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
                {finalNavItems.map((item) => {
                    const isActive = pathname === item.href
                    let iconDisplay: React.ReactNode;

                    if (item.id === "dashboard" && isLoggedIn && user?.photoURL) {
                        iconDisplay = (
                            <img
                                src={user.photoURL}
                                alt={item.label}
                                className={cn("h-6 w-6 rounded-full mb-1 object-cover", isActive && "ring-2 ring-primary ring-offset-1 ring-offset-background")}
                            />
                        );
                    } else {
                        const IconComponent = item.icon;
                        iconDisplay = (
                            <IconComponent
                                className={cn("h-5 w-5 mb-1 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}
                            />
                        );
                    }

                    if (item.id === "dashboard" && isLoggedIn) {
                        const isDashboardActive = pathname === item.href;
                        return (
                            <DropdownMenu key={item.id}>
                                <DropdownMenuTrigger asChild>
                                    <div
                                        className={cn(
                                            "flex flex-col items-center justify-center px-1 py-2 rounded-lg transition-colors cursor-pointer",
                                            "hover:bg-accent hover:text-accent-foreground",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            isDashboardActive && "text-primary",
                                        )}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') (e.currentTarget as HTMLElement).click(); }}
                                    >
                                        {iconDisplay}
                                        <span
                                            className={cn(
                                                "text-xs font-medium transition-colors truncate",
                                                isDashboardActive ? "text-primary" : "text-muted-foreground",
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" align="end" sideOffset={8} className="w-48 mb-1">
                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link href={item.href}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>ออกจากระบบ</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    } else {
                        return (
                            <Link
                                href={item.href}
                                key={item.id}
                                onClick={(e) => {
                                    if (item.onClick) {
                                        e.preventDefault();
                                        item.onClick();
                                    }
                                }}
                            >
                                <div
                                    className={cn(
                                        "flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-2 rounded-lg transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        isActive && "text-primary",
                                    )}
                                >
                                    {iconDisplay}
                                    <span
                                        className={cn(
                                            "text-xs font-medium transition-colors truncate",
                                            isActive ? "text-primary" : "text-muted-foreground",
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>
        </nav>
    )
}
