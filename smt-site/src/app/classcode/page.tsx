"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Clipboard, Pagination, Spinner } from "flowbite-react";
import { FaHistory } from "react-icons/fa";
import smtConfig from "../smt-config.mjs";
import useLocalStorge from "../lib/localstorage-db";

interface Classcode {
  Subject: string;
  Code: string;
  Teacher: string;
}

export default function Classroom() {
  const [data, setData] = useState<Classcode[]>([
    {
      Subject: "กำลังดึงข้อมูล",
      Code: "กำลังดึงข้อมูล",
      Teacher: "กำลังดึงข้อมูล",
    },
  ]);
  const [title] = useState("Hatyaiwit - รหัสห้องเรียน");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const [studentMsg, setStudentMsg] = useState("กรุณาล็อกอิน");
  const { email } = useLocalStorge(false);
  const itemsPerPage = 15;

  useEffect(() => {
    axios
      .get(`${smtConfig.apiMain}classcode`)
      .then((response) => {
        setData(response.data.Classcode);
      })
      .catch((error) => {
        setData([
          {
            Subject: "ไม่สามารถ",
            Code: "ดึงข้อมูลได้",
            Teacher: `${error}`,
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (email) {
      setStudentMsg("กรุณารอสักครู่");
      axios
        .get(`${smtConfig.apiUser}permission`, {
          headers: {
            Auth: email,
          },
        })
        .then(() => {
          setIsStudent(true);
        })
        .catch(() => {
          setStudentMsg("กรุณาใช้อีเมล @hatyaiwit.ac.th");
          setIsStudent(false);
        });
    }
  }, [email]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, data.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          👩🏻‍💻 รหัสห้องเรียน - Classroom code
        </h1>
        {isStudent ? (
          <>
            <h2 style={{ fontSize: "18px" }}>
              ** หากไม่พบรหัสวิชาที่หาอยู่ กรุณาติดต่อฝ่ายการเรียน **<br />
              <span
                className="flex"
                style={{ alignItems: "center" }}
              >
                <FaHistory style={{ marginRight: "6px" }} /> ข้อมูลอัพเดททุกๆ 3 นาที
              </span>
            </h2>
            <div style={{ marginTop: "20px" }} className="overflow-x-auto animate__animated animate__fadeIn">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>วิชา</Table.HeadCell>
                  <Table.HeadCell>รหัสห้องเรียน</Table.HeadCell>
                  <Table.HeadCell>ครู</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {currentData.map((Classroom, index) => (
                    <>
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {Classroom.Subject}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                          <span style={{ display: "flex", alignItems: "center" }}>
                            <p style={{ margin: 0 }}>{Classroom.Code}</p>
                            <Clipboard.WithIcon
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "30px",
                                marginLeft: "5px",
                                position: "static",
                              }}
                              valueToCopy={Classroom.Code}
                            />
                          </span>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                          {Classroom.Teacher}
                        </Table.Cell>
                      </Table.Row>
                    </>
                  ))}
                </Table.Body>
              </Table>
              <div style={{ flexDirection: 'column', alignItems: 'center', marginTop: '17px' }} className="flex justify-center">
                <p>แสดง {startItem}-{endItem} รายการ ทั้งหมด {data.length} รายการ</p>
                <Pagination
                  style={{ marginTop: '-20px' }}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  previousLabel="ก่อนหน้า"
                  nextLabel="ถัดไป"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img style={{ width: "350px" }} className="object-cover object-center rounded" alt="hero" src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-flat-login-icon-with-password-access-and-padlock-concept-vector-png-image_41882582.jpg" />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <div className="flex items-center gap-4">
                    {studentMsg == "กรุณารอสักครู่" ? (<><Spinner size="lg" /></>) : (<></>)}
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{studentMsg}</h1>
                  </div>
                  {studentMsg == "กรุณารอสักครู่" ? (<><p className="mb-4 leading-relaxed text-gray-900">อาจจะใช้เวลาเล็กน้อย เรากำลังตรวจสอบว่าคุณเป็นนักเรียน ห้อง ม.4/5</p></>) : (
                    <>
                      <p className="mb-4 leading-relaxed text-gray-900">{"ก่อนใช้งานฟีเจอร์นี้ (คลิก เมนู > ล็อกอิน)"} <br /><span style={{ color: 'red', fontWeight: 'bold' }}>**ใช้อีเมล นักเรียน ม.4/5 เท่านั้น</span></p>
                    </>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
