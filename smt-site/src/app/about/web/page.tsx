"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, TextInput, FileInput, Label, Spinner, Tooltip } from "flowbite-react";
import GitHubImg from "../../assets/github.webp";
import Link from "next/link";
import { FaGithubAlt, FaChevronCircleUp, FaQrcode, FaCheck } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { BiSolidDonateHeart } from "react-icons/bi";
import smtConfig from "../../smt-config.mjs";
import generatePayload from "promptpay-qr";
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';
import { slipVerify } from 'promptparse/validate'

interface DonorName {
  name: string;
  url: string;
}

export default function AboutWeb() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บไซต์");
  const [api1down, setApi1down] = useState(true);
  const [api2down, setApi2down] = useState(true);
  const [api3down, setApi3down] = useState(true);
  const [donateQr, setDonateQR] = useState<any>(null);
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
    axios
      .get(`${smtConfig.apiMain}ping`)
      .then(() => {
        setApi1down(false);
      })
      .catch(() => {
        setApi1down(true);
      });
    axios
      .get(`${smtConfig.apiUser}ping`)
      .then(() => {
        setApi2down(false);
      })
      .catch(() => {
        setApi2down(true);
      });
    axios
      .get(`${smtConfig.apiBackup}ping`)
      .then(() => {
        setApi3down(false);
      })
      .catch(() => {
        setApi3down(true);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ maxWidth: "70px", marginBottom: "10px" }}
              src={GitHubImg.src}
              alt="GitHubLogo"
            />
            <h2 className="font-bold" style={{ fontSize: "35px" }}>
              Project Name : Yorwor67Slash5
            </h2>
            <h2
              className="font-bold"
              style={{
                fontSize: "30px",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              Open-source project
            </h2>
            <h3 className="lg:w-2/3 mx-auto">
              M.4/5 className website aimed at improving the student experience by
              providing essential tools such as attendance tracking and homework
              management. The website allows students to easily check if theyve
              been marked absent for the day and view current homework
              assignments. In this project we designed not only to assist
              students but also to enhance our skills in web development. We aim
              to continuously improve and expand its functionality, making it a
              practical tool for students while sharpening our coding expertise.
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
                View on Github
              </Button>
              <Button
                as={Link}
                href="#"
                onClick={() => setModelOpen(true)}
                color="blue"
              >
                <BiSolidDonateHeart
                  style={{ margin: "auto", marginRight: "5px" }}
                  className="mr-3 h-4 w-4"
                />
                Donate
              </Button>
            </Button.Group>
            <section style={{ marginTop: '60px' }} className="body-font">
              <div className="mx-auto">
                <div className="text-center mb-5">
                  <h1 style={{ fontSize: "30px" }} className="text-2xl title-font mb-4 tracking-widest font-bold">STATUS</h1>
                  <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Live updates on the Yorwor67Slash5 API server health, including uptime and any current issues affecting attendance and homework tools</p>
                </div>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                  <div className="p-2 sm:w-1/2 w-full">
                    {api1down ? (
                      <>
                        <div className="bg-red-500 rounded flex p-4 h-full items-center text-white">
                          <Spinner className="mr-4" size="md" />
                          <span className="title-font font-medium">Api server {"(Vercel)"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-green-500 rounded flex p-4 h-full items-center text-white">
                          <FaChevronCircleUp className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Vercel)"}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-2 sm:w-1/2 w-full">
                    {api2down ? (
                      <>
                        <div className="bg-red-500 rounded flex p-4 h-full items-center text-white">
                          <Spinner className="mr-4" size="md" />
                          <span className="title-font font-medium">Api server {"(Railway)"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-green-500 rounded flex p-4 h-full items-center text-white">
                          <FaChevronCircleUp className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Railway)"}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-2 sm:w-1/2 w-full">
                    {api3down ? (
                      <>
                        <div className="bg-red-500 rounded flex p-4 h-full items-center text-white">
                          <Spinner className="mr-4" size="md" />
                          <span className="title-font font-medium">Api server {"(Render)"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-green-500 rounded flex p-4 h-full items-center text-white">
                          <FaChevronCircleUp className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Render)"}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="body-font">
              <div className="container px-5 py-24 mx-auto">
                <div style={{ marginBottom: '40px' }} className="flex flex-col text-center w-full">
                  <h1 style={{ fontSize: "30px" }} className="text-2xl title-font mb-4 tracking-widest font-bold">OUR TEAM</h1>
                  <p className="lg:w-2/3 mx-auto">We are a team of dedicated SMT students from Hatyaiwittayalai School, combining our coding and design skills to create innovative solutions for our school and community</p>
                </div>
                <div className="flex flex-wrap -m-4">
                  <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img alt="Siraphop Sukchu" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://avatars.githubusercontent.com/u/86290693?v=4"></img>
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-medium text-lg text-gray-900">Siraphop Sukchu</h2>
                        <h3 className="text-gray-500 mb-3">Frontend & API</h3>
                        <p className="mb-4">{"JavaScript — the king of the coding kingdom"}</p>
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
                        <h2 className="title-font font-medium text-lg text-gray-900">Teetouch Noppakun</h2>
                        <h3 className="text-gray-500 mb-3">Database &  Authentication & Frontend</h3>
                        <p className="mb-4">{"Rose are red ,Violet are blue. Unknown Error on line 32"}</p>
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
            <section className="body-font">
              <div className="container px-5 py-24 mx-auto">
                <div style={{ marginBottom: '40px' }} className="flex flex-col text-center w-full">
                  <h1 style={{ fontSize: "30px" }} className="text-2xl title-font mb-4 tracking-widest font-bold">SUPPORTERS</h1>
                  <p className="lg:w-2/3 mx-auto">We would like to express our sincere gratitude to all the individuals and organizations who have supported the <b>Yorwor67Slash5</b> project</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5">
                  {data.map((Donor, index) => (
                    <Tooltip content={Donor.name} style="light" key={index}>
                      <img
                        id={`${index}`}
                        src={Donor.url}
                        className="h-20 w-20 md:h-36 md:w-36 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                        alt={Donor.name}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </section>
          </div>
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
