"use client";

import { useRouter } from "next/navigation";
import { Button, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { FaHome, FaAddressCard } from "react-icons/fa";

export default function SideNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        Show navigation
      </Button>
      <Drawer open={isOpen} onClose={handleClose}>
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
