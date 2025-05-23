import type { Metadata } from "next";
import type { Viewport } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import 'react-photo-view/dist/react-photo-view.css';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Navcrumb from "./components/navcrumb";
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"
import Footer from "./components/footer";

const PPLPartyFont = localFont({
  src: [
    {
      path: './assets/font/anakotmai-light.woff2',
      weight: '300',
      style: 'light',
    },
    {
      path: './assets/font/anakotmai-medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/font/anakotmai-bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
})

export const metadata: Metadata = {
  title: "โรงเรียนหาดใหญ่วิทยาลัย",
  description: "ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย",
  keywords: `โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.),โรงเรียนหาดใหญ่วิทยาลัย,หาดใหญ่วิทยาลัย,ญ.ว.,ญว,hatyaiwit,SMT,smt,โครงการ SMT,โครงการ smt,yorwor smt,Yorwor SMT,Yorwor,Platform,platform,แพลตฟอร์ม,แพลตฟอร์มจัดการห้องเรียน`,
  openGraph: {
    url: 'https://smt.siraphop.me/',
    description: `ห้องเรียน SMT โรงเรียนหาดใหญ่วิทยาลัย`,
    type: 'website',
    images: 'https://smt.siraphop.me/oGraph.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PPLPartyFont.className} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Providers>
              <main>
                <div className="flex items-center gap-2 mx-6 m-3 mb-6">
                  <div className="flex items-center gap-1 mr-3">
                    <SidebarTrigger className="cursor-pointer" />
                    <p className="text-sm">เมนู</p>
                  </div>
                  <div className="h-5">
                    <Separator orientation="vertical" />
                  </div>
                  <div className="ml-2">
                    <Navcrumb />
                  </div>
                </div>
                {children}
                <Footer />
                <Toaster />
              </main>
            </Providers>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
