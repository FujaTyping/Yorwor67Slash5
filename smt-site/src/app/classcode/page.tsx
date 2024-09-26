"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";

interface Classcode {
  Subject: string;
  Code: string;
  Teacher: string;
}

export default function Classroom() {
  const [data, setData] = useState<Classcode[]>([
    {
      Subject: "Fetching",
      Code: "Fetching",
      Teacher: "Fetching",
    },
  ]);
  const [title] = useState("Hatyaiwit - รหัสห้องเรียน");

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/classcode`)
      .then((response) => {
        setData(response.data.Classcode);
      })
      .catch((error) => {
        setData([
          {
            Subject: "Error",
            Code: "Fetching",
            Teacher: `${error}`,
          },
        ]);
      });
  }, []);
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1>Classroom M.4/5</h1>
        <h2>Powered by NEXT.JS with Flowbite</h2>
        <div style={{ marginTop: "20px" }} className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>วิชา</Table.HeadCell>
              <Table.HeadCell>รหัสห้องเรียน</Table.HeadCell>
              <Table.HeadCell>ครู</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((Classroom, index) => {
                return (
                  <>
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {Classroom.Subject}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                        {Classroom.Code}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                        {Classroom.Teacher}
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
