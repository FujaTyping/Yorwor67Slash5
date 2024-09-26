"use client";

import { useState } from "react";

export default function About() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับห้องเรา");
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1>About M.4/5</h1>
        <h2>Powered by NEXT.JS with Flowbite</h2>
      </div>
    </>
  );
}
