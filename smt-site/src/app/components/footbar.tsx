"use client";

import { Footer } from "flowbite-react";
import SMT from "../assets/SMT.png";
import Divider from "../assets/FootDivider.png"

export default function Footbar() {
  return (
    <>
      <img style={{width: '100%'}} src={Divider.src} />
      <Footer id="Footbar" container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand src={SMT.src} alt="Yorwor Logo" name="Hatyaiwit" />
            <Footer.LinkGroup>
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
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright
            style={{ color: "white" }}
            by="SMT TEAMS M.4/5 (สงวนลิขสิทธิ์ทั้งหมด)"
            year={2024}
          />
          <p style={{ cursor: 'pointer', color: 'white' }} onClick={() => document.location = 'mailto:yorwor@siraphop.me'}>yorwor@siraphop.me</p>
        </div>
      </Footer>
    </>
  );
}
