"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaPencilRuler, FaBook } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {
  Alert,
  Button,
  Modal,
  TextInput,
  Label,
  Textarea,
} from "flowbite-react";

export default function Admin() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(true);
  const [title] = useState("Hatyaiwit - ผู้ดูแลระบบ");
  const [email, setEmail] = useState("ด้วย Gmail");
  const [username, setUsername] = useState("กรุณาล็อกอิน");
  const [photourl, setPhotourl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBID1Qv2l9GtFuT6X24KagJ10o4IbL1zuebg&s",
  );
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("เตือน !");
  const [openModal, setOpenModal] = useState(false);
  const [subj, setSubj] = useState("");
  const [time, setTime] = useState("");
  const [decs, setDecs] = useState("");
  const [due, setDue] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }

  const submitHomework = () => {
    axios
      .post(
        `https://api.smt.siraphop.me/homework`,
        {
          subj: subj,
          time: time,
          decs: decs,
          due: due,
        },
        {
          headers: {
            Auth: email,
          },
        },
      )
      .then((response) => {
        setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
        setOpenModal(false);
        setOpenAlert(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
        setOpenModal(false);
        setOpenAlert(true);
      });
  };

  useEffect(() => {
    const request = indexedDB.open("firebaseLocalStorageDb", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["firebaseLocalStorage"], "readonly");
      const objectStore = transaction.objectStore("firebaseLocalStorage");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        const data = getAllRequest.result;
        const user = data[0]?.value;

        if (!user) {
          return router.push("/");
        }

        setEmail(user.email);
        setUsername(user.displayName);
        setPhotourl(user.photoURL);

        if (!user.email.includes("@hatyaiwit.ac.th")) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      };

      getAllRequest.onerror = () => {
        console.error("Error accessing firebaseLocalStorage");
      };
    };

    request.onerror = (event) => {
      console.error((event.target as IDBOpenDBRequest).error);
    };
  }, []);
  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>ยินดีต้อนรับ !</h1>
        <div style={{ margin: "auto", maxWidth: "33rem" }} className="p-2">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="Profile"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={photourl}
            ></img>
            <div className="flex-grow">
              <h2 className="title-font font-medium">{username}</h2>
              <p>{email}</p>
            </div>
          </div>
        </div>
        <h1 style={{ marginTop: "25px" }} className="border-t"></h1>
        {showAlert ? (
          <Alert
            style={{ marginTop: "30px" }}
            additionalContent={
              "หากต้องการเปลื่ยนแปลงข้อมูลในเว็ปไซต์ ต้องใช้อีเมล @hatyaiwit.ac.th เท่านั้น"
            }
            color="failure"
            icon={HiInformationCircle}
          >
            <span className="font-medium">แจ้งเตือน !</span> กรุณาใช้อีเมล
            @hatyaiwit.ac.th
          </Alert>
        ) : (
          <>
            <Alert
              style={{ marginTop: "30px" }}
              color="success"
              icon={HiInformationCircle}
            >
              <span className="font-medium">แจ้งเตือน !</span>{" "}
              ระบบหลังบ้านกำลังจะมาเร็วๆนี้
            </Alert>
            <section className="body-font">
              <div
                style={{ maxWidth: "100%" }}
                className="container px-5 py-24 mx-auto"
              >
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                  <div className="p-4 md:w-1/3 flex">
                    <div
                      style={{ backgroundColor: "#2d76ff" }}
                      className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                    >
                      <FaBook style={{ color: "white" }} className="h-7 w-7" />
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                        เพิ่มข้อมูลการบ้าน
                      </h2>
                      <p className="leading-relaxed text-base">
                        ข้อมูลการบ้านในแต่ละวัน โดยฝ่ายการเรียน
                      </p>
                      <Button
                        onClick={() => setOpenModal(true)}
                        style={{ backgroundColor: "#2d76ff" }}
                        color="blue"
                      >
                        <FaPencilRuler className="mr-2 h-5 w-5" />
                        บันทึกข้อมูล
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <Modal show={openModal} onClose={onCloseModal} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มบันทึกข้อมูล การบ้าน
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วิชาการบ้าน" />
              </div>
              <TextInput
                placeholder="วิชา"
                onChange={(event) => setSubj(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วันที่" />
              </div>
              <TextInput
                onChange={(event) => setTime(event.target.value)}
                type="text"
                placeholder="วว / ดด / ปป"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่รายละเอียดงาน" />
              </div>
              <Textarea
                onChange={(event) => setDecs(event.target.value)}
                placeholder="รายละเอียดงาน"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วันกำหนดส่ง" />
              </div>
              <TextInput
                type="text"
                onChange={(event) => setDue(event.target.value)}
                placeholder="วว / ดด / ปป"
                required
              />
            </div>
            <div className="w-full">
              <Button
                onClick={submitHomework}
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
              >
                ส่งข้อมูล
                <IoSend className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openAlert}
        size="md"
        onClose={() => setOpenAlert(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
                onClick={() => setOpenAlert(false)}
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
