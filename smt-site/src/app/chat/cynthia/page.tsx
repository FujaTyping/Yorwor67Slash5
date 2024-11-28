"use client";

import { useState } from "react";
import useLocalStorge from "../../lib/localstorage-db";
import { FloatingLabel, Button, Card } from "flowbite-react";
import CynthiaProfile from "../../assets/Cynthia.jpg";
import ChatBubble from "@/app/components/chat";

export default function ChatCynthia() {
  const { email, username, photourl, showAlert } = useLocalStorge(true);
  const [userPrompt, setUserPrompt] = useState(
    "Hello Cynthia Chan. Can you help me with something?"
  );
  const [cynthiaPrompt, setCynthiaPrompt] = useState(
    `What can I help you? I would be really happy to assist!`
  );
  const [input, setInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUserPrompt(input);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 space-y-6 max-w-3xl">
        <Card className="flex flex-row items-center p-4">
          <div className="flex flex-row flex-shrink-0 w-16 h-16 mr-4">
            <img
              src={CynthiaProfile.src}
              alt="Profile picture"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="ml-6 pt-0.5">
              <span className="text-sm font-semibold text-green-500">
                Status: Online 🟢
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cynthia Novana
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              ทุกความพยายามคือก้าวเล็ก ๆ
              ที่พาเธอไปถึงความฝัน—อย่าลืมยิ้มให้ตัวเองในทุกก้าวนะ!
            </p>
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
              name="Cynthia Chan"
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
              variant="filled"
              label="Chat With Cynthia"
              helperText="Remember, Cynthia is an AI chatbot."
              className="w-full"
            />
          </div>

          <div className="pb-10 flex-shrink-0">
            <Button
              onClick={() => setUserPrompt(input)}
              className="px-6 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-red-600 to-red-400 hover:from-red-400 hover:to-red-600 transition-all duration-200 ease-in-out"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
