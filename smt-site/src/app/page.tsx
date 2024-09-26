"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

export default function Home() {
  const [data, setData] = useState("Fetching");
  const [title] = useState("Hatyaiwit - ม.4/5");

  useEffect(() => {
    axios
      .get(`https://api.smt.siraphop.me/announcement`)
      .then((response) => {
        setData(response.data.Text);
      })
      .catch((error) => {
        setData(`${error}`);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <div className="container">
        <h1>Hatyaiwit M.4/5</h1>
        <h2>Powered by NEXT.JS with Flowbite</h2>
        <h2 className="gap-3" style={{ display: "inline-flex" }}>
          ประกาศ:
          <Marquee style={{ maxWidth: "300px" }} pauseOnHover={true}>
            {data}
          </Marquee>
        </h2>
      </div>
    </>
  );
}
