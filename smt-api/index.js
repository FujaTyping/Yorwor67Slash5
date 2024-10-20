const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
} = require("firebase/firestore");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { generateID, randomSticker } = require("./lib/module");
const pushNewHomework = require("./lib/lineOA/pushHomework");
const pushNewAbsent = require("./lib/lineOA/pushAbsent");
const notifyHomework = require("./lib/dsgHook/notifyHomework");
const userData = require("./data/user.json");

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

const webhookURL = process.env.DscWebhook;
const LineAuth = process.env.LINEauth;
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

exapp.get("/permission", async (req, res) => {
  const Auth = req.get("Auth");
  if (!Auth) {
    res.status(400).send("ไม่พบอีเมลในการเข้าสู่ระบบ");
  } else {
    if (userData.user.includes(Auth)) {
      return res
        .send(
          `Pass`,
        );
    } else {
      return res
        .status(400)
        .send(
          `อีเมล ${Auth} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์`,
        );
    }
  }
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

exapp.post("/line/announcement", Authenticate, async (req, res) => {
  const Date = req.body.date;
  const Author = req.body.author;
  const Message = req.body.msg;
  if (!Date || !Author || !Message) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const stickerID = randomSticker();
    const Linedata = {
      "messages": [
        {
          "type": "sticker",
          "packageId": `${stickerID.PID}`,
          "stickerId": `${stickerID.SID}`
        },
        {
          "type": 'text',
          "text": `📣 ประกาศจาก ${Author}\nณ วันที่ ${Date}\n${Message}`
        }
      ]
    };
    axios.post("https://api.line.me/v2/bot/message/broadcast", Linedata, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LineAuth}`
      }
    })
      .then((response) => {
        res.send(`ไปยัง Line Offical แล้ว !`);
      })
      .catch(error => {
        res.send(`${error.message}`);
      });
  }
});

exapp.get("/homework", async (req, res) => {
  let RealData = {
    Homework: [],
  };
  const querySnapshot = await getDocs(query(collection(db, "Homework"), orderBy("timestamp", "desc")));
  querySnapshot.forEach((doc) => {
    RealData.Homework.push(doc.data());
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
      timestamp: serverTimestamp(),
    });
    pushNewHomework(Time, Subject, Decs, Due);
    notifyHomework(Time, Subject, Decs, Due);
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
  let RealData = {
    Static: {},
    Absent: [],
  };
  const querySnapshot = await getDocs(query(collection(db, "Absent"), orderBy("timestamp", "desc")));
  querySnapshot.forEach((doc) => {
    RealData.Absent.push(doc.data());
  });
  const statRef = doc(db, "Status", "Absent");
  const statdocSnap = await getDoc(statRef);
  const data = statdocSnap.data();
  RealData.Static = data;
  const Boy = parseInt(data.Boy);
  const Girl = parseInt(data.Girl);
  const All = (Boy + Girl).toString();
  RealData.Static.All = All;
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
    const statAbRef = doc(db, "Status", "Absent");
    const UID = generateID();
    await updateDoc(statAbRef, {
      Absent: `${ZAbsent}`,
      Boy: `${ZBoy}`,
      Date: `${ZDate}`,
      Girl: `${ZGirl}`,
    });
    await setDoc(doc(db, "Absent", `${UID}`), {
      All: `ขาด / ลา ${ZAbsent}`,
      Count: `${ZAbsent}`,
      Date: `${Date}`,
      Number: `${Number}`,
      timestamp: serverTimestamp(),
    });
    pushNewAbsent(Date, ZAbsent, Number, ZBoy, ZGirl);
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.post("/feedback", async (req, res) => {
  const Name = req.body.name;
  const Email = req.body.email;
  const Decs = req.body.decs;
  if (!Name || !Email || !Decs) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const Payload = {
      "embeds": [
        {
          "title": "📥 มีความคิดเห็นใหม่สำหรับ Yorwor67Slash5",
          "color": 36863,
          "fields": [
            {
              "name": "คำขอโดย",
              "value": `${Name}`,
              "inline": true
            },
            {
              "name": "อีเมล",
              "value": `${Email}`,
              "inline": true
            },
            {
              "name": "ข้อความ",
              "value": `${Decs}`
            }
          ],
          "author": {
            "name": "SMT Notify",
            "url": "https://smt.siraphop.me/feedback",
            "icon_url": "https://talent.siraphop.me/cdn/Yorwor.png"
          }
        }
      ]
    };
    axios.post(webhookURL, Payload)
      .then(response => {
        res.send(`เราได้รับคำขอของคุณแล้ว จะตอบกลับทางอีเมลที่ให้ไว้ในภายหลัง`);
      })
      .catch(error => {
        res.send(error.message);
      });
  }
});

exapp.post("/discord/new", async (req, res) => {
  const webhookUrl = req.body.hooks;
  if (!webhookUrl) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    if (!webhookUrl.includes('https://discordapp.com/api/webhooks/')) {
      res.status(400).send("กรุณากรอกลิ้งค์ให้ถูกต้อง");
    } else {
      const UID = generateID();
      if (req.body.email) {
        await setDoc(doc(db, "DiscordWebhooks", `${UID}`), {
          WebhookUrl: `${webhookUrl}`,
          Email: `${req.body.email}`
        });
        res.send(`เพิ่มลิ้งค์ไปยังการแจ้งเตือนด้วยไอดี ${UID} แล้ว`);
      } else {
        await setDoc(doc(db, "DiscordWebhooks", `${UID}`), {
          WebhookUrl: `${webhookUrl}`,
        });
        res.send(`เพิ่มลิ้งค์ไปยังการแจ้งเตือนด้วยไอดี ${UID} แล้ว`);
      }
    }
  }
});

exapp.use((req, res, next) => {
  res.status(404).send("There is no API here (404)");
});

exapp.listen(port, () => {
  console.log(`smt-site API is running on port : ${port}`);
});
