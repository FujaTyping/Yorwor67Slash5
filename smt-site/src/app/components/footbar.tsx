"use client";

import Link from "next/link";
import { Footer } from "flowbite-react";
import SMT from "../assets/SMT.svg";

export default function Footbar() {
  return (
    <>
      <Footer id="Footbar" className="border-solid border-t-8 border-rose-600 mt-12" container>
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
          <p
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => (document.location = "mailto:yorwor@siraphop.me")}
          >
            yorwor@siraphop.me
          </p>
        </div>
      </Footer>
    </>
  );
}
