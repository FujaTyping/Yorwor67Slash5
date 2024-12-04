"use client";

import Link from 'next/link'
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorge from "../../lib/localstorage-db";
import { FloatingLabel, Button, Card, Badge, Modal, Label } from "flowbite-react";
import CynthiaProfile from "../../assets/chat/ProfileCynthia.png";
import AetherProfile from "../../assets/chat/ProfileAether.png"
import ChatBubble from "@/app/components/chat";
import { IoSend } from "react-icons/io5";
import smtConfig from "../../smt-config.mjs";
import { MdLockClock } from "react-icons/md";
import useSound from 'use-sound';
import Turnstile from "react-turnstile";

export default function ChatCynthia() {
  const [title] = useState("Hatyaiwit - Cynthia");
  const { username, photourl, email, isLogin } = useLocalStorge(false);
  const [userPrompt, setUserPrompt] = useState(
    "สวัสดี Cynthia คุณช่วยฉันหน่อยได้ไหม?"
  );

  const [cynthiaPrompt, setCynthiaPrompt] = useState(
    "ฉันยินดีที่จะช่วยนะคะ บอกมาเลยว่าคุณต้องการอะไร?"
  );
  const [animatedCynthiaPrompt, setAnimatedCynthiaPrompt] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [pause, setPause] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isGEN, setIsGEN] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [personality, setPersonality] = useState("");
  const [TX] = useSound("/assets/Sound/TX.mp3", { volume: 0.7 });
  const [RX] = useSound("/assets/Sound/RX.mp3", { volume: 0.7 });
  const [index, setIndex] = useState(0);
  const typingSpeed = 1;

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
    setCynthiaPrompt("Cynthia กำลังคิดคำตอบ ...")
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
        `${smtConfig.apiMain}generative/cynthia`,
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
        setCynthiaPrompt(`${response.data}`);
        RX();
        setLoading(false);
        setCooldown(true);
        setSecondsLeft(15);
        setIsGEN(true);
        try {
          localStorage.setItem("historyCynthiaChat", response.data);
          localStorage.setItem("historyCynthiaPrompt", prompt);
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      })
      .catch((error) => {
        setCynthiaPrompt(`${error.response.data}`);
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
      const storedHisCynnthia = localStorage.getItem("historyCynthiaChat");
      const storedHisPrompt = localStorage.getItem("historyCynthiaPrompt");
      if (storedPersonality) {
        setPersonality(storedPersonality);
      }
      if (storedHisCynnthia && storedHisPrompt) {
        setCynthiaPrompt(storedHisCynnthia);
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
    setAnimatedCynthiaPrompt("");
    setIndex(0);
  }, [cynthiaPrompt]);

  useEffect(() => {
    if (index < cynthiaPrompt.length) {
      const timer = setTimeout(() => {
        setAnimatedCynthiaPrompt((prev) => prev + cynthiaPrompt[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => { clearTimeout(timer); }
    }
  }, [index, cynthiaPrompt]);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container mx-auto p-6 space-y-6 max-w-3xl">
        <Card className="flex flex-row items-center">
          <div className="flex flex-row flex-shrink-0 mr-4 items-center">
            <img
              src={CynthiaProfile.src}
              alt="Profile picture"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-8">
              <h5 className="text-xl font-bold tracking-tight">
                Cynthia (ซินเทีย)
              </h5>
              <p className="font-normal">
                ทุกความพยายามคือก้าวเล็ก ๆ
                ที่พาเธอไปถึงความฝัน—อย่าลืมยิ้มให้ตัวเองในทุกก้าวนะ!
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
                      botName="Cynthia"
                    />
                  </div>
                  <div>
                    <ChatBubble
                      isRtl={false}
                      name="Cynthia"
                      img={CynthiaProfile.src}
                      text={animatedCynthiaPrompt}
                      isBot={isGEN}
                      AnimatedPrompt={cynthiaPrompt}
                      botName="Cynthia"
                      modelName='gemini-1.5-flash'
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full">
                  <div className="flex-1 min-w-0">
                    <FloatingLabel
                      onKeyDown={handleKeyDown}
                      onChange={(i) => setInput(i.target.value)}
                      variant="outlined"
                      label="พิมพ์อะไรสักอย่างสิ :D"
                      helperText="Cynthia เป็นผู้ช่วย AI ที่ออกแบบมาเพื่อให้คำแนะนำทางการศึกษาและสร้างแรงบันดาลใจ โปรดทราบว่าข้อมูลที่ Cynthia ให้มาอาจไม่ถูกต้องเสมอไป ควรตรวจสอบข้อมูลที่สำคัญจากแหล่งข้อมูลที่น่าเชื่อถือเสมอ"
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
    </>
  );
}
