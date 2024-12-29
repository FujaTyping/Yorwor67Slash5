"use client";

import { useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaDiscord, FaLine, FaRegBell, FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useLocalStorge from "../lib/localstorage-db";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import smtConfig from "../smt-config.mjs";
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineCrisisAlert } from "react-icons/md";
import { GiFlatPlatform } from "react-icons/gi";
import { FaRegCircleXmark } from "react-icons/fa6";
import { RiEyeCloseFill } from "react-icons/ri";
import { RiInformationOffFill } from "react-icons/ri";

export default function AboutWeb() {
  const router = useRouter();
  const [title] = useState("Hatyaiwit - การแจ้งเตือน");
  const { email } = useLocalStorge(false);
  const [hooksUrl, setHooksUrl] = useState("");
  const [hooksId, setHooksId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDisModal, setOpenDisModal] = useState(false);
  const [openDellModal, setOpenDellModal] = useState(false);
  const [hooksSucc, setHooksSucc] = useState(false);

  const submitDiswebhook = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    setHooksSucc(false);
    if (email) {
      axios
        .post(`${smtConfig.apiMain}discord/new`, {
          hooks: `${hooksUrl}`,
          email: `${email}`,
        })
        .then((response) => {
          toast.update(id, { render: `ส่งข้อมูลแล้ว`, type: "success", isLoading: false, autoClose: 5000 });
          setMessage(`${response.data}`)
          setHooksSucc(true);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
          setIsLoading(false);
        });
    } else {
      axios
        .post(`${smtConfig.apiMain}discord/new`, {
          hooks: `${hooksUrl}`,
        })
        .then((response) => {
          toast.update(id, { render: `ส่งข้อมูลแล้ว`, type: "success", isLoading: false, autoClose: 5000 });
          setMessage(`${response.data}`)
          setHooksSucc(true);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
          setIsLoading(false);
        });
    }
  };

  const revokeDiswebhook = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    axios
      .delete(`${smtConfig.apiMain}discord/revoke`, {
        data: { hookid: hooksId }
      })
      .then((response) => {
        toast.update(id, { render: `ยกเลิกการแจ้งเตือนแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 8000 });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, { render: `ไม่สามารถยกเลิกการแจ้งเตือนได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      });
  }

  function onCloseModal() {
    setOpenDisModal(false);
    setOpenDellModal(false);
  }

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <ToastContainer position="bottom-right" newestOnTop hideProgressBar={false} />
      <section style={{ marginBottom: '-3.25rem', marginTop: '-0.5rem' }} className="container">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="flex justify-center gap-3 items-center font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                <FaRegBell /> ฟีเจอร์ <span className="font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text">การแจ้งเตือน</span>
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-800 lg:mx-auto">
                เว็บไซต์ห้องเรียนช่วยจัดการการบ้านและงานต่างๆ ได้ง่ายขึ้น ด้วยการแจ้งข้อมูลผ่านแพลตฟอร์มหลากหลาย เช่น Line และ Discord ข้อมูลอัปเดตทันทีเมื่อโพสต์ ช่วยเพิ่มความสะดวกและประสิทธิภาพในการเรียนรู้
              </p>
            </div>
            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <MdOutlineCrisisAlert className="w-10 h-10" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold">แจ้งเตือนทันที</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base">
                    ข้อมูลการบ้าน ประกาศ หรือกิจกรรมสำคัญ ถูกส่งถึงผู้ใช้งานในทันทีผ่านแพลตฟอร์มที่เชื่อมต่อ เช่น Line และ Discord
                  </dd>
                </div>
                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <GiFlatPlatform className="w-10 h-10" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold">รองรับหลายแพลตฟอร์ม</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base">เชื่อมต่อกับแพลตฟอร์มยอดนิยม และสามารถขยายการรองรับในอนาคต เช่น Telegram หรือ Email</dd>
                </div>
                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <RiEyeCloseFill className="w-10 h-10" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold">การแจ้งเตือนแบบไม่ระบุตัวตน</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base">ฟีเจอร์สำหรับการประกาศหรือแจ้งข้อมูลที่ไม่ต้องการเปิดเผยชื่อผู้แจ้ง เช่น ข้อเสนอแนะหรือคำติชม</dd>
                </div>
                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <RiInformationOffFill className="w-10 h-10" />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold">การไม่แชร์ข้อมูลกับบุคคลที่สาม</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base">ข้อมูลการแจ้งเตือนและข้อมูลส่วนบุคคลของผู้ใช้จะไม่ถูกส่งต่อหรือแชร์ให้กับบุคคลที่สามโดยไม่ได้รับอนุญาตจากผู้ใช้ ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและใช้งานเฉพาะในระบบภายในเท่านั้น</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <section className="flex items-center justify-center mt-10 pb-10">
          <div className="p-4 sm:px-10 flex flex-col justify-center items-center text-base h-100vh mx-auto" id="pricing">
            <div className="mb-10 text-center">
              <h3 className="text-3xl font-semibold text-center flex gap-2 justify-center ">แพลตฟอร์มที่รองรับ</h3>
              <p className="mt-4 max-w-2xl text-lg text-gray-800 lg:mx-auto">
                ระบบแจ้งเตือนของเว็บไซต์ห้องเรียนออกแบบมาเพื่อเชื่อมต่อกับแพลตฟอร์มยอดนิยมที่นักเรียนและครูใช้งานในชีวิตประจำวัน เพื่อความสะดวก รวดเร็ว และการเข้าถึงข้อมูลได้ทุกที่ทุกเวลา โดยแพลตฟอร์มที่รองรับมีดังนี้
              </p>
            </div>
            <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
                <div className="flex items-center justify-between gap-x-4">
                  <h3 id="tier-standard" className="text-gray-900 text-2xl font-semibold leading-8"></h3>
                </div>
                <p className="mt-4 text-base leading-6 text-gray-600">เพิ่มเพื่อน Line OA</p>
                <img className="mt-5" style={{ maxWidth: '90px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/800px-LINE_logo.svg.png" />
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">Line</span>
                </p>
                <Button
                  onClick={() => {
                    router.push("https://lin.ee/L1apV3k");
                  }}
                  style={{ backgroundColor: "#00b900" }}
                  className="w-full"
                >
                  <FaLine className="mr-2 h-5 w-5" />
                  รับการแจ้งเตือน
                </Button>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                  <li className="flex gap-x-3 text-base">
                    <FaRegCheckCircle style={{ color: '#00b900' }} className="h-5 w-5" />แจ้งเตือนทันที
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <FaRegCircleXmark className="h-5 w-5" />รองรับการแจ้งเตือนแบบกลุ่ม
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <FaRegCircleXmark className="h-5 w-5" />จำกัดการแจ้งเตือน 200 คน ต่อเดือน
                  </li>
                </ul>
              </div>
              <div className="ring-1 ring-gray-200 md:ring-2 md:ring-indigo-500 rounded-3xl p-8 xl:p-10">
                <div className="flex items-center justify-between gap-x-4">
                  <h3 id="tier-extended" className="mt-4 text-base leading-6 text-gray-600">ผ่านเว็บฮุก ดิสคอร์ด</h3>
                  <p style={{ backgroundColor: "#7289da" }} className="hidden md:block mt-3 rounded-full px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                    ใช้งานมากที่สุด</p>
                </div>
                <img className="mt-5" style={{ maxWidth: '100px' }} src="https://images.sftcdn.net/images/t_app-icon-m/p/9848e854-ffae-11e6-a59d-00163ed833e7/2949821524/discord-icon.png" />
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">Discord</span>
                </p>
                <div className="flex flex-col md:flex-row md:gap-3">
                  <Button
                    onClick={() => setOpenDisModal(true)}
                    style={{ backgroundColor: "#7289da", flex: 5 }}
                  >
                    <FaDiscord className="mr-2 h-5 w-5" />
                    รับการแจ้งเตือน
                  </Button>
                  <Button
                    onClick={() => setOpenDellModal(true)}
                    style={{ backgroundColor: "#FF0000", flex: 1 }}
                  >
                    <MdDeleteForever className="mx-auto h-5 w-5" />
                  </Button>
                </div>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                  <li className="flex gap-x-3 text-base">
                    <FaRegCheckCircle style={{ color: "#7289da" }} className="h-5 w-5" />แจ้งเตือนทันที
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <FaRegCheckCircle style={{ color: "#7289da" }} className="h-5 w-5" />รองรับการแจ้งเตือนแบบกลุ่ม
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <FaRegCheckCircle style={{ color: "#7289da" }} className="h-5 w-5" />แจ้งเตือนได้ไม่จำกัด
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <FaRegCircleXmark className="h-5 w-5" />อาจจะโดนดิสคอร์ด Rate limit
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6">** จะสนับสนุนแพลตฟอร์มอื่นๆ ในอนาคต</p>
          </div>
        </section>
      </section>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openDisModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มเพิ่มการแจ้งเตือนผ่าน Discord Webhook
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="กรุณาใส่ลิ้งค์ Discord webhook" />
              </div>
              <TextInput
                placeholder="https://discord.com/api/webhooks/"
                onChange={(event) => setHooksUrl(event.target.value)}
                required
              />
            </div>
            <div style={{ marginTop: '5px' }} className="w-full flex items-center justify-center">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#7289da" }}
                    color="blue"
                  >
                    เพิ่ม Webhook
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitDiswebhook}
                    style={{ backgroundColor: "#7289da" }}
                    color="blue"
                  >
                    <IoMdAddCircle className="mr-2 h-5 w-5" />
                    เพิ่ม Webhook
                  </Button>
                </>
              )}
            </div>
            <div>
              {hooksSucc ? (
                <>
                  <p style={{ color: 'red', marginTop: '-5px', fontSize: '14px' }}>{message} (กรุณาจำไอดีเอาไว้ เพราะจะใช้ตอนที่ลบข้อมูลออกจากระบบ !)</p>
                </>
              ) : (
                <>
                  <p style={{ marginTop: '-5px', fontSize: '14px' }}>{"กำลังรอ Webhooks ・・・ʕ ˵ ̿–ᴥ ̿– ˵ ʔ"}</p>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openDellModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มยกเลิกการแจ้งเตือนผ่าน Discord Webhook
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="กรุณาใส่ไอดีของ Discord webhook" />
              </div>
              <TextInput
                placeholder=" GqzLTlTofb****"
                onChange={(event) => setHooksId(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#FF0000" }}
                    color="blue"
                  >
                    ยกเลิกการแจ้งเตือน
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={revokeDiswebhook}
                    style={{ backgroundColor: "#FF0000" }}
                    color="blue"
                  >
                    <MdDeleteForever className="mr-2 h-5 w-5" />
                    ยกเลิกการแจ้งเตือน
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
