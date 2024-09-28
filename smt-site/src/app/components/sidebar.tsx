"use client";

import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Button, Drawer, Sidebar, Navbar } from "flowbite-react";
import { useState } from "react";
import { FaHome, FaAddressCard, FaBook, FaClipboardList, FaCode } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiMenuFold4Fill } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";
import Yorwor from "../favicon.ico";
import Divider from "../assets/TopDivider.png";

export default function SideNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Navbar id="TopBarNav" fluid>
        <Navbar.Brand id="Navbranded" onClick={() => router.push("/")}>
          <img
            src={Yorwor.src}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            SMT - Yorwor
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button
            style={{ margin: "auto", backgroundColor: "#ff1616" }}
            onClick={() => setIsOpen(true)}
          >
            <RiMenuFold4Fill className="mr-2 h-5 w-5" />
            เมนู
          </Button>
        </div>
      </Navbar>
      <img alt="DividerTop" style={{ width: "100%" }} src={Divider.src}></img>
      <Drawer id="SideDrawer" open={isOpen} onClose={handleClose}>
        <Drawer.Header title="ม.4/5 เมนู" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      as={Link}
                      href="/"
                      icon={FaHome}
                    >
                      หน้าหลัก
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={FaBook} label="ฝ่ายการเรียน">
                      <Sidebar.Item
                        as={Link}
                        href="/homework">
                        การบ้าน
                      </Sidebar.Item>
                      <Sidebar.Item
                        as={Link}
                        href="/classcode">
                        รหัสห้องเรียน
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={FaClipboardList} label="ฝ่ายสารวัตร">
                      <Sidebar.Item
                        as={Link}
                        href="/absent">
                        เช็คชื่อ
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={LuPartyPopper} label="ฝ่ายกิจกรรม">
                      <Sidebar.Item
                        as={Link}
                        href="/activities">
                        บันทึกกิจกรรม
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={SiGoogledocs} label="เอกสาร">
                      <Sidebar.Item
                        as={Link}
                        href="/whiteroom">
                        ห้องเรียนสีขาว
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      as={Link}
                      href="/about"
                      icon={FaAddressCard}
                    >
                      เกี่ยวกับห้องเรา
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      href="/aboutweb"
                      icon={FaCode}
                    >
                      เกี่ยวกับเว็บไซต์
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
