"use client";

import { useState } from "react";
import { Timeline } from "flowbite-react";
import { RiCalendarTodoFill } from "react-icons/ri";

import Banner1 from "../assets/Activities/Banner1.webp";
import Banner2 from "../assets/Activities/Banner2.webp";
import Banner3 from "../assets/Activities/Banner3.webp";
import Banner4 from "../assets/Activities/Banner4.webp";
import Banner5 from "../assets/Activities/Banner5.webp";
import Banner6 from "../assets/Activities/Banner6.webp";
import Banner7 from "../assets/Activities/Banner7.webp";

export default function TimeLine() {
  const [title] = useState("Hatyaiwit - บันทึกกิจกรรม");
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <h1 style={{ marginBottom: "20px" }} className="border-b">
          🎉 บันทึกกิจกรรม - Activities
        </h1>
        <div className="animate__animated animate__fadeInUp">
          <Timeline>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>22-26 เมษายน 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner1.src} alt="EventBanner" />
                <Timeline.Title>วันปรับพื้นฐาน</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                  วันที่แรกที่เราได้เจอกันและได้ทำความรู้จักกัน
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>05 พฤษภาคม 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner2.src} alt="EventBanner" />
                <Timeline.Title>วันไหว้ครู</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                  ร่วมกันจัดทำพานไหว้ครูเพื่อแสดงความเคารพและสักการะต่อครูบาอาจารย์ผู้มีพระคุณ
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>20-23 มิถุนายน 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner3.src} alt="EventBanner" />
                <Timeline.Title>กิจกรรมแข่งขันหุ่นยนต์</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                  นักเรียนที่สนใจได้ไปแข่งขันหุ่นยนต์ กับ กิจกรรม PORNSIRIKUL
                  INTERNATIONAL ROBOTIC COMPETITION
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>26 กรกฎาคม 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner4.src} alt="EventBanner" />
                <Timeline.Title>กิจกรรมทัศนศึกษา</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                  ได้ไปดูงานต่างๆที่คลองหอยโข่ง และทำกิจกรรมต่างๆ
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>09 สิงหาคม 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner5.src} alt="EventBanner" />
                <Timeline.Title>วันสัปดาห์วิทยาศาสตร์</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                  ได้ไปดูงานต่างๆ พร้อมทั้งได้รับความรู้บอร์ดต่างๆมากมาย
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>12 กันยายน 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner6.src} alt="EventBanner" />
                <Timeline.Title>กิจกรรมสาธารณประโยชน์</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                  ไปช่วยเหลือ โดยการบริจาคสิ่งของให้แก่วัดโคกนาว
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={RiCalendarTodoFill} />
              <Timeline.Content>
                <Timeline.Time>12-16 พฤศจิกายน 2567</Timeline.Time>
                <img className="hover:saturate-150 transition-all duration-300" src={Banner7.src} alt="EventBanner" />
                <Timeline.Title>ทัศนศึกษาต่างประเทศ (มาเลเชีย-สิงคโปร์)</Timeline.Title>
                <Timeline.Body id="TimeDecs">
                เปิดโอกาสเรียนรู้วัฒนธรรม สถานที่สำคัญ พัฒนาทักษะภาษาอังกฤษ และสร้างแรงบันดาลใจจากเทคโนโลยีล้ำสมัย พร้อมเสริมสร้างความสัมพันธ์และประสบการณ์ใหม่ๆ นอกห้องเรียน
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    </>
  );
}
