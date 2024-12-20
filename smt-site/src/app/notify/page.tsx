"use client";

import { useState } from "react";
import { Button, Card, Modal, Label, TextInput, List } from "flowbite-react";
import { FaDiscord, FaLine } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useLocalStorge from "../lib/localstorage-db";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import smtConfig from "../smt-config.mjs";

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
  const [openAlert, setOpenAlert] = useState(false);
  const [hooksSucc, setHooksSucc] = useState(false);

  const submitDiswebhook = () => {
    setIsLoading(true);
    setHooksSucc(false);
    if (email) {
      axios
        .post(`${smtConfig.apiMain}discord/new`, {
          hooks: `${hooksUrl}`,
          email: `${email}`,
        })
        .then((response) => {
          setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
          setHooksSucc(true);
          setOpenDisModal(false);
          setOpenAlert(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
          setOpenDisModal(false);
          setOpenAlert(true);
          setIsLoading(false);
        });
    } else {
      axios
        .post(`${smtConfig.apiMain}discord/new`, {
          hooks: `${hooksUrl}`,
        })
        .then((response) => {
          setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
          setHooksSucc(true);
          setOpenDisModal(false);
          setOpenAlert(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
          setOpenDisModal(false);
          setOpenAlert(true);
          setIsLoading(false);
        });
    }
  };

  const revokeDiswebhook = () => {
    setIsLoading(true);
    axios
      .delete(`${smtConfig.apiMain}discord/revoke`, {
        data: { hookid: hooksId }
      })
      .then((response) => {
        setMessage(`ยกเลิกการแจ้งเตือนแล้ว ${response.data}`);
        setOpenDellModal(false);
        setOpenAlert(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถยกเลิกการแจ้งเตือนได้ ${error.response.data}`);
        setOpenDellModal(false);
        setOpenAlert(true);
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
      <div className="container">
        <div className="mb-8">
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
        <div className="flex flex-wrap justify-center sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 ">
          <div className="p-4 md:w-1/3 flex">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Discord Webhooks
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                ฟีเจอร์สำหรับการแจ้งเตือนภาระงานไปยัง Discord Server ของท่านผ่าน
                Webhook
              </p>
              <div className="flex gap-3">
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
            </Card>
          </div>
          <div className="p-4 md:w-1/3 flex">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Line OA
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                บริการส่งการแจ้งเตือน ภาระงาน ประกาศ และอื่นๆ โดยใช้ Line
                Messaging Api โดยอาจมีข้อจำกัด
              </p>
              <Button
                onClick={() => {
                  router.push("https://lin.ee/L1apV3k");
                }}
                style={{ backgroundColor: "#00b900" }}
              >
                <FaLine className="mr-2 h-5 w-5" />
                รับการแจ้งเตือน
              </Button>
            </Card>
          </div>
        </div>
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
            <div className="w-full">
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
      <Modal
        className="animate__animated animate__fadeIn"
        show={openAlert}
        size="md"
        onClose={() => setOpenAlert(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            {hooksSucc ? (
              <>
                <p style={{ color: 'red', marginTop: '-15px', fontSize: '13px' }}>กรุณาจำไอดีเอาไว้ เพราะจะใช้ตอนที่ลบข้อมูลออกจากระบบ !</p>

              </>
            ) : (<></>)}
            <div className="flex justify-center gap-4">
              <Button
                style={{ backgroundColor: "#7289da" }}
                color="blue"
                onClick={() => setOpenAlert(false)}
              >
                ตกลง
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
