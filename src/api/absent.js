const express = require("express");
const { getDocs, query, collection, orderBy, setDoc, doc, getDoc, updateDoc, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
const pushNewAbsent = require("../lib/lineOA/pushAbsent");
const { AbsentDB } = require("../db-config.json");
let ARealData = { Static: {}, Absent: [] };
const { CLogger } = require('../utils/loggers');
let AbslastFetchTime = 0;
const TreefetchInterval = 3 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - AbslastFetchTime > TreefetchInterval) {
            try {
                const querySnapshot = await getDocs(query(collection(db, AbsentDB), orderBy("timestamp", "desc")));
                ARealData.Absent = [];
                querySnapshot.forEach((doc) => {
                    const abssent = doc.data();
                    abssent.id = doc.id;
                    ARealData.Absent.push(abssent);
                });

                const statRef = doc(db, "Status", "Absent");
                const statDocSnap = await getDoc(statRef);
                const data = statDocSnap.data();

                ARealData.Static = data;
                const Boy = parseInt(data.Boy);
                const Girl = parseInt(data.Girl);
                ARealData.Static.All = (Boy + Girl).toString();
                AbslastFetchTime = Date.now();
            } catch (e) {
                return res.status(500).send(`Error fetching absent data: ${e.message}`);
            }
        }
        res.send(ARealData);
    });

    router.post('/', Authenticate(db), async (req, res) => {
        const { zabs: ZAbsent, zboy: ZBoy, zgirl: ZGirl, date: ABSDate, number: Number, user: User } = req.body;

        if (!ZAbsent || !ZBoy || !ZGirl || !ABSDate || !Number || !User) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        try {
            const statAbRef = doc(db, "Status", "Absent");
            const UID = generateID();

            const Boy = 20 - parseInt(ZBoy);
            const Girl = 15 - parseInt(ZGirl);

            const DDate = new Date(ABSDate).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })

            await updateDoc(statAbRef, {
                Absent: `${ZAbsent}`,
                Boy: `${Boy}`,
                Date: `${DDate}`,
                Girl: `${Girl}`,
            });

            await setDoc(doc(db, AbsentDB, `${UID}`), {
                All: `ขาด / ลา ${ZAbsent}`,
                Count: `${ZAbsent}`,
                Date: `${DDate}`,
                Number: `${Number}`,
                timestamp: serverTimestamp(),
            });

            //await pushNewAbsent(DDate, ZAbsent, Number, Boy, Girl);
            CLogger(db, "POST", User, "เพิ่มรายการ เช็คชื่อประจำวัน");
            res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
        } catch (e) {
            res.status(500).send(`Error adding absent data: ${e.message}`);
        }
    });

    router.patch('/', Authenticate(db), async (req, res) => {
        const { id: ID, zabs: ZAbsent, zboy: ZBoy, zgirl: ZGirl, date: Date, number: Number } = req.body;

        if (!ID || !ZAbsent || !ZBoy || !ZGirl || !Date || !Number) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        const docRef = doc(db, AbsentDB, ID);
        const ADoc = await getDoc(docRef);

        if (!ADoc.exists()) {
            return res.status(400).send("ไม่พบไอดีของข้อมูลนี้");
        }

        try {
            const statAbRef = doc(db, "Status", "Absent");
            const Boy = 20 - parseInt(ZBoy);
            const Girl = 15 - parseInt(ZGirl);

            const DDate = new Date(Date).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            const todayFormatted = new Date().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            await updateDoc(docRef, {
                All: `ขาด / ลา ${ZAbsent}`,
                Count: `${ZAbsent}`,
                Date: `${DDate}`,
                Number: `${Number}`,
            });
            if (DDate == todayFormatted) {
                await updateDoc(statAbRef, {
                    Absent: `${ZAbsent}`,
                    Boy: `${Boy}`,
                    Date: `${DDate}`,
                    Girl: `${Girl}`,
                });
            }

            res.send(`อัพเดทข้อมูลของไอดี ${ID} เรียบร้อยแล้ว`);
        } catch (error) {
            res.status(500).send(`Error editing absent data: ${error.message}`);
        }
    });

    return {
        baseRoute: '/absent',
        router,
    };
};
