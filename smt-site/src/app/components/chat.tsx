import { useState, useEffect } from "react";
import { Badge, Modal, Button, Label, Textarea } from "flowbite-react";
import { SiGooglegemini } from "react-icons/si";
import { motion } from "motion/react"
import Markdown from 'react-markdown'
import { FaPencilAlt } from "react-icons/fa";
import useSound from 'use-sound';
import { MdMemory } from "react-icons/md";

interface ChatAtrib {
  isRtl: boolean;
  name: string;
  img: string;
  text: string;
  isBot?: boolean;
  isUser?: boolean;
}

export default function ChatBubble({ isRtl, name, img, text, isBot, isUser }: ChatAtrib) {
  const [openModal, setOpenModal] = useState(false)
  const [personality, setPersonality] = useState("")
  const [isError, setIsError] = useState(false)
  const [CynthiaData] = useSound("/assets/Sound/CynthiaDataSaved.wav");

  function onCloseModal() {
    setOpenModal(false)
  }

  const changePersonal = async () => {
    if (personality == "") {
      return setIsError(true);
    }

    try {
      localStorage.setItem("personality", personality);
      CynthiaData();
      setIsError(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setIsError(true);
    }
  };

  const loadPersonality = async () => {
    try {
      const storedPersonality = localStorage.getItem("personality");
      if (storedPersonality) {
        setPersonality(storedPersonality);
      }
    } catch (error) {
      console.error("Error reading data from localStorage:", error);
    }
  };

  useEffect(() => {
    loadPersonality();
  }, []);

  return (
    <>
      <motion.div
        key={text}
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div style={{ paddingLeft: '0', paddingRight: '0' }} className="container">
          <div className="flex items-start gap-2.5 flex-wrap">
            <img
              className="w-10 h-10 rounded-full"
              src={img}
              alt="Profile"
            />
            <div className="flex flex-col w-full max-w-[450px] leading-1.5 p-4 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span dir="ltr" className="flex text-lg font-semibold items-center">
                  {name} {isUser && (<><FaPencilAlt onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }} className="ml-3 w-3.5 h-3.5" /></>)}
                </span>
              </div>
              <div dir="ltr" className="text-base font-normal py-2.5 break-words">
                <Markdown>{text}</Markdown>
              </div>
              {isBot && (
                <Badge
                  className="mt-2"
                  style={{
                    maxWidth: '130px',
                    color: 'white',
                    background: 'linear-gradient(to right, #4884f1, #d36678)'
                  }}
                  icon={SiGooglegemini}
                >
                  gemini-1.5-flash
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              ช่วยให้ Cynthia เข้าใจคุณมากขึ้น
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="คุณอยากให้ Cynthia รู้ข้อมูลอะไรเกี่ยวกับคุณ เพื่อช่วยให้ตอบคำถามได้ดีขึ้น?" />
              </div>
              <Textarea
                value={personality}
                onChange={(event) => setPersonality(event.target.value)}
                placeholder="ข้อมูลบุคลิก"
                required
              />
              <span className="flex mt-5 items-center">
                <MdMemory className="w-5 h-5 mr-2" /> ข้อมูลบุคลิกจะอัพเดทในแชทครั้งถัดไป
              </span>
            </div>
            <div className="w-full">
              <>
                {isError ? (
                  <>
                    <Button
                      onClick={changePersonal}
                      style={{ backgroundColor: "#ff1616" }}
                      color="blue"
                      className="animate__animated animate__shakeX"
                    >
                      บันทึกข้อมูล
                      <FaPencilAlt className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={changePersonal}
                      style={{ backgroundColor: "#2d76ff" }}
                      color="blue"
                    >
                      บันทึกข้อมูล
                      <FaPencilAlt className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
              </>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
