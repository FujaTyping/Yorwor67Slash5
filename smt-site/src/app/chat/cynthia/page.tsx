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
  const { username, photourl, email } = useLocalStorge(false);
  const [userPrompt, setUserPrompt] = useState(
    "สวัสดี Cynthia คุณช่วยฉันหน่อยได้ไหม?"
  );

  const [cynthiaPrompt, setCynthiaPrompt] = useState(
    "ฉันยินดีที่จะช่วยนะคะ บอกมาเลยว่าคุณต้องการอะไร?"
  );
  const [input, setInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUserPrompt(input);
      AskCynthia(input);
    }
  };

  function AskCynthia(prompt: string) {
    setCynthiaPrompt("Cynthia กำลังคิดคำตอบ")
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
      })
      .catch((error) => {
        setCynthiaPrompt(`${error.response.data}`);
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
              className="w-20 h-20 rounded-full object-cover"
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
            <Button
              onClick={() => { setUserPrompt(input); AskCynthia(input); }}
              style={{ backgroundColor: "#ff1616" }}
              color="blue"
            >
              <IoSend className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
