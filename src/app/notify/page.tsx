"use client";

import { useState } from "react";
import { Button, Modal, Label, TextInput, List } from "flowbite-react";
import { FaDiscord, FaLine } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useLocalStorge from "../lib/localstorage-db";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import smtConfig from "../smt-config.mjs";
import { ToastContainer, toast } from 'react-toastify';

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
      <div className="container">
        <div className="mb-6">
          <h1 style={{ marginBottom: "15px" }} className="border-b">ℹ️ การแจ้งเตือน - Notification</h1>
          <p style={{ fontSize: "18px" }}>
            เว็บไซต์ห้องเรียนของเรามีฟีเจอร์พิเศษที่ช่วยให้การจัดการการบ้านและงานต่างๆ
            เป็นเรื่องง่ายขึ้น โดยนักเรียนสามารถรับข้อมูลการบ้าน ประกาศ และอื่นๆ
            ผ่านแพลตฟอร์มหลากหลายรูปแบบ ที่เชื่อมต่อกันได้อย่างสะดวกและรวดเร็ว
            เช่น Line, Discord เป็นต้น และอาจมีเพิ่มขึ้นมาอีกในอนาคต
            โดยข้อมูลจะได้รับทันทีหลังจากฝ่ายที่ได้รับมอบหมายได้โพสต์ข้อมูล
            ได้ตามความต้องการ
            เพื่อให้การเรียนรู้มีประสิทธิภาพและเป็นระเบียบมากยิ่งขึ้น
          </p>
        </div>
        <section className="body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col items-center justify-center">
                  <img style={{ maxWidth: '130px' }} src="https://images.sftcdn.net/images/t_app-icon-m/p/9848e854-ffae-11e6-a59d-00163ed833e7/2949821524/discord-icon.png" alt="Discord" />
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-bold mb-2">Discord Webhooks</h2>
                  <p className="leading-relaxed">ฟีเจอร์สำหรับการแจ้งเตือนภาระงานไปยัง Discord Server ของท่านผ่าน Webhook</p>
                  <div style={{ maxWidth: '232px' }} className="flex gap-3">
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
                </div>
              </div>
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col items-center justify-center">
                  <img style={{ maxWidth: '110px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/800px-LINE_logo.svg.png" alt="Line" />
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-bold mb-2">Line OA</h2>
                  <p className="leading-relaxed">บริการส่งการแจ้งเตือน ภาระงาน ประกาศ และอื่นๆ โดยใช้ Line Messaging Api โดยอาจมีข้อจำกัด</p>
                  <Button
                    onClick={() => {
                      router.push("https://lin.ee/L1apV3k");
                    }}
                    style={{ backgroundColor: "#00b900" }}
                  >
                    <FaLine className="mr-2 h-5 w-5" />
                    รับการแจ้งเตือน
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <h1 style={{ marginBottom: "15px" }} className="border-b">
          📰 Privacy Policy - นโยบายความเป็นส่วนตัวสำหรับ การแจ้งเตือน
        </h1>
        <h2 style={{ fontSize: '18px' }}>ที่ Yorwor67Slash5 เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ นโยบายนี้อธิบายการเก็บรวบรวมและการใช้ข้อมูลที่เกี่ยวข้องกับระบบการแจ้งเตือนของเรา ซึ่งช่วยให้นักเรียนจัดการภาระงานและรับข้อมูลอัปเดตผ่านแพลตฟอร์มต่าง ๆ เช่น Line และ Discord</h2>
        <List style={{ marginTop: '20px', fontSize: '18px' }}>
          <List.Item style={{ color: 'black' }}>การเก็บข้อมูล :
            เรารวบรวมข้อมูลพื้นฐาน เช่น ชื่อผู้ใช้ หรือ ID ของคุณบนแพลตฟอร์มที่เชื่อมต่อ เพื่อส่งการแจ้งเตือนเกี่ยวกับ ภาระงาน ประกาศ และอัปเดตอื่น ๆ ที่เกี่ยวข้องกับห้องเรียน</List.Item>
          <List.Item style={{ color: 'black' }}>การใช้ข้อมูล :
            <b> ข้อมูลของคุณจะถูกใช้เพื่อส่งการแจ้งเตือนที่เกี่ยวข้องกับโรงเรียนเท่านั้น เราจะไม่แบ่งปันข้อมูลของคุณกับบุคคลที่สาม</b> ยกเว้นเพื่อวัตถุประสงค์ในการส่งการแจ้งเตือนผ่าน Line, Discord และแพลตฟอร์มที่เชื่อมต่ออื่น ๆ</List.Item>
          <List.Item style={{ color: 'black' }}>แพลตฟอร์มของบุคคลที่สาม :
            การแจ้งเตือนจะถูกส่งผ่านแพลตฟอร์มของบุคคลที่สาม เช่น Line และ Discord โดยใช้ API หรือระบบ webhook ของแพลตฟอร์มเหล่านั้น เราใช้ข้อมูลเท่าที่จำเป็นในการส่งข้อความเท่านั้น</List.Item>
          <List.Item style={{ color: 'black' }}>ความปลอดภัยของข้อมูล :
            เราดำเนินการตามมาตรการที่เหมาะสมเพื่อปกป้องข้อมูลของคุณ และมั่นใจได้ว่าข้อมูลจะถูกใช้อย่างปลอดภัยในระบบ</List.Item>
        </List>
      </div>
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
