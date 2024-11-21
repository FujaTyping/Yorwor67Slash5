'use client';

import { useState, useEffect } from "react"
import { Button } from "flowbite-react";
import Confetti from 'react-confetti-boom';
import useSound from 'use-sound';
import axios from "axios";
import smtConfig from "../../../smt-config.mjs";
import { motion } from "motion/react"

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
    const [tickPlay] = useSound("/assets/Sound/Tick.mp3");
    const [conPlay] = useSound("/assets/Sound/Confetti.mp3", { volume: 0.5 });
    const [titlemessage, setTitleMessage] = useState("😲 สุ่มชื่อนักเรียน - Wheel of Names");
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

    const toggleMessage = () => {
        let newMessage;
        if (titlemessage === "😲 สุ่มชื่อนักเรียน - Wheel of Names") {
            newMessage = "😈 สุ่มชื่อนักเรียน - Wheel of Hell";
            SetStudentDis("https://cdn.discordapp.com/attachments/1249685919267684406/1309129234182180917/1732191118690.jpg?ex=6740751b&is=673f239b&hm=209943a144f499c9cf3c367637c184b34a8d9f5487ae1545f5378a5ddd6a703a&");
            settoggleHellmode(true);
        } else {
            newMessage = "😲 สุ่มชื่อนักเรียน - Wheel of Names";
            SetStudentDis("https://media.istockphoto.com/id/1410224257/vector/group-of-students-stand-together-flat-vector-illustration-young-girls-and-boys-holding-books.jpg?s=612x612&w=0&k=20&c=ih5WHSOcCRnySxpRxc259pWq8v0RacFjsaGheDTAiWI=");
            settoggleHellmode(false);
        }
        setTitleMessage(newMessage);
    };

    const randomStudent = () => {
        setIsAnimating(true);
        setConfitiC(0);
        if (toggleHellmode) {
            SetStudentDis("https://cdn.discordapp.com/attachments/1249685919267684406/1309129234182180917/1732191118690.jpg?ex=6740751b&is=673f239b&hm=209943a144f499c9cf3c367637c184b34a8d9f5487ae1545f5378a5ddd6a703a&");
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
                }, delay + 100);

                setConfitiC(30);
                conPlay();
                return;
            }

            if (toggleHellmode) {
                delay += 10;
            } else {
                delay += 20;
            }
            tickPlay();
            setTimeout(selectRandomStudent, delay);
        };

        selectRandomStudent();
    };


    useEffect(() => {
        axios
            .get(`${smtConfig.apiMain}wheel/data`)
            .then((response) => {
                SetStudentData(response.data.StudentData);
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
                    สุ่มชื่อนักเรียนทั้งหมด 1 คน จาก {studentData.length} คนของห้อง ม.4/5
                </h2>
                <motion.section
                    className="text-gray-600 body-font"
                    key={toggleHellmode ? "hellMode" : "normalMode"}
                    {...(toggleHellmode ? shakeAnimation : {})}
                >
                    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                        <motion.div
                            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"
                            key={student ? student.avatar : "defaultImage"}
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
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
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                {student ? student.name : "กดปุ่มด้านล่าง"}
                            </h1>
                            <p className="mb-4 leading-relaxed text-gray-900">
                                {student
                                    ? `${student.nickname} เลขที่ ${student.number}`
                                    : "เพื่อสุ่มชื่อนักเรียนในห้อง"}
                            </p>
                            <div className="flex justify-center">
                                <Button
                                    onClick={randomStudent}
                                    style={{ backgroundColor: "#ff1616" }}
                                    color="failure"
                                    disabled={isAnimating}
                                >
                                    {isAnimating ? "กำลังสุ่ม กรุณารอสักครู่" : "สุ่มชื่อ คลิกเลย"}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </>
    )
}