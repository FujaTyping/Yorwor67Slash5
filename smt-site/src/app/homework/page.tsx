"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Button } from "flowbite-react";
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
import { FaHistory } from "react-icons/fa";
import smtConfig from "../smt-config.mjs";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import buddhistEra from "dayjs/plugin/buddhistEra";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/th';
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('th');

interface Homework {
  Subject: string;
  Time: string;
  Decs: string;
  Due: string;
  isDue: boolean;
}

type ThaiMonth =
  | "มกราคม"
  | "กุมภาพันธ์"
  | "มีนาคม"
  | "เมษายน"
  | "พฤษภาคม"
  | "มิถุนายน"
  | "กรกฎาคม"
  | "สิงหาคม"
  | "กันยายน"
  | "ตุลาคม"
  | "พฤศจิกายน"
  | "ธันวาคม";

const monthMap: Record<ThaiMonth, string> = {
  มกราคม: "01",
  กุมภาพันธ์: "02",
  มีนาคม: "03",
  เมษายน: "04",
  พฤษภาคม: "05",
  มิถุนายน: "06",
  กรกฎาคม: "07",
  สิงหาคม: "08",
  กันยายน: "09",
  ตุลาคม: "10",
  พฤศจิกายน: "11",
  ธันวาคม: "12",
};

const localizer = momentLocalizer(moment);

dayjs.extend(customParseFormat);
dayjs.extend(buddhistEra);

const Chartsdata = [{ name: "เทอม 1", value: 0 }];

export default function Homework() {
  const [data, setData] = useState<Homework[]>([
    {
      Due: "กำลังดึงข้อมูล",
      Decs: "กำลังดึงข้อมูล",
      Time: "กำลังดึงข้อมูล",
      Subject: "กำลังดึงข้อมูล",
      isDue: false,
    },
  ]);
  const [title] = useState("Hatyaiwit - การบ้าน");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState(moment());
  const itemsPerPage = 15;
  const currentMonthText = currentDate.format("MMMM");
  const currentYearText = currentDate.format("YYYY");

  const convertThaiDateToISO = (thaiDate: string): string => {
    try {
      const [day, monthThai, yearThai] = thaiDate.split(" ");

      if (!day || !monthThai || !yearThai) {
        throw new Error(`Invalid Field s: ${thaiDate}`);
      }

      const month = monthMap[monthThai as ThaiMonth];
      if (!month) {
        throw new Error(`Invalid month in Thai date : ${monthThai}`);
      }

      const year = parseInt(yearThai) - 543;

      const formattedDate = `${year}-${month}-${day.padStart(2, "0")}`;
      const isoDate = dayjs(formattedDate, "YYYY-MM-DD", true).toISOString();

      if (!isoDate) {
        throw new Error(`Failed to parse date : ${formattedDate}`);
      }

      return isoDate;
    } catch (error) {
      console.log("Error in convertThaiDateToISO :", error);
      return "";
    }
  };

  useEffect(() => {
    axios
      .get(`${smtConfig.apiMain}homework`)
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
            isDue: false,
          },
        ]);
      });
  }, []);

  const events = data.map((hw) => {
    const dueDate = hw.Due === "กำลังดึงข้อมูล" ? "" : convertThaiDateToISO(hw.Due);

    if (!dueDate) {
      return null;
    }

    return {
      title: `${hw.Subject} : ${hw.Decs}`,
      start: new Date(dueDate),
      end: new Date(dueDate),
    };
  }).filter(event => event !== null);

  const goToToday = () => {
    setCurrentDate(moment());
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

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
          ข้อมูลอาจจะไม่เป็นปัจจุบัน (หากต้องการข้อมูลเพิ่ม
          กรุณาติดต่อฝ่ายการเรียน)
          <br />
          🔴 สีแดงคือ เลยกำหนดส่ง
          <br />
          <span className="flex" style={{ alignItems: "center" }}>
            <FaHistory style={{ marginRight: "6px" }} /> ข้อมูลอัพเดททุกๆ 5 นาที
          </span>
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
                  className="bg-white"
                  style={{ color: Homework.isDue ? "red" : "black" }}
                  key={index}
                >
                  <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                    {Homework.Time}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium">
                    {Homework.Subject}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium">
                    {Homework.Decs}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium">
                    {Homework.Due}
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
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📅 ปฏิทินภาระงาน - {currentMonthText} {parseInt(currentYearText) + 543}
        </h1>
        <div style={{ marginTop: '30px' }} className="overflow-x-auto">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "80vh" }}
            className="tailwind-calendar text-sm sm:text-base"
            toolbar={false}
            showAllEvents={true}
            popup={true}
            date={currentDate.toDate()}
          />
          <div
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
            className="flex justify-center">
            <Button.Group>
              <Button onClick={goToPrevMonth} color="gray">ก่อนหน้า</Button>
              <Button onClick={goToToday} color="gray">วันนี้</Button>
              <Button onClick={goToNextMonth} color="gray">ถัดไป</Button>
            </Button.Group>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📊 สถิติการบ้าน - Chart
        </h1>
        <h2 style={{ fontSize: "18px" }}>
          สรุปจำนวนภาระงานทั้งหมด ของ ทุกภาคเรียน
        </h2>
        <ResponsiveContainer
          style={{ marginTop: "25px" }}
          width="100%"
          height={300}
        >
          <LineChart data={Chartsdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="ภาระงาน"
              stroke="#ff1616"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
