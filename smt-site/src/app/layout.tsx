import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import 'animate.css';
import SideNavbar from "./components/sidebar";
import Footbar from "./components/footbar";
import ToTopButton from "./components/totop"

export const metadata: Metadata = {
  description: "ม.4/5 - โรงเรียนหาดใหญวิทยาลัย โครงการ SMT",
  keywords: "ม.4/5 โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.),4/5 โรงเรียนหาดใหญ่วิทยาลัย,หาดใหญ่วิทยาลัย,4/5 ญ.ว.,ญ.ว. 4/5,4/5 ญ.ว,ญ.ว 4/5,4/5 ญว,hatyaiwit 4/5,4/5,ม.4/5,SMT,smt,โครงการ SMT,โครงการ smt,yorwor smt,Yorwor SMT,yorwor m.4/5,Yorwor M.4/5",
  openGraph: {
    url: 'https://smt.siraphop.me/',
    description: 'ม.4/5 - โรงเรียนหาดใหญวิทยาลัย โครงการ SMT',
    type: 'website',
    images: 'https://smt.siraphop.me/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: '#2d76ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <SideNavbar />
        {children}
        <Footbar />
        <ToTopButton />
      </body>
    </html>
  );
}
