"use client";

import { useEffect, useState } from "react";
import { Button, TextInput, Textarea, Badge, Select } from "flowbite-react";
import axios from "axios";
import useLocalStorge from "../lib/localstorage-db";
import Turnstile, { useTurnstile } from "react-turnstile";
import { IoSend } from "react-icons/io5";
import smtConfig from "../smt-config.mjs";
import { ToastContainer, toast } from 'react-toastify';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

export default function Feedback() {
  const turnstile = useTurnstile();
  const [title] = useState("Hatyaiwit - ข้อเสนอแนะ");
  const { email } = useLocalStorge(false);
  const [ycs, setYCS] = useState("นักเรียน");
  const [realEmail, setRealEmail] = useState("");
  const [decs, setDecs] = useState("");
  const [isVerify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [UXrating, setUXRating] = useState(0);
  const [UIrating, setUIRating] = useState(0);
  const [STrating, setSTRating] = useState(0);
  const [NDrating, setNDRating] = useState(0);
  const [THrating, setTHRating] = useState(0);
  const [FUrating, setFURating] = useState(0);

  const StarStyles = {
    itemShapes: Star,
    activeFillColor: '#2d76ff',
    inactiveFillColor: '#85b0ff'
  }

  const RatingTOT = (rating: number): string => {
    switch (rating) {
      case 0:
        return "กรุณาให้คะแนน!";
      case 1:
        return "ใช้ไม่ได้เลย 🙁";
      case 2:
        return "ไม่โอเค 😕";
      case 3:
        return "พอได้ 🙂";
      case 4:
        return "ดีมาก! 👍";
      case 5:
        return "สุดยอด!! 🎉";
      default:
        return "ให้คะแนนระหว่าง 0-5";
    }
  };

  const submitFeedback = () => {
    const id = toast.loading("กำลังส่งข้อมูล...")
    if (isVerify) {
      setIsLoading(true);
      axios
        .post(`${smtConfig.apiMain}feedback`, {
          ycs: ycs,
          email: realEmail,
          decs: decs,
          ratingavg: ((UIrating + UXrating + STrating + NDrating + THrating + FUrating) / 6).toFixed(2),
          rating: {
            ui: UIrating,
            ux: UXrating,
            st: STrating,
            nd: NDrating,
            th: THrating,
            fu: FUrating
          }
        })
        .then((response) => {
          toast.update(id, { render: `ส่งข้อมูลแล้ว ${response.data}`, type: "success", isLoading: false, autoClose: 8000 });
          setVerify(false);
          turnstile.reset();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ ${error.response.data}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
          setIsLoading(false);
        });
    } else {
      toast.update(id, { render: `ไม่สามารถส่งข้อมูลได้ กรุณายืนยันตัวตนผ่าน CAPTCHA`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
    }
  };

  useEffect(() => {
    if (email) {
      setRealEmail(email);
    }
  }, [email]);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <ToastContainer position="bottom-right" newestOnTop draggable hideProgressBar={false} />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 style={{ marginBottom: "15px" }} className="border-b">
            📥 ส่งความคิดเห็น - Feedback
          </h1>
          <h2 style={{ fontSize: "18px" }}>
            กรุณาแบ่งปันความคิดเห็นหรือข้อเสนอแนะของคุณเพื่อช่วยให้เราปรับปรุงบริการ เราจะพยามพัฒนาเว็บของเราตามความคิดเห็นทุกๆท่าน
          </h2>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm"
                >
                  สถานภาพ
                </label>
                <Select onChange={(e) => setYCS(e.target.value)} required>
                  <option>นักเรียน</option>
                  <option>ผู้สนับสนุน</option>
                  <option>อาจารย์ (คุณครู)</option>
                  <option>บุคคลทั่วไป</option>
                  <option>ผู้ปกครอง</option>
                </Select>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm"
                >
                  อีเมล
                </label>
                <TextInput
                  placeholder="อีเมล"
                  value={realEmail}
                  onChange={(event) => setRealEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  ประสบการณ์การใช้งานเว็ปไซต์ (UX)
                </label>
                <Rating style={{ maxWidth: 200 }} value={UXrating} onChange={setUXRating} itemStyles={StarStyles} />
                <Badge
                  className="mt-2 rounded-full"
                  style={{
                    maxWidth: '175px',
                    color: 'white',
                    background: '#2d76ff'
                  }}
                >
                  {RatingTOT(UXrating)}
                </Badge>
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  ความเรียบง่ายและสวยงามของเว็ปไซต์ (UI)
                </label>
                <Rating style={{ maxWidth: 200 }} value={UIrating} onChange={setUIRating} itemStyles={StarStyles} />
                <Badge
                  className="mt-2 rounded-full"
                  style={{
                    maxWidth: '175px',
                    color: 'white',
                    background: '#2d76ff'
                  }}
                >
                  {RatingTOT(UIrating)}
                </Badge>
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  เว็บไซต์ง่ายต่อการอ่านและการใช้งาน
                </label>
                <Rating style={{ maxWidth: 200 }} value={STrating} onChange={setSTRating} itemStyles={StarStyles} />
                <Badge
                  className="mt-2 rounded-full"
                  style={{
                    maxWidth: '175px',
                    color: 'white',
                    background: '#2d76ff'
                  }}
                >
                  {RatingTOT(STrating)}
                </Badge>
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  ความสะดวกในการเชื่อมโยงข้อมูลภายในเว็บไซต์
                </label>
                <Rating style={{ maxWidth: 200 }} value={NDrating} onChange={setNDRating} itemStyles={StarStyles} />
                <Badge
                  className="mt-2 rounded-full"
                  style={{
                    maxWidth: '175px',
                    color: 'white',
                    background: '#2d76ff'
                  }}
                >
                  {RatingTOT(NDrating)}
                </Badge>
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  มีการจัดหมวดหมู่ให้ง่ายต่อการค้นหา
                </label>
                <Rating style={{ maxWidth: 200 }} value={THrating} onChange={setTHRating} itemStyles={StarStyles} />
                <Badge
                  className="mt-2 rounded-full"
                  style={{
                    maxWidth: '175px',
                    color: 'white',
                    background: '#2d76ff'
                  }}
                >
                  {RatingTOT(THrating)}
                </Badge>
              </div>
            </div>
            <div className="p-2 w-full md:w-1/2">
              <div className="relative flex flex-col items-center">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  ระบบใช้งานสะดวกและไม่ซับซ้อน
                </label>
                <Rating style={{ maxWidth: 200 }} value={FUrating} onChange={setFURating} itemStyles={StarStyles} />
                <Badge
                  className="mt-2 rounded-full"
                  style={{
                    maxWidth: '175px',
                    color: 'white',
                    background: '#2d76ff'
                  }}
                >
                  {RatingTOT(FUrating)}
                </Badge>
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm"
                >
                  สิ่งที่ต้องการจะให้ปรับปรุง (หากไม่มีกรุณาใส่ -)
                </label>
                <Textarea
                  placeholder="ข้อความของคุณ"
                  onChange={(event) => setDecs(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex mt-2 justify-center items-center p-2 w-full">
              <Turnstile
                sitekey="0x4AAAAAAAwmJyPRGMPSMEvC"
                theme="light"
                language={"th"}
                onVerify={() => {
                  setVerify(true);
                }}
              />
            </div>
            <div className="flex justify-center items-center p-2 w-full">
              {isLoading ? (
                <>
                  <Button isProcessing style={{ backgroundColor: "#2d76ff" }}
                    color="blue" onClick={submitFeedback}>
                    ส่งคำขอ
                  </Button>
                </>
              ) : (
                <>
                  <Button style={{ backgroundColor: "#2d76ff" }}
                    color="blue" onClick={submitFeedback}>
                    ส่งคำขอ
                    <IoSend className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
