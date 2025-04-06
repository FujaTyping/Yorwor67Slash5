import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Navcrumb from "./components/navcrumb";
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"

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
            <main>
              <div className="flex items-center gap-2 mx-6 m-3 mb-6">
                <SidebarTrigger />
                <div className="h-5">
                  <Separator orientation="vertical" />
                </div>
                <div className="ml-2">
                  <Navcrumb />
                </div>
              </div>
              <Providers>
                {children}
              </Providers>
              <Toaster />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
