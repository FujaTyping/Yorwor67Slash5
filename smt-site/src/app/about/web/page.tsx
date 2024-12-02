"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import GitHubImg from "../../assets/github.webp";
import Link from "next/link";
import { FaGithubAlt, FaChevronCircleUp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { IoChatboxEllipses } from "react-icons/io5";
import { BiSolidDonateHeart } from "react-icons/bi";
import { PiWarningOctagonFill } from "react-icons/pi";
import smtConfig from "../../smt-config.mjs";
import useSound from 'use-sound';
import useLocalStorge from "../../lib/localstorage-db";

import Cynthia from '../../assets/chat/Cynthia.jpg'
import Aether from '../../assets/chat/Aether.jpg'

export default function AboutWeb() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บไซต์");
  const [api1down, setApi1down] = useState(true);
  const [api2down, setApi2down] = useState(true);
  const [CynthiaV] = useSound("/assets/Sound/Cynthia.wav");
  const { isLogin } = useLocalStorge(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="container">
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ maxWidth: "70px", marginBottom: "10px" }}
              src={GitHubImg.src}
              alt="GitHubLogo"
            />
            <h2 className="font-bold" style={{ fontSize: "35px" }}>
              Project Name : Yorwor67Slash5
            </h2>
            <h2
              className="font-bold"
              style={{
                fontSize: "30px",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              Open-source project
            </h2>
            <h3 className="lg:w-2/3 mx-auto">
              M.4/5 className website aimed at improving the student experience by
              providing essential tools such as attendance tracking and homework
              management. The website allows students to easily check if theyve
              been marked absent for the day and view current homework
              assignments. In this project we designed not only to assist
              students but also to enhance our skills in web development. We aim
              to continuously improve and expand its functionality, making it a
              practical tool for students while sharpening our coding expertise.
            </h3>
            <Button.Group id="AboutBtn" style={{ marginTop: "20px" }}>
              <Button
                as={Link}
                href="https://github.com/FujaTyping/Yorwor67Slash5"
                color="blue"
              >
                <FaGithubAlt
                  style={{ margin: "auto", marginRight: "5px" }}
                  className="mr-3 h-4 w-4"
                />
                View on Github
              </Button>
              <Button
                as={Link}
                href="https://github.com/sponsors/FujaTyping/"
                color="blue"
              >
                <BiSolidDonateHeart
                  style={{ margin: "auto", marginRight: "5px" }}
                  className="mr-3 h-4 w-4"
                />
                Donate
              </Button>
            </Button.Group>
            <section style={{ marginTop: '60px' }} className="body-font">
              <div className="mx-auto">
                <div className="text-center mb-5">
                  <h1 style={{ fontSize: "30px" }} className="text-2xl title-font mb-4 tracking-widest font-bold">STATUS</h1>
                  <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Live updates on the Yorwor67Slash5 API server health, including uptime and any current issues affecting attendance and homework tools</p>
                </div>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                  <div className="p-2 sm:w-1/2 w-full">
                    {api1down ? (
                      <>
                        <div className="bg-red-500 rounded flex p-4 h-full items-center text-white">
                          <PiWarningOctagonFill className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Vercel)"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-green-500 rounded flex p-4 h-full items-center text-white">
                          <FaChevronCircleUp className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Vercel)"}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-2 sm:w-1/2 w-full">
                    {api2down ? (
                      <>
                        <div className="bg-red-500 rounded flex p-4 h-full items-center text-white">
                          <PiWarningOctagonFill className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Railway)"}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-green-500 rounded flex p-4 h-full items-center text-white">
                          <FaChevronCircleUp className="w-6 h-6 flex-shrink-0 mr-4" />
                          <span className="title-font font-medium">Api server {"(Railway)"}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="body-font">
              <div className="container px-5 py-24 mx-auto">
                <div style={{ marginBottom: '40px' }} className="flex flex-col text-center w-full">
                  <h1 style={{ fontSize: "30px" }} className="text-2xl title-font mb-4 tracking-widest font-bold">OUR TEAM</h1>
                  <p className="lg:w-2/3 mx-auto">We are a team of dedicated SMT students from Hatyaiwittayalai School, combining our coding and design skills to create innovative solutions for our school and community</p>
                </div>
                <div className="flex flex-wrap -m-4">
                  <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img alt="Siraphop Sukchu" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://avatars.githubusercontent.com/u/86290693?v=4"></img>
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-medium text-lg text-gray-900">Siraphop Sukchu</h2>
                        <h3 className="text-gray-500 mb-3">Frontend & API</h3>
                        <p className="mb-4">{"JavaScript — the king of the coding kingdom"}</p>
                        <span className="inline-flex">
                          <a href="https://github.com/FujaTyping">
                            <FaGithub
                              className="h-6 w-6"
                            />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img alt="TeetouchNoppakun" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="https://avatars.githubusercontent.com/u/137798282?v=4"></img>
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-medium text-lg text-gray-900">Teetouch Noppakun</h2>
                        <h3 className="text-gray-500 mb-3">Database &  Authentication & Frontend</h3>
                        <p className="mb-4">{"Rose are red ,Violet are blue. Unknown Error on line 32"}</p>
                        <span className="inline-flex">
                          <a href="https://github.com/kunzaka001">
                            <FaGithub
                              className="h-6 w-6"
                            />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -m-4 justify-center mt-5">
                  <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img alt="Siraphop Sukchu" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={Cynthia.src}></img>
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-medium text-lg text-gray-900">Cynthia</h2>
                        <h3 className="text-gray-500 mb-3">AI Assistant</h3>
                        <p className="mb-4">{"ทุกความพยายามคือก้าวเล็ก ๆ ที่พาเธอไปถึงความฝัน—อย่าลืมยิ้มให้ตัวเองในทุกก้าวนะ!"}</p>
                        <span style={{ cursor: 'pointer' }} className="inline-flex">
                          <Link onClick={() => { if (isLogin) { CynthiaV(); } }} href="/chat/cynthia">
                            <IoChatboxEllipses
                              className="h-6 w-6"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:w-1/2">
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img alt="Siraphop Sukchu" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={Aether.src}></img>
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-medium text-lg text-gray-900">Aether</h2>
                        <h3 className="text-gray-500 mb-3">AI Assistant</h3>
                        <p className="mb-4">{"ความรู้คืออาวุธ เวลาเรียนคือสนามรบ และความพยายามคือชัยชนะที่ไม่มีใครแย่งไปได้!"}</p>
                        <span style={{ cursor: 'pointer' }} className="inline-flex">
                          <Link href="/chat/aether">
                            <IoChatboxEllipses
                              className="h-6 w-6"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
