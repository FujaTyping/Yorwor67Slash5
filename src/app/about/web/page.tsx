"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, TextInput, FileInput, Label, Spinner, Tooltip } from "flowbite-react";
import GitHubImg from "../../assets/github.webp";
import Link from "next/link";
import { FaGithubAlt, FaQrcode, FaCheck, FaBook, FaCode } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { BiSolidDonateHeart } from "react-icons/bi";
import smtConfig from "../../smt-config.mjs";
import generatePayload from "promptpay-qr";
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';
import { slipVerify } from 'promptparse/validate'
import { MdNotificationsNone } from "react-icons/md";
import useSound from 'use-sound';

interface DonorName {
  name: string;
  url: string;
}

export default function AboutWeb() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บไซต์");
  const [donateQr, setDonateQR] = useState<any>(null);
  const [CynthiaV] = useSound("/assets/Sound/CynthiaDonate.wav");
  const [modelOpen, setModelOpen] = useState(false);
  const [modelFinOpen, setModelFinOpen] = useState(false);
  const [numberPAY, setNumberPay] = useState("0");
  const [userPAY, setUserPay] = useState("");
  const [displayPAY, setDisplayPAY] = useState("0");
  const [statusCOde, setSatusCode] = useState(1);
  const [qrCodeResult, setQrCodeResult] = useState("กรุณาอัพโหลด QR code");
  const [data, setData] = useState<DonorName[]>([
    {
      name: "กำลังดึงข้อมูล",
      url: "กำลังดึงข้อมูล",
    },
  ]);

  function makeqrPay(numPAY: string) {
    if (parseInt(numPAY) >= 1) {
      setDisplayPAY(numPAY);
      const qrCodeData = generatePayload("098-040-6596", { amount: parseInt(numPAY) })
      setDonateQR(qrCodeData);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQrCodeResult("กรุณารอสักครู่");
    setSatusCode(0);
    const file = event.target.files?.[0];
    if (!userPAY) {
      setQrCodeResult("กรุณาระบุชื่อ แล้ว อัพโหลดหลักฐานอีกครั้ง");
      setSatusCode(1);
      return;
    }
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          setQrCodeResult("ไม่สามารถประมวลผลจากรูปภาพนี้ได้");
          setSatusCode(1);
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          const data = slipVerify(code.data)
          if (data) {
            const { sendingBank, transRef } = data
            axios
              .post(`${smtConfig.apiMain}donate`, {
                sendbank: `${sendingBank}`,
                tranref: `${transRef}`,
                name: `${userPAY}`
              })
              .then(() => {
                setQrCodeResult(`ส่งหลักฐานการบริจาคไปให้ผู้พัฒนาแล้ว ผู้พัฒนาจะทำการยืนยันและอัปเดตรายชื่อผู้สนับสนุนอีกครั้ง`);
                setSatusCode(2);
              })
              .catch((error) => {
                setQrCodeResult(`${error.response.data}`);
                setSatusCode(1);
              });
          } else {
            setQrCodeResult("ไม่พบหลักฐานการบริจาค");
            setSatusCode(1);
          }
        } else {
          setQrCodeResult('ไม่พบ QR code');
          setSatusCode(1);
        }
      };

      image.onerror = () => {
        setQrCodeResult('ไม่สามารถโหลดรูปภาพได้');
        setSatusCode(1);
      };
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    axios
      .get(`${smtConfig.apiMain}donate/list`)
      .then((response) => {
        setData(response.data.donor);
      })
      .catch((error) => {
        setData([
          {
            name: `${error.response.data}`,
            url: "ไม่สามารถดึงข้อมูลได้",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    makeqrPay("35");
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("donate") == "promptpay") {
        setModelOpen(true);
      }
    }
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <section className="container">
        <div className="max-w-xl mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
          <div className="flex flex-col items-center justify-center">
            <img
              style={{ maxWidth: "70px", marginBottom: "10px" }}
              src={GitHubImg.src}
              alt="GitHubLogo"
            />
            <h2 className="font-bold" style={{ fontSize: "35px" }}>
              โปรเจค์ : Yorwor67Slash5
            </h2>
            <h2
              className="font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text"
              style={{
                fontSize: "30px",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              โปรเจค์ โอเพน-ซอร์ซ
            </h2>
            <h3 className="lg:w-2/3 mx-auto">
              เว็บไซต์ห้องเรียน ม.{smtConfig.mattayom} ออกแบบมาเพื่อยกระดับประสบการณ์ของนักเรียน ด้วยโปรแกรมจัดบริหารห้องเรียนที่รวมเครื่องมือต่าง ๆ เช่น การติดตามการเข้าเรียนและการจัดการการบ้าน ช่วยให้นักเรียนตรวจสอบสถานะการขาดเรียนและดูการบ้านได้ง่าย นอกจากนี้ยังเป็นโครงการที่ช่วยพัฒนาทักษะการพัฒนาเว็บไซต์ของทีมเราอย่างต่อเนื่อง เพื่อสร้างเครื่องมือที่มีประโยชน์และตอบโจทย์การใช้งานจริงสำหรับนักเรียนทุกคน
            </h3>
            <Button.Group id="AboutBtn" style={{ marginTop: "20px" }}>
              <Button
                as={Link}
                href="https://github.com/FujaTyping/Yorwor67Slash5"
                color="blue"
              >
                <FaGithubAlt
                  style={{ margin: "auto", marginRight: "5px" }}
                  className="mr-3 h-4 w-4"
                />
                ดูบน Github
              </Button>
              <Button
                as={Link}
                href="#"
                onClick={() => { setModelOpen(true); CynthiaV(); }}
                color="blue"
              >
                <BiSolidDonateHeart
                  style={{ margin: "auto", marginRight: "5px" }}
                  className="mr-3 h-4 w-4"
                />
                บริจาค
              </Button>
            </Button.Group>
          </div>
          <div className="grid lg:gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mt-4 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md">
                      <FaBook className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leadi ">การจัดการภาระงาน</h4>
                    <p className="mt-2 ">ระบบจะรวบรวมและแสดงรายการงานที่ได้รับมอบหมายให้นักเรียนสามารถตรวจสอบและจัดการได้อย่างสะดวก</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md">
                      <FaCode className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leadi ">โปรแกรมจัดบริหารห้องเรียน</h4>
                    <p className="mt-2 ">เว็บไซต์มีเครื่องมือในการจัดการข้อมูลต่าง ๆ ของห้องเรียน เช่น การติดตามการเข้าชั้นเรียน, การจัดการการบ้าน และอื่น ๆ เพื่ออำนวยความสะดวกในการบริหารห้องเรียน</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md">
                      <MdNotificationsNone className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leadi ">การจัดการการแจ้งเตือน</h4>
                    <p className="mt-2 ">ระบบสามารถส่งการแจ้งเตือนให้ผู้ใช้ผ่านอีเมลหรือแอปพลิเคชันเมื่อมีการอัปเดตข้อมูลสำคัญ เช่น การขาดเรียนหรือการบ้านที่ต้องส่ง</p>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 lg:mt-0">
              <img className="rounded-lg" width="600" height="600" src="/assets/oSMT.png" />
              <div className="mt-5 md:flex md:flex-wrap items-center justify-center gap-2 mt-4 grid grid-cols-2">
                <img src="https://badgen.net/github/commits/FujaTyping/Yorwor67Slash5/dev?color=blue&icon=github" />
                <img src="https://badgen.net/github/merged-prs/FujaTyping/Yorwor67Slash5?color=blue&icon=github" />
                <img src="https://badgen.net/github/contributors/FujaTyping/Yorwor67Slash5?color=blue&icon=github" />
                <img src="https://badgen.net/github/stars/FujaTyping/Yorwor67Slash5?color=blue&icon=github" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ marginTop: '-3rem' }} className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <section className="body-font">
            <div className="container px-5 py-24 mx-auto">
              <div style={{ marginBottom: '40px' }} className="flex flex-col text-center w-full">
                <h2 className="font-bold" style={{ fontSize: "35px" }}>
                  ทีมของเรา
                </h2>
                <p className="lg:w-2/3 mx-auto">พวกเราเป็นทีมของนักเรียน SMT จากโรงเรียนหาดใหญ่วิทยาลัย ที่รวมทักษะการเขียนโค้ดและการออกแบบเพื่อสร้างสรรค์นวัตกรรมที่เป็นประโยชน์ต่อโรงเรียนและชุมชนของเรา</p>
              </div>
              <div className="flex flex-wrap -m-4">
                <div className="p-4 lg:w-1/2">
                  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img alt="Siraphop Sukchu" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://avatars.githubusercontent.com/u/86290693?v=4"></img>
                    <div className="flex-grow sm:pl-8 ">
                      <h2 className="title-font font-medium text-lg">นาย สิรภพ สุขชู</h2>
                      <h3 className="text-gray-500 mb-3">Frontend & API</h3>
                      <p className="mb-4">{"สติมา โปรแกรมเกิด สติเตลิด Error กระจาย"}</p>
                      <span className="inline-flex">
                        <a href="https://github.com/FujaTyping">
                          <FaGithub
                            className="h-6 w-6"
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 lg:w-1/2">
                  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                    <img alt="TeetouchNoppakun" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://avatars.githubusercontent.com/u/137798282?v=4"></img>
                    <div className="flex-grow sm:pl-8">
                      <h2 className="title-font font-medium text-lg text-gray-900">นาย ธีธัช นพคุณ</h2>
                      <h3 className="text-gray-500 mb-3">Database &  Authentication & Frontend</h3>
                      <p className="mb-4">{"การเขียนโค้ดก็เหมือนการเล่าเรื่อง... หลายครั้งก็เละเทะไปหมด"}</p>
                      <span className="inline-flex">
                        <a href="https://github.com/kunzaka001">
                          <FaGithub
                            className="h-6 w-6"
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: '-0.5rem' }} className="body-font">
            <div className="container px-5 py-24 mx-auto">
              <div style={{ marginBottom: '40px' }} className="flex flex-col text-center items-center justify-center w-full">
                <h2 className="font-bold" style={{ fontSize: "35px" }}>
                  ทำให้เป็นไปได้โดย<span className="font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 inline-block text-transparent bg-clip-text">คุณ</span>
                </h2>
                <p className="lg:w-2/3 mx-auto">Yorwor67Slash5 ไม่ได้เป็นเจ้าของโดยองค์กรใด แต่เป็นโครงการที่ขับเคลื่อนโดยชุมชน - การพัฒนา Yorwor67Slash5 เป็นไปได้เพียงเพราะการสนับสนุนของคุณ</p>
                <div className="mt-3" style={{ maxWidth: '22rem' }}>
                  <Button
                    as={Link}
                    href="#"
                    onClick={() => { setModelOpen(true); CynthiaV(); }}
                    color="blue"
                  >
                    <BiSolidDonateHeart
                      style={{ margin: "auto", marginRight: "5px" }}
                      className="mr-3 h-4 w-4"
                    />
                    บริจาค (สนับสนุน)
                  </Button>
                </div>
                <p className="lg:w-2/3 mx-auto mt-3">ขอขอบคุณที่ทำให้ Yorwor67Slash5 เป็นไปได้</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {data.map((Donor, index) => (
                  <Tooltip content={Donor.name} style="light" key={index}>
                    <img
                      id={`${index}`}
                      src={Donor.url}
                      className="h-20 w-20 md:h-36 md:w-36 rounded-full object-cover transition-transform duration-300 hover:scale-105"
                      alt={Donor.name}
                    />
                  </Tooltip>
                ))}
                <Tooltip content="คุณ (You)" style="light">
                  <img
                    src="https://avatar.iran.liara.run/public?username=You"
                    className="h-20 w-20 md:h-36 md:w-36 rounded-full object-cover transition-transform duration-300 hover:scale-105"
                    alt="You"
                  />
                </Tooltip>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Modal
        className="animate__animated animate__fadeIn"
        show={modelOpen}
        onClose={() => setModelOpen(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              บริจาคให้กับ Yorwor67Slash5
            </h3>
            <div className="flex flex-col items-center justify-center">
              <QRCodeSVG size={200} value={donateQr} />
              <p className="mt-2">จำนวนเงิน {displayPAY} บาท</p>
              <p>ผ่าน Prompt pay</p>
            </div>
            <div className="flex items-center gap-3">
              <TextInput onChange={(i) => setNumberPay(i.target.value)} className="w-full" type="number" placeholder="จำนวนเงิน" required />
              <Button
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
                className="mb-5"
                onClick={() => makeqrPay(numberPAY)}
              >
                <FaQrcode className="w-4 h-4" />
              </Button>
              <Button
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
                className="mb-5"
                onClick={() => { setModelOpen(false); setModelFinOpen(true); }}
              >
                <FaCheck className="w-4 h-4" />
              </Button>
            </div>
            <p style={{ marginTop: '0px' }}>
              สนับสนุน Yorwor67Slash5 เพื่อช่วยพัฒนาการเรียนรู้และการจัดการในห้องเรียนให้ดียิ่งขึ้น
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="animate__animated animate__fadeIn"
        show={modelFinOpen}
        onClose={() => setModelFinOpen(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              💖 ขอบคุณจากใจผู้พัฒนา Yorwor67Slash5
            </h3>
            <div>
              <p style={{ marginTop: '0px' }}>
                ขอบคุณที่ร่วมผลักดันโปรเจค Yorwor67Slash5 หากคุณได้บริจาค สามารถอัปโหลดสลิปโอนเงินเพื่อจัดทำรายชื่อผู้สนับสนุนได้ที่นี่
              </p>
              <div className="mb-2 mt-6 block">
                <Label htmlFor="file-upload" value="ชื่อผู้บริจาค" />
              </div>
              <TextInput onChange={(i) => setUserPay(i.target.value)} className="w-full" type="text" placeholder="ชื่อจริง-สกุล" required />
              <div className="mb-2 mt-6 block">
                <Label htmlFor="file-upload" value="อัพโหลดหลักฐานการบริจาค" />
              </div>
              <FileInput
                id="file-upload"
                onChange={handleFileChange}
              />
              <p className="flex items-center" style={{ marginTop: '20px' }}>
                {statusCOde == 0 ? (<><Spinner size="md" className="mr-2" /></>) : (<></>)}
                {statusCOde == 2 ? (<><FaCheckToSlot className="mr-4 w-10 h-10" /></>) : (<></>)}
                {qrCodeResult}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
