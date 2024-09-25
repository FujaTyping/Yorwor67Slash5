import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import SideNavbar from "./components/sidebar";
import Footbar from "./components/footbar";

export const metadata: Metadata = {
  title: "Hatyaiwit | Home",
  description: "ม.4/5 - โรงเรียนหาดใหญวิทยาลัย",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
      </body>
    </html>
  );
}
