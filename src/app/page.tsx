"use client";

import { useState, useEffect } from "react";
import { Carousel, Modal } from "flowbite-react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Timetable from "./assets/Timetable.webp";
import { FaBullhorn } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";
import { BiMath } from "react-icons/bi";
import { TbCpu } from "react-icons/tb";
import smtConfig from "./smt-config.mjs";
import Examtable from './assets/Examtable.webp'

interface Completion {
  Title: string;
  Decs: string;
  Url: any;
  Time: string;
}

interface Announcement {
  Title: string;
  IsImg: boolean;
  Url: string;
}

export default function Home() {
  const [data, setData] = useState<Announcement>({
    Title: "กำลังดึงข้อมูล",
    IsImg: false,
    Url: "",
  });
  const [title] = useState("Hatyaiwit - ม.4/5");
  const [modalOpen, setModalOpen] = useState(false);
  const [comData, setComData] = useState<Completion[]>([
    {
      Title: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Url: "",
      Time: "กำลังดึงข้อมูล",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${smtConfig.apiMain}announcement`)
      .then((response) => {
        setData({
          Title: `${response.data.Text}`,
          IsImg: response.data.IsImg,
          Url: `${response.data.Url}`,
        });
      })
      .catch((error) => {
        setData({
          Title: `ไม่สามารถดึงข้อมูลได้`,
          IsImg: false,
          Url: `${error.response.data}`,
        });
      });
    axios
      .get(`${smtConfig.apiMain}completion`)
      .then((response) => {
        setComData(response.data.Completion);
      })
      .catch((error) => {
        setComData([
          {
            Title: "ไม่สามารถ",
            Decs: "ดึงข้อมูลได้",
            Url: "",
            Time: `${error}`,
          },
        ]);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <section style={{ marginTop: '2rem' }} className="container">
        <div className="mb-8 flex justify-center">
          <div
            className="relative rounded-full px-4 py-1.5 text-sm leading-6 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20 flex gap-3 items-center">
            <FaBullhorn />
            <Marquee
              gradient={true}
              gradientColor="white"
              gradientWidth={25}
              pauseOnHover={true}
            >
              {data.Title}
            </Marquee>
          </div>
        </div>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <img className="w-14 h-14 md:mb-4" src="/assets/Treechut.png" alt="Hatyaiwit" />
              <p className="max-w-4xl mb-4 text-4xl font-bold leading-tight sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                ม.4/5 - โครงการ
                <span className="relative whitespace-nowrap ml-4">
                  <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-500 dark:fill-orange-300/60" preserveAspectRatio="none">
                    <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
                  </svg>
                  <span className="relative bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text">SMT</span>
                </span>
              </p>
            </div>
            <h1 className="max-w-2xl mx-auto px-6 text-lg font-inter">
              เว็ปไซต์ ม.4/5 ของเราเป็นเว็ปไซต์สำหรับรวมรวบข้อมูลต่างๆ
              เพื่อนำมาช่วยเหลือนักเรียนภายในห้อง
              เพื่อให้จัดการงานภายในห้องที่ได้รับมอบหมาย
              หรือตรวจสอบการขาดลาและอื่นๆ อีกมากมาย
            </h1>
            <p className="mt-4 flex items-center justify-center font-bold gap-3">
              <span className="flex items-center"><MdOutlineScience className="mr-1" /> SCIENCE</span>
              •
              <span className="flex items-center"><BiMath className="mr-1 ml-1" /> MATH</span>
              •
              <span className="flex items-center"><TbCpu className="mr-1 ml-1" /> TECHONOGY</span>
            </p>
          </div>
        </div>
        <div className="bg-white mt-8">
          <div>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel slideInterval={5000}>
                {comData.map((Data, index) => (
                  <div
                    key={index}
                    className="relative h-full flex items-end justify-center"
                  >
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
        </div>
      </section>
      <div className="container">
        <h1 style={{ marginBottom: "10px" }} className="border-b">
          📅 ตารางเรียน - Timetable
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง ครั้งที่ 2 <br />
          <span style={{ color: "red" }}>
            เริ่มใช้ตั้งแต่วันจันทร์ที่ 4 พฤศจิกายน 2567 เป็นต้นไป
          </span>
        </h2>
        <img
          width={999}
          height={682}
          alt="Timetable"
          style={{ margin: "auto", marginTop: "10px" }}
          src={Timetable.src}
        ></img>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "10px" }} className="border-b">
          📝 ตารางสอบ - Examtable
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ตารางสอบ ตารางสอบนี้เป็นฉบับล่าสุด ม.4 เทอม 2 กลางภาค <br />
          <span style={{ color: "red" }}>
            เริ่มใช้ตั้งแต่วันพุธที่ 18 ธันวาคม 2567 - 27 ธันวาคม 2567 เป็นต้นไป
          </span>
        </h2>
        <img
          width={682}
          height={999}
          alt="EXamtable"
          style={{ margin: "auto", marginTop: "30px" }}
          src={Examtable.src}
        ></img>
      </div>
      <Modal
        className="animate__animated animate__fadeIn"
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <img style={{ width: "100%", height: "100%" }} src={data.Url} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
