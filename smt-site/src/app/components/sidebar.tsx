"use client";

import { useRouter } from "next/navigation";
import { Button, Drawer, Sidebar, Navbar } from "flowbite-react";
import { useState } from "react";
import { FaHome, FaAddressCard } from "react-icons/fa";
import { RiMenuFold4Fill } from "react-icons/ri";
import Yorwor from "../favicon.ico";

export default function SideNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Navbar id="TopBarNav" fluid>
        <Navbar.Brand>
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
      <Drawer id="SideDrawer" open={isOpen} onClose={handleClose}>
        <Drawer.Header title="ม.4/5 เมนู" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      onClick={() => router.push("/")}
                      icon={FaHome}
                    >
                      หน้าหลัก
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      onClick={() => router.push("/about")}
                      icon={FaAddressCard}
                    >
                      เกี่ยวกับห้องเรา
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
