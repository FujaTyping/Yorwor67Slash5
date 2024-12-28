const express = require("express");
const { getDocs, collection, setDoc, doc } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
let CRealData = { Classcode: [] };
let TreelastFetchTime = 0;
const TreefetchInterval = 3 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - TreelastFetchTime > TreefetchInterval) {
            try {
                const querySnapshot = await getDocs(collection(db, "Classcode"));
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
        const { code: Code, teac: Teacher, subj: Subject } = req.body;

        if (!Code || !Teacher || !Subject) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        try {
            const UID = generateID();
            await setDoc(doc(req.db, "Classcode", `${UID}`), {
                Code: `${Code}`,
                Teacher: `${Teacher}`,
                Subject: `${Subject}`,
            });
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
