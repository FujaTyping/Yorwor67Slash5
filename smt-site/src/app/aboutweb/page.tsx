"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import GitHubImg from "../assets/github.webp";
import Link from "next/link";
import { FaGithubAlt } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";

export default function AboutWeb() {
  const [title] = useState("Hatyaiwit - เกี่ยวกับเว็บไซต์");
  return (
    <>
      <title>{title}</title>
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
            <h3>
              M.4/5 class website aimed at improving the student experience by
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
          </div>
          <div className="block" style={{ marginTop: "120px" }}>
            <h1 className="font-bold border-b">Contributor 🔧</h1>
            <div
              className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-60"
              style={{ marginTop: "30px" }}
            >
              <div className="block justify-center items-center text-center mb-10 md:mb-0">
                <img
                  className="rounded-full size-60"
                  src="https://github.com/FujaTyping.png"
                />
                <h2 style={{ fontSize: "32px", marginTop: "20px" }}>
                  FujaTyping
                </h2>
                <h3 style={{ fontSize: "20px" }}>Siraphop Sukchu</h3>
                <Button
                  className="AboutBtn"
                  style={{ marginTop: "15px" }}
                  as={Link}
                  href="https://github.com/FujaTyping/"
                  color="blue"
                >
                  <FaGithubAlt
                    style={{ margin: "auto", marginRight: "5px" }}
                    className="mr-3 h-4 w-4"
                  />
                  View on Github
                </Button>
              </div>
              <div className="block justify-center items-center text-center">
                <img
                  className="rounded-full size-60"
                  src="https://github.com/kunzaka001.png"
                />
                <h2 style={{ fontSize: "32px", marginTop: "20px" }}>
                  kunzaka001
                </h2>
                <h3 style={{ fontSize: "20px" }}>Teetouch Noppakun</h3>
                <Button
                  className="AboutBtn"
                  style={{ marginTop: "15px" }}
                  as={Link}
                  href="https://github.com/kunzaka001/"
                  color="blue"
                >
                  <FaGithubAlt
                    style={{ margin: "auto", marginRight: "5px" }}
                    className="mr-3 h-4 w-4"
                  />
                  View on Github
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
