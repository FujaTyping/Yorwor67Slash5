'use client';

import { useState, useEffect } from "react"
import { Button, Modal, Table, ToggleSwitch } from "flowbite-react";
import Confetti from 'react-confetti-boom';
import useSound from 'use-sound';
import axios from "axios";
import smtConfig from "../../../smt-config.mjs";
import { motion } from "motion/react"
import { IoEyeSharp } from "react-icons/io5";
import useLocalStorge from "../../../lib/localstorage-db";

interface Student {
    name: string;
    nickname: string;
    number: string;
    avatar: string;
    savatar?: string;
}

export default function Wheel() {
    const [title] = useState("Hatyaiwit - สุ่มชื่อนักเรียน");
    const [student, setStudent] = useState<Student | null>(null);
    const [confitiC, setConfitiC] = useState(0)
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [switchH, setSwitchH] = useState(false);
    const [possiStu, setPosStu] = useState("100")
    const [tickPlay] = useSound("/assets/Sound/Tick.mp3");
    const { isLogin } = useLocalStorge(false);
    const [tadaPlay] = useSound("/assets/Sound/Tada.mp3", { volume: 0.4 });
    const [dingPlay] = useSound("/assets/Sound/Ding.mp3", { volume: 0.3 });
    const [evilPlay] = useSound("/assets/Sound/Evil.mp3", { volume: 0.3 });
    const [conPlay] = useSound("/assets/Sound/Confetti.mp3", { volume: 0.5 });
    const [titlemessage, setTitleMessage] = useState("😲 สุ่มชื่อนักเรียน - Wheel of Names");
    const [openPosModal, setOpenPosModal] = useState(false);
    const [isSafeHell, setIsSafeHell] = useState(true);
    const [toggleHellmode, settoggleHellmode] = useState(false);
    const [studentData, SetStudentData] = useState<Student[]>([
        {
            name: "กำลังดึงข้อมูล",
            nickname: "กำลังดึงข้อมูล",
            number: "0",
            avatar: "https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI="
        }
    ]);
    const [studentDis, SetStudentDis] = useState("https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI=");

    const shakeAnimation = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.1, 0.9, 1.2, 0.8, 1],
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };

    const animationVariants = {
        normal: {
            initial: { y: -10 },
            animate: { y: 0 },
            transition: { duration: 0.3 },
        },
        hellMode: {
            initial: { scale: 0.8, rotate: -15 },
            animate: {
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, 5, -5, 0],
            },
            transition: {
                duration: 0.4,
            },
        },
        hellModeImg: {
            initial: { scale: 0.8, rotate: 15 },
            animate: {
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, -5, 5, 0],
            },
            transition: {
                duration: 0.4,
            },
        },
    };

    const toggleMessage = () => {
        let newMessage;
        if (titlemessage === "😲 สุ่มชื่อนักเรียน - Wheel of Names") {
            newMessage = "😈 สุ่มชื่อนักเรียน - Wheel of Hell";
            if (!isLogin) {
                setIsSafeHell(false)
            }
            SetStudentDis("https://firebasestorage.googleapis.com/v0/b/yorwor67slash5.appspot.com/o/Student%2FBanner%2F1732191118690.jpg?alt=media&token=39d89c5c-8727-4c74-87a8-9d30679281ef");
            settoggleHellmode(true);
            evilPlay();
        } else {
            newMessage = "😲 สุ่มชื่อนักเรียน - Wheel of Names";
            if (!isLogin) {
                setIsSafeHell(true)
            }
            SetStudentDis("https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI=");
            settoggleHellmode(false);
        }
        setTitleMessage(newMessage);
    };

    const randomStudent = () => {
        setIsAnimating(true);
        setConfitiC(0);
        if (toggleHellmode) {
            SetStudentDis("https://firebasestorage.googleapis.com/v0/b/yorwor67slash5.appspot.com/o/Student%2FBanner%2F1732191118690.jpg?alt=media&token=39d89c5c-8727-4c74-87a8-9d30679281ef");
        } else {
            SetStudentDis("https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI=");
        }

        let count = 0;
        let totalFlashes = 25;
        let delay = 100;

        if (toggleHellmode) {
            totalFlashes = 45;
            delay = 50;
        }

        if (switchH) {
            totalFlashes = 8;
            delay = 200;
            if (toggleHellmode) {
                totalFlashes = 10;
                delay = 150;
            }
        }

        const selectRandomStudent = () => {
            const randomIndex = Math.floor(Math.random() * studentData.length);
            setStudent(studentData[randomIndex]);

            count++;
            if (count >= totalFlashes) {
                setTimeout(() => {
                    const finalIndex = Math.floor(Math.random() * studentData.length);
                    const finalStudent = studentData[finalIndex];
                    setStudent(finalStudent);
                    if (toggleHellmode) {
                        SetStudentDis(finalStudent.savatar ?? finalStudent.avatar);
                    } else {
                        SetStudentDis(finalStudent.avatar);
                    }

                    SetStudentData((prevData) => prevData.filter((_, index) => index !== finalIndex));

                    setIsAnimating(false);
                }, delay + 150);

                setConfitiC(30);
                if (toggleHellmode) {
                    tadaPlay();
                } else {
                    conPlay();
                }

                setPosStu((100 / studentData.length).toFixed(3))
                return;
            }

            if (toggleHellmode) {
                delay += 8;
                dingPlay();
            } else {
                delay += 20;
                tickPlay();
            }
            setTimeout(selectRandomStudent, delay);
        };

        selectRandomStudent();
    };

    const handleShowClick = () => {
        setOpenPosModal(true)
    };

    const onCloseModal = () => {
        setOpenPosModal(false)
    }

    useEffect(() => {
        axios
            .get(`${smtConfig.apiMain}wheel/data`)
            .then((response) => {
                SetStudentData(response.data.StudentData);
                setPosStu((100 / response.data.StudentData.length).toFixed(3))
            })
            .catch((error) => {
                SetStudentData([
                    {
                        name: "ไม่สามารถดึงข้อมูลได้",
                        nickname: "เกิดข้อผิดผลาด",
                        number: `${error}`,
                        avatar: "https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI="
                    }
                ]);
            });
    }, []);
    return (
        <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <Confetti mode="fall" shapeSize={15} particleCount={confitiC} />
            <div className="container">
                <h1
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    className="border-b"
                    onClick={toggleMessage}
                >
                    {titlemessage}
                </h1>
                <h2 style={{ fontSize: "18px" }}>
                    สุ่มชื่อนักเรียนทั้งหมด 1 คน จาก {studentData.length} คนของห้อง ม.4/5<br />
                    <span
                        onClick={handleShowClick}
                        className="flex"
                        style={{ cursor: "pointer", alignItems: "center" }}
                    >
                        <IoEyeSharp style={{ marginRight: "6px" }} /> ดูโอกาสการสุ่ม
                    </span>
                </h2>
                {isSafeHell ? (
                    <>
                        <motion.section
                            className="text-gray-600 body-font"
                            key={toggleHellmode ? "hellMode" : "normalMode"}
                            {...(toggleHellmode ? shakeAnimation : {})}
                        >
                            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                                <motion.div
                                    className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"
                                    key={student ? student.avatar : "defaultImage"}
                                    initial={
                                        toggleHellmode
                                            ? animationVariants.hellModeImg.initial
                                            : animationVariants.normal.initial
                                    }
                                    animate={
                                        toggleHellmode
                                            ? animationVariants.hellModeImg.animate
                                            : animationVariants.normal.animate
                                    }
                                    transition={
                                        toggleHellmode
                                            ? animationVariants.hellModeImg.transition
                                            : animationVariants.normal.transition
                                    }
                                >
                                    <img
                                        style={{ width: "350px" }}
                                        className="object-cover object-center rounded"
                                        alt={student ? student.name : "Student"}
                                        src={
                                            studentDis
                                                ? studentDis
                                                : "https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI="
                                        }
                                    />
                                </motion.div>
                                <motion.div
                                    className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
                                    key={student ? student.name : "defaultText"}
                                    initial={
                                        toggleHellmode
                                            ? animationVariants.hellMode.initial
                                            : animationVariants.normal.initial
                                    }
                                    animate={
                                        toggleHellmode
                                            ? animationVariants.hellMode.animate
                                            : animationVariants.normal.animate
                                    }
                                    transition={
                                        toggleHellmode
                                            ? animationVariants.hellMode.transition
                                            : animationVariants.normal.transition
                                    }
                                >
                                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                        {student ? student.name : "กดปุ่มด้านล่าง"}
                                    </h1>
                                    <p className="mb-4 leading-relaxed text-gray-900">
                                        {student
                                            ? `${student.nickname} เลขที่ ${student.number}`
                                            : "เพื่อสุ่มชื่อนักเรียนในห้อง"}
                                    </p>
                                    <div className="flex justify-center items-center gap-5">
                                        <Button
                                            onClick={randomStudent}
                                            style={{ backgroundColor: "#ff1616" }}
                                            color="failure"
                                            disabled={isAnimating}
                                        >
                                            {isAnimating ? "กำลังสุ่ม กรุณารอสักครู่" : "สุ่มชื่อ คลิกเลย"}
                                        </Button>
                                        <ToggleSwitch color="failure" checked={switchH} label="สุ่มแบบเร็ว" onChange={setSwitchH} />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>
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
            <Modal
                className="animate__animated animate__fadeIn"
                show={openPosModal}
                onClose={onCloseModal}
                size="md"
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 mb-5">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            แสดงโอกาสการสุ่ม
                        </h3>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>ชื่อ</Table.HeadCell>
                            <Table.HeadCell>โอกาสการสุ่ม</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {studentData.map((data, index) => (
                                <>
                                    <Table.Row
                                        key={index}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {data.name}
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                            {possiStu} %
                                        </Table.Cell>
                                    </Table.Row>
                                </>
                            ))}
                        </Table.Body>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}