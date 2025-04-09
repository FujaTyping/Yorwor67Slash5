const express = require("express");
const { getDocs, collection, setDoc, doc } = require('firebase/firestore');
const { Authenticate } = require('../utils/authenticate');
const { generateID } = require('../lib/module');
let RealData = { Sheet: [] };
let TreelastFetchTime = 0;
const TreefetchInterval = 3 * 60 * 1000;

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        if (Date.now() - TreelastFetchTime > TreefetchInterval) {
            try {
                const querySnapshot = await getDocs(collection(db, "StudyFile"));
                RealData.Sheet = [];
                querySnapshot.forEach((doc) => {
                    RealData.Sheet.push(doc.data());
                });
                TreelastFetchTime = Date.now();
            } catch (e) {
                return res.status(500).send(`Error fetching class code data: ${e.message}`);
            }
        }
        res.send(RealData);
    });

    router.post('/', Authenticate(db), async (req, res) => {
        const { url: Url, title: Title } = req.body;

        if (!Url || !Title) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน");
        }

        try {
            const UID = generateID();
            await setDoc(doc(db, "StudyFile", `${UID}`), {
                Url: `${Url}`,
                Title: `${Title}`,
            });
            res.send(`เพิ่มไฟล์ด้วยไอดี ${UID} เรียบร้อยแล้ว`);
        } catch (e) {
            res.status(500).send(`Error adding class code data: ${e.message}`);
        }
    });

    return {
        baseRoute: '/sheet',
        router,
    };
};
