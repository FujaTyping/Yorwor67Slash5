"use client";

import { useState } from "react";
import { Carousel } from "flowbite-react";
import GroupPic1 from "../assets/carouselpics/Grouppic.jpg"
import GroupPic2 from "../assets/carouselpics/Grouppic2.jpg"
import KruJah from "../assets/krujah.png"
import Krumainy from "../assets/krumainy.jpg"

export default function About() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับห้องเรา");
  return (
    <>
      <title>{title}</title>
      <div style={{ marginBottom: '5px' }} className="container h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={3000}>
          <img className="mb-20" src={GroupPic1.src} alt="SMTGroupPic1"/>
          <img className="mt-20" src={GroupPic2.src} alt="SMTGroupPic2"/>
        </Carousel>
      </div>
      <div className="container">
        <h1>
        ห้อง 4/5 ของพวกเรา
        </h1>
        <h3>
        ห้องเรียน 4/5 SMT ของพวกเราเป็นห้องเรียนที่มีจุดมุ่งหมายในการพัฒนาความสามารถทางด้านวิศวกรรมนอกจากนี้ ยังมุ่งเน้นการเสริมสร้างความรู้ในด้านวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี เพื่อเตรียมความพร้อมให้กับนักเรียนในการเผชิญกับความท้าทายในโลกยุคใหม่
และยังมีการจัดกิจกรรมเสริม เช่น การแข่งขันด้านต่างๆ เพื่อให้นักเรียนได้พัฒนาทักษะการแข่งขันและเรียนรู้การทำงานภายใต้ความกดดัน นอกจากนี้ เรายังมีการเชิญวิทยากรจากภายนอกมาให้ความรู้และแชร์ประสบการณ์ต่างๆ เพื่อเปิดมุมมองใหม่ให้กับนักเรียน
        </h3>
      </div>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <div className="container">
        <h1>
          คุณครูประจำชั้น
        </h1>
        <div className="container flex justify-center items-center space-x-40 mx-auto">
          <div className="text-center space-y-3">
          <img className="w-60 h-60 rounded-full" src={KruJah.src} alt="Teacher Jah" />
          <h2>
          คุณครูพิชญาภร หนูอุไร 
          </h2>
          </div>
          <div className="text-center space-y-3">
          <img className="w-60 h-60 rounded-full" src={Krumainy.src} alt="Teacher Mainy" />
          <h2>
          คุณครูอาวาตีฟ บาระตายะ
          </h2>
          </div>
        </div>

      </div>
    </>
  );
}
