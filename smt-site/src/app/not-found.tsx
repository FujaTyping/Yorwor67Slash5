"use client";

import { Button } from "flowbite-react";
import NotImage from "./assets/404.png"
import Link from 'next/link'
import { FaHome, FaBook } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="container">
      <div className="FOF-flex gap-12" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <img alt="NotfoundImage" style={{ borderRadius: '30px' }} src={NotImage.src}></img>
        <div>
          <h2 className="font-bold" style={{ fontSize: '35px' }} >404 - Not found</h2>
          <p style={{ fontSize: '18px' }}>โอ๊ะ! ดูเหมือนคุณจะหลงทางในโลกของวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี!
            หน้าเว็บที่คุณกำลังมองหาไม่มีอยู่ตรงนี้ แต่ไม่ต้องห่วง! แม้แต่นักเรียนหัวกะทิในห้อง ม.4/5 ก็อาจจะหลงทางได้บ้างเป็นบางครั้ง</p>
          <p className="font-bold" style={{ fontSize: '18px', marginTop: '15px' }}>กลับไปสำรวจสิ่งที่น่าสนใจกันต่อได้ที่</p>
          <Button.Group id="AboutBtn" style={{ marginTop: '10px' }}>
            <Button as={Link} href="/" color="blue"><FaHome style={{ margin: 'auto', marginRight: '5px' }} className="mr-3 h-4 w-4" />กลับไปหน้าหลัก</Button>
            <Button as={Link} href="/homework" color="blue"><FaBook style={{ margin: 'auto', marginRight: '5px' }} className="mr-3 h-4 w-4" />ดูการบ้าน</Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
}
