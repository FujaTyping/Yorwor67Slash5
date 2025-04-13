"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import Logo from "@/app/assets/YorworOutline.svg";
import { MessageCircleQuestion } from "lucide-react";

export function Providers({ children }: { children: React.ReactNode }) {
    const firstLayer = useRef<HTMLDivElement | null>(null);
    const secondLayer = useRef<HTMLDivElement | null>(null);

    return (
        <TransitionRouter
            auto={true}
            leave={(next, from, to) => {
                console.log({ from, to });

                const tl = gsap.timeline({
                    onComplete: next,
                })
                    .fromTo(
                        firstLayer.current,
                        { y: "-100%", opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                    )
                    .fromTo(
                        secondLayer.current,
                        { y: "-100%", opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                        "<50%",
                    );

                return () => {
                    tl.kill();
                };
            }}
            enter={(next) => {
                const tl = gsap.timeline()
                    .fromTo(
                        secondLayer.current,
                        { y: 0, opacity: 1 },
                        {
                            y: "100%",
                            opacity: 0,
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                    )
                    .fromTo(
                        firstLayer.current,
                        { y: 0, opacity: 1 },
                        {
                            y: "100%",
                            opacity: 0,
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                        "<50%",
                    )
                    .call(next, undefined, "<50%");

                return () => {
                    tl.kill();
                };
            }}
        >
            <main>{children}</main>

            <div
                ref={firstLayer}
                className="fixed inset-0 z-50 -translate-y-full bg-gray-50"
            />
            <div
                ref={secondLayer}
                className="fixed inset-0 z-50 -translate-y-full bg-gray-100 w-full flex items-center justify-center"
            >
                <div
                    className="absolute bottom-0 left-0 p-2 flex items-center gap-1 text-xs cursor-pointer"
                    onClick={() => window.location.reload()}
                >
                    <MessageCircleQuestion size={14} />
                    <h1>ติดอยู่หน้านี้ คลิกที่นี้เพื่อรีเฟรชหน้านี้ใหม่</h1>
                </div>
                <img src={Logo.src} className="w-48 sm:w-52 md:w-68" alt="Logo" width={512} height={512} />
            </div>
        </TransitionRouter>
    );
}
