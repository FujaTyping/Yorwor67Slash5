import type { Metadata } from "next";
import type { Viewport } from "next";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import 'animate.css';
import SideNavbar from "./components/sidebar";
import Footbar from "./components/footbar";
import ToTopButton from "./components/totop"
import smtConfig from "./smt-config.mjs"

export const metadata: Metadata = {
  description: `ม.${smtConfig.mattayom} - โรงเรียนหาดใหญวิทยาลัย โครงการ SMT`,
  keywords: `ม.${smtConfig.mattayom} โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.),ม.${smtConfig.mattayom} โรงเรียนหาดใหญ่วิทยาลัย,หาดใหญ่วิทยาลัย,${smtConfig.mattayom} ญ.ว.,ญ.ว. ${smtConfig.mattayom},${smtConfig.mattayom} ญ.ว,ญ.ว ${smtConfig.mattayom},${smtConfig.mattayom} ญว,hatyaiwit ${smtConfig.mattayom},${smtConfig.mattayom},ม.${smtConfig.mattayom},SMT,smt,โครงการ SMT,โครงการ smt,yorwor smt,Yorwor SMT,yorwor m.${smtConfig.mattayom},Yorwor M.${smtConfig.mattayom}`,
  openGraph: {
    url: 'https://smt.siraphop.me/',
    description: `ม.${smtConfig.mattayom} - โรงเรียนหาดใหญวิทยาลัย โครงการ SMT`,
    type: 'website',
    images: 'https://smt.siraphop.me/assets/oSMT.png',
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
        <NextTopLoader
          color="#FF0000"
          height={4}
          showSpinner={false}
        />
        <SideNavbar />
        {children}
        <Footbar />
        <ToTopButton />
      </body>
    </html>
  );
}
