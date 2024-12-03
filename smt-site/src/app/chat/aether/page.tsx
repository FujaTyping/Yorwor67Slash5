"use client";

import Link from 'next/link'
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorge from "../../lib/localstorage-db";
import { FloatingLabel, Button, Card, Badge, Tooltip, Modal, Label } from "flowbite-react";
import CynthiaProfile from "../../assets/chat/ProfileCynthia.png";
import AetherProfile from "../../assets/chat/ProfileAether.png"
import ChatBubble from "@/app/components/chat";
import { IoSend } from "react-icons/io5";
import smtConfig from "../../smt-config.mjs";
import { MdLockClock } from "react-icons/md";
import useSound from 'use-sound';
import Turnstile from "react-turnstile";

export default function ChatCynthia() {
  const [title] = useState("Hatyaiwit - Aether");
  const { username, photourl, email, isLogin } = useLocalStorge(false);
  const [userPrompt, setUserPrompt] = useState(
    "สวัสดี Aether คุณช่วยฉันเรื่องการเรียนได้ไหม?"
  );
  const [aetherPrompt, setAetherPrompt] = useState(
    "สวัสดีครับ! ผมคือ Aether ที่ปรึกษาด้านการเรียนรู้ของคุณ บอกมาได้เลยว่าคุณต้องการความช่วยเหลือในเรื่องใด ผมพร้อมเสมอครับ!"
  );
  const [animatedAetherPrompt, setAnimatedAetherPrompt] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [pause, setPause] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isGEN, setIsGEN] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [personality, setPersonality] = useState("");
  const [openModalSelect, setOpenModelSelect] = useState(false);
  const [TX] = useSound("/assets/Sound/TX.mp3", { volume: 0.7 });
  const [RX] = useSound("/assets/Sound/RX.mp3", { volume: 0.7 });
  const [index, setIndex] = useState(0);
  const typingSpeed = 1;

  function onCloseSelect() {
    setOpenModelSelect(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!pause) {
        if (input != "") {
          setUserPrompt(input);
          AskCynthia(input);
        }
      }
    }
  };

  async function AskCynthia(prompt: string) {
    setIsHistory(false);
    setPause(true);
    TX();
    setIsGEN(false)
    setAetherPrompt("Aether กำลังคิดคำตอบ ...")
    setLoading(true)

    try {
      const storedPersonality = localStorage.getItem("personality");
      if (storedPersonality) {
        setPersonality(storedPersonality);
      }
    } catch (error) {
      console.error("Error reading data from localStorage:", error);
    }

    axios
      .post(
        `${smtConfig.apiMain}generative/aether`,
        {
          prompt: `${prompt}`,
          personality: `${personality}`,
        },
        {
          headers: {
            Auth: email,
          },
        }
      )
      .then((response) => {
        setAetherPrompt(`${response.data}`);
        RX();
        setLoading(false);
        setCooldown(true);
        setSecondsLeft(15);
        setIsGEN(true);
        try {
          localStorage.setItem("historyAetherChat", response.data);
          localStorage.setItem("historyAetherPrompt", prompt);
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      })
      .catch((error) => {
        setAetherPrompt(`${error.response.data}`);
        RX();
        setLoading(false);
      });
  }

  useEffect(() => {
    if (cooldown && secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (secondsLeft === 0) {
      setCooldown(false);
      setPause(false);
    }
  }, [cooldown, secondsLeft]);

  const loadLocaldata = async () => {
    try {
      const storedPersonality = localStorage.getItem("personality");
      const storedHisAether = localStorage.getItem("historyAetherChat");
      const storedHisPrompt = localStorage.getItem("historyAetherPrompt");
      if (storedPersonality) {
        setPersonality(storedPersonality);
      }
      if (storedHisAether && storedHisPrompt) {
        setAetherPrompt(storedHisAether);
        setUserPrompt(storedHisPrompt);
        setIsHistory(true);
      }
    } catch (error) {
      console.error("Error reading data from localStorage:", error);
    }
  };

  useEffect(() => {
    loadLocaldata();
  }, []);

  useEffect(() => {
    setAnimatedAetherPrompt("");
    setIndex(0);
  }, [aetherPrompt]);

  useEffect(() => {
    if (index < aetherPrompt.length) {
      const timer = setTimeout(() => {
        setAnimatedAetherPrompt((prev) => prev + aetherPrompt[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => { clearTimeout(timer); }
    }
  }, [index, aetherPrompt]);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container mx-auto p-6 space-y-6 max-w-3xl">
        <Card className="flex flex-row items-center">
          <div className="flex flex-row flex-shrink-0 mr-4 items-center">
            <Tooltip content="เปลื่ยนโมเดล" style="light">
              <img
                src={AetherProfile.src}
                alt="Profile picture"
                className="w-16 h-16 rounded-full object-cover cursor-pointer"
                onClick={() => { setOpenModelSelect(true) }}
              />
            </Tooltip>
            <div className="ml-8">
              <h5 className="text-xl font-bold tracking-tight flex items-center">
                Aether (เอเธอร์) <Badge style={{ color: 'white', backgroundColor: '#ff6767' }} className="ml-3" color="failure">Experimental</Badge>
              </h5>
              <p className="font-normal">
                ความรู้คืออาวุธ เวลาเรียนคือสนามรบ และความพยายามคือชัยชนะที่ไม่มีใครแย่งไปได้
              </p>
              {cooldown ? (
                <>
                  <span style={{ color: 'red' }} className="flex mb-2 items-center animate__animated animate__shakeX"><MdLockClock className="w-5 h-5 mr-2" /> รออีก {secondsLeft} วินาทีถึงจะคุยต่อไปได้</span>
                </>
              ) : (<></>)}
            </div>
          </div>
        </Card>

        {isLogin ? (
          <>
            {isVerify ? (
              <>
                <div className="space-y-4">
                  <div>
                    <ChatBubble
                      isRtl={true}
                      name={username}
                      img={photourl}
                      text={userPrompt}
                      isUser={true}
                      history={isHistory}
                      botName="Aether"
                    />
                  </div>
                  <div>
                    <ChatBubble
                      isRtl={false}
                      name="Aether"
                      img={AetherProfile.src}
                      text={animatedAetherPrompt}
                      isBot={isGEN}
                      AnimatedPrompt={aetherPrompt}
                      botName="Aether"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full">
                  <div className="flex-1 min-w-0">
                    <FloatingLabel
                      onKeyDown={handleKeyDown}
                      onChange={(i) => setInput(i.target.value)}
                      variant="outlined"
                      label="ลองพิมพ์อะไรสักอย่างสิครับ!"
                      helperText="Aether เป็น AI ที่ออกแบบมาเพื่อช่วยในการเรียนรู้ แม้จะพยายามให้ข้อมูลที่ถูกต้องที่สุด แต่คำตอบอาจไม่สมบูรณ์หรือถูกต้องเสมอ แนะนำให้ตรวจสอบข้อมูลเพิ่มเติมจากแหล่งที่เชื่อถือได้ก่อนนำไปใช้งาน"
                    />
                  </div>
                  <div className="pb-10 flex-shrink-0">
                    {loading ? (
                      <>
                        <Button
                          pill
                          isProcessing
                          style={{ backgroundColor: "#ff1616" }}
                          color="blue"
                        >
                          กำลังรอคำตอบ
                        </Button>
                      </>
                    ) : (
                      <>
                        {cooldown ? (
                          <>
                            <Button
                              style={{ backgroundColor: "#ff1616" }}
                              color="blue"
                              pill
                              disabled
                            >
                              <IoSend className="h-6 w-6" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => { if (input != "") { setUserPrompt(input); AskCynthia(input); } }}
                              style={{ backgroundColor: "#ff1616" }}
                              color="blue"
                              pill
                            >
                              <IoSend className="h-6 w-6" />
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <section className="text-gray-600 body-font">
                  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                      <img style={{ width: "350px" }} className="object-cover object-center rounded" alt="hero" src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-flat-login-icon-with-password-access-and-padlock-concept-vector-png-image_41882582.jpg" />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">กรุณายืนยันตัวตน</h1>
                      <p className="mb-4 leading-relaxed text-gray-900">เรากำลังตรวจสอบว่าคุณเป็นมนุษย์ โปรดยืนยันตัวตนของคุณผ่าน CAPTCHA</p>
                      <Turnstile
                        sitekey="0x4AAAAAAAwmJyPRGMPSMEvC"
                        theme="light"
                        language={"th"}
                        onVerify={() => {
                          setIsVerify(true);
                        }}
                      />
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        ) : (
          <>
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img style={{ width: "350px" }} className="object-cover object-center rounded" alt="hero" src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-flat-login-icon-with-password-access-and-padlock-concept-vector-png-image_41882582.jpg" />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">กรุณาล็อกอิน</h1>
                  <p className="mb-4 leading-relaxed text-gray-900">ก่อนใช้งานฟีเจอร์นี้ {"(คลิก เมนู > ล็อกอิน)"}</p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openModalSelect}
        onClose={onCloseSelect}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              เลือกผู้ช่วยที่คุณต้องการพูดคุย
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="พร้อมลุยไปกับ AI ที่ใช่สำหรับคุณ!" />
              </div>
              <Link href="/chat/cynthia">
                <div className="p-2 w-full cursor-pointer">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-14 h-14 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={CynthiaProfile.src} />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-xl font-bold">Cynthia</h2>
                      <p>ที่ปรึกษาส่วนตัว AI อบอุ่น ใส่ใจ พร้อมช่วยทุกปัญหาการเรียน</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/chat/aether">
                <div className="p-2 w-full cursor-pointer">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-14 h-14 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={AetherProfile.src} />
                    <div className="flex-grow">
                      <div className='flex items-center'>
                        <h2 className="text-gray-900 text-xl font-bold">Aether</h2>
                        <Badge style={{ color: 'white', backgroundColor: '#ff6767' }} className="ml-2" color="failure">Experimental</Badge>
                      </div>
                      <p>ที่ปรึกษา AI อัจฉริยะ ผู้เชี่ยวชาญคณิต-วิทย์ คม เฉียบ และล้ำสมัย</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
