"use client";

import { useState, useEffect } from "react";
import { Carousel, Tooltip, Modal } from "flowbite-react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Timetable from "./assets/Timetable.webp";
import { FaPaperclip } from "react-icons/fa";
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
      <div className="hbanner">
        <h1 className="title text-3xl lg:text-5xl mb-3">ม.4/5 - โครงการ SMT</h1>
        <p className="text-base lg:text-2xl" style={{ maxWidth: "45rem" }}>
          เว็ปไซต์ ม.4/5 ของเราเป็นเว็ปไซต์สำหรับรวมรวบข้อมูลต่างๆ
          เพื่อนำมาช่วยเหลือนักเรียนภายในห้อง
          เพื่อให้จัดการงานภายในห้องที่ได้รับมอบหมาย
          หรือตรวจสอบการขาดลาและอื่นๆอีกมากมาย
        </p>
      </div>
      <div className="container">
        <h1
          style={{ marginBottom: "15px" }}
          className="border-b flex items-center"
        >
          📢 ประกาศ - Announcement{" "}
          {data.IsImg ? (
            <>
              <Tooltip content="ดูไฟล์แนบประกาศ" style="light">
                <FaPaperclip
                  onClick={() => setModalOpen(true)}
                  className="w-6 h-6 ml-3 cursor-pointer"
                />
              </Tooltip>
            </>
          ) : (
            <></>
          )}
        </h1>
        <p style={{ marginBottom: "10px", display: "none" }}>
          ยินดีต้อนรับเข้าสู่เว็ปไซต์ ห้องเรียน โครงการพิเศษ SMT
          โรงเรียนหาดใหญ่วิทยาลัย (ม.4/5)
        </p>
        <h2 className="gap-3 centered-text-h2">
          <Marquee
            gradient={true}
            gradientColor="white"
            gradientWidth={25}
            pauseOnHover={true}
          >
            {data.Title}
          </Marquee>
        </h2>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          🏆 การแข่งขัน - Competition
        </h1>
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
