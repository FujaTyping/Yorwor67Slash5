const express = require("express");
const { getDocs, collection, setDoc, doc } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
const { ClasscodeDB } = require("../db-config.json");
const { CLogger } = require('../utils/loggers');
let CRealData = { Classcode: [] };
let TreelastFetchTime = 0;
const TreefetchInterval = 3 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - TreelastFetchTime > TreefetchInterval) {
            try {
                const querySnapshot = await getDocs(collection(db, ClasscodeDB));
                CRealData.Classcode = [];
                querySnapshot.forEach((doc) => {
                    CRealData.Classcode.push(doc.data());
                });
                TreelastFetchTime = Date.now();
            } catch (e) {
                return res.status(500).send(`Error fetching class code data: ${e.message}`);
            }
        }
        res.send(CRealData);
    });

    router.post('/', Authenticate(db), async (req, res) => {
        const { code: Code, teac: Teacher, subj: Subject, color: Color, user: User, cid: Cid } = req.body;

        if (!Code || !Teacher || !Subject || !Color || !User) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        try {
            const UID = generateID();
            const dataToSet = {
                Code: `${Code}`,
                Teacher: `${Teacher}`,
                Subject: `${Subject}`,
                Color: `${Color}`,
            };

            if (Cid != "") {
                dataToSet.Cid = `https://classroom.google.com/c/${Cid}?cjc=${Code}`;
            }
            await setDoc(doc(db, ClasscodeDB, `${UID}`), dataToSet);

            CLogger(db, "POST", User, "เพิ่มรายการ รหัสห้องเรียน");
            res.send(`เพิ่มข้อมูลด้วยไอดี ${UID} เรียบร้อยแล้ว`);
        } catch (e) {
            res.status(500).send(`Error adding class code data: ${e.message}`);
        }
    });

    return {
        baseRoute: '/classcode',
        router,
    };
};
