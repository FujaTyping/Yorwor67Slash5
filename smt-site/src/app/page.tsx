"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Timetable from "./assets/Timetable.webp";
import Banner from "./assets/Banner.webp";

export default function Home() {
  const [data, setData] = useState("ยินดีต้อนรับเข้าสู่เว็ปไซต์");
  const [title] = useState("Hatyaiwit - ม.4/5");

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/announcement`)
      .then((response) => {
        setData(response.data.Text);
      })
      .catch((error) => {
        setData(`${error}`);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <img
        className="animate__animated animate__tada"
        alt="SMTBanner"
        style={{ width: "90%", margin: "auto", marginTop: "25px" }}
        src={Banner.src}
      ></img>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📢 ประกาศ - Announcement
        </h1>
        <h2 className="gap-3 centered-text-h2">
          <Marquee gradient={true} gradientColor="white" gradientWidth={25} pauseOnHover={true}>{data}</Marquee>
        </h2>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "10px" }} className="border-b">
          📅 ตารางเรียน - Timetable
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ตารางเรียน ตารางสอนด้านล่างนี้เป็นฉบับปรับปรุง ครั้งที่ 3{" "}
          <span style={{ color: "red" }}>
            เริ่มใช้ตั้งแต่วันอังคารที่ 18 มิถุนายน พ.ศ. 2567 เป็นต้นไป
          </span>
          <br></br>กรณีพบข้อผิดพลาด สามารถแจ้งข้อมูลได้ที่ สนง.วิชาการ 2
        </h2>
        <img
          loading="lazy"
          alt="Timetable"
          style={{ margin: "auto", marginTop: "10px" }}
          src={Timetable.src}
        ></img>
      </div>
    </>
  );
}
