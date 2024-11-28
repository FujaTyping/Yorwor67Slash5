"use client";

import { useState } from "react";
import axios from "axios";
import useLocalStorge from "../../lib/localstorage-db";
import { FloatingLabel, Button, Card } from "flowbite-react";
import CynthiaProfile from "../../assets/Cynthia.jpg";
import ChatBubble from "@/app/components/chat";
import { IoSend } from "react-icons/io5";
import smtConfig from "../../smt-config.mjs";

export default function ChatCynthia() {
  const { username, photourl, email, isLogin } = useLocalStorge(false);
  const [userPrompt, setUserPrompt] = useState(
    "สวัสดี Cynthia คุณช่วยฉันหน่อยได้ไหม?"
  );

  const [cynthiaPrompt, setCynthiaPrompt] = useState(
    "ฉันยินดีที่จะช่วยนะคะ บอกมาเลยว่าคุณต้องการอะไร?"
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUserPrompt(input);
      AskCynthia(input);
    }
  };

  function AskCynthia(prompt: string) {
    setCynthiaPrompt("Cynthia กำลังคิดคำตอบ")
    setLoading(true)
    axios
      .post(
        `${smtConfig.apiMain}generative/cynthia`,
        {
          prompt: `${prompt}`,
        },
        {
          headers: {
            Auth: email,
          },
        }
      )
      .then((response) => {
        setCynthiaPrompt(`${response.data}`);
        setLoading(false)
      })
      .catch((error) => {
        setCynthiaPrompt(`${error.response.data}`);
        setLoading(false)
      });
  }

  return (
    <>
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
            </div>
          </div>
        </Card>

        {isLogin ? (
          <>
            <div className="space-y-4">
              <div>
                <ChatBubble
                  isRtl={true}
                  name={username}
                  img={photourl}
                  text={userPrompt}
                />
              </div>
              <div>
                <ChatBubble
                  isRtl={false}
                  name="Cynthia"
                  img={CynthiaProfile.src}
                  text={cynthiaPrompt}
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
                      isProcessing
                      style={{ backgroundColor: "#ff1616" }}
                      color="blue"
                    >
                      กำลังรอคำตอบ
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => { setUserPrompt(input); AskCynthia(input); }}
                      style={{ backgroundColor: "#ff1616" }}
                      color="blue"
                    >
                      <IoSend className="h-6 w-6" />
                    </Button>
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
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">กรุณาล็อกอิน</h1>
                  <p className="mb-4 leading-relaxed text-gray-900">ก่อนใช้งานฟีเจอร์นี้</p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
