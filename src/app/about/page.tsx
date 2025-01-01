"use client";

import { useState } from "react";
import { Carousel } from "flowbite-react";
import Link from "next/link";
import smtConfig from "../smt-config.mjs";
import About1 from "../assets/Carousel/About1.jpg";
import About2 from "../assets/Carousel/About2.jpg";
import Bento1 from "../assets/Carousel/Bento1.jpg"
import Bento2 from "../assets/Carousel/Bento2.jpg"
import Bento3 from "../assets/Carousel/Bento3.jpg"
import Bento4 from "../assets/Carousel/Bento4.jpg"
import Bento5 from "../assets/Carousel/Bento5.jpg"

export default function About() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับห้องเรา");
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <div className="flex items-center justify-center -mt-5 md:-mt-0">
          <div className="flex flex-col gap-6 md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-10">
              <div className="flex items-center flex-col md:flex-row gap-3">
                <img className="w-14 h-14 md:mb-2" src="/assets/Treechut.png" alt="Hatyaiwit" />
                <h2 className="text-4xl lg:text-5xl text-center md:text-left leading-tight font-bold">
                  พวกเรา <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text">ม.{smtConfig.mattayom}</span> SMT
                </h2>
              </div>
              <h3
                className="mt-4 md:mt-5 text-md lg:text-xl text-center md:text-left">
                ห้อง {smtConfig.mattayom} SMT มุ่งพัฒนาทักษะด้านวิศวกรรม วิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี พร้อมเตรียมนักเรียนรับมือกับความท้าทายในยุคใหม่ มีการจัดกิจกรรมเสริม เช่น การแข่งขันและการเรียนรู้ภายใต้ความกดดัน รวมถึงเชิญวิทยากรภายนอกมาแชร์ความรู้และประสบการณ์เพื่อเปิดมุมมองใหม่ๆ ให้กับนักเรียน
              </h3>
            </div>
            <div className="h-48 md:h-80 w-full md:w-1/2 flex justify-center md:justify-end rounded-lg">
              <Carousel slideInterval={5000}>
                <img className="rounded-lg" src={About1.src} alt="AboutBanner" />
                <img className="rounded-lg" src={About2.src} alt="AboutBanner" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="-mt-3 md:-mt-0 md:mb-3">
          <div className="mb-5 flex items-center justify-between gap-8 md:mb-6">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10">
              <span className="relative whitespace-nowrap">
                <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-500 dark:fill-orange-300/60" preserveAspectRatio="none">
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <h2 className="text-2xl font-bold lg:text-3xl">SMT</h2>
              </span>
              <p>
                ย่อมาจาก Science Math Technology หลักสูตรที่เน้นวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี
              </p>
            </div>
          </div>
          <section className="bg-white">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
                  <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                    <img src={Bento2.src} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 className="z-10 text-xl md:text-2xl text-white absolute top-0 left-0 p-4">เทคโนโลยี</h3>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
                  <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
                    <img src={Bento3.src} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 className="z-10 text-xl md:text-2xl text-white absolute top-0 left-0 p-4">คณิตศาสตร์</h3>
                  </div>
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                    <Link href="/activities">
                      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 cursor-pointer">
                        <img src={Bento4.src} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                        <h3 className="z-10 text-xl md:text-2xl text-white absolute top-0 left-0 p-4">กิจกรรม</h3>
                      </div>
                    </Link>
                    <Link href="/">
                      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 cursor-pointer">
                        <img src={Bento5.src} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                        <h3 className="z-10 text-xl md:text-2xl text-white absolute top-0 left-0 p-4">การแข่งขัน</h3>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
                  <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                    <img src={Bento1.src} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 className="z-10 text-xl md:text-2xl text-white absolute top-0 left-0 p-4">วิทยาศาสตร์</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
