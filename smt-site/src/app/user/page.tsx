"use client";

import { useState } from "react";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaPencilRuler, FaBook, FaEraser, FaBullhorn, FaPowerOff } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { FaClipboardUser } from "react-icons/fa6";
import axios from "axios";
import {
  Alert,
  Button,
  Modal,
  TextInput,
  Label,
  Textarea,
} from "flowbite-react";
import { SiGoogleclassroom } from "react-icons/si";
import useLocalStorge from "../lib/localstorage-db";
import Turnstile from "react-turnstile";
import { BsPencilSquare } from "react-icons/bs";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const [title] = useState("Hatyaiwit - ผู้ใช้งาน");
  const { email, username, photourl, showAlert } = useLocalStorge(true);
  const [showCaptcha, setshowCaptcha] = useState(true);
  const [message, setMessage] = useState("เตือน !");
  const [openAlert, setOpenAlert] = useState(false);
  const [openLineAlert, setOpenLineAlert] = useState(false);
  const [openAmModal, setOpenAmModal] = useState(false);
  const [openLoAAModal, setOpenLoAAModal] = useState(false);
  const [openHwModal, setOpenHwModal] = useState(false);
  const [openCcModal, setOpenCcModal] = useState(false);
  const [openStuModal, setOpenStuModal] = useState(false);
  const [text, setText] = useState("");
  const [subj, setSubj] = useState("");
  const [time, setTime] = useState("");
  const [decs, setDecs] = useState("");
  const [due, setDue] = useState("");
  const [code, setCode] = useState("");
  const [teacher, setTeacher] = useState("");
  const [number, setNumber] = useState("");
  const [boy, setBoy] = useState("");
  const [girl, setGirl] = useState("");
  const [absent, setAbsent] = useState("");
  const [author, setAuthor] = useState("");

  function onCloseModal() {
    setOpenHwModal(false);
    setOpenCcModal(false);
    setOpenStuModal(false);
    setOpenAmModal(false);
    setOpenLoAAModal(false);
  }

  const submitAnnouncement = () => {
    axios
      .patch(
        `https://api.smt.siraphop.me/announcement`,
        {
          msg: text,
        },
        {
          headers: {
            Auth: email,
          },
        },
      )
      .then((response) => {
        setMessage(`อัพเดทข้อความแล้ว ${response.data}`);
        setOpenAmModal(false);
        setOpenAlert(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถอัพเดทข้อความได้ ${error.response.data}`);
        setOpenAmModal(false);
        setOpenAlert(true);
      });
  };

  const submitAbsent = () => {
    axios
      .post(
        `https://api.smt.siraphop.me/absent`,
        {
          zabs: absent,
          zboy: boy,
          zdate: time,
          zgirl: girl,
          date: time,
          number: number,
        },
        {
          headers: {
            Auth: email,
          },
        },
      )
      .then((response) => {
        setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
        setOpenStuModal(false);
        setOpenAlert(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
        setOpenStuModal(false);
        setOpenAlert(true);
      });
  };

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
        setOpenHwModal(false);
        setOpenAlert(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
        setOpenHwModal(false);
        setOpenAlert(true);
      });
  };

  const submitClasscode = () => {
    axios
      .post(
        `https://api.smt.siraphop.me/classcode`,
        {
          code: code,
          subj: subj,
          teac: teacher,
        },
        {
          headers: {
            Auth: email,
          },
        },
      )
      .then((response) => {
        setMessage(`บันทึกข้อมูลแล้ว ${response.data}`);
        setOpenCcModal(false);
        setOpenAlert(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถส่งข้อมูลได้ ${error.response.data}`);
        setOpenCcModal(false);
        setOpenAlert(true);
      });
  };

  const submitLineOAAnounment = () => {
    axios
      .post(
        `https://api.smt.siraphop.me/line/announcement`,
        {
          author: author,
          date: time,
          msg: decs,
        },
        {
          headers: {
            Auth: email,
          },
        },
      )
      .then((response) => {
        setMessage(`ส่งข้อความ ${response.data}`);
        setOpenLoAAModal(false);
        setOpenLineAlert(true);
      })
      .catch((error) => {
        setMessage(`ไม่สามารถส่งข้อความได้ ${error.response.data}`);
        setOpenLoAAModal(false);
        setOpenLineAlert(true);
      });
  };

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
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
          {showCaptcha ? (<></>)
            : (<>
              <Button style={{ margin: 'auto', marginTop: '15px', backgroundColor: "#ff1616" }} onClick={() => {
                const auth = getAuth();
                signOut(auth).then(() => {
                  router.push("/");
                }).catch((error) => {
                  setMessage(`${error.message}`);
                  setOpenAlert(true);
                });
              }}>
                <FaPowerOff style={{ marginRight: '9px' }} className="h-6 w-6" />
                ออกจากระบบ
              </Button>
            </>)}
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
              <span className="font-medium">แจ้งเตือน !</span> สามารถ แก้ไข /
              เพิ่ม ข้อมูลภายในเว็ปไซต์ได้จากหน้านี้
            </Alert>
            {showCaptcha ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ marginBottom: '15px', marginTop: '25px' }}>เรากำลังตรวจสอบว่าคุณเป็นมนุษย์ ก่อนเข้าสู่หน้าผู้ใช้ โปรดยืนยันตัวตนของคุณผ่าน CAPTCHA</p>
                  <Turnstile
                    sitekey="0x4AAAAAAAwmJyPRGMPSMEvC"
                    theme="light"
                    language={"th"}
                    onVerify={() => {
                      setshowCaptcha(false);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <section className="body-font animate__animated animate__fadeInUp">
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
                          <FaBullhorn
                            style={{ color: "white" }}
                            className="h-7 w-7"
                          />
                        </div>
                        <div className="flex-grow pl-6">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            แก้ไขประกาศ
                          </h2>
                          <p className="leading-relaxed text-base">
                            ข้อความประกาศของเว็ปไซต์
                          </p>
                          <Button
                            onClick={() => setOpenAmModal(true)}
                            style={{ backgroundColor: "#2d76ff" }}
                            color="blue"
                          >
                            <FaEraser className="mr-2 h-5 w-5" />
                            แก้ไขข้อมูล
                          </Button>
                        </div>
                      </div>
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
                            onClick={() => setOpenHwModal(true)}
                            style={{ backgroundColor: "#2d76ff" }}
                            color="blue"
                          >
                            <FaPencilRuler className="mr-2 h-5 w-5" />
                            บันทึกข้อมูล
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 md:w-1/3 flex">
                        <div
                          style={{ backgroundColor: "#2d76ff" }}
                          className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                        >
                          <SiGoogleclassroom
                            style={{ color: "white" }}
                            className="h-7 w-7"
                          />
                        </div>
                        <div className="flex-grow pl-6">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            เพิ่มข้อมูลรหัสห้องเรียน
                          </h2>
                          <p className="leading-relaxed text-base">
                            ข้อมูลรหัสห้องเรียน จาก ครูแต่ละวิชา โดยฝ่ายการเรียน
                          </p>
                          <Button
                            onClick={() => setOpenCcModal(true)}
                            style={{ backgroundColor: "#2d76ff" }}
                            color="blue"
                          >
                            <FaPencilRuler className="mr-2 h-5 w-5" />
                            บันทึกข้อมูล
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 md:w-1/3 flex">
                        <div
                          style={{ backgroundColor: "#2d76ff" }}
                          className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                        >
                          <FaClipboardUser
                            style={{ color: "white" }}
                            className="h-7 w-7"
                          />
                        </div>
                        <div className="flex-grow pl-6">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            เช็คชื่อนักเรียน
                          </h2>
                          <p className="leading-relaxed text-base">
                            เช็คจำนวนสมาชิกภายในห้อง โดยฝ่ายสารวัตร
                          </p>
                          <Button
                            onClick={() => setOpenStuModal(true)}
                            style={{ backgroundColor: "#2d76ff" }}
                            color="blue"
                          >
                            <FaPencilRuler className="mr-2 h-5 w-5" />
                            บันทึกข้อมูล
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 md:w-1/3 flex">
                        <div
                          style={{ backgroundColor: '#00b900' }}
                          className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                        >
                          <FaBullhorn
                            style={{ color: "white" }}
                            className="h-7 w-7"
                          />
                        </div>
                        <div className="flex-grow pl-6">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            ส่งข้อความประกาศ
                          </h2>
                          <p className="leading-relaxed text-base">
                            ส่งข่าวสาร / ประกาศต่างๆ ไปทาง Line Offical
                          </p>
                          <Button
                            onClick={() => setOpenLoAAModal(true)}
                            style={{ backgroundColor: '#00b900' }}
                            color="success"
                          >
                            <BsPencilSquare className="mr-2 h-5 w-5" />
                            ร่างข้อความ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </div>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openAmModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มอัพเดทข้อความ ประกาศ
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่ข้อความประกาศ" />
              </div>
              <TextInput
                placeholder="ประกาศ"
                onChange={(event) => setText(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button
                onClick={submitAnnouncement}
                style={{ backgroundColor: "#2d76ff" }}
                color="blue"
              >
                อัพเดทข้อมูล
                <GrUpdate className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openHwModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
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
        className="animate__animated animate__fadeIn"
        show={openCcModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มบันทึกข้อมูล รหัสห้องเรียน
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วิชาของรหัสห้องเรียน" />
              </div>
              <TextInput
                placeholder="วิชา"
                onChange={(event) => setSubj(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่รหัสห้องเรียน" />
              </div>
              <TextInput
                onChange={(event) => setCode(event.target.value)}
                type="text"
                placeholder="Code"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่ชื่อครูผู้สอน" />
              </div>
              <TextInput
                type="text"
                onChange={(event) => setTeacher(event.target.value)}
                placeholder="คุณครู"
                required
              />
            </div>
            <div className="w-full">
              <Button
                onClick={submitClasscode}
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
        className="animate__animated animate__fadeIn"
        show={openStuModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มบันทึกข้อมูล สถิตินักเรียน
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วันที่" />
              </div>
              <TextInput
                placeholder="วว / ดด / ปป"
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่เลขที่ขาด (ไม่มีใส่ -)" />
              </div>
              <TextInput
                onChange={(event) => setNumber(event.target.value)}
                type="text"
                placeholder="1 , 2 , 3"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="จำนวนนักเรียน (ที่ขาด)" />
              </div>
              <TextInput
                type="text"
                onChange={(event) => setAbsent(event.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="จำนวนนักเรียนชาย (ที่มา)" />
              </div>
              <TextInput
                type="text"
                onChange={(event) => setBoy(event.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="จำนวนนักเรียนหญิง (ที่มา)" />
              </div>
              <TextInput
                type="text"
                onChange={(event) => setGirl(event.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="w-full">
              <Button
                onClick={submitAbsent}
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
        className="animate__animated animate__fadeIn"
        show={openLoAAModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบร่างข้อความ ประกาศ
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วันที่" />
              </div>
              <TextInput
                placeholder="วว / ดด / ปป"
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ประกาศจาก" />
              </div>
              <TextInput
                placeholder="คุณครู.. , สำนักงานคณะกรรมการนักเรียน"
                onChange={(event) => setAuthor(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่รายละเอียดประกาศ" />
              </div>
              <Textarea
                onChange={(event) => setDecs(event.target.value)}
                placeholder="รายละเอียดประกาศ"
                required
              />
            </div>
            <div className="w-full">
              <Button
                onClick={submitLineOAAnounment}
                style={{ backgroundColor: '#00b900' }}
                color="success"
              >
                ส่งข้อความ
                <IoSend className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="animate__animated animate__fadeIn"
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
      <Modal
        className="animate__animated animate__fadeIn"
        show={openLineAlert}
        size="md"
        onClose={() => setOpenLineAlert(false)}
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
                style={{ backgroundColor: '#00b900' }}
                color="success"
                onClick={() => setOpenLineAlert(false)}
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
