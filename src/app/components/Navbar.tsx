import React from 'react';
import Link from 'next/link';
import { IndentIncrease, X, House, Pencil, School, ChartArea, PartyPopper } from 'lucide-react';

import Logo from '@/app/assets/icons/Yorwor.webp';

function Navbar() {
    return (
        <>
            <header className="relative bg-blue-600 border-b-5 border-gray-200 text-white flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3 px-2">
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <Link className="flex-none text-xl font-semibold focus:outline-hidden focus:opacity-80" href="/" aria-label="Brand">
                            <span className="inline-flex items-center gap-x-4 text-xl font-semibold">
                                <img className="w-10 h-auto" src={Logo.src} alt="Yorwor Logo" />
                                SMT - ม.5/5
                            </span>
                        </Link>
                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" id="hs-navbar-example-collapse" aria-expanded="false" aria-controls="hs-navbar-example" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-example">
                                <IndentIncrease className="hs-collapse-open:hidden shrink-0 size-4" />
                                <X className="hs-collapse-open:block hidden shrink-0 size-4" />
                                <span className="sr-only">สลับการนำทาง</span>
                            </button>
                        </div>
                    </div>
                    <div id="hs-navbar-example" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
                        <div className="flex flex-col gap-5 mt-5 mb-5 sm:mb-0 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                            <Link className="font-medium focus:outline-hidden flex items-center gap-2" href="/"><House size={16} /> หน้าหลัก</Link>
                            <Link className="font-medium focus:outline-hidden flex items-center gap-2" href="/assignment"><Pencil size={16} /> ภาระงาน</Link>
                            <Link className="font-medium focus:outline-hidden flex items-center gap-2" href="/classcode"><School size={16} /> รหัสห้องเรียน</Link>
                            <Link className="font-medium focus:outline-hidden flex items-center gap-2" href="/check-in"><ChartArea size={16} /> สถิตินักเรียน</Link>
                            <Link className="font-medium focus:outline-hidden flex items-center gap-2" href="/activities"><PartyPopper size={16} /> กิจกรรม</Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar