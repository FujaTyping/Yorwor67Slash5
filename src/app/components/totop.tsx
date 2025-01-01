"use client";

import ScrollToTop from "react-scroll-up";
import { Button } from "flowbite-react";
import { FaUpLong } from "react-icons/fa6";

export default function ToTopButton() {
    return (
        <>
            <ScrollToTop showUnder={160}>
                <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ backgroundColor: '#ff1616', zIndex: 1000 }} className="Totop" color="failure" pill>
                    <FaUpLong className="h-7 w-4" />
                </Button>
            </ScrollToTop>
        </>
    );
}
