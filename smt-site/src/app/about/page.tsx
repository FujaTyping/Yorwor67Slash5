import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hatyaiwit - เกี่ยวกับห้องเรา",
  description: "ม.4/5 - โรงเรียนหาดใหญวิทยาลัย",
};

export default function About() {
  return (
    <div className="container">
      <h1>About M.4/5</h1>
      <h2>Powered by NEXT.JS with Flowbite</h2>
    </div>
  );
}
