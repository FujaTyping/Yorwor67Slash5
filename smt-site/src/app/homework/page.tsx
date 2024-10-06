"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination } from "flowbite-react";

interface Homework {
  Subject: string;
  Time: string;
  Decs: string;
  Due: string;
}

export default function Homework() {
  const [data, setData] = useState<Homework[]>([
    {
      Due: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Time: "กำลังดึงข้อมูล",
      Subject: "กำลังดึงข้อมูล",
    },
  ]);
  const [title] = useState("Hatyaiwit - การบ้าน");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/homework`)
      .then((response) => {
        setData(response.data.Homework);
      })
      .catch((error) => {
        setData([
          {
            Due: "ไม่สามารถ",
            Decs: "ดึงข้อมูล",
            Time: "ได้",
            Subject: `${error}`,
          },
        ]);
      });
  }, []);

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
          📚 การบ้าน - Homework
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ** ✅ = รับงานแล้ว , ⏰ = มีการเปลื่ยนเวลา **
          <br />
          ข้อมูลอาจจะไม่เป็นปัจจุบัน (หากต้องการข้อมูลเพิ่ม
          กรุณาติดต่อฝ่ายการเรียน)
        </h2>
        <div
          id="DataFrame"
          style={{ marginTop: "20px" }}
          className="overflow-x-auto"
        >
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>วันที่</Table.HeadCell>
              <Table.HeadCell>วิชา</Table.HeadCell>
              <Table.HeadCell>รายละเอียดงาน</Table.HeadCell>
              <Table.HeadCell>กำหมดส่ง</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {currentData.map((Homework, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {Homework.Time}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {Homework.Subject}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {Homework.Decs}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {Homework.Due}
                  </Table.Cell>
                </Table.Row>
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
      </div>
    </>
  );
}
