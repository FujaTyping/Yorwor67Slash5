"use client";

import { useState } from "react";
import { Button, TextInput, Textarea, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { IoSend } from "react-icons/io5";

export default function TimeLine() {
  const [title] = useState("Hatyaiwit - ข้อเสนอแนะ");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [decs, setDecs] = useState("");
  const [message, setMessage] = useState("เตือน !");
  const [openModal, setOpenModal] = useState(false);

  const submitFeedback = () => {
    axios
      .post(`https://api.smt.siraphop.me/feedback`, {
        name: name,
        email: email,
        decs: decs,
      })
      .then((response) => {
        setMessage(`ส่งข้อมูลแล้ว ${response.data}`);
        setOpenModal(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
        setOpenModal(true);
      });
  };

  return (
    <>
      <title>{title}</title>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          ส่งความคิดเห็น
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          กรุณาแบ่งปันความคิดเห็นหรือข้อเสนอแนะของคุณเพื่อช่วยให้เราปรับปรุงบริการ เราจะพยามพัฒนาเว็บของเราตามความคิดเห็นทุกๆท่าน
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  ชื่อผู้ส่ง
                </label>
                <TextInput
                  placeholder="ชื่อ-สกุล"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  อีเมช
                </label>
                <TextInput
                  placeholder="อีเมล"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  สิ่งที่ต้องการจะให้ปรับปรุง
                </label>
                <Textarea
                  placeholder="ข้อความของคุณ"
                  onChange={(event) => setDecs(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center items-center p-2 w-full">
              <Button style={{ backgroundColor: "#2d76ff" }}
                color="blue" onClick={submitFeedback}>
                ส่งคำขอ
                <IoSend className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

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
              {message}
            </h3>
            <div className="flex justify-center">
              <Button
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
                onClick={() => setOpenModal(false)}
                
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
