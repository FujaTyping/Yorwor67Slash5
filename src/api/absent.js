const express = require('express');
const { doc, updateDoc, getDocs, getDoc, setDoc, collection, query, orderBy, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module')

const TreefetchInterval = 3 * 60 * 1000;
let AbslastFetchTime = 0;

let ARealData = {
    Static: {},
    Absent: [],
  };

module.exports = (db) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
      if (Date.now() - AbslastFetchTime > TreefetchInterval) {
        const querySnapshot = await getDocs(query(collection(db, "Absent"), orderBy("timestamp", "desc")));
        ARealData.Absent = [];
        querySnapshot.forEach((doc) => {
          ARealData.Absent.push(doc.data());
        });
        const statRef = doc(db, "Status", "Absent");
        const statDocSnap = await getDoc(statRef);
        const data = statDocSnap.data();
        ARealData.Static = data;
        const Boy = parseInt(data.Boy);
        const Girl = parseInt(data.Girl);
        const All = (Boy + Girl).toString();
        ARealData.Static.All = All;
        AbslastFetchTime = Date.now();
      }
      res.send(ARealData);
    });
    
    router.post("/", Authenticate, async (req, res) => {
      const ZAbsent = req.body.zabs;
      const ZBoy = req.body.zboy;
      const ZDate = req.body.zdate;
      const ZGirl = req.body.zgirl;
      const Date = req.body.date;
      const Number = req.body.number;
      if (!ZAbsent || !ZBoy || !ZDate || !ZGirl || !Date || !Number) {
        res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        const statAbRef = doc(db, "Status", "Absent");
        const UID = generateID();
        const Boy = 21 - parseInt(ZBoy);
        const Girl = 15 - parseInt(ZGirl);
        await updateDoc(statAbRef, {
          Absent: `${ZAbsent}`,
          Boy: `${Boy}`,
          Date: `${ZDate}`,
          Girl: `${Girl}`,
        });
        await setDoc(doc(db, "Absent", `${UID}`), {
          All: `ขาด / ลา ${ZAbsent}`,
          Count: `${ZAbsent}`,
          Date: `${Date}`,
          Number: `${Number}`,
          timestamp: serverTimestamp(),
        });
        await pushNewAbsent(Date, ZAbsent, Number, Boy, Girl);
        res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
      }
    });

    return {
        baseRoute: '/absent',
        router,
    };
};
