"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import GitHubImg from "../../assets/github.webp";
import Link from "next/link";
import { FaGithubAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { BiSolidDonateHeart } from "react-icons/bi";

export default function AboutWeb() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บไซต์");
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
            <section style={{ marginTop: '25px' }} className="body-font">
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
