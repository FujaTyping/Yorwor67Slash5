"use client";

import { useState } from "react";

export default function Absent() {
  const [title] = useState("Hatyaiwit - เช็คชื่อ");
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1>Absent M.4/5</h1>
        <h2>Powered by NEXT.JS with Flowbite</h2>
      </div>
    </>
  );
}
