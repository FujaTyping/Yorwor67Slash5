"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";

interface Absent {
  Date: string;
  Number: string;
  All: string;
}

interface Static {
  Boy: string;
  Girl: string;
  All: string;
  Absent: string;
}

export default function Absent() {
  const [data, setData] = useState<Absent[]>([
    {
      Date: "กำลังดึงข้อมูล",
      Number: "กำลังดึงข้อมูล",
      All: "กำลังดึงข้อมูล",
    },
  ]);
  const [staticdata, setStaticdata] = useState<Static[]>([
    {
      Boy: "กำลังดึงข้อมูล",
      Girl: "กำลังดึงข้อมูล",
      All: "กำลังดึงข้อมูล",
      Absent: "กำลังดึงข้อมูล",
    },
  ]);
  const [title] = useState("Hatyaiwit - เช็คชื่อ");

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/absent`)
      .then((response) => {
        setData(response.data.Absent);
        setStaticdata(response.data.Static);
      })
      .catch((error) => {
        setData([
          {
            Date: "Error",
            Number: "Fetching",
            All: `${error}`,
          },
        ]);
      });
  }, []);
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          🗳️ สถิตินักเรียน - Static
        </h1>
        <h2 style={{ fontSize: "18px" }}>สถิตินักเรียนในแต่ละวัน</h2>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📝 เช็คชื่อ - Absent
        </h1>
        <div style={{ marginTop: "20px" }} className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>วันที่</Table.HeadCell>
              <Table.HeadCell>เลขที่ขาด</Table.HeadCell>
              <Table.HeadCell>สรุปสถิติ</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((Absent, index) => {
                return (
                  <>
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {Absent.Date}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                        {Absent.Number}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                        {Absent.All}
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
