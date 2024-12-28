const express = require("express");
const { getDocs, query, collection, orderBy, setDoc, doc, getDoc, updateDoc, serverTimestamp } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
const pushNewAbsent = require("../lib/lineOA/pushAbsent");
let ARealData = { Static: {}, Absent: [] };
let AbslastFetchTime = 0;
const TreefetchInterval = 3 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - AbslastFetchTime > TreefetchInterval) {
            try {
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
                ARealData.Static.All = (Boy + Girl).toString();
                AbslastFetchTime = Date.now();
            } catch (e) {
                return res.status(500).send(`Error fetching absent data: ${e.message}`);
            }
        }
        res.send(ARealData);
    });

    router.post('/', Authenticate(db), async (req, res) => {
        const { zabs: ZAbsent, zboy: ZBoy, zdate: ZDate, zgirl: ZGirl, date: Date, number: Number } = req.body;

        if (!ZAbsent || !ZBoy || !ZDate || !ZGirl || !Date || !Number) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        try {
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
        } catch (e) {
            res.status(500).send(`Error adding absent data: ${e.message}`);
        }
    });

    return {
        baseRoute: '/absent',
        router,
    };
};
