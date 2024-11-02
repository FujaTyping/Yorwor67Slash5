"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Drawer, Sidebar, Navbar, Modal, Avatar } from "flowbite-react";
import { useState } from "react";
import {
  FaHome,
  FaAddressCard,
  FaBook,
  FaClipboardList,
  FaCode,
  FaKey,
  FaPowerOff,
} from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiMenuFold4Fill } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import Yorwor from "../favicon.ico";
import { signInWithGoogle } from "../lib/firebase-auth";
import { getAuth, signOut } from "firebase/auth";
import { MdWork } from "react-icons/md";
import useLocalStorge from "../lib/localstorage-db";

export default function SideNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { photourl, isLogin } = useLocalStorge(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("ERROR");

  return (
    <>
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
              <Avatar
                onClick={() => { router.push("/user"); }}
                style={{ marginRight: "10px", cursor: "pointer" }}
                alt="User"
                img={photourl}
                rounded
              />
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
                      <Sidebar.Item onClick={() => setIsOpen(false)} as={Link} href="/homework">
                        การบ้าน
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
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      onClick={() => {
                        signInWithGoogle()
                          .then(() => {
                            window.location.reload();
                            router.push("/user");
                          })
                          .catch((error) => {
                            setMessage(error.message);
                            setOpenModal(true);
                          });
                      }}
                      icon={FaKey}
                    >
                      ล็อกอิน
                    </Sidebar.Item>

                    {isLogin ? (
                      <>
                        <Sidebar.Item
                          onClick={() => {
                            const auth = getAuth();
                            signOut(auth)
                              .then(() => {
                                window.location.reload();
                                router.push("/");
                              })
                              .catch((error) => {
                                setMessage(error.message);
                                setOpenModal(true);
                              });
                          }}
                          icon={FaPowerOff}
                        >
                          ออกจากระบบ
                        </Sidebar.Item>
                      </>
                    ) : (
                      <></>
                    )}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              เกิดข้อผิดผลาด ไม่สามารถล็อกอินได้ {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
                onClick={() => setOpenModal(false)}
              >
                ลองอีกครั้ง
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
