const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} = require("firebase/firestore");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const generateID = require("./lib/module");
const userData = require("./user.json");

const config = require("./config.json");
const exapp = express();
exapp.use(cors());
exapp.use(express.json());
const port = config.port;

const firebaseConfig = {
  apiKey: process.env.ApiKey,
  authDomain: process.env.AuthDomain,
  projectId: process.env.ProjectId,
  storageBucket: process.env.StorageBucket,
  messagingSenderId: process.env.MessagingSenderId,
  appId: process.env.AppId,
  measurementId: process.env.MeasurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Authenticate = (req, res, next) => {
  const Auth = req.get("Auth");
  if (!userData.user.includes(Auth)) {
    return res
      .status(400)
      .send(
        `อีเมล ${Auth} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์`,
      );
  }
  next();
};

exapp.use("/favicon.ico", express.static("./favicon.ico"));

exapp.get("/permission", Authenticate, async (req, res) => {
  res.send("Pass");
});

exapp.get("/announcement", async (req, res) => {
  const docRef = doc(db, "Announcement", "Main");
  const docSnap = await getDoc(docRef);
  res.send(docSnap.data());
});

exapp.patch("/announcement", Authenticate, async (req, res) => {
  const message = req.body.msg;
  if (!message) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const announcementRef = doc(db, "Announcement", "Main");
    await updateDoc(announcementRef, {
      Text: `${message}`,
    });
    res.send(`เป็น ${message}`);
  }
});

exapp.get("/homework", async (req, res) => {
  let RealData = {
    Homework: [],
  };
  const querySnapshot = await getDocs(collection(db, "Homework"));
  querySnapshot.forEach((doc) => {
    RealData.Homework.unshift(doc.data());
  });
  res.send(RealData);
});

exapp.post("/homework", Authenticate, async (req, res) => {
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
    });
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.get("/classcode", async (req, res) => {
  let RealData = {
    Classcode: [],
  };
  const querySnapshot = await getDocs(collection(db, "Classcode"));
  querySnapshot.forEach((doc) => {
    RealData.Classcode.push(doc.data());
  });
  res.send(RealData);
});

exapp.post("/classcode", Authenticate, async (req, res) => {
  const Code = req.body.code;
  const Teacher = req.body.teac;
  const Subject = req.body.subj;
  if (!Code || !Teacher || !Subject) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const UID = generateID();
    await setDoc(doc(db, "Classcode", `${UID}`), {
      Code: `${Code}`,
      Teacher: `${Teacher}`,
      Subject: `${Subject}`,
    });
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.get("/absent", async (req, res) => {
  let FirstObject = true;
  let RealData = {
    Static: {},
    Absent: [],
  };
  const querySnapshot = await getDocs(collection(db, "Absent"));
  querySnapshot.forEach((doc) => {
    if (FirstObject) {
      FirstObject = false;
      const data = doc.data();
      RealData.Static = data;
      const Boy = parseInt(data.Boy);
      const Girl = parseInt(data.Girl);
      const All = (Boy + Girl).toString();
      RealData.Static.All = All;
    } else {
      RealData.Absent.unshift(doc.data());
    }
  });
  res.send(RealData);
});

exapp.post("/absent", Authenticate, async (req, res) => {
  const ZAbsent = req.body.zabs;
  const ZBoy = req.body.zboy;
  const ZDate = req.body.zdate;
  const ZGirl = req.body.zgirl;
  const Date = req.body.date;
  const Number = req.body.number;
  if (!ZAbsent || !ZBoy || !ZDate || !ZGirl || !Date || !Number) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const absentRef = doc(db, "Absent", "0");
    const UID = generateID();
    await updateDoc(absentRef, {
      Absent: `${ZAbsent}`,
      Boy: `${ZBoy}`,
      Date: `${ZDate}`,
      Girl: `${ZGirl}`,
    });
    await setDoc(doc(db, "Absent", `${UID}`), {
      All: `ขาด / ลา ${ZAbsent}`,
      Date: `${Date}`,
      Number: `${Number}`,
    });
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.use((req, res, next) => {
  res.status(404).send("There is no API here (404)");
});

exapp.listen(port, () => {
  console.log(`smt-site API is running on port : ${port}`);
});
