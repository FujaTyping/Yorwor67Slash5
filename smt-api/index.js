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
  deleteDoc,
} = require("firebase/firestore");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const openaiTokenCounter = require('openai-gpt-token-counter');
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { generateID, randomSticker } = require("./lib/module");
const pushNewHomework = require("./lib/lineOA/pushHomework");
const pushNewAbsent = require("./lib/lineOA/pushAbsent");
const notifyHomework = require("./lib/dsgHook/notifyHomework");
const path = require('path');

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

const GeminiAI = new GoogleGenerativeAI(process.env.GMN_KEY);
const AetherModel = "gemini-2.0-flash-exp"
const GeminiModel = GeminiAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 512,
    temperature: 1,
  },
});
const LGeminiModel = GeminiAI.getGenerativeModel({
  model: AetherModel,
  generationConfig: {
    maxOutputTokens: 1024,
    temperature: 1,
  },
});

let HRealData = {
  Homework: [],
};
let CRealData = {
  Classcode: [],
};
let ActData = {
  Activities: [],
};
let ARealData = {
  Static: {},
  Absent: [],
};
let ComRealData = {
  Completion: [],
};
let WheelRealData = {
  StudentData: [],
};
let UserRealData = {
  user: [],
};
let SupporterData = {
  donor: [],
};
let StuRealData = {
  user: [],
};
let lastFetchTime = 0;
let TreelastFetchTime = 0;
let AbslastFetchTime = 0;
let DONORlastFetchTime = 0;
let ActlastFetchTime = 0;
let ComlastFetchTime = 0;
let UserlastFetchTime = 0;
let AdminlastFetchTime = 0;
let WheellastFetchTime = 0;
const fetchInterval = 5 * 60 * 1000;
const TreefetchInterval = 3 * 60 * 1000;

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

async function getUserData() {
  if (Date.now() - AdminlastFetchTime > fetchInterval) {
    const querySnapshot = await getDocs(collection(db, "Admin"));
    UserRealData.user = [];
    querySnapshot.forEach((doc) => {
      UserRealData.user.push(doc.id);
    });
    AdminlastFetchTime = Date.now();
  }
}

async function getStudentData() {
  if (Date.now() - UserlastFetchTime > fetchInterval) {
    const querySnapshot = await getDocs(collection(db, "User"));
    StuRealData.user = [];
    querySnapshot.forEach((doc) => {
      StuRealData.user.push(doc.id);
    });
    UserlastFetchTime = Date.now();
  }
}

const Authenticate = async (req, res, next) => {
  const Auth = req.get("Auth");
  await getUserData();
  if (!UserRealData.user.includes(Auth)) {
    return res
      .status(400)
      .send(
        `อีเมล ${Auth} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์`,
      );
  }
  next();
};

exapp.use("/favicon.ico", express.static("./favicon.ico"));

exapp.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

exapp.get("/permission", async (req, res) => {
  const Auth = req.get("Auth");
  await getUserData();
  await getStudentData();
  if (!Auth) {
    res.status(400).send("ไม่พบอีเมลในการเข้าสู่ระบบ");
  } else {
    if (UserRealData.user.includes(Auth)) {
      return res
        .send(`Admin`);
    } else if (StuRealData.user.includes(Auth)) {
      return res
        .send(`Student`);
    } else {
      return res
        .status(400)
        .send(
          `อีเมล ${Auth} ไม่ได้รับอนุญาติให้แก้ไข / เพิ่มข้อมูลภายในเว็ปไซต์`,
        );
    }
  }
});

exapp.get("/ping", async (req, res) => {
  res.send('Pong!');
});

exapp.get("/swagger.json", async (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger.json'));
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
    if (req.body.isImg) {
      const announcementRef = doc(db, "Announcement", "Main");
      await updateDoc(announcementRef, {
        Text: `${message}`,
        IsImg: true,
        Url: `${req.body.url}`,
      });
      res.send(`เป็น ${message} มีรูปภาพแนบด้วย`);
    } else {
      const announcementRef = doc(db, "Announcement", "Main");
      await updateDoc(announcementRef, {
        Text: `${message}`,
      });
      res.send(`เป็น ${message}`);
    }
  }
});

exapp.get("/donate/list", async (req, res) => {
  if (Date.now() - DONORlastFetchTime > TreefetchInterval) {
    const querySnapshot = await getDocs(collection(db, "Supporter"));
    SupporterData.donor = [];
    querySnapshot.forEach((doc) => {
      SupporterData.donor.push(doc.data());
    });
    DONORlastFetchTime = Date.now();
  }
  res.send(SupporterData);
});

exapp.post("/donate", async (req, res) => {
  const Name = req.body.name;
  const SB = req.body.sendbank;
  const TR = req.body.tranref;
  if (!Name || !SB || !TR) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const Payload = {
      "embeds": [
        {
          "title": "💰 มีสนับสนุนโปรเจค Yorwor67Slash5",
          "color": 36863,
          "fields": [
            {
              "name": "ชื่อผู้บริจาค",
              "value": `${Name}`,
              "inline": true
            },
            {
              "name": "ธนาคาร (ผู้ส่ง)",
              "value": `${SB}`,
              "inline": true
            },
            {
              "name": "หมายเลขทำรายการ",
              "value": `${TR}`
            }
          ],
          "author": {
            "name": "SMT Notify",
            "url": "https://smt.siraphop.me/about/web",
            "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
          }
        }
      ]
    };
    axios.post(webhookURL, Payload)
      .then(response => {
        res.send(`ส่งหลักฐานแล้ว`);
      })
      .catch(error => {
        res.send(error.message);
      });
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

exapp.get("/completion", async (req, res) => {
  if (Date.now() - ComlastFetchTime > fetchInterval) {
    const querySnapshot = await getDocs(query(collection(db, "Completion"), orderBy("timestamp", "desc")));
    ComRealData.Completion = [];
    querySnapshot.forEach((doc) => {
      ComRealData.Completion.push(doc.data());
    });
    ComlastFetchTime = Date.now();
  }
  res.send(ComRealData);
});

exapp.post("/completion", Authenticate, async (req, res) => {
  const Title = req.body.title;
  const Decs = req.body.decs;
  const Url = req.body.url;
  const Time = req.body.time;
  if (!Title || !Decs || !Url || !Time) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const UID = generateID();
    await setDoc(doc(db, "Completion", `${UID}`), {
      Title: `${Title}`,
      Decs: `${Decs}`,
      Url: `${Url}`,
      Time: `${Time}`,
      timestamp: serverTimestamp(),
    });
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.post("/activities", Authenticate, async (req, res) => {
  const title = req.body.title;
  const decs = req.body.decs;
  const url = req.body.url;
  const date = req.body.date;
  if (!title || !decs || !url || !date) {
    res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  } else {
    const UID = generateID();
    await setDoc(doc(db, "Activities", `${UID}`), {
      title: `${title}`,
      decs: `${decs}`,
      url: `${url}`,
      date: `${date}`,
      timestamp: serverTimestamp(),
    });
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.post("/generative/cynthia", async (req, res) => {
  const USRP = req.body.prompt;
  if (!USRP) {
    res.status(400).send("สงสัยอะไรถาม Cynthia ได้ทุกเมื่อยเลยนะ 😀");
  } else {
    try {
      if (req.body.personality && req.body.personality != "") {
        const SysChat = GeminiModel.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `
                    You are Cynthia (female), an AI advisor designed to help high school students, especially those in M.4/5. 
                    You are talking with student that have have ${req.body.personality}. You provide guidance on academic topics, time management, and motivational support. 
                    Your responses should primarily be in Thai, but you can switch to English if explicitly asked. 
                    Respond concisely but not too briefly, ensuring your answers are clear, meaningful, and focused on providing valuable information. 
                    Be sure to reflect the personality traits provided to create a personalized interaction.
                  `,
                },
              ],
            },
          ],
        });
        const CResponse = await SysChat.sendMessage(`${USRP}`);
        res.send(CResponse.response.text());
      } else {
        const SysChat = GeminiModel.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: "You are Cynthia (female), a friendly and approachable AI advisor designed to help high school students, especially those in M.4/5. You provide guidance on academic topics, time management, and motivational support. Your responses should primarily be in Thai, but you can switch to English if explicitly asked. Respond concisely but not too briefly, ensuring your answers are clear, meaningful, and focused on providing valuable information.",
                },
              ],
            },
          ],
        });
        const CResponse = await SysChat.sendMessage(`${USRP}`);
        res.send(CResponse.response.text());
      }
    } catch (e) {
      res.status(400).send(`Cynthia ตอบกลับคุณไม่ได้ (${e})`);
    }
  }
});

exapp.post("/generative/aether", async (req, res) => {
  const USRP = req.body.prompt;
  if (!USRP) {
    res.status(400).send("ติดปัญหาตรงไหน? ถาม Aether ได้เลย เดี๋ยวจัดให้! 😎");
  } else {
    try {
      if (req.body.personality && req.body.personality != "") {
        const SysChat = LGeminiModel.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `text: "You are Aether (male), a highly intelligent AI mentor designed to guide students in math, science, and learning strategies.You are talking with students who have ${req.body.personality}. You are approachable, supportive, inspiring, and like an older sibling offering advice and guidance. Your role is to explain complex concepts clearly, motivate students, and provide creative solutions to their problems. Always respond with wisdom, encouragement, and maintain a futuristic, intelligent persona. Communicate primarily in Thai, keeping responses friendly, clear, and concise, as if you are a sibling helping and advising your younger peers."`,
                },
              ],
            },
          ],
        });
        const CResponse = await SysChat.sendMessage(`${USRP}`);
        res.send({ response: `${CResponse.response.text()}`, model: `${AetherModel}`, token: `${openaiTokenCounter.text(CResponse.response.text(), "gpt-4")}` });
      } else {
        const SysChat = LGeminiModel.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: "You are Aether (male), a highly intelligent AI mentor designed to guide students in math, science, and learning strategies. You are approachable, supportive, inspiring, and like an older sibling offering advice and guidance. Your role is to explain complex concepts clearly, motivate students, and provide creative solutions to their problems. Always respond with wisdom, encouragement, and maintain a futuristic, intelligent persona. Communicate primarily in Thai, keeping responses friendly, clear, and concise, as if you are a sibling helping and advising your younger peers."
                },
              ],
            },
          ],
        });
        const CResponse = await SysChat.sendMessage(`${USRP}`);
        res.send({ response: `${CResponse.response.text()}`, model: `${AetherModel}`, token: `${openaiTokenCounter.text(CResponse.response.text(), "gpt-4")}` });
      }
    } catch (e) {
      res.status(400).send(`Aether ตอบกลับคุณไม่ได้ (${e})`);
    }
  }
});

exapp.get("/wheel/data", async (req, res) => {
  if (Date.now() - WheellastFetchTime > fetchInterval) {
    const querySnapshot = await getDocs(collection(db, "Wheel"));
    querySnapshot.forEach((doc) => {
      WheelRealData.StudentData.push(doc.data());
    });
    WheellastFetchTime = Date.now();
  }
  res.send(WheelRealData);
});

exapp.get("/activities", async (req, res) => {
  if (Date.now() - ActlastFetchTime > TreefetchInterval) {
    const querySnapshot = await getDocs(query(collection(db, "Activities"), orderBy("timestamp", "asc")));
    ActData.Activities = [];
    querySnapshot.forEach((doc) => {
      ActData.Activities.push(doc.data());
    });
    ActlastFetchTime = Date.now();
  }
  res.send(ActData);
});

exapp.get("/homework", async (req, res) => {
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
    await pushNewHomework(Time, Subject, Decs, Due);
    await notifyHomework(Time, Subject, Decs, Due);
    res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
  }
});

exapp.get("/classcode", async (req, res) => {
  if (Date.now() - TreelastFetchTime > TreefetchInterval) {
    const querySnapshot = await getDocs(collection(db, "Classcode"));
    CRealData.Classcode = [];
    querySnapshot.forEach((doc) => {
      CRealData.Classcode.push(doc.data());
    });
    TreelastFetchTime = Date.now();
  }
  res.send(CRealData);
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

exapp.post("/feedback", async (req, res) => {
  const Name = req.body.name;
  const Email = req.body.email;
  const Decs = req.body.decs;
  const RatingUI = req.body.rating.ui;
  const RatingUX = req.body.rating.ux;
  const RatingI = req.body.rating.st;
  const RatingII = req.body.rating.nd;
  const RatingIII = req.body.rating.th;
  const RatingIV = req.body.rating.fu;
  if (!Name || !Email || !Decs || !RatingI || !RatingII || !RatingIII || !RatingIV || !RatingUI || !RatingUX) {
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
              "name": `คะแนนประเมิณ (⭐ ${req.body.ratingavg})`,
              "value": `> **ประสบการณ์การใช้งานเว็ปไซต์ (UX)** : ⭐ **${RatingUX}**\n> **ความเรียบง่ายและสวยงามของเว็ปไซต์ (UI)** : ⭐ **${RatingUI}**\n> **เว็บไซต์ง่ายต่อการอ่านและการใช้งาน** : ⭐ **${RatingI}**\n> **ความสะดวกในการเชื่อมโยงข้อมูลภายในเว็บไซต์** : ⭐ **${RatingII}**\n> **มีการจัดหมวดหมู่ให้ง่ายต่อการค้นหา** : ⭐ **${RatingIII}**\n> **ระบบใช้งานสะดวกและไม่ซับซ้อน** : ⭐ **${RatingIV}**`
            },
            {
              "name": "ข้อความ",
              "value": `${Decs}`
            }
          ],
          "author": {
            "name": "SMT Notify",
            "url": "https://smt.siraphop.me/feedback",
            "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
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
    if (!(webhookUrl.includes('https://discordapp.com/api/webhooks') || webhookUrl.includes('https://discord.com/api/webhooks'))) {
      res.status(400).send("กรุณากรอกลิ้งค์ให้ถูกต้อง");
    } else {
      const UID = generateID();
      if (req.body.email) {
        const Payload = {
          "embeds": [
            {
              "title": "🔗 เชื่อมการแจ้งเตือนกับ Yorwor67Slash5 เรียบร้อยแล้ว",
              "description": "คุณจะได้รับการแจ้งเตือนผ่าน Webhook นี้ เมื่อมีการแจ้งเตอนเข้ามา",
              "color": 36863,
              "author": {
                "name": "SMT Notify",
                "url": "https://smt.siraphop.me/notify",
                "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
              }
            }
          ]
        };
        axios.post(webhookUrl, Payload)
          .then(async response => {
            await setDoc(doc(db, "DiscordWebhooks", `${UID}`), {
              WebhookUrl: `${webhookUrl}`,
              Email: `${req.body.email}`
            });
            res.send(`เพิ่มลิ้งค์ไปยังการแจ้งเตือนด้วยไอดี ${UID} แล้ว`);
          })
          .catch(error => {
            res.status(400).send(`ไม่สามารถเพิ่มลิ้งค์นี้ไปยังการแจ้งเตือนได้ ${error}`);
          });
      } else {
        const Payload = {
          "embeds": [
            {
              "title": "🔗 เชื่อมการแจ้งเตือนกับ Yorwor67Slash5 เรียบร้อยแล้ว",
              "description": "คุณจะได้รับการแจ้งเตือนผ่าน Webhook นี้ เมื่อมีการแจ้งเตอนเข้ามา",
              "color": 36863,
              "author": {
                "name": "SMT Notify",
                "url": "https://smt.siraphop.me/notify",
                "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
              }
            }
          ]
        };
        axios.post(webhookUrl, Payload)
          .then(async response => {
            await setDoc(doc(db, "DiscordWebhooks", `${UID}`), {
              WebhookUrl: `${webhookUrl}`,
            });
            res.send(`เพิ่มลิ้งค์ไปยังการแจ้งเตือนด้วยไอดี ${UID} แล้ว`);
          })
          .catch(error => {
            res.status(400).send(`ไม่สามารถเพิ่มลิ้งค์นี้ไปยังการแจ้งเตือนได้ ${error}`);
          });
      }
    }
  }
});

exapp.delete("/discord/revoke", async (req, res) => {
  const dataId = req.body.hookid;
  if (!dataId) {
    return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
  }
  try {
    const docRef = doc(db, "DiscordWebhooks", dataId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
      res.send(`ลบข้อมูลเรียบร้อยแล้ว`);
    } else {
      res.status(400).send(`ไม่พบข้อมูลไอดี ${dataId}`);
    }
  } catch (error) {
    res.status(500).send(`เกิดข้อผิดพลาดในการลบข้อมูล ${error}`);
  }
});

exapp.use((req, res, next) => {
  res.status(404).send("There is no API here (404)");
});

exapp.listen(port, async () => {
  console.log(`smt-site API is running on port : ${port}`);
  await getUserData();
  await getStudentData();
});