import { useState, useEffect } from "react";
import { Badge, Modal, Button, Label, Textarea } from "flowbite-react";
import { SiGooglegemini } from "react-icons/si";
import { motion } from "motion/react"
import Markdown from 'react-markdown'
import { FaPencilAlt } from "react-icons/fa";
import { openDB } from "idb";
import useSound from 'use-sound';

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
      const db = await openDB("CynthiaDB", 1, {
        upgrade(database) {
          if (!database.objectStoreNames.contains("PersonalData")) {
            database.createObjectStore("PersonalData", { keyPath: "id", autoIncrement: true });
          }
        },
      });

      const allData = await db.getAll("PersonalData");

      if (allData.length > 0) {
        const recordToUpdate = allData[0];
        recordToUpdate.personality = personality;

        await db.put("PersonalData", recordToUpdate);
        CynthiaData();
        setIsError(false)
        setOpenModal(false)
      } else {
        await db.add("PersonalData", { personality });
        CynthiaData();
        setIsError(false)
        setOpenModal(false)
      }
    } catch (error) {
      console.error("Error saving to IndexedDB:", error);
      setIsError(true)
    }
  };

  const loadPersonality = async () => {
    try {
      const db = await openDB("CynthiaDB", 1);
      const allData = await db.getAll("PersonalData");

      if (allData.length > 0) {
        setPersonality(`${allData[0].personality}`);
      }
    } catch (error) {
      console.error("Error reading data from IndexedDB:", error);
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
                  {name} {isUser && (<><FaPencilAlt onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }} className="ml-3" /></>)}
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
