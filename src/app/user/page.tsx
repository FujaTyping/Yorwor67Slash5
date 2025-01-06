"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  HiInformationCircle,
} from "react-icons/hi";
import { FaPencilRuler, FaBook, FaEraser, FaBullhorn, FaUser, FaClipboardList } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaServer } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { FaClipboardUser, FaArrowTrendDown } from "react-icons/fa6";
import axios from "axios";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {
  Flowbite,
  Alert,
  Button,
  Modal,
  TextInput,
  Label,
  Textarea,
  Datepicker,
  FileInput,
  Tooltip,
  Tabs
} from "flowbite-react";
import { SiGoogleclassroom } from "react-icons/si";
import { LuPartyPopper } from "react-icons/lu";
import { AiFillPicture } from "react-icons/ai";
import useLocalStorge from "../lib/localstorage-db";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../lib/firebase-storage";
import { BsPencilSquare } from "react-icons/bs";
import smtConfig from "../smt-config.mjs"
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineUploadFile } from "react-icons/md";

const ywTheme: CustomFlowbiteTheme = {
  datepicker: {
    popup: {
      footer: {
        button: {
          today:
            "bg-blue-700 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
        },
      },
    },
    views: {
      days: {
        items: {
          item: {
            selected: "bg-blue-700 text-white hover:bg-blue-600",
          },
        },
      },
    },
  },
  tabs: {
    tablist: {
      tabitem: {
        variant: {
          underline: {
            active: {
              on: "active rounded-t-lg border-b-2 border-blue-600 text-blue-600",
              off: "border-b-2 border-transparent text-gray-500 hover:border-blue-300 hover:text-gray-600"
            }
          }
        }
      }
    }
  }
};

export default function User() {
  const [title, setTitleWeb] = useState("Hatyaiwit - ผู้ใช้งาน");
  const { email, username, photourl, showAlert } = useLocalStorge(true);
  const [permessage, setPerMessage] = useState("Guest");
  const [openAmModal, setOpenAmModal] = useState(false);
  const [openLoAAModal, setOpenLoAAModal] = useState(false);
  const [openHwModal, setOpenHwModal] = useState(false);
  const [openCcModal, setOpenCcModal] = useState(false);
  const [openStuModal, setOpenStuModal] = useState(false);
  const [openComModal, setOpenComModal] = useState(false);
  const [openActModal, setOpenActModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPermission, setIsPermission] = useState(false);
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
  const [titleCom, setTitleCom] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePrv, setFilePrv] = useState("");
  const [titleAct, setTitleAct] = useState("");
  const [dateAct, setDateAct] = useState("");
  const [api1down, setApi1down] = useState(true);
  const [api2down, setApi2down] = useState(true);
  const [api3down, setApi3down] = useState(true);

  function onCloseModal() {
    setOpenHwModal(false);
    setOpenCcModal(false);
    setOpenStuModal(false);
    setOpenAmModal(false);
    setOpenLoAAModal(false);
    setOpenCcModal(false);
    setOpenComModal(false);
    setOpenActModal(false);
  }

  const submitAnnouncement = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    axios
      .patch(
        `${smtConfig.apiUser}announcement`,
        {
          msg: text,
        },
        {
          headers: {
            Auth: email,
          },
        }
      )
      .then((response) => {
        toast.update(id, { render: `อัพเดทข้อความแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, { render: `ไม่สามารถอัพเดทข้อความได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      });
  };

  const submitAbsent = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    axios
      .post(
        `${smtConfig.apiUser}absent`,
        {
          zabs: `${absent}`,
          zboy: `${boy}`,
          zdate: time,
          zgirl: `${girl}`,
          date: time,
          number: number,
        },
        {
          headers: {
            Auth: email,
          },
        }
      )
      .then((response) => {
        toast.update(id, { render: `บันทึกข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 5000 });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      });
  };

  const submitHomework = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    axios
      .post(
        `${smtConfig.apiUser}assignment`,
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
        }
      )
      .then((response) => {
        toast.update(id, { render: `บันทึกข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 5000 });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 8000 });
        setIsLoading(false);
      });
  };

  const submitClasscode = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    axios
      .post(
        `${smtConfig.apiUser}classcode`,
        {
          code: code,
          subj: subj,
          teac: teacher,
        },
        {
          headers: {
            Auth: email,
          },
        }
      )
      .then((response) => {
        toast.update(id, { render: `บันทึกข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 5000 });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 8000 });
        setIsLoading(false);
      });
  };

  const submitLineOAAnounment = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    setIsLoading(true);
    axios
      .post(
        `${smtConfig.apiUser}line/announcement`,
        {
          author: author,
          date: time,
          msg: decs,
        },
        {
          headers: {
            Auth: email,
          },
        }
      )
      .then((response) => {
        toast.update(id, { render: `ส่งข้อความ ${response.data}`, type: "success", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, { render: `ไม่สามารถส่งข้อความได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      });
  };

  const submitActivities = async () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    const TToday = new Date();
    const TThaiDate = new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(TToday);
    if (!titleAct || !decs || !dateAct) {
      toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ กรุณากรอกข้อมูลให้ครบถ้วน`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
    } else {
      if (file) {
        setIsLoading(true);
        const storageRef = ref(storage, `Activities/${file.name}`);
        try {
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          console.log(titleAct, decs, dateAct, url);
          axios
            .post(
              `${smtConfig.apiUser}activities`,
              {
                title: titleAct,
                decs: decs,
                date: dateAct,
                url: url,
                updatee: TThaiDate
              },
              {
                headers: {
                  Auth: email,
                },
              }
            )
            .then((response) => {
              toast.update(id, { render: `บันทึกข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 5000 });
              setFile(null);
              setIsLoading(false);
            })
            .catch((error) => {
              toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
              setIsLoading(false);
            });
        } catch (error) {
          toast.update(id, { render: `ไม่สามารถบันทึกไฟล์ได้ ${error}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
          setIsLoading(false);
        }
      } else {
        toast.update(id, { render: `กรุณาเลือกไฟล์`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      }
    }
  }

  const submitCompetition = async () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    if (!titleCom || !decs || !time) {
      toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ กรุณากรอกข้อมูลให้ครบถ้วน`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
    } else {
      if (file) {
        setIsLoading(true);
        const storageRef = ref(storage, `Reward/${file.name}`);
        try {
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          axios
            .post(
              `${smtConfig.apiUser}completion`,
              {
                title: titleCom,
                decs: decs,
                time: time,
                url: url,
              },
              {
                headers: {
                  Auth: email,
                },
              }
            )
            .then((response) => {
              toast.update(id, { render: `บันทึกข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 5000 });
              setFile(null);
              setIsLoading(false);
            })
            .catch((error) => {
              toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
              setIsLoading(false);
            });
        } catch (error) {
          toast.update(id, { render: `ไม่สามารถบันทึกไฟล์ได้ ${error}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
          setIsLoading(false);
        }
      } else {
        toast.update(id, { render: `กรุณาเลือกไฟล์`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
        setIsLoading(false);
      }
    }
  };

  function checkAPIserver() {
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
  }

  useEffect(() => {
    if (email) {
      setTitleWeb(`Hatyaiwit - ผู้ใช้งาน ${email}`)
      checkAPIserver();
      axios
        .get(`${smtConfig.apiUser}permission`, {
          headers: {
            Auth: email,
          },
        })
        .then((response) => {
          setPerMessage(response.data);
          if (response.data == 'Admin') {
            setIsPermission(true);
          }
        })
        .catch(() => {
          setIsPermission(false);
        });
    }
    const TToday = new Date();
    const TThaiDate = new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(TToday);
    setTime(TThaiDate)
  }, [email]);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <ToastContainer position="bottom-right" newestOnTop draggable hideProgressBar={false} />
      <div className="container">
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-3xl md:text-4xl mb-2">ยินดีต้อนรับ</h1>
          <div className="flex">
            <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
          </div>
        </div>
        <div style={{ margin: "auto", maxWidth: "33rem" }} className="p-2">
          <div className="h-full flex flex-col md:flex-row items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="Profile"
              className="w-20 h-20 mb-2 md:mb-0 md:w-16 md:h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-0 md:mr-4"
              src={photourl}
            />
            <div className="flex-grow">
              <h2 className="title-font font-medium">{username}</h2>
              <div className="flex items-center flex-row">
                {permessage == "Admin" ? (
                  <>
                    <Link href={"/user/dashboard"}>
                      <Tooltip content={permessage} style="light">
                        <MdAdminPanelSettings className="w-5 h-5 mr-2 " />
                      </Tooltip>
                    </Link>
                  </>
                ) : (
                  <>
                    <Tooltip content={permessage} style="light">
                      <FaUser className="w-4 h-4 mr-2" />
                    </Tooltip>
                  </>
                )}
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
        {showAlert ? (
          <>
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
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img style={{ width: "350px" }} className="object-cover object-center rounded" alt="hero" src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-flat-login-icon-with-password-access-and-padlock-concept-vector-png-image_41882582.jpg" />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">บุคคลภายนอก @hatyaiwit.ac.th</h1>
                  <p className="mb-4 leading-relaxed text-gray-900">กรุณาใช้อีเมล โรงเรียน @hatyaiwit.ac.th</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {isPermission ? (
              <></>
            ) : (
              <>
                <Alert
                  style={{ marginTop: "30px" }}
                  color="warning"
                  icon={HiInformationCircle}
                >
                  <span className="font-medium">แจ้งเตือน !</span> อีเมล {email} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์
                </Alert>
              </>
            )}
            <section className="body-font animate__animated animate__fadeInUp mt-3 md:mb-5">
              <Flowbite theme={{ theme: ywTheme }}>
                <Tabs variant="underline">
                  <Tabs.Item active title="ฝ่ายการเรียน" icon={FaBook}>
                    <div
                      style={{ maxWidth: "100%", paddingTop: '20px' }}
                      className="container px-5 py-24 mx-auto"
                    >
                      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/3 flex">
                          <div
                            style={{ backgroundColor: "#2d76ff" }}
                            className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                          >
                            <FaBook
                              style={{ color: "white" }}
                              className="h-7 w-7"
                            />
                          </div>
                          <div className="flex-grow pl-6">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                              เพิ่มข้อมูลภาระงาน
                            </h2>
                            <p className="leading-relaxed text-base">
                              ข้อมูลภาระงานในแต่ละวัน โดยฝ่ายการเรียน
                            </p>
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenHwModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenHwModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            )}
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
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenCcModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenCcModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="ฝ่ายสารวัตร" icon={FaClipboardList}>
                    <div
                      style={{ maxWidth: "100%", paddingTop: '20px' }}
                      className="container px-5 py-24 mx-auto"
                    >
                      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
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
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenStuModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenStuModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="ฝ่ายกิจกรรม" icon={LuPartyPopper}>
                    <div
                      style={{ maxWidth: "100%", paddingTop: '20px' }}
                      className="container px-5 py-24 mx-auto"
                    >
                      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/3 flex">
                          <div
                            style={{ backgroundColor: "#2d76ff" }}
                            className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                          >
                            <AiFillPicture
                              style={{ color: "white" }}
                              className="h-7 w-7"
                            />
                          </div>
                          <div className="flex-grow pl-6">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                              เพิ่มข้อมูลการแข่งขัน
                            </h2>
                            <p className="leading-relaxed text-base">
                              ข้อมูลการแข่งขันของนักเรียน
                            </p>
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenComModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenComModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex">
                          <div
                            style={{ backgroundColor: "#2d76ff" }}
                            className="w-12 h-12 inline-flex items-center justify-center rounded-full text-indigo-500 mb-4 flex-shrink-0"
                          >
                            <LuPartyPopper
                              style={{ color: "white" }}
                              className="h-7 w-7"
                            />
                          </div>
                          <div className="flex-grow pl-6">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                              เพิ่มข้อมูลกิจกรรม
                            </h2>
                            <p className="leading-relaxed text-base">
                              บันทึกกิจกรรม โดยฝ่ายกิจกรรม
                            </p>
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenActModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenActModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaPencilRuler className="mr-2 h-5 w-5" />
                                  บันทึกข้อมูล
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="แก้ไขเว็ปไชต์" icon={BsPencilSquare}>
                    <div
                      style={{ maxWidth: "100%", paddingTop: '20px' }}
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
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenAmModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaEraser className="mr-2 h-5 w-5" />
                                  แก้ไขข้อมูล
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenAmModal(true)}
                                  style={{ backgroundColor: "#2d76ff" }}
                                  color="blue"
                                >
                                  <FaEraser className="mr-2 h-5 w-5" />
                                  แก้ไขข้อมูล
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex">
                          <div
                            style={{ backgroundColor: "#00b900" }}
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
                            {isPermission ? (
                              <>
                                <Button
                                  onClick={() => setOpenLoAAModal(true)}
                                  style={{ backgroundColor: "#00b900" }}
                                  color="success"
                                >
                                  <BsPencilSquare className="mr-2 h-5 w-5" />
                                  ร่างข้อความ
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button disabled
                                  onClick={() => setOpenLoAAModal(true)}
                                  style={{ backgroundColor: "#00b900" }}
                                  color="success"
                                >
                                  <BsPencilSquare className="mr-2 h-5 w-5" />
                                  ร่างข้อความ
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Item>
                </Tabs>
              </Flowbite>
              <div className="mt-8 md:mt-5">
                <h1 className="border-b text-2xl text-gray-600 flex items-center pb-3">
                  <FaServer className="mr-3" /> สถานะเชิฟเวอร์ API
                </h1>
                <div className="flex items-center justify-center mt-3">
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 w-full px-5">
                    {api1down ? (
                      <>
                        <div className="flex items-center p-4 bg-white rounded">
                          <div style={{ backgroundColor: "#ff1616" }} className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full">
                            <FaArrowTrendDown className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-grow flex flex-col ml-4">
                            <span className="text-xl">Vercel</span>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">สถานะ ณ ตอนนี้</span>
                              <span style={{ color: "#ff1616" }} className="text-sm font-semibold ml-2">ล่ม</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center p-4 bg-white rounded">
                          <div style={{ backgroundColor: "#2d76ff" }} className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full">
                            <HiOutlineStatusOnline className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-grow flex flex-col ml-4">
                            <span className="text-xl">Vercel</span>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">สถานะ ณ ตอนนี้</span>
                              <span style={{ color: "#2d76ff" }} className="text-sm font-semibold ml-2">กำลังทำงาน</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {api2down ? (
                      <>
                        <div className="flex items-center p-4 bg-white rounded">
                          <div style={{ backgroundColor: "#ff1616" }} className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full">
                            <FaArrowTrendDown className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-grow flex flex-col ml-4">
                            <span className="text-xl">Railway</span>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">สถานะ ณ ตอนนี้</span>
                              <span style={{ color: "#ff1616" }} className="text-sm font-semibold ml-2">ล่ม</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center p-4 bg-white rounded">
                          <div style={{ backgroundColor: "#2d76ff" }} className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full">
                            <HiOutlineStatusOnline className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-grow flex flex-col ml-4">
                            <span className="text-xl">Railway</span>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">สถานะ ณ ตอนนี้</span>
                              <span style={{ color: "#2d76ff" }} className="text-sm font-semibold ml-2">กำลังทำงาน</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {api3down ? (
                      <>
                        <div className="flex items-center p-4 bg-white rounded">
                          <div style={{ backgroundColor: "#ff1616" }} className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full">
                            <FaArrowTrendDown className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-grow flex flex-col ml-4">
                            <span className="text-xl">Render</span>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">สถานะ ณ ตอนนี้</span>
                              <span style={{ color: "#ff1616" }} className="text-sm font-semibold ml-2">ล่ม</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center p-4 bg-white rounded">
                          <div style={{ backgroundColor: "#2d76ff" }} className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full">
                            <HiOutlineStatusOnline className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-grow flex flex-col ml-4">
                            <span className="text-xl">Render</span>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">สถานะ ณ ตอนนี้</span>
                              <span style={{ color: "#2d76ff" }} className="text-sm font-semibold ml-2">กำลังทำงาน</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
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
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    อัพเดทข้อมูล
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitAnnouncement}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    อัพเดทข้อมูล
                    <GrUpdate className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
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
              แบบฟอร์มบันทึกข้อมูล ภาระงาน
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วิชาภาระงาน" />
              </div>
              <TextInput
                placeholder="วิชา"
                value={subj}
                onChange={(event) => setSubj(event.target.value)}
                required
              />
            </div>
            <div className="flex gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="ใส่วันที่" />
                </div>
                <Flowbite theme={{ theme: ywTheme }}>
                  <Datepicker
                    language="th"
                    labelTodayButton="วันนี้"
                    labelClearButton="ยกเลิก"
                    onChange={(date) =>
                      setTime(
                        `${date?.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}`
                      )
                    }
                  />
                </Flowbite>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="ใส่วันกำหนดส่ง" />
                </div>
                <Flowbite theme={{ theme: ywTheme }}>
                  <Datepicker
                    language="th"
                    labelTodayButton="วันนี้"
                    labelClearButton="ยกเลิก"
                    onChange={(date) =>
                      setDue(
                        `${date?.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}`
                      )
                    }
                  />
                </Flowbite>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่รายละเอียดงาน" />
              </div>
              <Textarea
                value={decs}
                onChange={(event) => setDecs(event.target.value)}
                placeholder="รายละเอียดงาน"
                required
              />
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitHomework}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
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
                value={subj}
                onChange={(event) => setSubj(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่รหัสห้องเรียน" />
              </div>
              <TextInput
                value={code}
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
                value={teacher}
                onChange={(event) => setTeacher(event.target.value)}
                placeholder="คุณครู"
                required
              />
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitClasscode}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
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
              <Flowbite theme={{ theme: ywTheme }}>
                <Datepicker
                  language="th"
                  labelTodayButton="วันนี้"
                  labelClearButton="ยกเลิก"
                  onChange={(date) =>
                    setTime(
                      `${date?.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}`
                    )
                  }
                />
              </Flowbite>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่เลขที่ขาด (ไม่มีใส่ -)" />
              </div>
              <TextInput
                value={number}
                onChange={(event) => { if (event.target.value == "-") { setNumber(event.target.value); setAbsent("0"); setBoy("0"); setGirl("0") } else { setNumber(event.target.value) } }}
                type="text"
                placeholder="1 , 2 , 3"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="จำนวนนักเรียนทั้งหมด (ที่ไม่มา)" />
              </div>
              <TextInput
                type="number"
                value={absent}
                onChange={(event) => setAbsent(event.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="flex gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="จำนวนนักเรียนชาย (ที่ไม่มา)" />
                </div>
                <TextInput
                  type="number"
                  value={boy}
                  onChange={(event) => setBoy(event.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="จำนวนนักเรียนหญิง (ที่ไม่มา)" />
                </div>
                <TextInput
                  type="number"
                  value={girl}
                  onChange={(event) => setGirl(event.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitAbsent}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
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
              <Flowbite theme={{ theme: ywTheme }}>
                <Datepicker
                  language="th"
                  labelTodayButton="วันนี้"
                  labelClearButton="ยกเลิก"
                  onChange={(date) =>
                    setTime(
                      `${date?.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}`
                    )
                  }
                />
              </Flowbite>
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
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#00b900" }}
                    color="success"
                  >
                    ส่งข้อความ
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitLineOAAnounment}
                    style={{ backgroundColor: "#00b900" }}
                    color="success"
                  >
                    ส่งข้อความ
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openComModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มบันทึกข้อมูล การแข่งขัน
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วันที่" />
              </div>
              <Flowbite theme={{ theme: ywTheme }}>
                <Datepicker
                  language="th"
                  labelTodayButton="วันนี้"
                  labelClearButton="ยกเลิก"
                  onChange={(date) =>
                    setTime(
                      `${date?.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}`
                    )
                  }
                />
              </Flowbite>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ชื่อการแข่งขัน" />
              </div>
              <TextInput
                onChange={(event) => setTitleCom(event.target.value)}
                type="text"
                value={titleCom}
                placeholder="การแข่งขัน"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="รายละเอียดการแข่งขัน" />
              </div>
              <TextInput
                onChange={(event) => setDecs(event.target.value)}
                type="text"
                value={decs}
                placeholder="รายละเอียด"
                required
              />
            </div>
            <div>
              <Flowbite theme={{ theme: ywTheme }}>
                <div className="mb-2 mt-6 block">
                  <Label htmlFor="file-upload" value="อัพโหลดรูปภาพ (ขนาดภาพที่แนะนำคือ **แนวนอน)" />
                </div>
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col gap-3 items-center justify-center p-6">
                      {file == null ? (
                        <>
                          <MdOutlineUploadFile className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        </>
                      ) : (<><img style={{ maxHeight: '10rem' }} className="rounded-lg" src={filePrv} /></>)}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{file == null ? ("คลิกเพื่ออัพโหลด") : (`${file.name}`)}</span>
                      </p>
                    </div>
                    <FileInput id="dropzone-file" className="hidden"
                      onChange={(event) => {
                        if (event.target.files) {
                          setFile(event.target.files[0]);
                          setFilePrv(URL.createObjectURL(event.target.files[0]));
                        }
                      }}
                    />
                  </Label>
                </div>
              </Flowbite>
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitCompetition}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="animate__animated animate__fadeIn"
        show={openActModal}
        onClose={onCloseModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              แบบฟอร์มบันทึกข้อมูล กิจกรรม
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ใส่วันที่" />
              </div>
              <TextInput
                onChange={(event) => setDateAct(event.target.value)}
                type="text"
                value={dateAct}
                placeholder="00 มกราคม 2500"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="ชื่อกิจกรรม" />
              </div>
              <TextInput
                onChange={(event) => setTitleAct(event.target.value)}
                type="text"
                value={titleAct}
                placeholder="กิจกรรม"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="รายละเอียดกิจกรรม" />
              </div>
              <TextInput
                onChange={(event) => setDecs(event.target.value)}
                type="text"
                value={decs}
                placeholder="รายละเอียด"
                required
              />
            </div>
            <div>
              <Flowbite theme={{ theme: ywTheme }}>
                <div className="mb-2 mt-6 block">
                  <Label htmlFor="file-upload" value="อัพโหลดรูปภาพ (ขนาดภาพที่แนะนำคือ **แนวนอน)" />
                </div>
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col gap-3 items-center justify-center p-6">
                      {file == null ? (
                        <>
                          <MdOutlineUploadFile className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        </>
                      ) : (<><img style={{ maxHeight: '10rem' }} className="rounded-lg" src={filePrv} /></>)}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{file == null ? ("คลิกเพื่ออัพโหลด") : (`${file.name}`)}</span>
                      </p>
                    </div>
                    <FileInput id="dropzone-file" className="hidden"
                      onChange={(event) => {
                        if (event.target.files) {
                          setFile(event.target.files[0]);
                          setFilePrv(URL.createObjectURL(event.target.files[0]));
                        }
                      }}
                    />
                  </Label>
                </div>
              </Flowbite>
            </div>
            <div className="w-full">
              {isLoading ? (
                <>
                  <Button
                    isProcessing
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={submitActivities}
                    style={{ backgroundColor: "#2d76ff" }}
                    color="blue"
                  >
                    ส่งข้อมูล
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
