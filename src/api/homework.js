const express = require("express")
const { doc, getDocs, setDoc, collection, query, orderBy, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module')

const pushNewHomework = require("../lib/lineOA/pushHomework");
const notifyHomework = require("../lib/dsgHook/notifyHomework");

const fetchInterval = 5 * 60 * 1000;
let lastFetchTime = 0;

let HRealData = {
    Homework: [],
};

const thaiMonths = {
    "มกราคม": 1, "กุมภาพันธ์": 2, "มีนาคม": 3, "เมษายน": 4,
    "พฤษภาคม": 5, "มิถุนายน": 6, "กรกฎาคม": 7, "สิงหาคม": 8,
    "กันยายน": 9, "ตุลาคม": 10, "พฤศจิกายน": 11, "ธันวาคม": 12
  };

function thaiDateToJsDate(thaiDate) {
    const [day, monthThai, yearThai] = thaiDate.split(" ");
    const dayInt = parseInt(day, 10);
    const month = thaiMonths[monthThai];
    const year = parseInt(yearThai, 10) - 543;
    return new Date(year, month - 1, dayInt);
  }

module.exports = (db) => {
    const router = express.Router()

    router.get("/", async (req, res) => {
      if (Date.now() - lastFetchTime > fetchInterval) {
        const querySnapshot = await getDocs(query(collection(db, "Homework"), orderBy("timestamp", "desc")));
        HRealData.Homework = [];
        querySnapshot.forEach((doc) => {
          const homework = doc.data();
          const dueDate = thaiDateToJsDate(homework.Due);
          homework.isDue = Date.now() > dueDate.getTime();
          HRealData.Homework.push(homework);
        });
        lastFetchTime = Date.now();
      }
      res.send(HRealData);
    });

    router.post("/", Authenticate, async (req, res) => {
      const Decs = req.body.decs;
      const Due = req.body.due;
      const Subject = req.body.subj;
      const Time = req.body.time;
      if (!Decs || !Due || !Subject || !Time) {
        res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        const UID = generateID();
        await setDoc(doc(db, "Homework", `${UID}`), {
          Decs: `${Decs}`,
          Due: `${Due}`,
          Subject: `${Subject}`,
          Time: `${Time}`,
          timestamp: serverTimestamp(),
        });
        await pushNewHomework(Time, Subject, Decs, Due);
        await notifyHomework(Time, Subject, Decs, Due);
        res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
      }
    });

    return {
        baseRoute: '/homework',
        router,
    };
}