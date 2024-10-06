"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { CgGirl, CgBoy } from "react-icons/cg";
import { PiStudentFill } from "react-icons/pi";
import { FaRunning } from "react-icons/fa";

interface Absent {
  Date: string;
  Number: string;
  All: string;
}

interface Staticdata {
  Boy: string;
  Girl: string;
  All: string;
  Absent: string;
  Date: string;
}

export default function Absent() {
  const [data, setData] = useState<Absent[]>([
    {
      Date: "กำลังดึงข้อมูล",
      Number: "กำลังดึงข้อมูล",
      All: "กำลังดึงข้อมูล",
    },
  ]);
  const [Staticdata, setStaticdata] = useState<Staticdata>({
    Boy: "0",
    Girl: "0",
    All: "0",
    Absent: "0",
    Date: "กำลังดึงข้อมูล",
  });
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
            Date: "ไม่สามารถ",
            Number: "ดึงข้อมูล",
            All: `${error}`,
          },
        ]);
        setStaticdata({
          Boy: "*",
          Girl: "*",
          All: "*",
          Absent: "*",
          Date: "ไม่สามารถดึงข้อมูลได้",
        });
      });
  }, []);
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          🗳️ สถิตินักเรียน - Status
        </h1>
        <h2 style={{ fontSize: "18px" }}>สถิตินักเรียนในแต่ละวัน</h2>
        <h2 style={{ fontSize: "18px" }}>ข้อมูล ณ วันที่ {Staticdata.Date}</h2>
        <div style={{ marginTop: '15px' }} className="ccard">
          <article className="cardd-item flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <CgBoy className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">มา {Staticdata.Boy} คน</p>
              <p className="text-sm">นักเรียนชาย (ทั้งหมด 20 คน)</p>
            </div>
          </article>
          <article className="cardd-item flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <CgGirl className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">มา {Staticdata.Girl} คน</p>
              <p className="text-sm">นักเรียนหญิง (ทั้งหมด 16 คน)</p>
            </div>
          </article>
          <article className="cardd-red flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <FaRunning className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">ขาด / ลา {Staticdata.Absent} คน</p>
              <p className="text-sm">นักเรียนที่ขาด</p>
            </div>
          </article>
          <article className="cardd-item flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <PiStudentFill className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">มา {Staticdata.All} คน</p>
              <p className="text-sm">นักเรียนทั้งหมด (36 คน)</p>
            </div>
          </article>
        </div>
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
