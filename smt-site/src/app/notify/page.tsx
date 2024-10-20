"use client";

import { useState } from "react";
import { Button, Card, Modal, Label, TextInput } from "flowbite-react";
import { FaDiscord, FaLine } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useLocalStorge from "../lib/localstorage-db";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";

export default function AboutWeb() {
  const router = useRouter();
  const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บไซต์");
  const { email } = useLocalStorge(false);
  const [webUrl, setWebUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDisModal, setOpenDisModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const submitDiswebhook = () => {
    setIsLoading(true);
    if (email) {
      axios
        .post(`https://api.smt.siraphop.me/discord/new`, {
          hooks: webUrl,
          email: email,
        })
        .then((response) => {
          setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
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
        .post(`https://api.smt.siraphop.me/discord/new`, {
          hooks: webUrl,
        })
        .then((response) => {
          setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
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

  function onCloseModal() {
    setOpenDisModal(false);
  }

  return (
    <>
      <title>{title}</title>
      <div className="container">
        <div className="mb-8">
          <h1>Notification</h1>
          <p>
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
                ฟีเจอร์สำหรับการแจ้งเตือนการบ้านไปยัง Discord Server ของท่านผ่าน
                Webhook
              </p>
              <Button
                onClick={() => setOpenDisModal(true)}
                style={{ backgroundColor: "#7289da" }}
              >
                <FaDiscord className="mr-2 h-5 w-5" />
                Insert URL
              </Button>
            </Card>
          </div>
          <div className="p-4 md:w-1/3 flex">
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Line OA
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                บริการส่งการแจ้งเตือน การบ้าน ประกาศ และอื่นๆ โดยใช้ Line
                Messaging Api โดยอาจมีข้อจำกัด
              </p>
              <Button
                onClick={() => {
                  router.push("https://lin.ee/L1apV3k");
                }}
                style={{ backgroundColor: "#00b900" }}
              >
                <FaLine className="mr-2 h-5 w-5" />
                Insert URL
              </Button>
            </Card>
          </div>
        </div>
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
              แบบฟอร์มเพิ่ม Webhook url
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่ข้อความwebhookurl" />
              </div>
              <TextInput
                placeholder="Insert WebhookUrl"
                onChange={(event) => setWebUrl(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    เพิ่ม Webhook
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitDiswebhook}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    <IoMdAddCircle className="ml-2 h-5 w-5" />
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
            <div className="flex justify-center gap-4">
              <Button
                style={{ backgroundColor: "#2d76ff" }}
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
