"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Pagination } from "flowbite-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CgGirl, CgBoy } from "react-icons/cg";
import { PiStudentFill } from "react-icons/pi";
import { FaRunning, FaHistory } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import smtConfig from "../smt-config.mjs";
import CountUp from 'react-countup';

interface Absent {
  Date: string;
  Number: string;
  All: string;
  Count: string;
}

interface Charts {
  name: string;
  Count: string;
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
      Count: "0",
    },
  ]);
  const [Chartsdata, setChartsData] = useState<Charts[]>([
    {
      name: "กำลังดึงข้อมูล",
      Count: "กำลังดึงข้อมูล",
    },
  ]);
  const [Staticdata, setStaticdata] = useState<Staticdata>({
    Boy: "0",
    Girl: "0",
    All: "0",
    Absent: "0",
    Date: "กำลังดึงข้อมูล",
  });
  const [showDetilsData, setshowDetilsData] = useState(false);
  const [title] = useState("Hatyaiwit - เช็คชื่อ");
  const [currentPage, setCurrentPage] = useState(1);
  const DatadetailsRef = useRef<null | HTMLDivElement>(null);
  const itemsPerPage = 20;

  const handleShowClick = () => {
    setshowDetilsData(true);
    DatadetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get(`${smtConfig.apiMain}absent`)
      .then((response) => {
        setData(response.data.Absent);
        setStaticdata(response.data.Static);
        const chartData = response.data.Absent.slice(0, 7)
          .reverse()
          .map((item: Absent) => ({
            name: `${item.Date}`,
            Count: parseInt(item.Count),
          }));
        setChartsData(chartData);
      })
      .catch((error) => {
        setData([
          {
            Date: "ไม่สามารถ",
            Number: "ดึงข้อมูล",
            All: `${error}`,
            Count: "0",
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

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("history") == "all") {
        setshowDetilsData(true);
        DatadetailsRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
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
          🗳️ สถิตินักเรียน วันที่ {Staticdata.Date} - Statistics
        </h1>
        <h2 style={{ fontSize: "18px" }}>สถิตินักเรียนในแต่ละวัน</h2>
        <h2 style={{ fontSize: "18px" }}>
          <span
            className="flex"
            style={{ alignItems: "center" }}
          >
            <FaHistory style={{ marginRight: "6px" }} /> ข้อมูลอัพเดททุกๆ 3 นาที
          </span>
        </h2>
        <div style={{ marginTop: "15px" }} className="ccard">
          <article className="cardd-item flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <CgBoy className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">มา <span><CountUp end={parseInt(Staticdata.Boy)} duration={2} /></span> คน</p>
              <p className="text-sm">นักเรียนชาย (ทั้งหมด 21 คน)</p>
            </div>
          </article>
          <article className="cardd-item flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <CgGirl className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">มา <span><CountUp end={parseInt(Staticdata.Girl)} duration={2} /></span> คน</p>
              <p className="text-sm">นักเรียนหญิง (ทั้งหมด 15 คน)</p>
            </div>
          </article>
          <article className="cardd-red flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <FaRunning className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">
                ไม่มา <span><CountUp end={parseInt(Staticdata.Absent)} duration={2} /></span> คน
              </p>
              <p className="text-sm">นักเรียนที่ไม่มา</p>
            </div>
          </article>
          <article className="cardd-item flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
            <span className="rounded-full bg-white p-3">
              <PiStudentFill className="size-8" />
            </span>
            <div>
              <p className="text-2xl font-medium">มา <span><CountUp end={parseInt(Staticdata.All)} duration={2} /></span> คน</p>
              <p className="text-sm">นักเรียนทั้งหมด (36 คน)</p>
            </div>
          </article>
        </div>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📊 สถิตินักเรียนรายสัปดาห์ - Chart
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          สรุปจำนวนนักเรียนที่ไม่มา ตลอด 7 วันที่ผ่านมา
          <br />
          <span
            onClick={handleShowClick}
            className="flex"
            style={{ cursor: "pointer", alignItems: "center" }}
          >
            <IoEyeSharp style={{ marginRight: "6px" }} /> ดูประวัติการเช็คชื่อ
          </span>
        </h2>
        <ResponsiveContainer
          style={{ marginTop: "25px" }}
          width="100%"
          height={300}
        >
          <LineChart
            data={Chartsdata}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Count"
              name="นักเรียนที่ไม่มา"
              stroke="#ff1616"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showDetilsData && (
        <>
          <div
            id="StuDetils"
            ref={DatadetailsRef}
            className="container animate__animated animate__fadeInUp"
          >
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
                  {currentData.map((Absent, index) => (
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
                  ))}
                </Table.Body>
              </Table>
              <div
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "17px",
                }}
                className="flex justify-center"
              >
                <p>
                  แสดง {startItem}-{endItem} รายการ ทั้งหมด {data.length} รายการ
                </p>
                <Pagination
                  style={{ marginTop: "-20px" }}
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
      )}
    </>
  );
}
