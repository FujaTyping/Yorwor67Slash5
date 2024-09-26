"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";

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
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📚 การบ้าน - Homework
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          ** ✅ = รับงานแล้ว , ⏰ = มีการเปลื่ยนเวลา **
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
              {data.map((Homework, index) => {
                return (
                  <>
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
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
                  </>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
