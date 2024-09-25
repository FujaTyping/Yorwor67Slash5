"use client";

import { Footer } from "flowbite-react";
import Yorwor from "../favicon.ico";

export default function Footbar() {
  return (
    <>
      <Footer id="Footbar" container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand src={Yorwor.src} alt="Yorwor Logo" name="Hatyaiwit" />
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
            by="SMT TEAMS"
            year={2024}
          />
        </div>
      </Footer>
    </>
  );
}
