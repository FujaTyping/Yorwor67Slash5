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

export default function About() {
  const [data, setData] = useState<Homework[]>([
    {
      Due: "Fetching",
      Decs: "Fetching",
      Time: "Fetching",
      Subject: "Fetching",
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
            Due: "Error",
            Decs: "While",
            Time: "Fetching",
            Subject: `${error}`,
          },
        ]);
      });
  }, []);
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1>Homework M.4/5</h1>
        <h2>Powered by NEXT.JS with Flowbite</h2>
        <div style={{ marginTop: "20px" }} className="overflow-x-auto">
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
