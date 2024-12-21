"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import NotImage from "./assets/404.webp";
import Link from "next/link";
import { FaHome, FaBook } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";

export default function NotFound() {
  const [title] = useState("Hatyaiwit - 404");
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <div
          className="flex flex-col md:flex-row gap-12 items-center justify-center"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <img
            alt="NotfoundImage"
            style={{ borderRadius: "30px", maxWidth: '15rem' }}
            src={NotImage.src}
          ></img>
          <div style={{ maxWidth: '45rem' }}>
            <h2 className="font-bold" style={{ fontSize: "40px" }}>
              404 - Not found
            </h2>
            <p style={{ fontSize: "18px" }}>
              โอ๊ะ! ดูเหมือนคุณจะหลงทางในโลกของวิทยาศาสตร์ คณิตศาสตร์
              และเทคโนโลยี! น่าเสียดายที่หน้าเว็บที่คุณกำลังมองหาไม่มีอยู่ตรงนี้
              หรืออาจถูกย้ายไปที่อื่น แต่ไม่ต้องกังวล! เพราะแม้แต่นักเรียนหัวกะทิ
              ในห้อง ม.4/5 ก็อาจจะหลงทางในเส้นทางแห่งการเรียนรู้ได้บ้างเป็นบางครั้ง
              อย่าลืมว่าเส้นทางแห่งความสำเร็จเริ่มต้นด้วยการสำรวจและเรียนรู้!
              <br /><br />
              คุณสามารถกลับไปสำรวจสิ่งที่น่าสนใจเพิ่มเติมได้ที่นี้ เพื่อดูสิ่งใหม่ ๆ ที่เรามีให้คุณ! ขอบคุณที่แวะเข้ามา และหวังว่า คุณจะสนุกกับการเดินทางครั้งนี้!
            </p>
          </div>
        </div>
      </div>
      <section style={{ marginTop: '-20px', marginBottom: '-20px' }} className="body-font">
        <div className="container px-4 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div style={{ backgroundColor: 'red' }} className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <FaHome className="w-5 h-5" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">หน้าหลัก</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">สำรวจข้อมูลสำคัญเกี่ยวกับเว็บไซต์ Yorwor64Slash5 ได้ที่หน้านี้
                    รวมถึงฟีเจอร์เด่นและสิ่งที่น่าสนใจสำหรับนักเรียน ม.4/5</p>
                  <Link href="/">
                    <Button
                      style={{ backgroundColor: 'red' }}
                      color="blue"
                      className="mt-3"
                    >
                      ไปกันเลย
                      <GrFormNextLink className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div style={{ backgroundColor: 'red' }} className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <FaBook className="w-5 h-5" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">ดูภาระงาน</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">ติดตามรายการภาระงานและงานที่ได้รับมอบหมาย พร้อมรายละเอียดและกำหนดส่ง
                    เพื่อช่วยจัดการงานอย่างมีประสิทธิภาพ</p>
                  <Link href="/assignment">
                    <Button
                      style={{ backgroundColor: 'red' }}
                      color="blue"
                      className="mt-3"
                    >
                      ไปกันเลย
                      <GrFormNextLink className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div style={{ backgroundColor: 'red' }} className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <BiSupport className="w-5 h-5" />
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">รายงานปัญหา</h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">พบปัญหาในระบบ? แจ้งให้เราทราบผ่านฟีเจอร์นี้ เพื่อให้การปรับปรุงระบบเร็วที่สุด
                    และช่วยให้เว็บไซต์ใช้งานได้เต็มประสิทธิภาพ</p>
                  <Link href="/feedback">
                    <Button
                      style={{ backgroundColor: 'red' }}
                      color="blue"
                      className="mt-3"
                    >
                      ไปกันเลย
                      <GrFormNextLink className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
