'use client';
import { useState } from "react";
import { Timeline } from "flowbite-react";
import { FaCalendarAlt, FaRegBookmark } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

//import images asset
import p1 from "../assets/Timeline/22-26 _04_67/p1.jpg";
import p2 from "../assets/Timeline/22-26 _04_67/p2.jpg";
import p3 from "../assets/Timeline/22-26 _04_67/p3.jpg";
import p4 from "../assets/Timeline/05_05_67/p1.jpg";
import p5 from "../assets/Timeline/05_05_67/p2.jpg";
import p6 from "../assets/Timeline/20-23_06_67/p1.jpg";
import p7 from "../assets/Timeline/20-23_06_67/p2.jpg";
import p8 from "../assets/Timeline/26_07_67/p1.jpg";
import p9 from "../assets/Timeline/26_07_67/p2.jpg";
import p10 from "../assets/Timeline/09_08_67/p1.jpg";
import p11 from "../assets/Timeline/12_09_67/p1.jpg";
import p12 from "../assets/Timeline/12_09_67/p2.jpg";

export default function TimeLine() {
    const [title] = useState("Hatyaiwit - บันทึกกิจกรรม");

    return (
        <>
            <title>{title}</title>
            <div className="container mx-auto p-6">
                <div className="flex items-center mb-6">
                    <FaRegBookmark className="text-3xl mr-2" />
                    <h1 className="text-3xl font-semibold border-b border-gray-300">
                        กิจกรรมของพวกเรา
                    </h1>
                </div>

                <Timeline>
                    <Timeline.Item>
                        <Timeline.Point icon={FaCalendarAlt} />
                        <Timeline.Content>
                            <Timeline.Time>22-26 เมษายน 2567</Timeline.Time>
                            <Timeline.Title>วันปรับพื้นฐาน</Timeline.Title>
                            <Timeline.Body>
                                วันที่แรกที่เราได้เจอกันและได้ทำความรู้จักกัน
                            </Timeline.Body>
                            <div className="flex space-x-4 mt-4">
                                <img src={p1.src} alt="adjustbasicday1" className="rounded-lg w-1/3 object-cover" />
                                <img src={p2.src} alt="adjustbasicday2" className="rounded-lg w-1/3 object-cover" />
                                <img src={p3.src} alt="adjustbasicday3" className="rounded-lg w-1/3 object-cover" />
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>

                    <Timeline.Item>
                        <Timeline.Point icon={FaCalendarAlt} />
                        <Timeline.Content>
                            <Timeline.Time>05 พฤษภาคม 2567</Timeline.Time>
                            <Timeline.Title>วันไหว้ครู</Timeline.Title>
                            <Timeline.Body>
                                ได้ช่วยกันทำพานไหว้ครู
                            </Timeline.Body>
                            <div className="flex space-x-4 mt-4">
                                <img src={p4.src} alt="teacherday1" className="rounded-lg w-1/2 object-cover" />
                                <img src={p5.src} alt="teacherday2" className="rounded-lg w-1/2 object-cover" />
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>

                    <Timeline.Item>
                        <Timeline.Point icon={FaCalendarAlt} />
                        <Timeline.Content>
                            <Timeline.Time>20-23 มิถุนายน 2567</Timeline.Time>
                            <Timeline.Title>วันไปแข่งขันหุ่นยนต์</Timeline.Title>
                            <Timeline.Body>
                                นักเรียนที่สนใจได้ไปแข่งขันหุ่นยนต์ที่ตรัง
                            </Timeline.Body>
                            <div className="flex space-x-4 mt-4">
                                <img src={p6.src} alt="roboticday1" className="rounded-lg w-1/3 object-cover" />
                                <img src={p7.src} alt="roboticday2" className="rounded-lg w-1/3 object-cover" />
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>

                    <Timeline.Item>
                        <Timeline.Point icon={FaCalendarAlt} />
                        <Timeline.Content>
                            <Timeline.Time>26 กรกฎาคม 2567</Timeline.Time>
                            <Timeline.Title>วันดูงานคลองหอยโข่ง</Timeline.Title>
                            <Timeline.Body>
                                ได้ไปดูงานต่างๆที่คลองหอยโข่ง และทำกิจกรรม
                            </Timeline.Body>
                            <div className="flex space-x-4 mt-4">
                                <img src={p8.src} alt="activityday1" className="rounded-lg w-1/3 object-cover" />
                                <img src={p9.src} alt="activityday2" className="rounded-lg w-1/3 object-cover" />
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>

                    <Timeline.Item>
                        <Timeline.Point icon={FaCalendarAlt} />
                        <Timeline.Content>
                            <Timeline.Time>09 สิงหาคม 2567</Timeline.Time>
                            <Timeline.Title>วันสัปดาห์วันวิทย์</Timeline.Title>
                            <Timeline.Body>
                                ได้ไปดูงานต่างๆ พร้อมทั้งได้รับความรู้บอร์ดต่างๆมากมาย
                            </Timeline.Body>
                            <div className="flex space-x-4 mt-4">
                                <img src={p10.src} alt="scienceday1" className="rounded-lg w-1/3 object-cover" />
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>

                    <Timeline.Item>
                        <Timeline.Point icon={FaCalendarAlt} />
                        <Timeline.Content>
                            <Timeline.Time>12 กันยายน 2567</Timeline.Time>
                            <Timeline.Title>วันทำบำเพ็ญประโยชน์</Timeline.Title>
                            <Timeline.Body>
                                ไปช่วยเหลือ โดยการบริจาคสิ่งของให้แก่วัดเพื่อการพยาบาล
                            </Timeline.Body>
                            <div className="flex space-x-4 mt-4">
                                <img src={p11.src} alt="helpday1" className="rounded-lg w-1/2 object-cover" />
                                <img src={p12.src} alt="helpday2" className="rounded-lg w-1/2 object-cover" />
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>

                    <Timeline.Item>
                        <Timeline.Point icon={CiCircleMore} />
                        <Timeline.Content>
                            <Timeline.Title className="text-2xl font-bold">Comming More!</Timeline.Title>
                        </Timeline.Content>
                    </Timeline.Item>
                </Timeline>
            </div>
        </>
    );
}
