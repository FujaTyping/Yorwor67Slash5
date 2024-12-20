"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Drawer, Sidebar, Navbar, Avatar, Tooltip } from "flowbite-react";
import { useState } from "react";
import {
  FaHome,
  FaAddressCard,
  FaBook,
  FaClipboardList,
  FaCode,
  FaKey,
  FaPowerOff,
  FaTools,
  FaUsers
} from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiMenuFold4Fill } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import Yorwor from "../favicon.ico";
import { signInWithGoogle } from "../lib/firebase-auth";
import { getAuth, signOut } from "firebase/auth";
import { MdWork } from "react-icons/md";
import useLocalStorge from "../lib/localstorage-db";
import { ToastContainer, toast } from 'react-toastify';

export default function SideNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { photourl, isLogin } = useLocalStorge(false);

  return (
    <>
      <ToastContainer position="bottom-right" newestOnTop closeOnClick hideProgressBar={false} />
      <Navbar id="TopBarNav" style={{ paddingBottom: '20px' }} className="border-solid border-b-8 border-rose-600 mb-8" fluid>
        <Navbar.Brand id="Navbranded" as={Link} href="/">
          <img src={Yorwor.src} className="mr-3 h-6 sm:h-9" alt="Yorwor Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            SMT - Yorwor
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {isLogin ? (
            <>
              <Tooltip content="โปรไฟล์" style="light" placement="bottom">
                <Avatar
                  onClick={() => { router.push("/user"); }}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  alt="User"
                  img={photourl}
                  rounded
                />
              </Tooltip>
            </>
          ) : (<></>)}
          <Button
            style={{ margin: "auto", backgroundColor: "#ff1616" }}
            onClick={() => setIsOpen(true)}
          >
            <RiMenuFold4Fill className="mr-2 h-5 w-5" />
            เมนู
          </Button>
        </div>
      </Navbar>
      <Drawer id="SideDrawer" aria-labelledby="DrawerMenu" open={isOpen} onClose={handleClose}>
        <Drawer.Header title="ม.4/5 เมนู" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/" icon={FaHome}>
                      หน้าหลัก
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={FaBook} label="ฝ่ายการเรียน">
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/assignment">
                        ภาระงาน
                      </Sidebar.Item>
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/classcode">
                        รหัสห้องเรียน
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={MdWork} label="ฝ่ายการงาน">
                      <Sidebar.Item
                        as={Link}
                        href="https://docs.google.com/spreadsheets/d/1vE3AuC6LyMnIgz3w05nGTNYqu2N9CYXlSJKGjSMyeW4/edit?usp=sharing"
                        onClick={() => setIsOpen(false)}
                      >
                        รายงานบันทึกคะแนนย่อย
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse
                      icon={FaClipboardList}
                      label="ฝ่ายสารวัตร"
                    >
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/absent">
                        เช็คชื่อ
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={LuPartyPopper} label="ฝ่ายกิจกรรม">
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/activities">
                        บันทึกกิจกรรม
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse icon={SiGoogledocs} label="เอกสาร">
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/whiteroom">
                        ห้องเรียนสีขาว
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/about" icon={FaAddressCard}>
                      เกี่ยวกับห้องเรา
                    </Sidebar.Item>
                    <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/about/web" icon={FaCode}>
                      เกี่ยวกับเว็บไซต์
                    </Sidebar.Item>
                    <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/notify" icon={IoMdNotifications}>
                      รับการแจ้งเตือน
                    </Sidebar.Item>
                    <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/feedback" icon={BiSupport}>
                      ส่งความคิดเห็น
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={FaTools} label="เครื่องมือ">
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/ai">
                        ผู้ช่วยส่วนตัว AI
                      </Sidebar.Item>
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/tool/teacher/wheel">
                        สุ่มชื่อ
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    {isLogin ? (
                      <>
                        <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/user" icon={FaUsers}>
                          ผู้ใช้งาน
                        </Sidebar.Item>
                        <Sidebar.Item
                          onClick={() => {
                            const id = toast.loading("กำลังออกจากระบบ...")
                            const auth = getAuth();
                            signOut(auth)
                              .then(() => {
                                toast.update(id, { render: `ออกจากระบบสำเร็จ`, type: "success", isLoading: false, autoClose: 3000 });
                                setTimeout(() => {
                                  window.location.reload();
                                }, 1500);
                              })
                              .catch((error) => {
                                toast.update(id, { render: `เกิดข้อผิดผลาด ไม่สามารถออกจากระบบได้ ${error.message}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
                              });
                          }}
                          icon={FaPowerOff}
                        >
                          ออกจากระบบ
                        </Sidebar.Item>
                      </>
                    ) : (
                      <>
                        <Sidebar.Item
                          onClick={() => {
                            const id = toast.loading("กำลังล็อกอิน...")
                            signInWithGoogle()
                              .then(() => {
                                toast.update(id, { render: `ล็อกอินสำเร็จ`, type: "success", isLoading: false, autoClose: 3000 });
                                setTimeout(() => {
                                  window.location.reload();
                                }, 1500);
                              })
                              .catch((error) => {
                                toast.update(id, { render: `เกิดข้อผิดผลาด ไม่สามารถล็อกอินได้ ${error.message}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
                              });
                          }}
                          icon={FaKey}
                        >
                          ล็อกอิน
                        </Sidebar.Item>
                      </>
                    )}
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
