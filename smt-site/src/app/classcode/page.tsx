"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Clipboard, Pagination } from "flowbite-react";

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
  const itemsPerPage = 15;

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/classcode`)
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
        <h2 style={{ fontSize: "18px" }}>
          ** หากไม่พบรหัสวิชาที่หาอยู่ กรุณาติดต่อฝ่ายการเรียน **
        </h2>
        <div style={{ marginTop: "20px" }} className="overflow-x-auto">
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
      </div>
    </>
  );
}
