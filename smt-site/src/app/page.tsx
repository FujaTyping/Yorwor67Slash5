"use client";

import { useState, useEffect, useCallback, SetStateAction } from "react";
import { Carousel } from "flowbite-react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Timetable from "./assets/Timetable.webp";
import ImageViewer from 'react-simple-image-viewer';
import { IoEyeSharp } from "react-icons/io5";

interface Completion {
  Title: string;
  Decs: string;
  Url: any;
  Time: string;
}

export default function Home() {
  const [data, setData] = useState("ยินดีต้อนรับเข้าสู่เว็ปไซต์");
  const [title] = useState("Hatyaiwit - ม.4/5");
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    'https://firebasestorage.googleapis.com/v0/b/yorwor67slash5.appspot.com/o/Schedule%2FTimetable1.webp?alt=media&token=edeaaf0d-cac6-4684-ad81-00d0253a5500',
    `${Timetable.src}`,
  ];
  const [comData, setComData] = useState<Completion[]>([
    {
      Title: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Url: "",
      Time: "กำลังดึงข้อมูล"
    },
  ]);

  const openImageViewer = useCallback((index: SetStateAction<number>) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/announcement`)
      .then((response) => {
        setData(response.data.Text);
      })
      .catch((error) => {
        setData(`${error}`);
      });
    axios
      .get(`https://api.smt.siraphop.me/completion`)
      .then((response) => {
        setComData(response.data.Completion);
      })
      .catch((error) => {
        setComData([
          {
            Title: "ไม่สามารถ",
            Decs: "ดึงข้อมูลได้",
            Url: "",
            Time: `${error}`
          },
        ]);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="hbanner animate__animated animate__tada">
        <h1 className="title text-3xl lg:text-5xl mb-3">ม.4/5 - โครงการ SMT</h1>
        <p className="text-base lg:text-2xl" style={{ maxWidth: "45rem" }}>
          เว็ปไซต์ ม.4/5 ของเราเป็นเว็ปไซต์สำหรับรวมรวบข้อมูลต่างๆ เพื่อนำมาช่วยเหลือนักเรียนภายในห้อง
          เพื่อให้จัดการงานภายในห้องที่ได้รับมอบหมาย หรือตรวจสอบการขาดลาและอื่นๆอีกมากมาย
        </p>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📢 ประกาศ - Announcement
        </h1>
        <p style={{ marginBottom: '10px', display: 'none' }}>ยินดีต้อนรับเข้าสู่เว็ปไซต์ ห้องเรียน โครงการพิเศษ SMT โรงเรียนหาดใหญ่วิทยาลัย (ม.4/5)</p>
        <h2 className="gap-3 centered-text-h2">
          <Marquee gradient={true} gradientColor="white" gradientWidth={25} pauseOnHover={true}>{data}</Marquee>
        </h2>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          🏆 การแข่งขัน - Competition
        </h1>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={5000}>
            {comData.map((Data, index) => (
              <div key={index} className="relative h-full flex items-end justify-center">
                <div className="absolute inset-0 z-[-1]">
                  <img
                    src={Data.Url || null}
                    alt={Data.Title}
                    className="w-full h-full object-cover hover:scale-125 transition-all duration-300"
                  />
                </div>
                <div className="z-10 bottom-0 text-2xl p-2 text-center bg-white bg-opacity-75 rounded-md">
                  <h2 className="text-base">วันที่ {Data.Time}</h2>
                  <h1 className="title text-base lg:text-3xl">{Data.Title}</h1>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "10px" }} className="border-b">
          📅 ตารางเรียน - Timetable
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง ครั้งที่ 1{" "}<br />
          <span style={{ color: "red" }}>
            เริ่มใช้ตั้งแต่วันจันทร์ที่ 28 ตุลาคม - 1 พฤศจิกายน 2567
          </span>
        </h2>
        <img
          width={999}
          height={682}
          alt="Timetable"
          style={{ margin: "auto", marginTop: "10px" }}
          src={Timetable.src}
        ></img>
        <h2 style={{ fontSize: "18px", cursor: "pointer", justifyContent: 'center', alignItems: 'center' }}
          onClick={() => { openImageViewer(0) }}
          className="flex w-full mt-5">
          <IoEyeSharp style={{ marginRight: "6px" }} /> ดูประวัติตารางเรียนทั้งหมด
        </h2>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
}
