const express = require('express');
const { getDocs, query, collection, orderBy, setDoc, doc, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
const pushNewHomework = require("../lib/lineOA/pushHomework");
const notifyHomework = require("../lib/dsgHook/notifyHomework");
let HRealData = { Homework: [] };
let lastFetchTime = 0;
const fetchInterval = 5 * 60 * 1000;

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
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - lastFetchTime > fetchInterval) {
            try {
                const querySnapshot = await getDocs(query(collection(db, "Homework"), orderBy("timestamp", "desc")));
                HRealData.Homework = [];
                querySnapshot.forEach((doc) => {
                    const homework = doc.data();
                    const dueDate = thaiDateToJsDate(homework.Due);
                    homework.isDue = Date.now() > dueDate.getTime();
                    HRealData.Homework.push(homework);
                });
                lastFetchTime = Date.now();
            } catch (e) {
                return res.status(500).send(`Error fetching homework data: ${e.message}`);
            }
        }
        res.send(HRealData);
    });

    router.post('/', Authenticate(db), async (req, res) => {
        const { decs: Decs, due: Due, subj: Subject, time: Time } = req.body;

        if (!Decs || !Due || !Subject || !Time) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        try {
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
        } catch (e) {
            res.status(500).send(`Error adding homework data: ${e.message}`);
        }
    });

    return {
        baseRoute: '/assignment',
        router,
    };
};
