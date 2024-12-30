"use client";

import Link from "next/link";
import { Footer } from "flowbite-react";
import SMT from "../assets/SMT.svg";
import { version } from "../../../package.json"
import LakTam from "../assets/Footer/FooterLakTam.webp"

export default function Footbar() {
  return (
    <>
      <div id="FooterTamMaa" style={{ backgroundColor: '#357cff' }} className="px-7 relative w-full text-white border-solid border-t-8 border-rose-600 mt-12 md:mt-14 flex md:items-center md:justify-center py-5">
        <div className="md:mr-96">
          <p className="title text-lg mb-1">พุทธศาสนสุภาษิต ประจำห้อง</p>
          <h1 className="title text-2xl md:text-4xl">" โยคา เว ชายเต ภูริ "</h1>
          <h2 className="title text-lg md:text-2xl my-1">ปัญญา ย่อมเกิดขึ้น เพราะการฝึกฝน</h2>
        </div>
        <img style={{ height: '13rem' }} src={LakTam.src} className="absolute bottom-0 ml-96 hidden md:block" />
      </div>
      <Footer id="Footbar" className="border-solid border-t-8 border-blue-600" container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand src={SMT.src} alt="Yorwor Logo" name="Hatyaiwit" />
            <Footer.LinkGroup>
              <Footer.Link as={Link} href="/terms">
                ข้อตกลงและเงื่อนไขการใช้บริการ
              </Footer.Link>
              <Footer.Link href="https://www.hatyaiwit.ac.th/">
                เว็ปโรงเรียน
              </Footer.Link>
              <Footer.Link href="https://sites.google.com/hatyaiwit.ac.th/innovative-center/%E0%B8%AB%E0%B8%99%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%81">
                Inovative center
              </Footer.Link>
              <Footer.Link href="http://202.129.48.202/">
                ระเบียนผลการเรียน
              </Footer.Link>
              <Footer.Link href="https://yorworplatform.com/">
                Yorwor platform
              </Footer.Link>
              <Footer.Link href="https://api2.smt.siraphop.me/document/">
                Open API
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright
            style={{ color: "white" }}
            by="ม.4/5 Dev Team (สงวนลิขสิทธิ์ทั้งหมด)"
            year={2024}
          />
          <div className="flex items-center justify-center gap-2">
            <p
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => (document.location = "mailto:yorwor@siraphop.me")}
            >
              yorwor@siraphop.me
            </p>
            <p className="bg-red-600 rounded-lg px-1">V.{version}</p>
          </div>
        </div>
      </Footer>
    </>
  );
}
