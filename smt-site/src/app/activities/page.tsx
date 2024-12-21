"use client";

import { useState, useEffect } from "react";
import { Timeline, Spinner } from "flowbite-react";
import { RiCalendarTodoFill } from "react-icons/ri";
import axios from "axios";
import smtConfig from "../smt-config.mjs";
import { FaHistory } from "react-icons/fa";

interface Activities {
  title: string;
  decs: string;
  date: string;
  url: string;
}


export default function TimeLine() {
  const [title] = useState("Hatyaiwit - บันทึกกิจกรรม");
  const [loadingfin, setFinLoading] = useState(false);
  const [data, setData] = useState<Activities[]>([
    {
      title: "กำลังดึงข้อมูล",
      decs: "กำลังดึงข้อมูล",
      date: "0 มกราคม 0000",
      url: "กำลังดึงข้อมูล"
    },
  ]);
  const [updateTime, setUpdateTime] = useState("0 มกราคม 0000");

  useEffect(() => {
    setFinLoading(false);
    axios
      .get(`${smtConfig.apiMain}activities`)
      .then((response) => {
        setData(response.data.Activities);
        setUpdateTime(response.data.Static.update);
        setFinLoading(true);
      })
      .catch((error) => {
        setData([
          {
            title: "ไม่สามารถดึงข้อมูลได้",
            decs: `${error}`,
            date: "0 มกราคม 0000",
            url: "ไม่สามารถดึงข้อมูลได้"
          },
        ]);
      });
  }, []);
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <h1 style={{ marginBottom: "20px" }} className="border-b">
          🎉 บันทึกกิจกรรม - Activities
        </h1>
        <h2 className="mb-5" style={{ fontSize: "18px" }}>
          <span className="flex" style={{ alignItems: "center" }}>
            <FaHistory style={{ marginRight: "6px" }} /> อัพเดทข้อมูลล่าสุด ณ วันที่ {updateTime}
          </span>
        </h2>
        {loadingfin ? (<>
          <div className="animate__animated animate__fadeInUp">
            <Timeline>
              {data.map((Activities, index) => (<>
                <Timeline.Item key={index}>
                  <Timeline.Point icon={RiCalendarTodoFill} />
                  <Timeline.Content>
                    <Timeline.Time>{Activities.date}</Timeline.Time>
                    <img className="hover:saturate-150 transition-all duration-300" src={Activities.url} alt="EventBanner" />
                    <Timeline.Title>{Activities.title}</Timeline.Title>
                    <Timeline.Body id="TimeDecs">
                      {Activities.decs}
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              </>))}
            </Timeline>
          </div>
        </>) : (
          <>
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img style={{ width: "250px" }} className="object-cover object-center rounded" alt="hero" src="https://cdn-icons-png.freepik.com/512/7069/7069551.png" />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <div className="flex items-center gap-4">
                    <Spinner size="lg" />
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">กรุณารอสักครู่</h1>
                  </div>
                  <p className="mb-4 leading-relaxed text-gray-900">อาจจะใช้เวลาเล็กน้อย กำลังดึงข้อมูล</p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
